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
import ru.fess38.finance.core.Model.FamilyMember
import ru.fess38.finance.core.Model.Settings
import ru.fess38.finance.core.Model.SubCategory
import ru.fess38.finance.core.Model.Transaction
import ru.fess38.finance.repository.EntityRepository
import ru.fess38.finance.security.UserService
import ru.fess38.finance.utils.id
import ru.fess38.finance.utils.type

@Service
class MessageServiceImpl: MessageService {
  private val log = KotlinLogging.logger {}

  @Autowired
  lateinit var repository: EntityRepository

  @Autowired
  lateinit var userService: UserService

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
    val builder = Dump.newBuilder()
    val messages = repository.get(user, modifiedAfter)
    val accounts = messages.filter {it.type == ACCOUNT}.map {it as Account}
    val categories = messages.filter {it.type == CATEGORY}.map {it as Category}
    val subCategories = messages.filter {it.type == SUB_CATEGORY}.map {it as SubCategory}
    val familyMembers = messages.filter {it.type == FAMILY_MEMBER}.map {it as FamilyMember}
    val transactions = messages.filter {it.type == TRANSACTION}.map {it as Transaction}

    log.info {"Create dump for user [${user.id}]"}
    return builder
        .setSettings(settings(messages))
        .addAllCurrencies(repository.currencies())
        .addAllAccounts(accounts)
        .addAllCategories(categories)
        .addAllSubCategories(subCategories)
        .addAllFamilyMembers(familyMembers)
        .addAllTransactions(transactions)
        .build()
  }

  private fun settings(messages: List<Message>): Settings {
    return messages.asSequence()
        .filter {it.type == SETTINGS}
        .map {it as Settings}
        .toList()
        .getOrElse(0) { save(Settings.getDefaultInstance()) as Settings }
  }

  override fun isExist(id: Long, type: EntityType): Boolean {
    return repository.isExist(id, type, userService.findByContext())
  }
}
