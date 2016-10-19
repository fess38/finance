package ru.fess38.finance;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.yandex.disk.rest.Credentials;
import com.yandex.disk.rest.RestClient;
import com.yandex.disk.rest.json.Link;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.DetachedCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.converter.json.GsonHttpMessageConverter;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.scheduling.annotation.Scheduled;
import ru.fess38.finance.dao.AccountDao;
import ru.fess38.finance.dao.CurrencyDao;
import ru.fess38.finance.dao.RubricDao;
import ru.fess38.finance.model.Account;
import ru.fess38.finance.model.Account.AccountType;
import ru.fess38.finance.model.Currency;
import ru.fess38.finance.model.Rubric;
import ru.fess38.finance.util.LocalDateConverter;

import java.io.File;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;
import javax.annotation.PostConstruct;
import javax.sql.DataSource;


@Configuration
public class AppConfiguration {
  private static final AtomicBoolean IS_DATABASE_CHANGE = new AtomicBoolean(false);
  private final List<String> fileNames = Arrays.asList("Finance.script", "Finance.properties",
      "Finance.log");
  private final File localDir = new File("./db");
  private final String cloudDir = "/finance/db/";
  @Value("#{environment.mode}")
  private String mode;
  @Autowired
  private RubricDao rubricDao;
  @Autowired
  private AccountDao accountDao;
  @Autowired
  private CurrencyDao currencyDao;
  @Autowired
  private RestClient restClient;

  @PostConstruct
  public void create() {
    if (currencyDao.find(DetachedCriteria.forClass(Currency.class)).isEmpty()) {
      createCurrenciesAndAccounts();
      createTransferRubric();
    }
  }

  private void createCurrenciesAndAccounts() {
    Currency ruble = new Currency();
    ruble.setName("Рубль");
    ruble.setSymbol("P");
    currencyDao.save(ruble);

    Currency dollar = new Currency();
    dollar.setName("Доллар");
    dollar.setSymbol("$");
    currencyDao.save(dollar);

    Currency euro = new Currency();
    euro.setName("Евро");
    euro.setSymbol("€");
    currencyDao.save(euro);

    Account masterAccount = new Account();
    masterAccount.setName("Наличные средства");
    masterAccount.setCurrency(ruble);
    masterAccount.setType(AccountType.MASTER);
    accountDao.save(masterAccount);

    Account outerAccount = new Account();
    outerAccount.setName("Внешний счет");
    outerAccount.setCurrency(ruble);
    outerAccount.setType(AccountType.OUTER);
    accountDao.save(outerAccount);
  }

  private void createTransferRubric() {
    Rubric transferRubric = new Rubric();
    transferRubric.setName("Перевод между счетами");
    transferRubric.setIsIncome(false);
    transferRubric.setIsTransfer(true);
    rubricDao.save(transferRubric);
  }

  @Bean
  public RestClient restClient(@Value("#{environment.disktoken}") String token) throws Exception {
    RestClient restClient = new RestClient(new Credentials("", token));
    download(restClient);
    return restClient;
  }

  private void download(RestClient restClient) throws Exception {
    File[] files = localDir.listFiles() == null ? new File[]{} : localDir.listFiles();
    Arrays.stream(files).forEach(File::delete);
    localDir.mkdir();
    for (String filename : fileNames) {
      File file = new File(localDir, filename);
      restClient.downloadFile(cloudDir + filename, file, null);
    }
  }

  @Scheduled(fixedRate = 60000, initialDelay = 60000)
  public void upload() throws Exception {
    if ("write".equals(mode) && IS_DATABASE_CHANGE.get()) {
      String backupDir = "/finance/backup/" + String.valueOf(System.currentTimeMillis());
      restClient.makeFolder(backupDir);
      for (String filename : fileNames) {
        File file = new File(localDir, filename);
        Link link = restClient.getUploadLink(backupDir + "/" + filename, false);
        restClient.uploadFile(link, false, file, null);
      }
      restClient.copy(backupDir, cloudDir, true);
      IS_DATABASE_CHANGE.set(false);
    }
  }

  @Bean
  @DependsOn("restClient")
  public DataSource dataSource() {
    HikariConfig config = new HikariConfig("/ru/fess38/finance/hikari.properties");
    return new HikariDataSource(config);
  }

  @Bean
  @Autowired
  public SessionFactory sessionFactory(DataSource dataSource) throws Exception {
    LocalSessionFactoryBean factoryBean = new LocalSessionFactoryBean();
    factoryBean.setDataSource(dataSource);
    factoryBean.setConfigLocation(new ClassPathResource("ru/fess38/finance/hibernate.cfg.xml"));
    factoryBean.afterPropertiesSet();
    return factoryBean.getObject();
  }

  @Bean
  public GsonHttpMessageConverter gsonHttpMessageConverter() {
    GsonHttpMessageConverter gsonHttpMessageConverter = new GsonHttpMessageConverter();
    Gson gson = new GsonBuilder()
        .registerTypeAdapter(LocalDate.class, new LocalDateConverter())
        .create();
    gsonHttpMessageConverter.setGson(gson);
    return gsonHttpMessageConverter;
  }

  public static void databaseChanged() {
    IS_DATABASE_CHANGE.set(true);
  }
}
