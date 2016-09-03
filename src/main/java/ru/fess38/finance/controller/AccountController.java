package ru.fess38.finance.controller;

import org.hibernate.criterion.DetachedCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import ru.fess38.finance.dao.AccountDao;
import ru.fess38.finance.dao.TransactionDao;
import ru.fess38.finance.model.Account;
import ru.fess38.finance.model.Account.AccountType;

import java.util.List;

@RestController
public class AccountController {
  @Autowired
  private AccountDao accountDao;
  @Autowired
  private TransactionDao transactionDao;

  @RequestMapping(value = "/account/get", method = RequestMethod.GET)
  public @ResponseBody List<Account> get() {
    return accountDao.find(DetachedCriteria.forClass(Account.class));
  }

  @RequestMapping(value = "/account/master", method = RequestMethod.GET)
  public @ResponseBody Account getMasterAccount() {
    return accountDao.getMasterAccount();
  }

  @RequestMapping(value = "/account/outer", method = RequestMethod.GET)
  public @ResponseBody Account getOuterAccount() {
    return accountDao.getOuterAccount();
  }

  @RequestMapping(value = "/account/save", method = RequestMethod.POST)
  public void save(@RequestBody Account account) {
    accountDao.save(account);
  }

  @RequestMapping(value = "/account/update", method = RequestMethod.POST)
  public void update(@RequestBody Account account) {
    accountDao.update(account);
  }

  @RequestMapping(value = "/account/delete", method = RequestMethod.POST)
  public void delete(@RequestBody Account account) {
    if (transactionDao.countByAccount(account) == 0 && account.getType() == AccountType.DEFAULT) {
      accountDao.delete(account);
    }
  }

}
