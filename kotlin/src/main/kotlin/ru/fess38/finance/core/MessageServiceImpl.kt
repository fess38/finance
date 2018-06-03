package ru.fess38.finance.core

import com.google.protobuf.Message
import mu.KotlinLogging
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import ru.fess38.finance.AppConfiguration
import ru.fess38.finance.core.Model.Account
import ru.fess38.finance.core.Model.Category
import ru.fess38.finance.core.Model.Dump
import ru.fess38.finance.core.Model.EntityType.ACCOUNT
import ru.fess38.finance.core.Model.EntityType.CATEGORY
import ru.fess38.finance.core.Model.EntityType.FAMILY_MEMBER
import ru.fess38.finance.core.Model.EntityType.SUB_CATEGORY
import ru.fess38.finance.core.Model.EntityType.TRANSACTION
import ru.fess38.finance.core.Model.FamilyMember
import ru.fess38.finance.core.Model.SubCategory
import ru.fess38.finance.core.Model.Transaction
import ru.fess38.finance.dao.EntityDao
import ru.fess38.finance.security.UserService
import ru.fess38.finance.utils.id
import ru.fess38.finance.utils.type

@Service
class MessageServiceImpl: MessageService {
  private val log = KotlinLogging.logger {}

  @Autowired
  lateinit var entityDao: EntityDao

  @Autowired
  lateinit var userService: UserService

  override fun save(message: Message): Message {
    val user = userService.findByContext()
    val savedMessage = entityDao.save(message, user)
    log.info {"Save [${savedMessage.type}] with id [${savedMessage.id}] of user [${user.id}]"}
    return savedMessage
  }

  override fun update(message: Message) {
    val user = userService.findByContext()
    entityDao.update(message, user)
    log.info {"Update [${message.type}] with id [${message.id}] of user [${user.id}]"}
  }

  override fun dump(): Dump {
    val user = userService.findByContext()
    val dumpBuilder = Dump.newBuilder()
    dumpBuilder.addAllCurrencies(AppConfiguration.CURRENCIES)
    val messages = entityDao.get(user)
    val accounts = messages.filter {it.type == ACCOUNT }.map {it as Account}
    val categories = messages.filter {it.type == CATEGORY }.map {it as Category}
    val subCategories = messages.filter {it.type == SUB_CATEGORY }.map {it as SubCategory}
    val familyMembers = messages.filter {it.type == FAMILY_MEMBER }.map {it as FamilyMember}
    val transactions = messages.filter {it.type == TRANSACTION }.map {it as Transaction}

    dumpBuilder.addAllAccounts(accounts)
    dumpBuilder.addAllCategories(categories)
    dumpBuilder.addAllSubCategories(subCategories)
    dumpBuilder.addAllFamilyMembers(familyMembers)
    dumpBuilder.addAllTransactions(transactions)

    log.info {"Create dump for user [${user.id}] in "}
    return dumpBuilder.build()
  }

  override fun isExist(id: Long): Boolean {
    val user = userService.findByContext()
    val isExist = entityDao.isExist(id, user)
    log.info {"id [$id] is exist [$isExist] for user [${user.id}]"}
    return isExist
  }
}
