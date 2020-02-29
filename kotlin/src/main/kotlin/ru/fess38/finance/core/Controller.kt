package ru.fess38.finance.core

import com.google.protobuf.Message
import mu.KotlinLogging
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import ru.fess38.finance.core.Model.Account
import ru.fess38.finance.core.Model.Category
import ru.fess38.finance.core.Model.Dump
import ru.fess38.finance.core.Model.FamilyMember
import ru.fess38.finance.core.Model.Settings
import ru.fess38.finance.core.Model.SubCategory
import ru.fess38.finance.core.Model.Transaction
import ru.fess38.finance.core.Model.TransactionTemplate
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

  @GetMapping("dump/get")
  fun get(@RequestParam("ts", required = false) modifiedAfter: Long?): Dump {
    return messageService.dump(modifiedAfter ?: 0)
  }

  private fun saveMessage(message: Message): ResponseEntity<Any> {
    var httpStatus: HttpStatus
    var savedValue: Message? = null

    val validatorResponse = validator.validate(message)
    val errors = validatorResponse.errors.joinToString("; ")
    if (validatorResponse.isValid()) {
      httpStatus = HttpStatus.OK
      try {
        savedValue = messageService.save(message)
      } catch (e: Exception) {
        httpStatus = HttpStatus.INTERNAL_SERVER_ERROR
      }
    } else {
      log.info{"Unable to save [${message.type}]: $errors"}
      httpStatus = HttpStatus.BAD_REQUEST
    }
    return ResponseEntity(savedValue ?: errors, httpStatus)
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

  private fun updateMessage(message: Message): ResponseEntity<Any> {
    var httpStatus: HttpStatus
    val validatorResponse = validator.validate(message)
    val errors = validatorResponse.errors.joinToString("; ")
    if (validatorResponse.isValid()) {
      httpStatus = HttpStatus.OK
      try {
        messageService.update(message)
      } catch (e: Exception) {
        httpStatus = HttpStatus.INTERNAL_SERVER_ERROR
      }
    } else {
      log.info{"Unable to update [${message.type}] [${message.id}]: $errors"}
      httpStatus = HttpStatus.BAD_REQUEST
    }
    return ResponseEntity(errors, httpStatus)
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
}
