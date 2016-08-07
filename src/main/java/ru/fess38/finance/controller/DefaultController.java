package ru.fess38.finance.controller;

import org.hibernate.criterion.DetachedCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import ru.fess38.finance.dao.AccountDao;
import ru.fess38.finance.dao.CurrencyDao;
import ru.fess38.finance.dao.TransactionGroupDao;
import ru.fess38.finance.dao.UserDao;
import ru.fess38.finance.model.Account;
import ru.fess38.finance.model.Currency;
import ru.fess38.finance.model.TransactionGroup;
import ru.fess38.finance.model.User;

import java.util.List;

@RestController
public class DefaultController {
  @Autowired
  private AccountDao accountDao;
  @Autowired
  private CurrencyDao currencyDao;
  @Autowired
  private TransactionGroupDao transactionGroupDao;
  @Autowired
  private UserDao userDao;

  @RequestMapping(value = "/accounts", method = RequestMethod.GET)
  public @ResponseBody List<Account> getAccounts() {
    return accountDao.find(DetachedCriteria.forClass(Account.class));
  }

  @RequestMapping(value = "/accounts/master", method = RequestMethod.GET)
  public @ResponseBody Account getMasterAccount() {
    return accountDao.getMasterAccount();
  }

  @RequestMapping(value = "/accounts/outer", method = RequestMethod.GET)
  public @ResponseBody Account getOuterAccount() {
    return accountDao.getOuterAccount();
  }

  @RequestMapping(value = "/currencies", method = RequestMethod.GET)
  public @ResponseBody List<Currency> getCurrencies() {
    return currencyDao.find(DetachedCriteria.forClass(Currency.class));
  }

  @RequestMapping(value = "/transactionGroups", method = RequestMethod.GET)
  public @ResponseBody List<TransactionGroup> getTransactionGroups() {
    return transactionGroupDao.find(DetachedCriteria.forClass(TransactionGroup.class));
  }

  @RequestMapping(value = "/users", method = RequestMethod.GET)
  public @ResponseBody List<User> getUsers() {
    return userDao.find(DetachedCriteria.forClass(User.class));
  }

  @RequestMapping(value = "/user/add", method = RequestMethod.POST)
  public void addUser(@ModelAttribute("add-user") User user) {
    userDao.save(user);
  }

  @RequestMapping(value = "/user/delete", method = RequestMethod.POST)
  public void deleteUser(@ModelAttribute("delete-user") User user) {
    userDao.delete(user);
  }
}
