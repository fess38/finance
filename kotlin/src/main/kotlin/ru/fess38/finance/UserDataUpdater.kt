package ru.fess38.finance

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component
import ru.fess38.finance.model.EntityType
import ru.fess38.finance.model.User
import java.util.concurrent.ConcurrentHashMap
import java.util.concurrent.ConcurrentLinkedQueue

@Component
class UserDataUpdater {
  @Autowired
  lateinit var entityDao: EntityDao

  @Autowired
  lateinit var userDao: UserDao

  companion object {
    val queue: ConcurrentLinkedQueue<QueueObject> = ConcurrentLinkedQueue()
    val dataVersion: ConcurrentHashMap<Long, Long> = ConcurrentHashMap() // user_id -> timestamp

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
      update(it, EntityType.values().asList())
    }
  }

  @Scheduled(fixedDelay = 3000)
  fun update() {
    while (!queue.isEmpty()) {
      update(queue.poll())
    }
  }

  private fun update(queueObject: QueueObject) {
    val user = userDao.findById(queueObject.userId)
    update(user, listOf(queueObject.type))
  }

  private fun update(user: User, entitiesToUpdate: List<EntityType>) {
    val dumpBuilder = entityDao.dump(user.id).toBuilder()
    dumpBuilder.clearCurrencies().addAllCurrencies(entityDao.currencies())

    entitiesToUpdate.forEach {
      when (it) {
        EntityType.ACCOUNT -> {
          dumpBuilder.clearAccounts().addAllAccounts(entityDao.accounts(user.id))
        }
      }
    }
    val dump = dumpBuilder.build()
    dump.takeIf {it.id == 0L}?.also {entityDao.save(it, user.id)}
    dump.takeUnless {it.id == 0L}?.also {entityDao.update(it, user.id)}
    dataVersion.put(user.id, System.currentTimeMillis())
  }
}
