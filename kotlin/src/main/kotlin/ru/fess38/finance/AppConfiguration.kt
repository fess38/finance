package ru.fess38.finance

import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport
import com.google.api.client.json.jackson2.JacksonFactory
import com.google.protobuf.Message
import com.typesafe.config.Config
import com.typesafe.config.ConfigFactory
import org.apache.commons.dbcp2.BasicDataSource
import org.hibernate.SessionFactory
import org.springframework.boot.autoconfigure.web.HttpMessageConverters
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.converter.protobuf.ProtobufHttpMessageConverter
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.orm.hibernate5.HibernateTransactionManager
import org.springframework.orm.hibernate5.LocalSessionFactoryBean
import org.springframework.transaction.PlatformTransactionManager
import ru.fess38.finance.core.MessageService
import ru.fess38.finance.repository.HibernateEntity
import ru.fess38.finance.security.User
import ru.fess38.finance.validation.CompositeValidator
import ru.fess38.finance.validation.MessageValidator
import java.util.Properties
import javax.sql.DataSource

@Configuration
class AppConfiguration {
  @Bean
  fun config() = ConfigFactory.load().getConfig(System.getenv("env") ?: "dev")!!

  @Bean
  fun dataSource(config: Config): DataSource {
    val dataSource = BasicDataSource()
    dataSource.driverClassName = config.getString("postgres.classname")
    val host = config.getString("postgres.host")
    val port = config.getString("postgres.port")
    val database = config.getString("postgres.databasename")
    dataSource.url = "jdbc:postgresql://$host:$port/$database"
    dataSource.username = config.getString("postgres.user")
    dataSource.password = config.getString("postgres.password")
    dataSource.validationQuery = "SELECT version();"
    return dataSource
  }

  @Bean
  fun sessionFactory(dataSource: DataSource, config: Config): SessionFactory {
    val factoryBean = LocalSessionFactoryBean()
    factoryBean.setDataSource(dataSource)
    factoryBean.hibernateProperties = config.getConfig("hibernate").toProperties()
    factoryBean.setAnnotatedClasses(HibernateEntity::class.java, User::class.java)
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

  @Bean
  fun messageValidator(messageService: MessageService): MessageValidator<Message> {
    return CompositeValidator(messageService)
  }
}

fun Config.toProperties(): Properties {
  val properties = Properties()
  this.entrySet().forEach {properties[it.key] = it.value.unwrapped()}
  return properties
}
