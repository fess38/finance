package ru.fess38.finance

import org.hibernate.SessionFactory
import org.hibernate.criterion.DetachedCriteria
import org.hibernate.criterion.Restrictions
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Repository
import org.springframework.transaction.annotation.Transactional
import ru.fess38.finance.model.User
import ru.fess38.finance.model.UserType
import ru.fess38.finance.security.TokenAuthentication
import javax.annotation.PostConstruct

object UserInfo {
  lateinit var userDao: UserDao

  fun get(): User {
    val tokenAuthentication = (SecurityContextHolder.getContext().authentication) as
        TokenAuthentication
    val outerId = tokenAuthentication.principal
    val type = UserType.valueOf(tokenAuthentication.name)
    return userDao.saveOrUpdate(outerId, type)
  }

  fun id() = get().id
}

interface UserDao {
  fun saveOrUpdate(outerId: String, type: UserType): User
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

  override fun saveOrUpdate(outerId: String, type: UserType): User {
    return find(outerId, type) ?: save(outerId, type)
  }

  private fun find(outerId: String, type: UserType): User? {
    val criteria = DetachedCriteria.forClass(User::class.java)
        .add(Restrictions.eq("outerId", outerId))
        .add(Restrictions.eq("type", type))
    val session = sessionFactory.openSession()
    val user = sessionFactory.list<User>(criteria, session).firstOrNull()
    session.close()
    return user
  }

  private fun save(outerId: String, type: UserType): User {
    val user = User(outerId = outerId, type = type)
    val session = sessionFactory.openSession()
    session.save(user)
    session.flush()
    session.close()
    return user
  }
}
