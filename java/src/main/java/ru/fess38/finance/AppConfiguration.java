package ru.fess38.finance;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.TypeAdapterFactory;
import com.typesafe.config.Config;
import com.typesafe.config.ConfigFactory;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.converter.json.GsonHttpMessageConverter;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.scheduling.annotation.Scheduled;
import ru.fess38.finance.account.AccountBalanceCalculator;
import ru.fess38.finance.util.DatabaseEventListener;
import ru.fess38.finance.util.DefaultEntitiesCreator;
import ru.fess38.finance.util.DiskUtil;
import ru.fess38.finance.util.LocalDateConverter;

import java.time.LocalDate;
import java.util.ServiceLoader;
import javax.annotation.PostConstruct;
import javax.sql.DataSource;


@Configuration
public class AppConfiguration {
  private final Config config = ConfigFactory.load();
  private final DiskUtil diskUtil = new DiskUtil(config.getConfig("disk"));
  private DatabaseEventListener databaseEventListener;
  private DefaultEntitiesCreator defaultEntitiesCreator;
  private AccountBalanceCalculator balanceCalculator;

  @PostConstruct
  public void createDefaultEntities() {
    defaultEntitiesCreator.create();
  }

  @Scheduled(fixedRate = 600000, initialDelay = 60000)
  public void upload() throws Exception {
    diskUtil.upload(databaseEventListener.isChange());
    databaseEventListener.setChangeFalse();
  }

  @Scheduled(fixedRate = 10000)
  public void updateBalance() {
    if (databaseEventListener.isCalculateBalance()) {
      balanceCalculator.run();
    }
    databaseEventListener.setCalculateBalanceFalse();
  }

  @Bean
  public DatabaseEventListener databaseEventListener() {
    return new DatabaseEventListener();
  }

  @Bean
  public DataSource dataSource() throws Exception {
    diskUtil.download();
    HikariConfig hikariConfig = new HikariConfig();
    hikariConfig.setDataSourceClassName(config.getString("hikari.classname"));
    hikariConfig.addDataSourceProperty("url", config.getString("hikari.url"));
    return new HikariDataSource(hikariConfig);
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
    GsonBuilder gsonBuilder = new GsonBuilder();
    for (TypeAdapterFactory factory : ServiceLoader.load(TypeAdapterFactory.class)) {
      gsonBuilder.registerTypeAdapterFactory(factory);
    }
    gsonBuilder.registerTypeAdapter(LocalDate.class, new LocalDateConverter());
    Gson gson = gsonBuilder.create();
    GsonHttpMessageConverter gsonHttpMessageConverter = new GsonHttpMessageConverter();
    gsonHttpMessageConverter.setGson(gson);
    return gsonHttpMessageConverter;
  }

  @Autowired
  public void setDatabaseEventListener(DatabaseEventListener databaseEventListener) {
    this.databaseEventListener = databaseEventListener;
  }

  @Autowired
  public void setDefaultEntitiesCreator(DefaultEntitiesCreator defaultEntitiesCreator) {
    this.defaultEntitiesCreator = defaultEntitiesCreator;
  }

  @Autowired
  public void setBalanceCalculator(AccountBalanceCalculator balanceCalculator) {
    this.balanceCalculator = balanceCalculator;
  }
}
