package ru.fess38.finance

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController
import ru.fess38.finance.model.SimpleAccount

@RestController
@RequestMapping("/api/data/account")
class AccountController {
  @Autowired
  lateinit var accountDao: AccountDao

  @RequestMapping("get", method = [(RequestMethod.GET)])
  fun find() = accountDao.find().map {SimpleAccount.from(it)}

  @RequestMapping("save", method = [(RequestMethod.POST)])
  fun save(@RequestBody simpleAccount: SimpleAccount): SimpleAccount {
    return SimpleAccount.from(accountDao.save(simpleAccount.toAccount()))
  }

  @RequestMapping("update", method = [(RequestMethod.POST)])
  fun update(@RequestBody simpleAccount: SimpleAccount): Any {
    accountDao.update(simpleAccount.toAccount())
    return {}
  }
}

@RestController
class CurrencyController {
  @Autowired
  lateinit var currencyDao: CurrencyDao

  @RequestMapping("/api/data/currency", method = [(RequestMethod.GET)])
  fun find() = currencyDao.find()
}
