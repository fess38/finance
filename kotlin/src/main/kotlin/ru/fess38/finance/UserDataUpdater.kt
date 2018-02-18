package ru.fess38.finance

import com.google.gson.Gson
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component
import ru.fess38.finance.model.EntityType
import ru.fess38.finance.model.User
import ru.fess38.finance.model.UserData
import ru.fess38.finance.util.gzip
import java.util.concurrent.ConcurrentLinkedQueue

@Component
class UserDataUpdater {
  @Autowired
  lateinit var gson: Gson

  @Autowired
  lateinit var entityDao: EntityDao

  @Autowired
  lateinit var userDao: UserDao

  companion object {
    val queue: ConcurrentLinkedQueue<QueueObject> = ConcurrentLinkedQueue()

    fun enqueue(userId: Long, type: EntityType) {
      queue.add(QueueObject(userId, type))
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
    var userData = UserData.fromByteArray(user.data, gson)

    userData = userData.copy(currencies = entityDao.currencies())
    entitiesToUpdate.forEach {
      userData = when (it) {
        EntityType.ACCOUNT -> {
          userData.copy(accounts = entityDao.find(user.id))
        }
      }
    }
    userDao.update(user.copy(data = gzip(gson.toJson(userData))))
  }
}
