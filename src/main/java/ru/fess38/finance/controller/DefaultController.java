package ru.fess38.finance.controller;

import org.hibernate.criterion.DetachedCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import ru.fess38.finance.dao.AccountDao;
import ru.fess38.finance.dao.CurrencyDao;
import ru.fess38.finance.dao.RubricDao;
import ru.fess38.finance.dao.TransactionDao;
import ru.fess38.finance.dao.TransactionGroupDao;
import ru.fess38.finance.dao.UserDao;
import ru.fess38.finance.model.Account;
import ru.fess38.finance.model.Currency;
import ru.fess38.finance.model.MonthTransactions;
import ru.fess38.finance.model.Rubric;
import ru.fess38.finance.model.Transaction;
import ru.fess38.finance.model.TransactionGroup;
import ru.fess38.finance.model.User;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

@RestController
public class DefaultController {
  @Autowired
  private AccountDao accountDao;
  @Autowired
  private CurrencyDao currencyDao;
  @Autowired
  private RubricDao rubricDao;
  @Autowired
  private TransactionDao transactionDao;
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

  @RequestMapping(value = "/rubrics", method = RequestMethod.GET)
  public @ResponseBody List<Rubric> getRubrics() {
    return rubricDao.find(DetachedCriteria.forClass(Rubric.class));
  }

  @RequestMapping(value = "/rubrics/income", method = RequestMethod.GET)
  public @ResponseBody List<Rubric> getIncomeRubrics() {
    return rubricDao.findByType(true);
  }

  @RequestMapping(value = "/rubrics/expense", method = RequestMethod.GET)
  public @ResponseBody List<Rubric> getExpenseRubrics() {
    return rubricDao.findByType(false);
  }

  @RequestMapping(value = "/rubrics/add", method = RequestMethod.POST)
  public void addRubric(@RequestBody Rubric rubric) {
    rubricDao.save(rubric);
  }

  @RequestMapping(value = "/rubrics/update", method = RequestMethod.POST)
  public void updateRubric(@RequestBody Rubric rubric) {
    rubricDao.update(rubric);
  }

  @RequestMapping(value = "/rubrics/delete", method = RequestMethod.POST)
  public void deleteRubric(@RequestBody Rubric rubric) {
    rubricDao.delete(rubric);
  }

  @RequestMapping(value = "/transactions", method = RequestMethod.GET, params = {"year", "month"})
  public @ResponseBody MonthTransactions getTransactions(@RequestParam("year") int year,
      @RequestParam("month") int month) {
    return transactionDao.find(YearMonth.of(year, month));
  }

  @RequestMapping(value = "/transactions", method = RequestMethod.GET,
      params = {"year", "month", "day", "rubric-id"})
  public @ResponseBody List<Transaction> getTransactions(@RequestParam("year") int year,
      @RequestParam("month") int month, @RequestParam("day") int day,
      @RequestParam("rubric-id") long rubricId) {
    return transactionDao.find(LocalDate.of(year, month, day), rubricId);
  }

  @RequestMapping(value = "/transactions/add", method = RequestMethod.POST)
  public void save(@RequestBody Transaction transaction) {
    transactionDao.save(transaction);
  }

  @RequestMapping(value = "/transactions/update", method = RequestMethod.POST)
  public void update(@RequestBody Transaction transaction) {
    transactionDao.update(transaction);
  }

  @RequestMapping(value = "/transactions/delete", method = RequestMethod.POST)
  public void delete(@RequestBody Transaction transaction) {
    transactionDao.delete(transaction);
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
