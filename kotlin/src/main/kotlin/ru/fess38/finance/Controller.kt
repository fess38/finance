package ru.fess38.finance

import com.google.gson.Gson
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController
import ru.fess38.finance.model.Account
import ru.fess38.finance.model.UserData

@RestController
@RequestMapping("/api/data/account")
class AccountController {
  @Autowired
  lateinit var entityDao: EntityDao

  @RequestMapping("save", method = [(RequestMethod.POST)])
  fun save(@RequestBody account: Account) = entityDao.save(account)

  @RequestMapping("update", method = [(RequestMethod.POST)])
  fun update(@RequestBody account: Account): Any {
    entityDao.update(account)
    return mapOf("success" to true)
  }

  @RequestMapping("delete", method = [(RequestMethod.POST)])
  fun delete(@RequestBody account: Account): Any {
    entityDao.delete(account)
    return mapOf("success" to true)
  }
}

@RestController
class UserDataController {
  @Autowired
  lateinit var gson: Gson

  @Autowired
  lateinit var userDao: UserDao

  @RequestMapping("/api/data/user/get", method = [(RequestMethod.GET)])
  fun get(): UserData {
    return UserData.fromByteArray(userDao.findById(null).data, gson)
  }
}
