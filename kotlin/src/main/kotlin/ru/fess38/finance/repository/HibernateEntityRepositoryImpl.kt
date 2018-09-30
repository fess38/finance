package ru.fess38.finance.repository

import com.google.protobuf.Message
import com.googlecode.protobuf.format.JsonFormat
import org.hibernate.SessionFactory
import org.hibernate.criterion.DetachedCriteria
import org.hibernate.criterion.Projections
import org.hibernate.criterion.Restrictions
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import org.springframework.transaction.annotation.Transactional
import ru.fess38.finance.core.Model.Account
import ru.fess38.finance.core.Model.Category
import ru.fess38.finance.core.Model.Currencies
import ru.fess38.finance.core.Model.Currency
import ru.fess38.finance.core.Model.EntityType
import ru.fess38.finance.core.Model.EntityType.CURRENCY
import ru.fess38.finance.core.Model.FamilyMember
import ru.fess38.finance.core.Model.Settings
import ru.fess38.finance.core.Model.SubCategory
import ru.fess38.finance.core.Model.Transaction
import ru.fess38.finance.security.User
import ru.fess38.finance.utils.withId
import java.io.ByteArrayInputStream
import java.util.zip.GZIPInputStream

@Repository
@Transactional
class HibernateEntityRepositoryImpl: EntityRepository {
  @Autowired
  lateinit var sessionFactory: SessionFactory

  private val currencies = currencies()

  override fun save(message: Message, user: User): Message {
    val hibernateEntity = HibernateEntity.from(message, user)
    sessionFactory.openSession().apply {save(hibernateEntity)}.apply {flush()}.apply {close()}
    return message.withId(hibernateEntity.id)
  }

  override fun update(message: Message, user: User) {
    val hibernateEntity = HibernateEntity.from(message, user)
    sessionFactory.openSession().apply {update(hibernateEntity)}.apply {flush()}.apply {close()}
  }

  override fun isExist(id: Long, type: EntityType, user: User): Boolean {
    return if (type == CURRENCY) {
      currencies.any {it.id == id}
    } else {
      val criteria = DetachedCriteria.forClass(HibernateEntity::class.java)
          .add(Restrictions.eq("userId", user.id))
          .add(Restrictions.eq("type", type))
          .add(Restrictions.eq("id", id))
          .setProjection(Projections.rowCount())
      val session = sessionFactory.openSession()
      val rowCount = criteria.getExecutableCriteria(session).uniqueResult() as Long
      session.close()
      rowCount > 0
    }
  }

  override fun get(user: User): List<Message> {
    val criteria = DetachedCriteria.forClass(HibernateEntity::class.java)
        .add(Restrictions.eq("userId", user.id))
    val session = sessionFactory.openSession()
    return criteria.getExecutableCriteria(session).list()
        .map {parse((it as HibernateEntity))}
        .apply {session.close()}
  }

  private fun parse(hibernateEntity: HibernateEntity): Message {
    val data = GZIPInputStream(hibernateEntity.data.inputStream()).readBytes()
    return when (hibernateEntity.type) {
      EntityType.SETTINGS -> Settings.parseFrom(data)
      EntityType.ACCOUNT -> Account.parseFrom(data)
      EntityType.CATEGORY -> Category.parseFrom(data)
      EntityType.SUB_CATEGORY -> SubCategory.parseFrom(data)
      EntityType.FAMILY_MEMBER -> FamilyMember.parseFrom(data)
      EntityType.TRANSACTION -> Transaction.parseFrom(data)
      else -> throw IllegalArgumentException("Unknown type: $hibernateEntity.type")
    }.withId(hibernateEntity.id)
  }

  final override fun currencies(): List<Currency> {
    val currencies: List<Currency>
    val path = "/ru/fess38/finance/core/Currency.json"
    val json = this::class.java.getResource(path).readText()
    val currenciesBuilder = Currencies.newBuilder()
    JsonFormat().merge(ByteArrayInputStream(json.toByteArray()), currenciesBuilder)
    currencies = currenciesBuilder.build().itemsList
    return currencies.toList()
  }
}
