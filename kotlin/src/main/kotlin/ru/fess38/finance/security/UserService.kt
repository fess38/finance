package ru.fess38.finance.security

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service
import ru.fess38.finance.model.Model.AccessToken
import ru.fess38.finance.model.Model.RefreshToken.AuthType
import ru.fess38.finance.model.Session
import ru.fess38.finance.model.User

interface UserService {
  fun getAll(): List<User>

  fun save(outerId: String, authType: AuthType, session: Session)

  fun find(token: String): User?

  fun find(outerId: String, authType: AuthType): User?

  fun findByContext(): User

  fun revoke(accessToken: AccessToken)

}

@Service
class UserServiceImpl: UserService {
  @Autowired
  lateinit var userDao: UserDao

  override fun getAll(): List<User> {
    return userDao.getAll()
  }

  override fun save(outerId: String, authType: AuthType, session: Session) {
    val user = userDao.find(outerId, authType)
    if (user == null) {
      userDao.save(User(outerId = outerId, authType = authType, sessions = listOf(session)))
    } else {
      val updatedUser = user.copy(sessions = user.sessions.plus(session))
      userDao.update(updatedUser)
    }
  }

  override fun find(token: String): User? {
    return userDao.find(token)
  }

  override fun find(outerId: String, authType: AuthType): User? {
    return userDao.find(outerId, authType)
  }

  override fun findByContext(): User {
    val securityContext = SecurityContextHolder.getContext()
    val tokenAuthentication = (securityContext.authentication) as TokenAuthentication
    val token = tokenAuthentication.credentials
    return userDao.find(token) ?: throw IllegalArgumentException("Invalid token: $token")
  }

  override fun revoke(accessToken: AccessToken) {
    userDao.find(accessToken.value)?.let {
      val updatedSessions = it.sessions.map {
        if (it.token == accessToken.value) it.copy(expired = 0) else it
      }
      userDao.update(it.copy(sessions = updatedSessions))
    }
  }
}
