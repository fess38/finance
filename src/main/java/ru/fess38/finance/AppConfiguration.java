package ru.fess38.finance;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
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
import ru.fess38.finance.util.DiskUtil;
import ru.fess38.finance.util.LocalDateConverter;

import java.time.LocalDate;
import javax.annotation.PostConstruct;
import javax.sql.DataSource;


@Configuration
public class AppConfiguration {
  private final Config config = ConfigFactory.load();
  private final DiskUtil diskUtil = new DiskUtil(config.getConfig("disk"));
  private DatabaseChangeFlag databaseChangeFlag;
  private DefaultEntitiesCreator defaultEntitiesCreator;

  @PostConstruct
  public void createDefaultEntities() {
    defaultEntitiesCreator.create();
  }

  @Scheduled(fixedRate = 600000, initialDelay = 60000)
  public void upload() throws Exception {
    diskUtil.upload(databaseChangeFlag.value());
    databaseChangeFlag.setFalse();
  }

  @Bean
  public DatabaseChangeFlag databaseChangeFlag() {
    return new DatabaseChangeFlag();
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
    GsonHttpMessageConverter gsonHttpMessageConverter = new GsonHttpMessageConverter();
    Gson gson = new GsonBuilder()
        .registerTypeAdapter(LocalDate.class, new LocalDateConverter())
        .create();
    gsonHttpMessageConverter.setGson(gson);
    return gsonHttpMessageConverter;
  }

  @Autowired
  public void setDatabaseChangeFlag(DatabaseChangeFlag databaseChangeFlag) {
    this.databaseChangeFlag = databaseChangeFlag;
  }

  @Autowired
  public void setDefaultEntitiesCreator(DefaultEntitiesCreator defaultEntitiesCreator) {
    this.defaultEntitiesCreator = defaultEntitiesCreator;
  }
}
