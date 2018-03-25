package ru.fess38.finance

import com.google.protobuf.Message
import org.hibernate.SessionFactory
import org.hibernate.criterion.DetachedCriteria
import org.hibernate.criterion.Restrictions
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import org.springframework.transaction.annotation.Transactional
import ru.fess38.finance.model.FinanceEntity
import ru.fess38.finance.model.Model.Account
import ru.fess38.finance.model.Model.Category
import ru.fess38.finance.model.Model.Currency
import ru.fess38.finance.model.Model.Dump
import ru.fess38.finance.model.Model.EntityType
import ru.fess38.finance.model.Model.FamilyMember
import ru.fess38.finance.model.Model.SubCategory
import ru.fess38.finance.model.Model.Transaction
import ru.fess38.finance.util.list

interface EntityDao {
  fun save(value: Message, userId: Long? = null): Message

  fun update(value: Message, userId: Long? = null)

  fun delete(value: Message, userId: Long? = null)

  fun findById(userId: Long? = null, id: Long): Message?

  fun dump(userId: Long? = null): Dump

  fun currencies(): List<Currency>

  fun accounts(userId: Long? = null): List<Account>

  fun categories(userId: Long? = null): List<Category>

  fun subCategories(userId: Long? = null): List<SubCategory>

  fun familyMembers(userId: Long? = null): List<FamilyMember>

  fun transactions(userId: Long? = null): List<Transaction>
}

@Repository
@Transactional
class EntityDaoImpl: EntityDao {
  @Autowired
  lateinit var sessionFactory: SessionFactory

  override fun save(value: Message, userId: Long?): Message {
    val financeEntity = FinanceEntity.from(value, UserInfo.resolve(userId))
    save(financeEntity)
    return when (value) {
      is Dump -> value.toBuilder().setId(financeEntity.id).build()
      is Account -> value.toBuilder().setId(financeEntity.id).build()
      is Category -> value.toBuilder().setId(financeEntity.id).build()
      is SubCategory -> value.toBuilder().setId(financeEntity.id).build()
      is FamilyMember -> value.toBuilder().setId(financeEntity.id).build()
      is Transaction -> value.toBuilder().setId(financeEntity.id).build()
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

  override fun findById(userId: Long?, id: Long): Message? {
    return find(userId, null, listOf(id)).map {it.toMessage()}.firstOrNull()
  }

  override fun dump(userId: Long?): Dump {
    val dump = find(userId, EntityType.DUMP).firstOrNull()?.toMessage() as Dump?
    return dump ?: Dump.newBuilder().build()
  }

  override fun currencies(): List<Currency> = AppConfiguration.CURRENCIES

  override fun accounts(userId: Long?): List<Account> {
    return find(userId, EntityType.ACCOUNT).map {it.toMessage() as Account}
  }

  override fun categories(userId: Long?): List<Category> {
    return find(userId, EntityType.CATEGORY).map {it.toMessage() as Category}
  }

  override fun subCategories(userId: Long?): List<SubCategory> {
    return find(userId, EntityType.SUB_CATEGORY).map {it.toMessage() as SubCategory}
  }

  override fun familyMembers(userId: Long?): List<FamilyMember> {
    return find(userId, EntityType.FAMILY_MEMBER).map {it.toMessage() as FamilyMember}
  }

  override fun transactions(userId: Long?): List<Transaction> {
    return find(userId, EntityType.TRANSACTION).map {it.toMessage() as Transaction}
  }

  private fun find(userId: Long?, entityType: EntityType? = null, ids: List<Long> = listOf()):
      List<FinanceEntity> {
    val criteria = DetachedCriteria.forClass(FinanceEntity::class.java)
        .add(Restrictions.eq("userId", UserInfo.resolve(userId)))
        .add(Restrictions.eq("isDeleted", false))
    if (!ids.isEmpty()) {
      criteria.add(Restrictions.`in`("id", ids))
    }
    if (entityType != null) {
      criteria.add(Restrictions.eq("type", entityType))
    }
    return sessionFactory.list(criteria)
  }
}
