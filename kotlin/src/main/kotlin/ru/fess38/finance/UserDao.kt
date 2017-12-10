package ru.fess38.finance

import org.hibernate.SessionFactory
import org.hibernate.criterion.DetachedCriteria
import org.hibernate.criterion.Restrictions
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Repository
import org.springframework.transaction.annotation.Transactional
import ru.fess38.finance.model.Session
import ru.fess38.finance.model.User
import ru.fess38.finance.security.AuthType
import ru.fess38.finance.security.TokenAuthentication
import javax.annotation.PostConstruct

object UserInfo {
  lateinit var userDao: UserDao

  fun get(): User {
    val securityContext = SecurityContextHolder.getContext()
    val tokenAuthentication = (securityContext.authentication) as TokenAuthentication
    val token = tokenAuthentication.credentials
    return userDao.find(token) ?: throw IllegalArgumentException("Invalid token: $token")
  }

  fun id() = get().id
}

interface UserDao {
  fun save(user: User): User

  fun update(user: User)

  fun saveOrUpdate(outerId: String, authType: AuthType, session: Session)

  fun find(token: String): User?
}

@Repository
@Transactional
class UserDaoImpl: UserDao {
  @Autowired
  lateinit var sessionFactory: SessionFactory

  @PostConstruct
  private fun init() {
    UserInfo.userDao = this
  }

  override fun save(user: User): User {
    val session = sessionFactory.openSession()
    session.save(user)
    session.flush()
    session.close()
    return user
  }

  override fun update(user: User) {
    val session = sessionFactory.openSession()
    session.update(user)
    session.flush()
    session.close()
  }

  override fun saveOrUpdate(outerId: String, authType: AuthType, session: Session) {
    val user = find(outerId, authType)
    if (user == null) {
      save(User(outerId = outerId, authType = authType, sessions = listOf(session)))
    } else {
      val updatedUser = user.copy(sessions = user.sessions.plus(session))
      update(updatedUser)
    }
  }

  private fun find(outerId: String, authType: AuthType): User? {
    val criteria = DetachedCriteria.forClass(User::class.java)
        .add(Restrictions.eq("outerId", outerId))
        .add(Restrictions.eq("authType", authType))
    val session = sessionFactory.openSession()
    val user = sessionFactory.list<User>(criteria, session).firstOrNull()
    session.close()
    return user
  }

  override fun find(token: String): User? {
    val criteria = DetachedCriteria.forClass(User::class.java, "user")
        .createAlias("user.sessions", "s")
        .add(Restrictions.eq("s.token", token))
        .add(Restrictions.gt("s.expired", System.currentTimeMillis()))
    val session = sessionFactory.openSession()
    val user = sessionFactory.list<User>(criteria, session).firstOrNull()
    session.close()
    return user
  }
}