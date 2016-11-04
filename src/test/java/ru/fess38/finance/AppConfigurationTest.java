package ru.fess38.finance;

import com.typesafe.config.Config;
import com.typesafe.config.ConfigFactory;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.orm.hibernate5.HibernateTransactionManager;
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
  public UserDao userDao(SessionFactory sessionFactory, DatabaseChangeFlag databaseChangeFlag) {
    UserDaoImpl userDao = new UserDaoImpl();
    userDao.setSessionFactory(sessionFactory);
    userDao.setDatabaseChangeFlag(databaseChangeFlag);
    return userDao;
  }
}
