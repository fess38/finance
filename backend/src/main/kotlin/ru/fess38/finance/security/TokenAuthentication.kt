package ru.fess38.finance.security

import org.springframework.security.core.Authentication
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import ru.fess38.finance.core.Model.RefreshToken.AuthType

class TokenAuthentication(
    private val id: String,
    private val token: String,
    private val authType: AuthType
): Authentication {
  override fun getPrincipal() = id

  override fun getCredentials() = token

  override fun getName() = authType.toString()

  override fun getAuthorities(): List<GrantedAuthority> = listOf(SimpleGrantedAuthority("USER"))

  override fun setAuthenticated(isAuthenticated: Boolean) = throw NotImplementedError()

  override fun isAuthenticated() = true

  override fun getDetails() = throw NotImplementedError()

  override fun toString(): String {
    return "TokenAuthentication(id='$id', token='$token')"
  }
}
