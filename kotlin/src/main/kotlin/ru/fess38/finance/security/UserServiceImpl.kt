package ru.fess38.finance.security

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service
import ru.fess38.finance.core.Model.AccessToken
import ru.fess38.finance.core.Model.RefreshToken.AuthType

@Service
class UserServiceImpl: UserService {
  @Autowired
  lateinit var repository: UserRepository

  override fun save(outerId: String, authType: AuthType, session: Session) {
    val user = repository.find(outerId, authType)
    if (user == null) {
      repository.save(User(outerId = outerId, authType = authType, sessions = listOf(session)))
    } else {
      val updatedUser = user.copy(sessions = user.sessions.plus(session))
      repository.update(updatedUser)
    }
  }

  override fun find(token: String): User? {
    return repository.find(token)
  }

  override fun find(outerId: String, authType: AuthType): User? {
    return repository.find(outerId, authType)
  }

  override fun findByContext(): User {
    val securityContext = SecurityContextHolder.getContext()
    val tokenAuthentication = (securityContext.authentication) as TokenAuthentication
    val token = tokenAuthentication.credentials
    return repository.find(token) ?: throw IllegalArgumentException("Invalid token: $token")
  }

  override fun revoke(accessToken: AccessToken) {
    repository.find(accessToken.value)?.let {
      val updatedSessions = it.sessions.map {
        if (it.token == accessToken.value) it.copy(expired = 0) else it
      }
      repository.update(it.copy(sessions = updatedSessions))
    }
  }
}
