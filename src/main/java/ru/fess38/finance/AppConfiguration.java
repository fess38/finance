package ru.fess38.finance;

import org.apache.commons.dbcp2.BasicDataSource;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.DetachedCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import ru.fess38.finance.dao.AccountDao;
import ru.fess38.finance.dao.CurrencyDao;
import ru.fess38.finance.dao.RubricDao;
import ru.fess38.finance.model.Account;
import ru.fess38.finance.model.Account.AccountType;
import ru.fess38.finance.model.Currency;
import ru.fess38.finance.model.Rubric;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;


@Configuration
public class AppConfiguration {
  @Value("${jdbc.driver}")
  private String driver;
  @Value("${jdbc.url}")
  private String url;

  @Autowired
  private RubricDao rubricDao;
  @Autowired
  private AccountDao accountDao;
  @Autowired
  private CurrencyDao currencyDao;

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
  public DataSource dataSource() {
    BasicDataSource dataSource = new BasicDataSource();
    dataSource.setDriverClassName(driver);
    dataSource.setUrl(url + "db/Finance");
    return dataSource;
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
}
