package ru.fess38.finance.security

import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter

@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true)
@Configuration
class SecurityConfig: WebSecurityConfigurerAdapter() {
  @Autowired
  lateinit var googleIdTokenVerifier: GoogleIdTokenVerifier

  @Override
  override fun configure(http: HttpSecurity) {
    http
        .addFilterBefore(TokenAuthenticationFilter(googleIdTokenVerifier),
            UsernamePasswordAuthenticationFilter::class.java)
        .authorizeRequests()
        .antMatchers("/**").hasAuthority("USER")
  }
}
