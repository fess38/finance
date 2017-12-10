package ru.fess38.finance.security

import org.springframework.security.authentication.BadCredentialsException
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter
import ru.fess38.finance.UserDao
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

class TokenAuthenticationFilter(private val userDao: UserDao):
    AbstractAuthenticationProcessingFilter("/api/data/**") {

  init {
    super.setContinueChainBeforeSuccessfulAuthentication(true)
  }

  override fun attemptAuthentication(request: HttpServletRequest, response: HttpServletResponse):
      Authentication {
    val authentication: TokenAuthentication

    val token = (request.getHeader("Cookie") ?: "")
        .split(";")
        .filter {it.trim().startsWith("token")}
        .map {it.split("=")}
        .filter {it.size == 2}
        .map {it[1]}
        .firstOrNull()
        ?: throw BadCredentialsException("Token is required")

    val user = userDao.find(token) ?: throw IllegalArgumentException("Invalid token: $token")
    authentication = TokenAuthentication(user.outerId, token, user.authType)
    SecurityContextHolder.getContext().authentication = authentication
    return authentication
  }
}