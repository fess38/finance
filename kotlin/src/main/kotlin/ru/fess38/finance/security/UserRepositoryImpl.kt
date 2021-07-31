package ru.fess38.finance.security

import org.hibernate.SessionFactory
import org.hibernate.criterion.DetachedCriteria
import org.hibernate.criterion.Restrictions
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import org.springframework.transaction.annotation.Transactional
import ru.fess38.finance.core.Model.RefreshToken.AuthType

@Repository
@Transactional
class UserRepositoryImpl : UserRepository {
  @Autowired
  lateinit var sessionFactory: SessionFactory

  override fun save(user: User) {
    sessionFactory.currentSession.apply {save(user)}.apply {flush()}
  }

  override fun update(user: User) {
    sessionFactory.currentSession.apply {update(user)}.apply {flush()}
  }

  override fun find(token: String): User? {
    val criteria = DetachedCriteria.forClass(User::class.java, "user")
      .createAlias("user.sessions", "s")
      .add(Restrictions.eq("s.token", token))
      .add(Restrictions.gt("s.expired", System.currentTimeMillis()))
    return criteria.getExecutableCriteria(sessionFactory.currentSession).list()
      .map {it as User}
      .firstOrNull()
  }

  override fun find(outerId: String, authType: AuthType): User? {
    val criteria = DetachedCriteria.forClass(User::class.java)
      .add(Restrictions.eq("outerId", outerId))
      .add(Restrictions.eq("authType", authType))
    return criteria.getExecutableCriteria(sessionFactory.currentSession).list()
      .map {it as User}
      .firstOrNull()
  }
}
