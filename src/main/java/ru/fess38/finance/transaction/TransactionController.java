package ru.fess38.finance.transaction;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import ru.fess38.finance.transaction.statistic.DayRubricTransactions;
import ru.fess38.finance.transaction.statistic.MonthRubricTransactions;
import ru.fess38.finance.transaction.statistic.MonthTagTransactions;
import ru.fess38.finance.transaction.statistic.YearRubricTransactions;
import ru.fess38.finance.transaction.statistic.YearTagTransactions;

import java.time.LocalDate;
import java.time.Year;
import java.time.YearMonth;
import java.util.List;

@RestController
public class TransactionController {
  @Autowired
  private TransactionDao transactionDao;

  @RequestMapping(value = "/transaction/year/{year}/month/{month}/rubric",
                  method = RequestMethod.GET)
  public @ResponseBody DayRubricTransactions dayRubricTransactions(@PathVariable("year") int year,
      @PathVariable("month") int month) {
    return transactionDao.dayRubricTransactions(YearMonth.of(year, month));
  }

  @RequestMapping(value = "/transaction/year/{year}/rubric", method = RequestMethod.GET)
  public @ResponseBody MonthRubricTransactions monthRubricTransactions(
      @PathVariable("year") int year) {
    return transactionDao.monthRubricTransactions(Year.of(year));
  }

  @RequestMapping(value = "/transaction/year/{year}/tag")
  public @ResponseBody MonthTagTransactions monthTagTransactions(@PathVariable("year") int year) {
    return transactionDao.monthTagTransactions(Year.of(year));
  }

  @RequestMapping(value = "/transaction/year/all/rubric")
  public @ResponseBody YearRubricTransactions yearRubricTransactions() {
    return transactionDao.yearRubricTransactions();
  }

  @RequestMapping(value = "/transaction/year/all/tag")
  public @ResponseBody YearTagTransactions yearTagTransactions() {
    return transactionDao.yearTagTransactions();
  }

  @RequestMapping(value = "/transaction/day/{day}/rubric/{rubric}", method = RequestMethod.GET)
  public @ResponseBody List<Transaction> cellDayRubricTransactions(
      @PathVariable("day") @DateTimeFormat(iso = ISO.DATE) LocalDate localDate,
      @PathVariable("rubric") long rubricId) {
    return transactionDao.cellDayRubricTransactions(localDate, rubricId);
  }

  @RequestMapping(value = "/transaction/year/{year}/month/{month}/rubric/{rubric}",
                  method = RequestMethod.GET)
  public @ResponseBody List<Transaction> cellMonthRubricTransactions(@PathVariable("year") int year,
      @PathVariable("month") int month, @PathVariable("rubric") long rubricId) {
    return transactionDao.cellMonthRubricTransactions(YearMonth.of(year, month), rubricId);
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

  @RequestMapping(value = "/transfer/year/{year}/month/{month}", method = RequestMethod.GET)
  public @ResponseBody List<Transaction> transfers(@PathVariable("year") int year,
      @PathVariable("month") int month) {
    return transactionDao.transfers(YearMonth.of(year, month));
  }
}
