package ru.fess38.finance.core

import com.google.protobuf.Message
import com.google.protobuf.StringValue
import mu.KotlinLogging
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import ru.fess38.finance.IDSEQ_ALLOCATION_SIZE
import ru.fess38.finance.core.Model.*
import ru.fess38.finance.utils.id
import ru.fess38.finance.utils.type
import ru.fess38.finance.validation.MessageValidator

@RestController
@RequestMapping(
  path = ["/api/data"],
  produces = ["application/x-protobuf"],
  consumes = ["application/x-protobuf"]
)
class Controller {
  private val log = KotlinLogging.logger {}

  @Autowired
  lateinit var messageService: MessageService

  @Autowired
  lateinit var validator: MessageValidator<Message>

  @GetMapping("next_id")
  fun nextId(@RequestParam("amount", required = false) amount: Int?): ResponseEntity<Any> {
    var httpStatus: HttpStatus = HttpStatus.OK
    var idHolder: IdHolder? = null

    try {
      idHolder = messageService.idHolder(amount ?: IDSEQ_ALLOCATION_SIZE)
    } catch (e: Exception) {
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR
      log.info {"Unable to get next id: ${e.message}"}
    }

    return ResponseEntity(idHolder, httpStatus)
  }

  @GetMapping("storage/get")
  fun get(@RequestParam("ts", required = false) modifiedAfter: Long?): ResponseEntity<Any> {
    var httpStatus: HttpStatus = HttpStatus.OK
    var dataStorage: DataStorage? = null

    try {
      dataStorage = messageService.dataStorage(modifiedAfter ?: 0)
    } catch (e: Exception) {
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR
      log.error {"Unable to get user data: ${e.message}"}
    }

    return ResponseEntity(dataStorage, httpStatus)
  }

  @PostMapping("storage/save")
  fun save(@RequestBody value: DataStorage): ResponseEntity<Any> {
    var httpStatus: HttpStatus = HttpStatus.OK
    val savedMessages = mutableListOf<Message>()

    try {
      if (httpStatus == HttpStatus.OK) {
        saveMessages(value.accountsList).also {
          savedMessages.addAll(value.accountsList)
          httpStatus = it
        }
      }
      if (httpStatus == HttpStatus.OK) {
        saveMessages(value.categoriesList).also {
          savedMessages.addAll(value.categoriesList)
          httpStatus = it
        }
      }
      if (httpStatus == HttpStatus.OK) {
        saveMessages(value.subCategoriesList).also {
          savedMessages.addAll(value.subCategoriesList)
          httpStatus = it
        }
      }
      if (httpStatus == HttpStatus.OK) {
        saveMessages(value.familyMembersList).also {
          savedMessages.addAll(value.familyMembersList)
          httpStatus = it
        }
      }
      if (httpStatus == HttpStatus.OK) {
        saveMessages(value.transactionsList).also {
          savedMessages.addAll(value.transactionsList)
          httpStatus = it
        }
      }
      if (httpStatus == HttpStatus.OK) {
        saveMessages(value.transactionTemplatesList).also {
          savedMessages.addAll(value.transactionTemplatesList)
          httpStatus = it
        }
      }
      if (httpStatus == HttpStatus.OK) {
        saveMessages(value.securitiesList).also {
          savedMessages.addAll(value.securitiesList)
          httpStatus = it
        }
      }
      if (httpStatus == HttpStatus.OK) {
        saveMessages(value.securityTransactionsList).also {
          savedMessages.addAll(value.securityTransactionsList)
          httpStatus = it
        }
      }
      if (httpStatus == HttpStatus.OK) {
        saveMessages(value.notepadsList).also {
          savedMessages.addAll(value.notepadsList)
          httpStatus = it
        }
      }
      if (httpStatus == HttpStatus.OK) {
        saveMessages(value.notesList).also {
          savedMessages.addAll(value.notesList)
          httpStatus = it
        }
      }

      // new entity
    } catch (e: Exception) {
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR
      log.info {"Unable to save user data: ${e.message}"}
    }

    if (httpStatus != HttpStatus.OK) {
      try {
        messageService.delete(savedMessages)
      } catch (e: Exception) {
        log.info {"Unable to delete already saved entities: ${e.message}"}
      }
    }

    return ResponseEntity(StringValue.getDefaultInstance(), httpStatus)
  }

  private fun saveMessages(messages: List<Message>): HttpStatus {
    var httpStatus: HttpStatus = HttpStatus.OK

    for (message in messages) {
      val validatorResponse = validator.validate(message, true)
      if (!validatorResponse.isValid()) {
        httpStatus = HttpStatus.BAD_REQUEST
        val errors = validatorResponse.errors.joinToString("; ")
        log.info {"Invalid [${message.type}] with id [${message.id}]: $errors"}
        break
      }
    }

    if (httpStatus == HttpStatus.OK) {
      try {
        messageService.save(messages)
      } catch (e: Exception) {
        log.info {"Unable to save entities: ${e.message}"}
      }
    }

    return httpStatus
  }

  private fun saveMessage(message: Message): ResponseEntity<Any> {
    var httpStatus: HttpStatus = HttpStatus.OK

    try {
      val validatorResponse = validator.validate(message, true)
      if (validatorResponse.isValid()) {
        messageService.save(message)
      } else {
        httpStatus = HttpStatus.BAD_REQUEST
        val errors = validatorResponse.errors.joinToString("; ")
        log.info {"Invalid [${message.type}] with id [${message.id}]: $errors"}
      }
    } catch (e: Exception) {
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR
      log.info {"Unable to save [${message.type}]: ${e.message}"}
    }

    return ResponseEntity(StringValue.getDefaultInstance(), httpStatus)
  }

  @PostMapping("account/save")
  fun save(@RequestBody value: Account) = saveMessage(value)

  @PostMapping("family_member/save")
  fun save(@RequestBody value: FamilyMember) = saveMessage(value)

  @PostMapping("category/save")
  fun save(@RequestBody value: Category) = saveMessage(value)

  @PostMapping("sub_category/save")
  fun save(@RequestBody value: SubCategory) = saveMessage(value)

  @PostMapping("transaction/save")
  fun save(@RequestBody value: Transaction) = saveMessage(value)

  @PostMapping("transaction_template/save")
  fun save(@RequestBody value: TransactionTemplate) = saveMessage(value)

  @PostMapping("security/save")
  fun save(@RequestBody value: Security) = saveMessage(value)

  @PostMapping("security_transaction/save")
  fun save(@RequestBody value: SecurityTransaction) = saveMessage(value)

  @PostMapping("notepad/save")
  fun save(@RequestBody value: Notepad) = saveMessage(value)

  @PostMapping("note/save")
  fun save(@RequestBody value: Note) = saveMessage(value)

  // new entity

  private fun updateMessage(message: Message): ResponseEntity<Any> {
    var httpStatus: HttpStatus = HttpStatus.OK

    try {
      val validatorResponse = validator.validate(message, false)
      if (validatorResponse.isValid()) {
        messageService.update(message)
      } else {
        httpStatus = HttpStatus.BAD_REQUEST
        val errors = validatorResponse.errors.joinToString("; ")
        log.info {"Invalid [${message.type}] with id [${message.id}]: $errors"}
      }
    } catch (e: Exception) {
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR
      log.info {"Unable to update [${message.type}] [${message.id}]: ${e.message}"}
    }

    return ResponseEntity(StringValue.getDefaultInstance(), httpStatus)
  }

  @PostMapping("settings/update")
  fun update(@RequestBody value: Settings) = updateMessage(value)

  @PostMapping("account/update")
  fun update(@RequestBody value: Account) = updateMessage(value)

  @PostMapping("category/update")
  fun update(@RequestBody value: Category) = updateMessage(value)

  @PostMapping("sub_category/update")
  fun update(@RequestBody value: SubCategory) = updateMessage(value)

  @PostMapping("family_member/update")
  fun update(@RequestBody value: FamilyMember) = updateMessage(value)

  @PostMapping("transaction/update")
  fun update(@RequestBody value: Transaction) = updateMessage(value)

  @PostMapping("transaction_template/update")
  fun update(@RequestBody value: TransactionTemplate) = updateMessage(value)

  @PostMapping("security/update")
  fun update(@RequestBody value: Security) = updateMessage(value)

  @PostMapping("security_transaction/update")
  fun update(@RequestBody value: SecurityTransaction) = updateMessage(value)

  @PostMapping("notepad/update")
  fun update(@RequestBody value: Notepad) = updateMessage(value)

  @PostMapping("note/update")
  fun update(@RequestBody value: Note) = updateMessage(value)

  // new entity

  @PostMapping("storage/delete")
  fun delete(): ResponseEntity<Any> {
    var httpStatus: HttpStatus = HttpStatus.OK

    try {
      messageService.delete()
    } catch (e: Exception) {
      log.info {"Unable to delete user data: ${e.message}}"}
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR
    }

    return ResponseEntity(StringValue.getDefaultInstance(), httpStatus)
  }
}
