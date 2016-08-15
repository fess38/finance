package ru.fess38.finance.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import ru.fess38.finance.dao.TransactionDao;
import ru.fess38.finance.model.MonthTransactions;
import ru.fess38.finance.model.Transaction;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

@RestController
public class TransactionController {
  @Autowired
  private TransactionDao transactionDao;
  @Autowired
  private TransactionLinkedEntityUpdater updater;

  @RequestMapping(value = "/transaction/find", method = RequestMethod.GET,
      params = {"year", "month"})
  public @ResponseBody MonthTransactions find(@RequestParam("year") int year,
      @RequestParam("month") int month) {
    return transactionDao.find(YearMonth.of(year, month));
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

    updater.updateAccountOnSave(transaction);
    updater.updateRubricOnSave(transaction);
    updater.updateTagOnSave(transaction);
    updater.updateUserOnSave(transaction);
  }

  @RequestMapping(value = "/transaction/update", method = RequestMethod.POST)
  public void update(@RequestBody Transaction transaction) {
    Transaction persistedTransaction = transactionDao.get(transaction.getId());
    transactionDao.update(transaction);

    updater.updateAccountOnUpdate(persistedTransaction, transaction);
    updater.updateTagOnUpdate(persistedTransaction, transaction);
    updater.updateUserOnUpdate(persistedTransaction, transaction);
  }

  @RequestMapping(value = "/transaction/delete", method = RequestMethod.POST)
  public void delete(@RequestBody Transaction transaction) {
    transactionDao.delete(transaction);

    updater.updateAccountOnDelete(transaction);
    updater.updateRubricOnDelete(transaction);
    updater.updateTagOnDelete(transaction);
    updater.updateUserOnDelete(transaction);
  }

}
