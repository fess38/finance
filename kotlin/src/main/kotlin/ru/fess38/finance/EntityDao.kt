package ru.fess38.finance

import com.google.protobuf.Message
import org.hibernate.SessionFactory
import org.hibernate.criterion.DetachedCriteria
import org.hibernate.criterion.Restrictions
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import org.springframework.transaction.annotation.Transactional
import ru.fess38.finance.model.EntityType
import ru.fess38.finance.model.FinanceEntity
import ru.fess38.finance.model.Model.Account
import ru.fess38.finance.model.Model.Currency
import ru.fess38.finance.model.Model.Dump
import ru.fess38.finance.util.list

interface EntityDao {
  fun save(value: Message, userId: Long? = null): Message

  fun update(value: Message, userId: Long? = null)

  fun delete(value: Message, userId: Long? = null)

  fun currencies(): List<Currency>

  fun account(userId: Long? = null, id: Long): Account?

  fun accounts(userId: Long? = null): List<Account>

  fun dump(userId: Long? = null): Dump
}

@Repository
@Transactional
class EntityDaoImpl: EntityDao {
  @Autowired
  lateinit var sessionFactory: SessionFactory
  private var currencies: List<Currency> = listOf()

  override fun save(value: Message, userId: Long?): Message {
    val financeEntity = FinanceEntity.from(value, UserInfo.resolve(userId))
    save(financeEntity)
    return when (value) {
      is Dump -> value.toBuilder().setId(financeEntity.id).build()
      is Account -> value.toBuilder().setId(financeEntity.id).build()
      else -> throw IllegalArgumentException("Unknown entity: $value")
    }
  }

  private fun save(financeEntity: FinanceEntity): FinanceEntity {
    sessionFactory.openSession().apply {save(financeEntity)}.apply {flush()}.apply {close()}
    UserDataUpdater.enqueue(financeEntity.userId, financeEntity.type)
    return financeEntity
  }

  override fun update(value: Message, userId: Long?) {
    update(FinanceEntity.from(value, UserInfo.resolve(userId)))
  }

  override fun delete(value: Message, userId: Long?) {
    update(FinanceEntity.from(value, UserInfo.resolve(userId)).copy(isDeleted = true))
  }

  private fun update(financeEntity: FinanceEntity) {
    sessionFactory.openSession().apply {update(financeEntity)}.apply {flush()}.apply {close()}
    UserDataUpdater.enqueue(financeEntity.userId, financeEntity.type)
  }

  override fun currencies(): List<Currency> = AppConfiguration.CURRENCIES

  override fun account(userId: Long?, id: Long): Account? {
    return find(userId, EntityType.ACCOUNT, listOf(id)).map {it.toAccount()}.firstOrNull()
  }

  override fun accounts(userId: Long?): List<Account> {
    return find(userId, EntityType.ACCOUNT).map {it.toAccount()}
  }

  override fun dump(userId: Long?): Dump {
    return find(userId, EntityType.DUMP).firstOrNull()?.toDump() ?: Dump.newBuilder().build()
  }

  private fun find(userId: Long?, entityType: EntityType, ids: List<Long> = listOf()):
      List<FinanceEntity> {
    val criteria = DetachedCriteria.forClass(FinanceEntity::class.java)
        .add(Restrictions.eq("userId", UserInfo.resolve(userId)))
        .add(Restrictions.eq("type", entityType))
        .add(Restrictions.eq("isDeleted", false))
    if (!ids.isEmpty()) {
      criteria.add(Restrictions.`in`("id", ids))
    }
    return sessionFactory.list(criteria)
  }
}
