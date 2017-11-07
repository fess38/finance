package ru.fess38.finance.security

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import ru.fess38.finance.UserDao

@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true)
@Configuration
class SecurityConfig: WebSecurityConfigurerAdapter() {
  @Autowired
  lateinit var userDao: UserDao
  @Override
  override fun configure(http: HttpSecurity) {
    http
        .csrf().disable()
        .addFilterBefore(TokenAuthenticationFilter(userDao),
            UsernamePasswordAuthenticationFilter::class.java)
        .authorizeRequests()
        .antMatchers("/api/data/**").hasAuthority("USER")
        .and()
        .authorizeRequests()
        .antMatchers("/api/auth/**").permitAll()
  }
}
