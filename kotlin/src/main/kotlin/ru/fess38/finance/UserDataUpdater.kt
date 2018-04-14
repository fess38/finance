package ru.fess38.finance

import mu.KotlinLogging
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component
import ru.fess38.finance.model.Model.EntityType
import ru.fess38.finance.model.User
import java.util.concurrent.ConcurrentLinkedQueue

@Component
class UserDataUpdater {
  private val log = KotlinLogging.logger {}

  @Autowired
  lateinit var entityDao: EntityDao

  @Autowired
  lateinit var userDao: UserDao

  companion object {
    val queue: ConcurrentLinkedQueue<QueueObject> = ConcurrentLinkedQueue()

    fun enqueue(userId: Long, type: EntityType) {
      if (type != EntityType.DUMP) {
        queue.add(QueueObject(userId, type))
      }
    }

    data class QueueObject(val userId: Long, val type: EntityType)
  }

  @Scheduled(initialDelay = 10000, fixedDelay = Long.MAX_VALUE)
  fun initialUpdate() {
    userDao.getAll().forEach {
      log.info {"Initial update of user ${it.id}"}
      update(it, EntityType.values().asList())
    }
  }

  @Scheduled(fixedRate = 3000)
  fun update() {
    while (!queue.isEmpty()) {
      val queueObject = queue.poll()
      update(userDao.findById(queueObject.userId), listOf(queueObject.type))
    }
  }

  private fun update(user: User, entitiesToUpdate: List<EntityType>) {
    log.info {"Update user ${user.id}, entities: $entitiesToUpdate"}
    val dumpBuilder = entityDao.dump(user.id).toBuilder()
    dumpBuilder.clearCurrencies().addAllCurrencies(entityDao.currencies())
    entitiesToUpdate.forEach {
      when (it) {
        EntityType.ACCOUNT -> {
          dumpBuilder.clearAccounts().addAllAccounts(entityDao.accounts(user.id))
        }
        EntityType.CATEGORY -> {
          dumpBuilder.clearCategories().addAllCategories(entityDao.categories(user.id))
        }
        EntityType.SUB_CATEGORY -> {
          dumpBuilder.clearSubCategories().addAllSubCategories(entityDao.subCategories(user.id))
        }
        EntityType.FAMILY_MEMBER -> {
          dumpBuilder.clearFamilyMembers().addAllFamilyMembers(entityDao.familyMembers(user.id))
        }
        EntityType.TRANSACTION -> {
          dumpBuilder.clearTransactions().addAllTransactions(entityDao.transactions(user.id))
        }
      }
    }
    val dump = dumpBuilder.build()
    dump.takeIf {it.id == 0L}?.also {entityDao.save(it, user.id)}
    dump.takeUnless {it.id == 0L}?.also {entityDao.update(it, user.id)}
  }
}
