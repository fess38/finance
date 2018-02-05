package ru.fess38.finance

import com.google.gson.Gson
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController
import ru.fess38.finance.model.Response
import ru.fess38.finance.model.SimpleAccount
import ru.fess38.finance.model.UserData

@RestController
@RequestMapping("/api/data/account")
class AccountController {
  @Autowired
  lateinit var accountDao: AccountDao

  @RequestMapping("save", method = [(RequestMethod.POST)])
  fun save(@RequestBody simpleAccount: SimpleAccount): Response {
    accountDao.save(simpleAccount.toAccount())
    return Response.success()
  }

  @RequestMapping("update", method = [(RequestMethod.POST)])
  fun update(@RequestBody simpleAccount: SimpleAccount): Response {
    accountDao.update(simpleAccount.toAccount())
    return Response.success()
  }
}

@RestController
class UserDataController {
  @Autowired
  lateinit var gson: Gson

  @Autowired
  lateinit var userDao: UserDao

  @RequestMapping("/api/data/user/get", method = [(RequestMethod.GET)])
  fun get() = UserData.fromByteArray(userDao.findById(null).data, gson)
}
