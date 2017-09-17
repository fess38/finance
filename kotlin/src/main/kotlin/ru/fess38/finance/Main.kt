package ru.fess38.finance

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.boot.autoconfigure.web.HttpMessageConvertersAutoConfiguration
import org.springframework.context.annotation.ComponentScan
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import ru.fess38.finance.model.Account
import java.util.UUID

fun main(args: Array<String>) {
  val properties = AppConfiguration().config().getConfig("spring").toProperties()
  val springApplication = SpringApplication(Application::class.java)
  springApplication.setDefaultProperties(properties)
  springApplication.run(*args)
}

@EnableAutoConfiguration(exclude = arrayOf(HttpMessageConvertersAutoConfiguration::class))
@ComponentScan(basePackages = arrayOf("ru.fess38.finance"))
class Application

@RestController
class Controller {
  @Autowired
  lateinit var currencyDao: CurrencyDao

  @Autowired
  lateinit var accountDao: AccountDao

  @RequestMapping("/find")
  fun find(): List<Account> {
    return accountDao.find()
  }

  @RequestMapping("/save")
  fun save(): Account {
    return accountDao.save(Account(name = UUID.randomUUID().toString(),
        currency = currencyDao.find()[0]))
  }
}
