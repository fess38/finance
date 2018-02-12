package ru.fess38.finance

import com.google.gson.Gson
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component
import ru.fess38.finance.model.EntityType
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
  }

  @Scheduled(fixedRate = 3000)
  fun update() {
    while (!queue.isEmpty()) {
      update(queue.poll())
    }
  }

  private fun update(queueObject: QueueObject) {
    val user = userDao.findById(queueObject.userId)
    var userData = UserData.fromByteArray(user.data, gson)

    userData = userData.copy(currencies = entityDao.currencies())
    userData = when (queueObject.type) {
      EntityType.ACCOUNT -> {
        userData.copy(accounts = entityDao.find(user.id))
      }
    }
    userDao.update(user.copy(data = gzip(gson.toJson(userData))))
  }
}

data class QueueObject(val userId: Long, val type: EntityType)
