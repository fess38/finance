package ru.fess38.finance.controller;

import org.hibernate.criterion.DetachedCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
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

  @RequestMapping(value = "/transaction/get", method = RequestMethod.GET)
  public @ResponseBody List<Transaction> get() {
    return transactionDao.find(DetachedCriteria.forClass(Transaction.class));
  }

  @RequestMapping(value = "/transaction/find", method = RequestMethod.GET,
      params = {"year", "month"})
  public @ResponseBody MonthTransactions findTransactions(@RequestParam("year") int year,
      @RequestParam("month") int month) {
    YearMonth yearMonth = YearMonth.of(year, month);
    return MonthTransactions.of(yearMonth, transactionDao.find(yearMonth, Group.EXTERNAL));
  }

  @RequestMapping(value = "/transaction/find", method = RequestMethod.GET,
      params = {"rubric-id", "date"})
  public @ResponseBody List<Transaction> find(@RequestParam("rubric-id") long rubricId,
      @RequestParam("date") @DateTimeFormat(iso = ISO.DATE) LocalDate localDate) {
    return transactionDao.find(rubricId, localDate);
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

  @RequestMapping(value = "/transfer/find", method = RequestMethod.GET, params = {"year", "month"})
  public @ResponseBody List<Transaction> findTransfers(@RequestParam("year") int year,
      @RequestParam("month") int month) {
    return transactionDao.find(YearMonth.of(year, month), Group.INTERNAL);
  }
}