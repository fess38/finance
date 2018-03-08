package ru.fess38.finance

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import ru.fess38.finance.model.Model.Account
import ru.fess38.finance.model.Model.Dump

@RestController
@RequestMapping(
    path = ["/api/data/account"],
    produces = ["application/x-protobuf"],
    consumes = ["application/x-protobuf"]
)
class AccountController {
  @Autowired
  lateinit var entityDao: EntityDao

  @PostMapping("save")
  fun save(@RequestBody account: Account) = entityDao.save(account)

  @PostMapping("update")
  fun update(@RequestBody account: Account): Any {
    entityDao.update(account)
    return mapOf("success" to true)
  }

  @PostMapping("delete")
  fun delete(@RequestBody account: Account): Any {
    entityDao.delete(account)
    return mapOf("success" to true)
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
  fun get(): Dump {
    return entityDao.dump(null)
  }
}
