package ru.fess38.finance.core

import org.hibernate.SessionFactory
import org.hibernate.criterion.DetachedCriteria
import org.hibernate.criterion.Restrictions
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import org.springframework.transaction.annotation.Transactional
import ru.fess38.finance.model.FinanceEntity
import ru.fess38.finance.model.Model.EntityType
import ru.fess38.finance.model.User

interface FinanceEntityDao {
  fun save(financeEntity: FinanceEntity, user: User): FinanceEntity

  fun update(financeEntity: FinanceEntity, user: User)

  fun find(ids: List<Long> = listOf(), entityType: EntityType?, user: User): List<FinanceEntity>
}

@Repository
@Transactional
class FinanceEntityDaoImpl: FinanceEntityDao {
  @Autowired
  lateinit var sessionFactory: SessionFactory

  override fun save(financeEntity: FinanceEntity, user: User): FinanceEntity {
    sessionFactory.openSession().apply {save(financeEntity)}.apply {flush()}.apply {close()}
    return financeEntity
  }

  override fun update(financeEntity: FinanceEntity, user: User) {
    sessionFactory.openSession().apply {update(financeEntity)}.apply {flush()}.apply {close()}
  }

  override fun find(ids: List<Long>, entityType: EntityType?, user: User): List<FinanceEntity> {
    val criteria = DetachedCriteria.forClass(FinanceEntity::class.java)
        .add(Restrictions.eq("userId", user.id))
    ids.takeIf {ids.isNotEmpty()}?.let {criteria.add(Restrictions.`in`("id", ids))}
    entityType?.let {criteria.add(Restrictions.eq("type", entityType))}
    val session = sessionFactory.openSession()
    return criteria.getExecutableCriteria(session).list()
        .map {it as FinanceEntity}
        .apply {session.close()}
  }
}
