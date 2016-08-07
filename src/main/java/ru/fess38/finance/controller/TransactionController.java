package ru.fess38.finance.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import ru.fess38.finance.dao.RubricDao;
import ru.fess38.finance.dao.TransactionDao;
import ru.fess38.finance.model.MonthTransactions;
import ru.fess38.finance.model.Rubric;
import ru.fess38.finance.model.Transaction;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

@RestController
public class TransactionController {
  @Autowired
  private TransactionDao transactionDao;
  @Autowired
  private RubricDao rubricDao;

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
  @Transactional
  public void save(@RequestBody Transaction transaction) {
    transactionDao.save(transaction);
    markRubricAsWithTransaction(transaction.getRubric());
  }

  private void markRubricAsWithTransaction(Rubric rubric) {
    Long id = rubric.getId();
    Rubric persistedRubric = rubricDao.get(id);
    if (!persistedRubric.isHasTransactions()) {
      persistedRubric.setHasTransactions(true);
      rubricDao.update(persistedRubric);
    }
  }

  @RequestMapping(value = "/transactions/update", method = RequestMethod.POST)
  public void update(@RequestBody Transaction transaction) {
    transactionDao.update(transaction);
  }

  @RequestMapping(value = "/transactions/delete", method = RequestMethod.POST)
  public void delete(@RequestBody Transaction transaction) {
    transactionDao.delete(transaction);
  }
}
