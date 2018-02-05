package ru.fess38.finance

import com.google.gson.Gson
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component
import ru.fess38.finance.model.UserData
import ru.fess38.finance.util.gzip
import java.util.concurrent.ConcurrentLinkedQueue


@Component
class UserDataUpdater {
  @Autowired
  lateinit var gson: Gson

  @Autowired
  lateinit var accountDao: AccountDao

  @Autowired
  lateinit var currencyDao: CurrencyDao

  @Autowired
  lateinit var userDao: UserDao

  companion object {
    val queue: ConcurrentLinkedQueue<QueueObject> = ConcurrentLinkedQueue()

    fun enqueue(userId: Long, entity: Entity) {
      queue.add(QueueObject(userId, entity))
    }
  }

  @Scheduled(fixedRate = 5000)
  fun update() {
    while (!queue.isEmpty()) {
      update(queue.poll())
    }
  }

  private fun update(queueObject: QueueObject) {
    val currencies = currencyDao.find()
    val user = userDao.findById(queueObject.userId)
    var userData = UserData.fromByteArray(user.data, gson)

    userData = when (queueObject.entity) {
      Entity.ACCOUNT -> {
        val accounts = accountDao.find(user.id)
        userData.copy(accounts = accounts.map {it.toSimpleAccount(currencies)})
      }
      Entity.CURRENCY -> {
        userData.copy(currencies = currencies.map {it.toSimpleCurrency()})
      }
    }
    userDao.update(user.copy(data = gzip(gson.toJson(userData))))
  }
}

data class QueueObject(
    val userId: Long,
    val entity: Entity
)

enum class Entity {
  ACCOUNT,
  CURRENCY
}


