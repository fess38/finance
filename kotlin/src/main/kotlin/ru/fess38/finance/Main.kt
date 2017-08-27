package ru.fess38.finance

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso
import org.springframework.boot.autoconfigure.web.HttpMessageConvertersAutoConfiguration
import org.springframework.context.annotation.ComponentScan
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.oauth2.provider.OAuth2Authentication
import org.springframework.security.web.csrf.CookieCsrfTokenRepository
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

fun main(args: Array<String>) {
  val properties = AppConfiguration().config().getConfig("spring").toProperties()
  val springApplication = SpringApplication(Application::class.java)
  springApplication.setDefaultProperties(properties)
  springApplication.run(*args)
}

@EnableAutoConfiguration(exclude = arrayOf(HttpMessageConvertersAutoConfiguration::class))
@ComponentScan(basePackages = arrayOf("ru.fess38.finance"))
class Application

@EnableOAuth2Sso
@RestController
class FinanceWebSecurityConfigurerAdapter: WebSecurityConfigurerAdapter() {
  @Override
  override fun configure(http: HttpSecurity) {
    http
        .antMatcher("/**")
        .authorizeRequests()
        .anyRequest().authenticated()
        .and().logout().logoutSuccessUrl("/").permitAll()
        .and().csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
  }

  @RequestMapping("/user")
  fun user(user: OAuth2Authentication): OAuth2Authentication {
    return user
  }
}
