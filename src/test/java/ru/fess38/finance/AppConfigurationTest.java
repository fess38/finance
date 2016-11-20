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
import ru.fess38.finance.dao.TransactionChangeService;
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
  public DatabaseChangeFlag databaseChangeFlag() {
    return new AppConfiguration().databaseChangeFlag();
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
      DatabaseChangeFlag databaseChangeFlag) {
    AccountDaoImpl accountDao = new AccountDaoImpl();
    accountDao.setSessionFactory(sessionFactory);
    accountDao.setDatabaseChangeFlag(databaseChangeFlag);
    return accountDao;
  }

  @Bean
  @Autowired
  public CurrencyDao currencyDao(SessionFactory sessionFactory,
      DatabaseChangeFlag databaseChangeFlag) {
    CurrencyDaoImpl currencyDao = new CurrencyDaoImpl();
    currencyDao.setSessionFactory(sessionFactory);
    currencyDao.setDatabaseChangeFlag(databaseChangeFlag);
    return currencyDao;
  }

  @Bean
  @Autowired
  public RubricDao rubricDao(SessionFactory sessionFactory, DatabaseChangeFlag databaseChangeFlag) {
    RubricDaoImpl rubricDao = new RubricDaoImpl();
    rubricDao.setSessionFactory(sessionFactory);
    rubricDao.setDatabaseChangeFlag(databaseChangeFlag);
    return rubricDao;
  }

  @Bean
  @Autowired
  public TagDao tagDao(SessionFactory sessionFactory, DatabaseChangeFlag databaseChangeFlag) {
    TagDaoImpl tagDao = new TagDaoImpl();
    tagDao.setSessionFactory(sessionFactory);
    tagDao.setDatabaseChangeFlag(databaseChangeFlag);
    return tagDao;
  }

  @Bean
  @Autowired
  public TransactionDao transactionDao(SessionFactory sessionFactory, DatabaseChangeFlag
      databaseChangeFlag, TransactionChangeService transactionChangeService) {
    TransactionDaoImpl transactionDao = new TransactionDaoImpl();
    transactionDao.setSessionFactory(sessionFactory);
    transactionDao.setDatabaseChangeFlag(databaseChangeFlag);
    return transactionDao;
  }

  @Bean
  @Autowired
  public UserDao userDao(SessionFactory sessionFactory, DatabaseChangeFlag databaseChangeFlag) {
    UserDaoImpl userDao = new UserDaoImpl();
    userDao.setSessionFactory(sessionFactory);
    userDao.setDatabaseChangeFlag(databaseChangeFlag);
    return userDao;
  }

  @Bean
  @Autowired
  public TransactionChangeService transactionChangeService(AccountDao accountDao) {
    return new TransactionChangeService(accountDao);
  }
}
