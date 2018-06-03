package ru.fess38.finance.dao

import com.google.protobuf.Message
import org.hibernate.SessionFactory
import org.hibernate.criterion.DetachedCriteria
import org.hibernate.criterion.Projections
import org.hibernate.criterion.Restrictions
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import org.springframework.transaction.annotation.Transactional
import ru.fess38.finance.core.Model.Account
import ru.fess38.finance.core.Model.Category
import ru.fess38.finance.core.Model.EntityType
import ru.fess38.finance.core.Model.FamilyMember
import ru.fess38.finance.core.Model.SubCategory
import ru.fess38.finance.core.Model.Transaction
import ru.fess38.finance.security.User
import ru.fess38.finance.utils.setId
import java.util.zip.GZIPInputStream

@Repository
@Transactional
class HibernateEntityDaoImpl: EntityDao {
  @Autowired
  lateinit var sessionFactory: SessionFactory

  override fun save(message: Message, user: User): Message {
    val hibernateEntity = HibernateEntity.from(message, user)
    sessionFactory.openSession().apply {save(hibernateEntity)}.apply {flush()}.apply {close()}
    return message.setId(hibernateEntity.id)
  }

  override fun update(message: Message, user: User) {
    val hibernateEntity = HibernateEntity.from(message, user)
    sessionFactory.openSession().apply {update(hibernateEntity)}.apply {flush()}.apply {close()}
  }

  override fun isExist(id: Long, user: User): Boolean {
    val criteria = DetachedCriteria.forClass(HibernateEntity::class.java)
        .add(Restrictions.eq("userId", user.id))
        .add(Restrictions.eq("id", id))
        .setProjection(Projections.rowCount())
    val session = sessionFactory.openSession()
    val rowCount = criteria.getExecutableCriteria(session).uniqueResult() as Long
    session.close()
    return rowCount > 0
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
      EntityType.ACCOUNT -> Account.parseFrom(data)
      EntityType.CATEGORY -> Category.parseFrom(data)
      EntityType.SUB_CATEGORY -> SubCategory.parseFrom(data)
      EntityType.FAMILY_MEMBER -> FamilyMember.parseFrom(data)
      EntityType.TRANSACTION -> Transaction.parseFrom(data)
      else -> throw IllegalArgumentException("Unknown type: $hibernateEntity.type")
    }.setId(hibernateEntity.id)
  }
}
