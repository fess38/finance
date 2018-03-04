package ru.fess38.finance

import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport
import com.google.api.client.json.jackson2.JacksonFactory
import com.typesafe.config.Config
import com.typesafe.config.ConfigFactory
import com.zaxxer.hikari.HikariConfig
import com.zaxxer.hikari.HikariDataSource
import org.hibernate.SessionFactory
import org.springframework.boot.autoconfigure.web.HttpMessageConverters
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.converter.protobuf.ProtobufHttpMessageConverter
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.orm.hibernate5.HibernateTransactionManager
import org.springframework.orm.hibernate5.LocalSessionFactoryBean
import org.springframework.transaction.PlatformTransactionManager
import ru.fess38.finance.model.FinanceEntity
import ru.fess38.finance.model.User
import ru.fess38.finance.util.toProperties
import javax.sql.DataSource

@Configuration
class AppConfiguration {
  @Bean
  fun config() = ConfigFactory.load().getConfig(System.getenv("env") ?: "dev")!!

  @Bean
  fun dataSource(config: Config): DataSource {
    val hikariConfig = HikariConfig()
    hikariConfig.dataSourceClassName = config.getString("hikari.classname")
    val host = config.getString("hikari.host") + ":" + config.getInt("hikari.port")
    hikariConfig.addDataSourceProperty("serverName", host)
    hikariConfig.username = config.getString("hikari.user")
    hikariConfig.password = config.getString("hikari.password")
    hikariConfig.addDataSourceProperty("databaseName", config.getString("hikari.databasename"))
    hikariConfig.addHealthCheckProperty("stringtype", "unspecified")
    return HikariDataSource(hikariConfig)
  }

  @Bean
  fun sessionFactory(dataSource: DataSource, config: Config): SessionFactory {
    val factoryBean = LocalSessionFactoryBean()
    factoryBean.setDataSource(dataSource)
    factoryBean.hibernateProperties = config.getConfig("hibernate").toProperties()
    factoryBean.setAnnotatedClasses(FinanceEntity::class.java, User::class.java)
    factoryBean.afterPropertiesSet()
    return factoryBean.`object`
  }

  @Bean
  fun jdbcTemplate(dataSource: DataSource) = JdbcTemplate(dataSource)

  @Bean
  fun transactionManager(sessionFactory: SessionFactory): PlatformTransactionManager {
    return HibernateTransactionManager(sessionFactory)
  }

  @Bean
  fun protobufHttpMessageConverter(): ProtobufHttpMessageConverter {
    return ProtobufHttpMessageConverter()
  }

  @Bean
  fun httpMessageConverters(converter: ProtobufHttpMessageConverter): HttpMessageConverters {
    return HttpMessageConverters(converter)
  }

  @Bean
  fun googleIdTokenVerifier(config: Config) = GoogleIdTokenVerifier
      .Builder(GoogleNetHttpTransport.newTrustedTransport(), JacksonFactory.getDefaultInstance())
      .setAudience(listOf(config.getString("security.google.clientId")))
      .build()!!
}
