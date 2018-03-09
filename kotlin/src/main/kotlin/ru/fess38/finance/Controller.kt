package ru.fess38.finance

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import ru.fess38.finance.model.Model.Account
import ru.fess38.finance.validator.AccountValidator

@RestController
@RequestMapping(
    path = ["/api/data/account"],
    produces = ["application/x-protobuf"],
    consumes = ["application/x-protobuf"]
)
class AccountController {
  @Autowired
  lateinit var entityDao: EntityDao

  val validator = AccountValidator()

  @PostMapping("save")
  fun save(@RequestBody account: Account): ResponseEntity<Any> {
    var httpStatus: HttpStatus
    var savedAccount: Account = account

    if (validator.isValid(account)) {
      httpStatus = HttpStatus.OK
      try {
        savedAccount = entityDao.save(account) as Account
      } catch (e: Exception) {
        httpStatus = HttpStatus.INTERNAL_SERVER_ERROR
      }
    } else {
      httpStatus = HttpStatus.BAD_REQUEST
    }
    return ResponseEntity(savedAccount, httpStatus)
  }

  @PostMapping("update")
  fun update(@RequestBody account: Account): ResponseEntity<Any> {
    var httpStatus: HttpStatus
    if (validator.isValid(account, entityDao.account(id = account.id))) {
      httpStatus = HttpStatus.OK
      try {
        entityDao.update(account)
      } catch (e: Exception) {
        httpStatus = HttpStatus.INTERNAL_SERVER_ERROR
      }
    } else {
      httpStatus = HttpStatus.BAD_REQUEST
    }
    return ResponseEntity(account, httpStatus)
  }

  @PostMapping("delete")
  fun delete(@RequestBody account: Account): ResponseEntity<Any> {
    var httpStatus: HttpStatus
    if (validator.isValid(account, entityDao.account(id = account.id))) {
      httpStatus = HttpStatus.OK
      try {
        entityDao.delete(account)
      } catch (e: Exception) {
        httpStatus = HttpStatus.INTERNAL_SERVER_ERROR
      }
    } else {
      httpStatus = HttpStatus.BAD_REQUEST
    }
    return ResponseEntity(account, httpStatus)
  }
}

@RestController
@RequestMapping(
    produces = ["application/x-protobuf"],
    consumes = ["application/x-protobuf"]
)
class UserDataController {
  @Autowired
  lateinit var entityDao: EntityDao

  @GetMapping("/api/data/dump/get")
  fun get() = entityDao.dump()
}
