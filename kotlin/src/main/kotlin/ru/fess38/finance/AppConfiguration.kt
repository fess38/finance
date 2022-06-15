package ru.fess38.finance

import com.amazonaws.auth.AWSStaticCredentialsProvider
import com.amazonaws.auth.BasicAWSCredentials
import com.amazonaws.client.builder.AwsClientBuilder
import com.amazonaws.services.s3.AmazonS3ClientBuilder
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport
import com.google.api.client.json.gson.GsonFactory
import com.google.protobuf.Message
import com.typesafe.config.Config
import com.typesafe.config.ConfigFactory
import org.apache.commons.dbcp2.BasicDataSource
import org.hibernate.SessionFactory
import org.springframework.boot.autoconfigure.http.HttpMessageConverters
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
import java.util.*
import javax.sql.DataSource

@Configuration
class AppConfiguration {
  @Bean
  fun config() = ConfigFactory.load()!!

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
    dataSource.connection.createStatement().execute("CREATE SCHEMA IF NOT EXISTS model;")
    val factoryBean = LocalSessionFactoryBean()
    factoryBean.setDataSource(dataSource)
    factoryBean.hibernateProperties = config.getConfig("hibernate").toProperties()
    factoryBean.setAnnotatedClasses(HibernateEntity::class.java, User::class.java)
    factoryBean.afterPropertiesSet()
    return factoryBean.`object`!!
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
    .Builder(GoogleNetHttpTransport.newTrustedTransport(), GsonFactory.getDefaultInstance())
    .setAudience(listOf(config.getString("security.google.clientId")))
    .build()!!

  @Bean
  fun messageValidator(messageService: MessageService): MessageValidator<Message> {
    return CompositeValidator(messageService)
  }

  @Bean
  fun s3Client(config: Config) = AmazonS3ClientBuilder.standard()
    .withCredentials(
      AWSStaticCredentialsProvider(
        BasicAWSCredentials(config.getString("s3.access_key"), config.getString("s3.secret_key"),)
      )
    )
    .withEndpointConfiguration(
      AwsClientBuilder.EndpointConfiguration(config.getString("s3.endpoint"), config.getString("s3.region"))
    )
    .build()!!
}

fun Config.toProperties(): Properties {
  val properties = Properties()
  this.entrySet().forEach {properties[it.key] = it.value.unwrapped()}
  return properties
}

const val IDSEQ_ALLOCATION_SIZE = 100
