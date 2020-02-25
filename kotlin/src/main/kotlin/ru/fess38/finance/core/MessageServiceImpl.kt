package ru.fess38.finance.core

import com.google.protobuf.Message
import mu.KotlinLogging
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import ru.fess38.finance.core.Model.Account
import ru.fess38.finance.core.Model.Category
import ru.fess38.finance.core.Model.Dump
import ru.fess38.finance.core.Model.EntityType
import ru.fess38.finance.core.Model.EntityType.ACCOUNT
import ru.fess38.finance.core.Model.EntityType.CATEGORY
import ru.fess38.finance.core.Model.EntityType.FAMILY_MEMBER
import ru.fess38.finance.core.Model.EntityType.SETTINGS
import ru.fess38.finance.core.Model.EntityType.SUB_CATEGORY
import ru.fess38.finance.core.Model.EntityType.TRANSACTION
import ru.fess38.finance.core.Model.EntityType.TRANSACTION_ARCHIVE
import ru.fess38.finance.core.Model.FamilyMember
import ru.fess38.finance.core.Model.Settings
import ru.fess38.finance.core.Model.SubCategory
import ru.fess38.finance.core.Model.Transaction
import ru.fess38.finance.core.Model.TransactionArchive
import ru.fess38.finance.repository.EntityRepository
import ru.fess38.finance.security.User
import ru.fess38.finance.security.UserService
import ru.fess38.finance.utils.id
import ru.fess38.finance.utils.type
import javax.annotation.PostConstruct

@Service
class MessageServiceImpl: MessageService {
  private val log = KotlinLogging.logger {}
  private lateinit var transactionArchiver: TransactionArchiver

  @Autowired
  lateinit var repository: EntityRepository

  @Autowired
  lateinit var userService: UserService

  @PostConstruct
  fun init() {
    transactionArchiver = TransactionArchiver(repository)
  }

  override fun save(message: Message): Message {
    val user = userService.findByContext()
    val savedMessage = repository.save(message, user)
    log.info {"Save [${savedMessage.type}] with id [${savedMessage.id}] of user [${user.id}]"}
    return savedMessage
  }

  override fun update(message: Message) {
    val user = userService.findByContext()
    repository.update(message, user)
    log.info {"Update [${message.type}] with id [${message.id}] of user [${user.id}]"}
  }

  override fun dump(modifiedAfter: Long): Dump {
    val user = userService.findByContext()
    if (repository.count(user, TRANSACTION) > 250) {
      if (repository.count(user, TRANSACTION_ARCHIVE) == 0L) {
        repository.save(TransactionArchive.newBuilder().build(), user)
      }
      transactionArchiver.archive(user)
    }
    val builder = Dump.newBuilder()
    val messages = repository.get(user, modifiedAfter, emptyList())
    val accounts = messages.filter {it.type == ACCOUNT}.map {it as Account}
    val categories = messages.filter {it.type == CATEGORY}.map {it as Category}
    val subCategories = messages.filter {it.type == SUB_CATEGORY}.map {it as SubCategory}
    val familyMembers = messages.filter {it.type == FAMILY_MEMBER}.map {it as FamilyMember}
    val transactions = transactions(messages)
    val settings = settings(messages, user)

    log.info {"Create dump for user [${user.id}]"}
    return builder
        .setSettings(settings)
        .addAllCurrencies(repository.currencies())
        .addAllAccounts(accounts)
        .addAllCategories(categories)
        .addAllSubCategories(subCategories)
        .addAllFamilyMembers(familyMembers)
        .addAllTransactions(transactions)
        .build()
  }

  internal fun transactions(messages: List<Message>): List<Transaction> {
    val transactions = messages.filter {it.type == TRANSACTION_ARCHIVE}
        .map {it as TransactionArchive}
        .flatMap {it.transactionsList}
        .map {it.id to it}
        .toMap()
        .toMutableMap()
    messages.filter {it.type == TRANSACTION}
        .map {it as Transaction}
        .forEach {transactions[it.id] = it}
    return transactions.values.toList()
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
      settings = save(Settings.getDefaultInstance()) as Settings
    }
    return settings
  }

  override fun isExist(id: Long, type: EntityType): Boolean {
    val user = userService.findByContext()
    var isExist: Boolean = repository.isExist(id, type, user)
    if (!isExist && type == TRANSACTION) {
      val transactionArchive = repository.get(user, 0, listOf(TRANSACTION_ARCHIVE))
          .map {it as TransactionArchive}
          .getOrNull(0)
      isExist = isExistInTransactionArchive(id, transactionArchive)
    }
    return isExist
  }

  internal fun isExistInTransactionArchive(id: Long, transactionArchive: TransactionArchive?)
      : Boolean {
    var isExist = false
    if (transactionArchive != null) {
      for (transaction in transactionArchive.transactionsList) {
        if (transaction.id == id) {
          isExist = true
          break
        }
      }
    }
    return isExist
  }
}
