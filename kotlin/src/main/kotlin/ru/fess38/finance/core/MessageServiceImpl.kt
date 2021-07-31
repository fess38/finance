package ru.fess38.finance.core

import com.google.common.cache.CacheBuilder
import com.google.common.cache.CacheLoader
import com.google.common.cache.LoadingCache
import com.google.protobuf.Message
import mu.KotlinLogging
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import ru.fess38.finance.core.Model.*
import ru.fess38.finance.core.Model.EntityType.*
import ru.fess38.finance.repository.EntityRepository
import ru.fess38.finance.security.User
import ru.fess38.finance.security.UserService
import ru.fess38.finance.utils.id
import ru.fess38.finance.utils.isDeleted
import ru.fess38.finance.utils.type
import java.util.concurrent.TimeUnit
import javax.annotation.PostConstruct

@Service
class MessageServiceImpl: MessageService {
  private val log = KotlinLogging.logger {}

  @Autowired
  lateinit var repository: EntityRepository

  @Autowired
  lateinit var userService: UserService

  private lateinit var idCache: LoadingCache<CacheKey, Boolean>

  private var maxId: Long = 0

  @PostConstruct
  fun init() {
    idCache = createCache()
    maxId = repository.maxId()
  }

  override fun save(message: Message) {
    save(listOf(message))
  }

  override fun save(messages: List<Message>) {
    val user = userService.findByContext()
    repository.doCreateUpdateDelete(messages, emptyList(), emptyList(), user)
    for (message in messages) {
      idCache.invalidate(CacheKey(message.id, message.type, user))
      if (message.id > maxId) {
        maxId = message.id
      }
    }
    log.info {"Save [${messages.size}] entities for user [${user.id}]"}
    if (messages.size <= 10) {
      for (message in messages) {
        log.info {"Save [${message.type}] with id [${message.id}] for user [${user.id}]"}
      }
    }
  }

  override fun update(message: Message) {
    val user = userService.findByContext()
    repository.update(message, user)
    idCache.invalidate(CacheKey(message.id, message.type, user))
    log.info {"Update [${message.type}] with id [${message.id}] for user [${user.id}]"}
  }

  override fun dataStorage(modifiedAfter: Long): DataStorage {
    val user = userService.findByContext()
    val builder = DataStorage.newBuilder()
    val messages = repository.get(user, modifiedAfter, emptyList())
    val settings = settings(messages, user)
    val accounts = messages.filter {it.type == ACCOUNT && !it.isDeleted}.map {it as Account}
    val categories = messages.filter {it.type == CATEGORY && !it.isDeleted}.map {it as Category}
    val subCategories = messages.filter {it.type == SUB_CATEGORY && !it.isDeleted}.map {it as SubCategory}
    val familyMembers = messages.filter {it.type == FAMILY_MEMBER && !it.isDeleted}.map {it as FamilyMember}
    val transactions = messages.filter {it.type == TRANSACTION && !it.isDeleted}.map {it as Transaction}
    val transactionTemplates = messages
        .filter {it.type == TRANSACTION_TEMPLATE && !it.isDeleted}
        .map {it as TransactionTemplate}

    // new entity

    log.info {"Create data storage for user [${user.id}]"}
    return builder
        .setSettings(settings)
        .addAllCurrencies(repository.currencies())
        .addAllAccounts(accounts)
        .addAllCategories(categories)
        .addAllSubCategories(subCategories)
        .addAllFamilyMembers(familyMembers)
        .addAllTransactions(transactions)
        .addAllTransactionTemplates(transactionTemplates)
        .build()
  }

  private fun settings(messages: List<Message>, user: User): Settings {
    var settings: Settings? = messages
        .filter {it.type == SETTINGS}
        .map {it as Settings}
        .getOrNull(0)
    if (settings == null) {
      settings = repository.get(user, 0, listOf(SETTINGS)).map {it as Settings}.getOrNull(0)
    }
    if (settings == null) {
      settings = Settings.getDefaultInstance().toBuilder().setId(repository.idHolder().from).build()
      repository.save(settings!!, user)
    }
    return settings
  }

  override fun delete(messages: List<Message>) {
    val user = userService.findByContext()
    repository.doCreateUpdateDelete(emptyList(), emptyList(), messages, user)
    for (message in messages) {
      idCache.invalidate(CacheKey(message.id, message.type, user))
    }
    log.info {"Delete [${messages.size}] entities for user [${user.id}]"}
  }

  override fun delete() {
    val user = userService.findByContext()
    val messages = repository.get(user, 0, emptyList())
    delete(messages)
  }

  override fun isExist(id: Long, type: EntityType): Boolean {
    val user = userService.findByContext()
    val isExist: Boolean
    if (id > maxId) {
      isExist = false
    } else if (type != TRANSACTION) {
      isExist = idCache.get(CacheKey(id, type, user))
    } else {
      isExist = repository.isExist(id, type, user)
    }
    log.info {"Check existence of [$type] with id [$id]"}
    return isExist
  }

  override fun idHolder(amount: Int): IdHolder {
    val idHolder = repository.idHolder(amount)
    log.info {"Get ids from [${idHolder.from}] to [${idHolder.to}]"}
    return idHolder
  }

  private fun createCache(): LoadingCache<CacheKey, Boolean> {
    return CacheBuilder.newBuilder()
      .maximumSize(100)
      .expireAfterWrite(1, TimeUnit.HOURS)
      .build(
        object: CacheLoader<CacheKey, Boolean>() {
          override fun load(key: CacheKey): Boolean {
            return repository.isExist(key.id, key.type, key.user)
          }
        }
      )
  }
}

data class CacheKey(
  val id: Long,
  val type: EntityType,
  val user: User
)
