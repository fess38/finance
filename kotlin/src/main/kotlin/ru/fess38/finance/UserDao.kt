package ru.fess38.finance

import org.hibernate.SessionFactory
import org.hibernate.criterion.DetachedCriteria
import org.hibernate.criterion.Restrictions
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.oauth2.provider.OAuth2Authentication
import org.springframework.stereotype.Repository
import org.springframework.transaction.annotation.Transactional
import ru.fess38.finance.model.User
import javax.annotation.PostConstruct

object UserInfo {
  lateinit var userDao: UserDao

  fun id() = userDao.saveOrUpdate(outerId()).id
  fun get() = userDao.saveOrUpdate(outerId())

  private fun info() = SecurityContextHolder.getContext().authentication as OAuth2Authentication

  private fun outerId() = (info().userAuthentication.details as Map<String, String>)["sub"]!!
}

interface UserDao {
  fun saveOrUpdate(outerId: String): User
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

  override fun saveOrUpdate(outerId: String): User {
    return find(outerId) ?: save(outerId)
  }

  private fun find(outerId: String): User? {
    val criteria = DetachedCriteria.forClass(User::class.java)
        .add(Restrictions.eq("outerId", outerId))
    return sessionFactory.list<User>(criteria).firstOrNull()
  }

  private fun save(outerId: String): User {
    val user = User(outerId = outerId)
    sessionFactory.currentSession.save(user)
    return user
  }
}
