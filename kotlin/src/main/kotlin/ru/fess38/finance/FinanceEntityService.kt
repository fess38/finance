package ru.fess38.finance

import com.google.protobuf.Message
import mu.KotlinLogging
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Service
import ru.fess38.finance.model.FinanceEntity
import ru.fess38.finance.model.Model.Account
import ru.fess38.finance.model.Model.Category
import ru.fess38.finance.model.Model.Dump
import ru.fess38.finance.model.Model.EntityType
import ru.fess38.finance.model.Model.EntityType.DUMP
import ru.fess38.finance.model.Model.FamilyMember
import ru.fess38.finance.model.Model.SubCategory
import ru.fess38.finance.model.Model.Transaction
import ru.fess38.finance.model.User
import ru.fess38.finance.security.UserService
import java.util.concurrent.ConcurrentLinkedQueue

interface FinanceEntityService {
  fun save(value: Message): Message

  fun update(value: Message)

  fun dump(): Dump

  fun isExist(id: Long): Boolean

  fun updateDump(user: User, entitiesToUpdate: List<EntityType>)
}

@Service
class FinanceEntityServiceImpl: FinanceEntityService {
  private val log = KotlinLogging.logger {}
  private val queue: ConcurrentLinkedQueue<QueueObject> = ConcurrentLinkedQueue()

  @Autowired
  lateinit var entityDao: FinanceEntityDao

  @Autowired
  lateinit var userService: UserService

  private fun enqueue(user: User, types: List<EntityType>) {
    types.filter {it != DUMP}.takeIf {it.isNotEmpty()}?.let {queue.add(QueueObject(user, it))}
  }

  data class QueueObject(val user: User, val types: List<EntityType>)

  @Scheduled(initialDelay = 10000, fixedDelay = Long.MAX_VALUE)
  fun initialUpdate() {
    userService.getAll().forEach {
      log.info {"Initial update of user ${it.id}"}
      enqueue(it, EntityType.values().asList())
    }
  }

  @Scheduled(fixedRate = 1000)
  fun update() {
    while (!queue.isEmpty()) {
      val queueObject = queue.poll()
      updateDump(queueObject.user, queueObject.types)
    }
  }

  private fun save(value: Message, user: User): Message {
    val financeEntity = FinanceEntity.from(value, user.id)
    entityDao.save(financeEntity, user)
    enqueue(user, listOf(financeEntity.type))
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

  override fun save(value: Message) = save(value, userService.findByContext())

  private fun update(value: Message, user: User) {
    val financeEntity = FinanceEntity.from(value, user.id)
    entityDao.update(financeEntity, user)
    enqueue(user, listOf(financeEntity.type))
  }

  override fun update(value: Message) = update(value, userService.findByContext())

  override fun dump() = dump(userService.findByContext())

  private fun dump(user: User): Dump {
    val dump = entityDao.find(listOf(), EntityType.DUMP, user).firstOrNull()?.toMessage() as Dump?
    return dump ?: Dump.newBuilder().build()
  }

  override fun isExist(id: Long): Boolean {
    val user = userService.findByContext()
    return entityDao.find(listOf(id), null, user).map {it.toMessage()}.firstOrNull() != null
  }

  override fun updateDump(user: User, entitiesToUpdate: List<EntityType>) {
    log.info {"Update user ${user.id}, entities: $entitiesToUpdate"}
    val dumpBuilder = dump(user).toBuilder()
    dumpBuilder.clearCurrencies().addAllCurrencies(AppConfiguration.CURRENCIES)
    entitiesToUpdate.forEach {
      when (it) {
        EntityType.ACCOUNT -> {
          dumpBuilder.clearAccounts().addAllAccounts(accounts(user))
        }
        EntityType.CATEGORY -> {
          dumpBuilder.clearCategories().addAllCategories(categories(user))
        }
        EntityType.SUB_CATEGORY -> {
          dumpBuilder.clearSubCategories().addAllSubCategories(subCategories(user))
        }
        EntityType.FAMILY_MEMBER -> {
          dumpBuilder.clearFamilyMembers().addAllFamilyMembers(familyMembers(user))
        }
        EntityType.TRANSACTION -> {
          dumpBuilder.clearTransactions().addAllTransactions(transactions(user))
        }
        else -> log.info {"Try of $it update for user ${user.id}, do nothing"}
      }
    }
    val dump = dumpBuilder.build()
    dump.takeIf {it.id == 0L}?.let {save(it, user)}
    dump.takeUnless {it.id == 0L}?.let {update(it, user)}
  }

  private fun accounts(user: User): List<Account> {
    return entityDao.find(listOf(), EntityType.ACCOUNT, user).map {it.toMessage() as Account}
  }

  private fun categories(user: User): List<Category> {
    return entityDao.find(listOf(), EntityType.CATEGORY, user).map {it.toMessage() as Category}
  }

  private fun subCategories(user: User): List<SubCategory> {
    return entityDao.find(listOf(), EntityType.SUB_CATEGORY, user).map {
      it.toMessage() as SubCategory
    }
  }

  private fun familyMembers(user: User): List<FamilyMember> {
    return entityDao.find(listOf(), EntityType.FAMILY_MEMBER, user).map {
      it.toMessage() as FamilyMember
    }
  }

  private fun transactions(user: User): List<Transaction> {
    return entityDao.find(listOf(), EntityType.TRANSACTION, user).map {
      it.toMessage() as Transaction
    }
  }
}
