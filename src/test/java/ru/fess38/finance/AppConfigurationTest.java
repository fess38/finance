package ru.fess38.finance;

import com.typesafe.config.Config;
import com.typesafe.config.ConfigFactory;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.orm.hibernate5.HibernateTransactionManager;
import ru.fess38.finance.dao.AccountDao;
import ru.fess38.finance.dao.AccountDaoImpl;
import ru.fess38.finance.dao.CurrencyDao;
import ru.fess38.finance.dao.CurrencyDaoImpl;
import ru.fess38.finance.dao.RubricDao;
import ru.fess38.finance.dao.RubricDaoImpl;
import ru.fess38.finance.dao.TagDao;
import ru.fess38.finance.dao.TagDaoImpl;
import ru.fess38.finance.dao.TransactionDao;
import ru.fess38.finance.dao.TransactionDaoImpl;
import ru.fess38.finance.dao.UserDao;
import ru.fess38.finance.dao.UserDaoImpl;

import javax.sql.DataSource;

public class AppConfigurationTest {
  private final Config config = ConfigFactory.load();

  @Bean
  public DataSource dataSource() throws Exception {
    HikariConfig hikariConfig = new HikariConfig();
    hikariConfig.setDataSourceClassName(config.getString("hikari.classname"));
    hikariConfig.addDataSourceProperty("url", "mem:Finance");
    return new HikariDataSource(hikariConfig);
  }

  @Bean
  @Autowired
  public SessionFactory sessionFactory(DataSource dataSource) throws Exception {
    return new AppConfiguration().sessionFactory(dataSource);
  }

  @Bean
  @Autowired
  public HibernateTransactionManager transactionManager(SessionFactory sessionFactory) {
    HibernateTransactionManager transactionManager = new HibernateTransactionManager();
    transactionManager.setSessionFactory(sessionFactory);
    return transactionManager;
  }

  @Bean
  public DatabaseEventListener databaseEventListener() {
    return new AppConfiguration().databaseEventListener();
  }

  @Bean
  @Autowired
  public DefaultEntitiesCreator defaultEntitiesCreator(AccountDao accountDao, CurrencyDao
      currencyDao, RubricDao rubricDao) {
    DefaultEntitiesCreator defaultEntitiesCreator = new DefaultEntitiesCreator();
    defaultEntitiesCreator.setAccountDao(accountDao);
    defaultEntitiesCreator.setCurrencyDao(currencyDao);
    defaultEntitiesCreator.setRubricDao(rubricDao);
    return defaultEntitiesCreator;
  }

  @Bean
  @Autowired
  public AccountDao accountDao(SessionFactory sessionFactory,
      DatabaseEventListener databaseEventListener) {
    AccountDaoImpl accountDao = new AccountDaoImpl();
    accountDao.setSessionFactory(sessionFactory);
    accountDao.setDatabaseEventListener(databaseEventListener);
    return accountDao;
  }

  @Bean
  @Autowired
  public CurrencyDao currencyDao(SessionFactory sessionFactory,
      DatabaseEventListener databaseEventListener) {
    CurrencyDaoImpl currencyDao = new CurrencyDaoImpl();
    currencyDao.setSessionFactory(sessionFactory);
    currencyDao.setDatabaseEventListener(databaseEventListener);
    return currencyDao;
  }

  @Bean
  @Autowired
  public RubricDao rubricDao(SessionFactory sessionFactory,
      DatabaseEventListener databaseEventListener) {
    RubricDaoImpl rubricDao = new RubricDaoImpl();
    rubricDao.setSessionFactory(sessionFactory);
    rubricDao.setDatabaseEventListener(databaseEventListener);
    return rubricDao;
  }

  @Bean
  @Autowired
  public TagDao tagDao(SessionFactory sessionFactory, DatabaseEventListener databaseEventListener) {
    TagDaoImpl tagDao = new TagDaoImpl();
    tagDao.setSessionFactory(sessionFactory);
    tagDao.setDatabaseEventListener(databaseEventListener);
    return tagDao;
  }

  @Bean
  @Autowired
  public TransactionDao transactionDao(SessionFactory sessionFactory, DatabaseEventListener
      databaseEventListener) {
    TransactionDaoImpl transactionDao = new TransactionDaoImpl();
    transactionDao.setSessionFactory(sessionFactory);
    transactionDao.setDatabaseEventListener(databaseEventListener);
    return transactionDao;
  }

  @Bean
  @Autowired
  public UserDao userDao(SessionFactory sessionFactory,
      DatabaseEventListener databaseEventListener) {
    UserDaoImpl userDao = new UserDaoImpl();
    userDao.setSessionFactory(sessionFactory);
    userDao.setDatabaseEventListener(databaseEventListener);
    return userDao;
  }
}
