package ru.fess38.finance.security

import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter
import ru.fess38.finance.model.UserType
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

class TokenAuthenticationFilter(private val googleIdTokenVerifier: GoogleIdTokenVerifier):
    AbstractAuthenticationProcessingFilter("/**") {

  init {
    super.setContinueChainBeforeSuccessfulAuthentication(true)
  }

  override fun attemptAuthentication(request: HttpServletRequest, response: HttpServletResponse):
      Authentication {
    val authentication: TokenAuthentication
    val token = request.getHeader("token") ?:
        throw BadCredentialsException("Token header is required")
    val userType = try {
      UserType.valueOf(request.getHeader("type"))
    } catch (e: Exception) {
      throw BadCredentialsException("User type is required")
    }

    when (userType) {
      UserType.GOOGLE -> {
        val googleIdToken = googleIdTokenVerifier.verify(token) ?:
            throw BadCredentialsException("Invalid token")
        val id = googleIdToken.payload.subject
        authentication = TokenAuthentication(id, token, userType)
        SecurityContextHolder.getContext().authentication = authentication
      }
      else -> throw BadCredentialsException("Not supported user type: ${userType}")
    }
    return authentication
  }
}
