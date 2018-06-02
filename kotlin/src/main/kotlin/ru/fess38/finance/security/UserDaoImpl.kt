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
class UserDaoImpl: UserDao {
  @Autowired
  lateinit var sessionFactory: SessionFactory

  override fun getAll(): List<User> {
    val criteria = DetachedCriteria.forClass(User::class.java, "user")
    val session = sessionFactory.openSession()
    return criteria.getExecutableCriteria(session).list()
        .map {it as User}
        .distinct()
        .apply {session.close()}
  }

  override fun save(user: User): User {
    sessionFactory.openSession().apply {save(user)}.apply {flush()}.apply {close()}
    return user
  }

  override fun update(user: User) {
    sessionFactory.openSession().apply {update(user)}.apply {flush()}.apply {close()}
  }

  override fun find(token: String): User? {
    val criteria = DetachedCriteria.forClass(User::class.java, "user")
        .createAlias("user.sessions", "s")
        .add(Restrictions.eq("s.token", token))
        .add(Restrictions.gt("s.expired", System.currentTimeMillis()))
    val session = sessionFactory.openSession()
    return criteria.getExecutableCriteria(session).list()
        .map {it as User}
        .firstOrNull()
        .apply {session.close()}
  }

  override fun find(outerId: String, authType: AuthType): User? {
    val criteria = DetachedCriteria.forClass(User::class.java)
        .add(Restrictions.eq("outerId", outerId))
        .add(Restrictions.eq("authType", authType))
    val session = sessionFactory.openSession()
    return criteria.getExecutableCriteria(session).list()
        .map {it as User}
        .firstOrNull()
        .apply {session.close()}
  }
}
