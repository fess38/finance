package ru.fess38.finance;

import org.apache.commons.dbcp2.BasicDataSource;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;

import ru.fess38.finance.model.Account;
import ru.fess38.finance.model.Currency;
import ru.fess38.finance.model.Rubric;
import ru.fess38.finance.model.Tag;
import ru.fess38.finance.model.Transaction;
import ru.fess38.finance.model.User;

import java.util.Properties;

import javax.sql.DataSource;

@Configuration
public class DbConfiguration {
  @Bean(name = "dataSource")
  public DataSource getDataSource(@Value("${jdbc.driver}") String driver,
      @Value("${jdbc.url}") String url, @Value("${db.filepath}") String filepath) {
    BasicDataSource dataSource = new BasicDataSource();
    dataSource.setDriverClassName(driver);
    dataSource.setUrl(url + filepath);
    return dataSource;
  }

  @Bean
  @Autowired
  public SessionFactory getSessionFactory(DataSource dataSource) throws Exception {
    LocalSessionFactoryBean factoryBean = new LocalSessionFactoryBean();
    factoryBean.setDataSource(dataSource);
    factoryBean.setAnnotatedClasses(Account.class, Currency.class, Rubric.class, Transaction.class,
        Tag.class, User.class);
    factoryBean.setHibernateProperties(getHibernateProperties());
    factoryBean.afterPropertiesSet();
    return factoryBean.getObject();

  }

  private Properties getHibernateProperties() throws Exception {
    String filepath = "ru/fess38/finance/hibernate.properties";
    Properties properties = new Properties();
    properties.load(new ClassPathResource(filepath).getInputStream());
    return properties;
  }
}
