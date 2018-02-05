package ru.fess38.finance

import org.hibernate.SessionFactory
import org.hibernate.criterion.DetachedCriteria
import org.hibernate.criterion.Restrictions
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import org.springframework.transaction.annotation.Transactional
import ru.fess38.finance.model.Account
import ru.fess38.finance.util.list

interface AccountDao {
  fun save(account: Account): Account

  fun update(account: Account)

  fun find(userId: Long?): List<Account>
}

@Repository
@Transactional
class AccountDaoImpl: AccountDao {
  @Autowired
  lateinit var sessionFactory: SessionFactory

  override fun save(account: Account): Account {
    val updatedAccount = account.copy(userId = UserInfo.id(), modified = System.currentTimeMillis())
    sessionFactory.currentSession.save(updatedAccount)
    UserDataUpdater.enqueue(UserInfo.id(), Entity.ACCOUNT)
    return updatedAccount
  }

  override fun update(account: Account) {
    sessionFactory.currentSession.update(account.copy(modified = System.currentTimeMillis()))
    UserDataUpdater.enqueue(UserInfo.id(), Entity.ACCOUNT)
  }

  override fun find(userId: Long?): List<Account> {
    val criteria = DetachedCriteria.forClass(Account::class.java)
        .add(Restrictions.eq("userId", userId ?: UserInfo.id()))
        .add(Restrictions.eq("isDeleted", false))
    return sessionFactory.list(criteria)
  }
}
