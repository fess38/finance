package ru.fess38.finance.controller;

import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import ru.fess38.finance.dao.TransactionChangeService;
import ru.fess38.finance.dao.TransactionDao;
import ru.fess38.finance.model.MonthTransactions;
import ru.fess38.finance.model.Transaction;
import ru.fess38.finance.model.Transaction.Group;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

@RestController
public class TransactionController {
  @Autowired
  private TransactionDao transactionDao;
  @Autowired
  private TransactionChangeService persistService;

  @RequestMapping(value = "/transaction/get", method = RequestMethod.GET)
  public @ResponseBody List<Transaction> get() {
    return transactionDao.find(DetachedCriteria.forClass(Transaction.class));
  }

  @RequestMapping(value = "/transaction/find", method = RequestMethod.GET,
      params = {"year", "month"})
  public @ResponseBody MonthTransactions find(@RequestParam("year") int year,
      @RequestParam("month") int month) {
    return transactionDao.find(YearMonth.of(year, month), Group.EXTERNAL);
  }

  @RequestMapping(value = "/transaction/find", method = RequestMethod.GET,
      params = {"year", "month", "day", "rubric-id"})
  public @ResponseBody List<Transaction> find(@RequestParam("year") int year,
      @RequestParam("month") int month, @RequestParam("day") int day,
      @RequestParam("rubric-id") long rubricId) {
    return transactionDao.find(LocalDate.of(year, month, day), rubricId);
  }

  @RequestMapping(value = "/transaction/save", method = RequestMethod.POST)
  public void save(@RequestBody Transaction transaction) {
    transactionDao.save(transaction);
  }

  @RequestMapping(value = "/transaction/update", method = RequestMethod.POST)
  public void update(@RequestBody Transaction transaction) {
    transactionDao.update(transaction);
  }

  @RequestMapping(value = "/transaction/delete", method = RequestMethod.POST)
  public void delete(@RequestBody Transaction transaction) {
    transactionDao.delete(transaction);
  }

  @RequestMapping(value = "/transfer/get", method = RequestMethod.GET)
  public @ResponseBody List<Transaction> find() {
    return transactionDao.find(DetachedCriteria.forClass(Transaction.class)
        .createAlias("rubric", "r").add(Restrictions.eq("r.isTransfer", true)));
  }
}
