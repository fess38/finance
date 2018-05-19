package ru.fess38.finance

import com.google.protobuf.Message
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import ru.fess38.finance.model.Model.Account
import ru.fess38.finance.model.Model.Category
import ru.fess38.finance.model.Model.FamilyMember
import ru.fess38.finance.model.Model.SubCategory
import ru.fess38.finance.model.Model.Transaction

@RestController
@RequestMapping(
    produces = ["application/x-protobuf"],
    consumes = ["application/x-protobuf"]
)
class UserDataController {
  @Autowired
  lateinit var financeEntityService: FinanceEntityService

  @GetMapping("/api/data/dump/get")
  fun get() = financeEntityService.dump()
}

@RestController
@RequestMapping(
    path = ["/api/data"],
    produces = ["application/x-protobuf"],
    consumes = ["application/x-protobuf"]
)
class Controller {
  @Autowired
  lateinit var entityService: FinanceEntityService

  val validator = InputValuesValidator()

  private fun saveMessage(value: Message): ResponseEntity<Any> {
    var httpStatus: HttpStatus
    var savedValue = value

    if (validator.isValid(value)) {
      httpStatus = HttpStatus.OK
      try {
        savedValue = entityService.save(value)
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

  private fun updateMessage(value: Message, id: Long): ResponseEntity<Any> {
    var httpStatus: HttpStatus
    if (validator.isValid(value) && entityService.isExist(id)) {
      httpStatus = HttpStatus.OK
      try {
        entityService.update(value)
      } catch (e: Exception) {
        httpStatus = HttpStatus.INTERNAL_SERVER_ERROR
      }
    } else {
      httpStatus = HttpStatus.BAD_REQUEST
    }
    return ResponseEntity(value, httpStatus)
  }

  @PostMapping("account/update")
  fun update(@RequestBody value: Account) = updateMessage(value, value.id)

  @PostMapping("category/update")
  fun update(@RequestBody value: Category) = updateMessage(value, value.id)

  @PostMapping("sub_category/update")
  fun update(@RequestBody value: SubCategory) = updateMessage(value, value.id)

  @PostMapping("family_member/update")
  fun update(@RequestBody value: FamilyMember) = updateMessage(value, value.id)

  @PostMapping("transaction/update")
  fun update(@RequestBody value: Transaction) = updateMessage(value, value.id)
}
