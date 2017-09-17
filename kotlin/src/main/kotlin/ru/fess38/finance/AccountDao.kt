package ru.fess38.finance

import org.hibernate.SessionFactory
import org.hibernate.criterion.DetachedCriteria
import org.hibernate.criterion.Restrictions
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import org.springframework.transaction.annotation.Transactional
import ru.fess38.finance.model.Account

interface AccountDao {
  fun save(account: Account): Account

  fun get(id: Long): Account

  fun update(account: Account)

  fun find(criteria: DetachedCriteria = DetachedCriteria.forClass(Account::class.java)): List<Account>
}

@Repository
@Transactional
class AccountDaoImpl: AccountDao {
  @Autowired
  lateinit var sessionFactory: SessionFactory

  override fun save(account: Account): Account {
    val updatedAccount = account.copy(userId = UserInfo.id())
    sessionFactory.currentSession.save(updatedAccount)
    return updatedAccount
  }

  override fun get(id: Long) = sessionFactory.currentSession.get(Account::class.java, id)

  override fun update(account: Account) {
    sessionFactory.currentSession.update(account.copy(updated = System.currentTimeMillis()))
  }

  override fun find(criteria: DetachedCriteria): List<Account> {
    val extendedCriteria = criteria
        .add(Restrictions.eq("userId", UserInfo.get().id))
        .add(Restrictions.eq("isDeleted", false))
    return sessionFactory.list(extendedCriteria)
  }
}
