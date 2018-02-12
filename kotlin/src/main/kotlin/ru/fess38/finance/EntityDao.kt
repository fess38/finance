package ru.fess38.finance

import com.google.gson.Gson
import org.hibernate.SessionFactory
import org.hibernate.criterion.DetachedCriteria
import org.hibernate.criterion.Restrictions
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import org.springframework.transaction.annotation.Transactional
import ru.fess38.finance.model.Account
import ru.fess38.finance.model.Currency
import ru.fess38.finance.model.EntityType
import ru.fess38.finance.model.FinanceEntity
import ru.fess38.finance.util.fromJson
import ru.fess38.finance.util.gzip
import ru.fess38.finance.util.list

interface EntityDao {
  fun currencies(): List<Currency>

  fun save(account: Account): Account

  fun update(account: Account)

  fun find(userId: Long?): List<Account>
}

@Repository
@Transactional
class EntityDaoImpl: EntityDao {
  @Autowired
  lateinit var sessionFactory: SessionFactory

  @Autowired
  lateinit var gson: Gson

  private var currencies: List<Currency> = listOf()

  override fun currencies(): List<Currency> {
    if (currencies.isEmpty()) {
      val path = "/ru/fess38/finance/model/Currency.json"
      currencies = gson.fromJson(this.javaClass.getResource(path).readText())
    }
    return currencies.toList()
  }

  private fun save(entity: FinanceEntity): FinanceEntity {
    val session = sessionFactory.openSession()
    session.save(entity)
    session.flush()
    session.close()
    UserDataUpdater.enqueue(UserInfo.id(), entity.type)
    return entity
  }

  private fun update(entity: FinanceEntity) {
    val session = sessionFactory.openSession()
    session.update(entity)
    session.flush()
    session.close()
    UserDataUpdater.enqueue(UserInfo.id(), entity.type)
  }

  override fun save(account: Account): Account {
    val entity = fromAccount(account)
    save(entity)
    return account.copy(id = entity.id)
  }

  override fun update(account: Account) {
    update(fromAccount(account))
  }

  override fun find(userId: Long?): List<Account> {
    val criteria = DetachedCriteria.forClass(FinanceEntity::class.java)
        .add(Restrictions.eq("userId", userId ?: UserInfo.id()))
        .add(Restrictions.eq("type", EntityType.ACCOUNT))
        .add(Restrictions.eq("isDeleted", false))
    val entities: List<FinanceEntity> = sessionFactory.list(criteria)
    return entities.map {it.toAccount(gson)}
  }

  private fun fromAccount(account: Account): FinanceEntity {
    return FinanceEntity(
        id = account.id,
        type = EntityType.ACCOUNT,
        userId = UserInfo.id(),
        modified = System.currentTimeMillis(),
        data = gzip(gson.toJson(account))
    )
  }
}
