package ru.fess38.finance.core

import com.google.protobuf.Message
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import ru.fess38.finance.core.Model.Account
import ru.fess38.finance.core.Model.Category
import ru.fess38.finance.core.Model.FamilyMember
import ru.fess38.finance.core.Model.SubCategory
import ru.fess38.finance.core.Model.Transaction
import ru.fess38.finance.utils.id

@RestController
@RequestMapping(
    path = ["/api/data"],
    produces = ["application/x-protobuf"],
    consumes = ["application/x-protobuf"]
)
class Controller {
  @Autowired
  lateinit var messageService: MessageService

  private val validator = InputValuesValidator()

  @GetMapping("dump/get")
  fun get() = messageService.dump()

  private fun saveMessage(message: Message): ResponseEntity<Any> {
    var httpStatus: HttpStatus
    var savedValue = message

    if (validator.isValid(message)) {
      httpStatus = HttpStatus.OK
      try {
        savedValue = messageService.save(message)
      } catch (e: Exception) {
        httpStatus = HttpStatus.INTERNAL_SERVER_ERROR
      }
    } else {
      httpStatus = HttpStatus.BAD_REQUEST
    }
    return ResponseEntity(savedValue, httpStatus)
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

  private fun updateMessage(message: Message): ResponseEntity<Any> {
    var httpStatus: HttpStatus
    if (validator.isValid(message) && messageService.isExist(message.id)) {
      httpStatus = HttpStatus.OK
      try {
        messageService.update(message)
      } catch (e: Exception) {
        httpStatus = HttpStatus.INTERNAL_SERVER_ERROR
      }
    } else {
      httpStatus = HttpStatus.BAD_REQUEST
    }
    return ResponseEntity(message, httpStatus)
  }

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
}
