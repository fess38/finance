package ru.fess38.finance

import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport
import com.google.api.client.json.jackson2.JacksonFactory
import com.google.gson.Gson
import com.google.gson.GsonBuilder
import com.google.gson.reflect.TypeToken
import com.typesafe.config.Config
import com.typesafe.config.ConfigFactory
import com.zaxxer.hikari.HikariConfig
import com.zaxxer.hikari.HikariDataSource
import org.hibernate.Session
import org.hibernate.SessionFactory
import org.hibernate.criterion.DetachedCriteria
import org.springframework.boot.autoconfigure.web.HttpMessageConverters
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.converter.json.GsonHttpMessageConverter
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.orm.hibernate5.HibernateTransactionManager
import org.springframework.orm.hibernate5.LocalSessionFactoryBean
import org.springframework.transaction.PlatformTransactionManager
import ru.fess38.finance.model.Account
import ru.fess38.finance.model.Currency
import ru.fess38.finance.model.User
import ru.fess38.finance.util.LocalDateConverter
import java.time.LocalDate
import java.util.Properties
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
    factoryBean.setAnnotatedClasses(Currency::class.java, Account::class.java, User::class.java)
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
  fun gson(): Gson {
    val gsonBuilder = GsonBuilder()
    gsonBuilder.registerTypeAdapter(LocalDate::class.java, LocalDateConverter())
    return gsonBuilder.create()
  }

  @Bean
  fun gsonHttpMessageConverter(gson: Gson): GsonHttpMessageConverter {
    val gsonHttpMessageConverter = GsonHttpMessageConverter()
    gsonHttpMessageConverter.gson = gson
    return gsonHttpMessageConverter
  }

  @Bean
  fun httpMessageConverters(converter: GsonHttpMessageConverter) = HttpMessageConverters(converter)

  @Bean
  fun googleIdTokenVerifier(config: Config) = GoogleIdTokenVerifier
      .Builder(GoogleNetHttpTransport.newTrustedTransport(), JacksonFactory.getDefaultInstance())
      .setAudience(listOf(config.getString("security.google.clientId")))
      .build()!!
}

fun Config.toProperties(): Properties {
  val properties = Properties()
  this.entrySet().forEach {properties[it.key] = it.value.unwrapped()}
  return properties
}

inline fun <reified T> Gson.fromJson(json: String): T {
  return this.fromJson<T>(json, object: TypeToken<T>() {}.type)
}

inline fun <reified T> SessionFactory.list(criteria: DetachedCriteria,
                                           session: Session = this.currentSession): List<T> {
  return criteria.getExecutableCriteria(session).list() as List<T>
}
