package ru.fess38.finance.repository

import com.google.protobuf.Message
import com.googlecode.protobuf.format.JsonFormat
import org.hibernate.SessionFactory
import org.hibernate.criterion.DetachedCriteria
import org.hibernate.criterion.Projections
import org.hibernate.criterion.Property
import org.hibernate.criterion.Restrictions
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import org.springframework.transaction.annotation.Transactional
import ru.fess38.finance.IDSEQ_ALLOCATION_SIZE
import ru.fess38.finance.core.Model.*
import ru.fess38.finance.security.User
import ru.fess38.finance.utils.id
import ru.fess38.finance.utils.withId
import java.io.ByteArrayInputStream
import java.io.ByteArrayOutputStream
import java.math.BigInteger
import java.util.zip.GZIPInputStream

@Repository
@Transactional
class HibernateEntityRepositoryImpl : EntityRepository {
  @Autowired
  lateinit var sessionFactory: SessionFactory

  private val currencies = currencies()

  override fun save(message: Message, user: User) {
    val hibernateEntity = HibernateEntity.from(message, user)
    sessionFactory.currentSession.apply {save(hibernateEntity)}.apply {flush()}
  }

  override fun update(message: Message, user: User) {
    val hibernateEntity = HibernateEntity.from(message, user)
    val session = sessionFactory.currentSession
    session.apply {update(hibernateEntity)}.apply {flush()}
  }

  override fun doCreateUpdateDelete(
    toSave: List<Message>, toUpdate: List<Message>,
    toDelete: List<Message>, user: User
  ) {
    toSave.map {HibernateEntity.from(it, user)}.forEach {sessionFactory.currentSession.save(it)}
    toUpdate.map {HibernateEntity.from(it, user)}.forEach {sessionFactory.currentSession.update(it)}
    toDelete.map {HibernateEntity.from(it, user)}.forEach {sessionFactory.currentSession.delete(it)}
    sessionFactory.currentSession.flush()
  }

  override fun isExist(id: Long, type: EntityType, user: User): Boolean {
    return if (type == EntityType.CURRENCY) {
      currencies.any {it.id == id}
    } else {
      val criteria = DetachedCriteria.forClass(HibernateEntity::class.java)
        .add(Restrictions.eq("userId", user.id))
        .add(Restrictions.eq("type", type))
        .add(Restrictions.eq("id", id))
        .setProjection(Projections.rowCount())
      criteria.getExecutableCriteria(sessionFactory.currentSession).uniqueResult() as Long > 0
    }
  }

  override fun get(user: User, modifiedAfter: Long, types: List<EntityType>): List<Message> {
    val criteria = DetachedCriteria.forClass(HibernateEntity::class.java)
      .add(Restrictions.eq("userId", user.id))
    if (modifiedAfter > 0) {
      criteria.add(Restrictions.gt("modified", modifiedAfter))
    }
    if (types.isNotEmpty()) {
      criteria.add(Restrictions.`in`("type", types))
    }
    return criteria.getExecutableCriteria(sessionFactory.currentSession).list()
      .map {parse((it as HibernateEntity))}
  }

  private fun parse(hibernateEntity: HibernateEntity): Message {
    hibernateEntity.data.inputStream().use {inputStream ->
      GZIPInputStream(inputStream).use {data ->
        val buffer = ByteArrayOutputStream(Math.max(DEFAULT_BUFFER_SIZE, data.available()))
        data.copyTo(buffer)
        buffer.use {
          val bytes = buffer.toByteArray()
          return when (hibernateEntity.type) {
            EntityType.SETTINGS -> Settings.parseFrom(bytes)
            EntityType.ACCOUNT -> Account.parseFrom(bytes)
            EntityType.CATEGORY -> Category.parseFrom(bytes)
            EntityType.SUB_CATEGORY -> SubCategory.parseFrom(bytes)
            EntityType.FAMILY_MEMBER -> FamilyMember.parseFrom(bytes)
            EntityType.TRANSACTION -> Transaction.parseFrom(bytes)
            EntityType.TRANSACTION_TEMPLATE -> TransactionTemplate.parseFrom(bytes)
            // new entity
            else -> throw IllegalArgumentException("Unknown type: $hibernateEntity.type")
          }.withId(hibernateEntity.id)
        }
      }
    }
  }

  override fun count(user: User, type: EntityType): Long {
    return DetachedCriteria.forClass(HibernateEntity::class.java)
      .add(Restrictions.eq("userId", user.id))
      .add(Restrictions.eq("type", type))
      .setProjection(Projections.rowCount())
      .getExecutableCriteria(sessionFactory.currentSession)
      .uniqueResult() as Long
  }

  final override fun currencies(): List<Currency> {
    val path = "/ru/fess38/finance/core/Currency.json"
    val json = this::class.java.getResource(path).readText()
    val currenciesBuilder = Currencies.newBuilder()
    ByteArrayInputStream(json.toByteArray()).use {
      JsonFormat().merge(it, currenciesBuilder)
      return currenciesBuilder.build().itemsList
    }
  }

  override fun idHolder(amount: Int): IdHolder {
    val sql = "SELECT nextval('model.idseq')"
    val from = (sessionFactory.currentSession.createNativeQuery(sql).uniqueResult() as BigInteger).toLong()
    var to = from + IDSEQ_ALLOCATION_SIZE
    while (to - from < amount) {
      sessionFactory.currentSession.createNativeQuery(sql).uniqueResult()
      to += IDSEQ_ALLOCATION_SIZE
    }
    return IdHolder.newBuilder().setFrom(from).setTo(to - 1).build()
  }

  override fun maxId(): Long {
    val maxId = DetachedCriteria.forClass(HibernateEntity::class.java).setProjection(Projections.max("id"))
    return DetachedCriteria.forClass(HibernateEntity::class.java)
      .add(Property.forName("id").eq(maxId))
      .getExecutableCriteria(sessionFactory.currentSession)
      .list()
      .map {parse((it as HibernateEntity))}
      .firstOrNull()?.id ?: 0
  }
}
