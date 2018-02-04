package ru.fess38.finance

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.boot.autoconfigure.web.HttpMessageConvertersAutoConfiguration
import org.springframework.context.annotation.ComponentScan
import ru.fess38.finance.util.toProperties

fun main(args: Array<String>) {
  val properties = AppConfiguration().config().getConfig("spring").toProperties()
  val springApplication = SpringApplication(Application::class.java)
  springApplication.setDefaultProperties(properties)
  springApplication.run(*args)
}

@EnableAutoConfiguration(exclude = [(HttpMessageConvertersAutoConfiguration::class)])
@ComponentScan(basePackages = ["ru.fess38.finance"])
class Application
