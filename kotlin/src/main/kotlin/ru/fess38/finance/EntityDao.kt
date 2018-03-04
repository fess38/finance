package ru.fess38.finance

import com.google.protobuf.Message
import com.googlecode.protobuf.format.JsonFormat
import org.hibernate.SessionFactory
import org.hibernate.criterion.DetachedCriteria
import org.hibernate.criterion.Restrictions
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import org.springframework.transaction.annotation.Transactional
import ru.fess38.finance.model.EntityType
import ru.fess38.finance.model.FinanceEntity
import ru.fess38.finance.model.Model
import ru.fess38.finance.util.list
import java.io.ByteArrayInputStream

interface EntityDao {
  fun save(value: Message, userId: Long? = null): Message

  fun update(value: Message, userId: Long? = null)

  fun delete(value: Message, userId: Long? = null)

  fun currencies(): List<Model.Currency>

  fun accounts(userId: Long?): List<Model.Account>

  fun dump(userId: Long?): Model.Dump
}

@Repository
@Transactional
class EntityDaoImpl: EntityDao {
  @Autowired
  lateinit var sessionFactory: SessionFactory
  private var currencies: List<Model.Currency> = listOf()

  override fun save(value: Message, userId: Long?): Message {
    val financeEntity = FinanceEntity.from(value, UserInfo.resolve(userId))
    save(financeEntity)
    return when (value) {
      is Model.Dump -> value.toBuilder().setId(financeEntity.id).build()
      is Model.Account -> value.toBuilder().setId(financeEntity.id).build()
      else -> throw IllegalArgumentException("Unknown entity: $value")
    }
  }

  private fun save(financeEntity: FinanceEntity): FinanceEntity {
    val session = sessionFactory.openSession()
    session.save(financeEntity)
    session.flush()
    session.close()
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
    val session = sessionFactory.openSession()
    session.update(financeEntity)
    session.flush()
    session.close()
    UserDataUpdater.enqueue(financeEntity.userId, financeEntity.type)
  }

  override fun currencies(): List<Model.Currency> {
    if (currencies.isEmpty()) {
      val path = "/ru/fess38/finance/model/Currency.json"
      val json = this.javaClass.getResource(path).readText()
      val currenciesBuilder = Model.Currencies.newBuilder()
      JsonFormat().merge(ByteArrayInputStream(json.toByteArray()), currenciesBuilder)
      currencies = currenciesBuilder.build().itemsList
    }
    return currencies.toList()
  }

  override fun accounts(userId: Long?): List<Model.Account> {
    return find(userId, EntityType.ACCOUNT).map {it.toAccount()}
  }

  override fun dump(userId: Long?): Model.Dump {
    return find(userId, EntityType.DUMP).firstOrNull()?.toDump() ?: Model.Dump.newBuilder().build()
  }

  private fun find(userId: Long?, entityType: EntityType): List<FinanceEntity> {
    val criteria = DetachedCriteria.forClass(FinanceEntity::class.java)
        .add(Restrictions.eq("userId", UserInfo.resolve(userId)))
        .add(Restrictions.eq("type", entityType))
        .add(Restrictions.eq("isDeleted", false))
    return sessionFactory.list(criteria)
  }
}
