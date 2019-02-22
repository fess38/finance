package ru.fess38.finance.transaction;

import org.hibernate.criterion.DetachedCriteria;
import ru.fess38.finance.account.Account;
import ru.fess38.finance.rubric.Rubric;
import ru.fess38.finance.tag.Tag;
import ru.fess38.finance.transaction.statistic.DayRubricTransactions;
import ru.fess38.finance.transaction.statistic.MonthRubricTransactions;
import ru.fess38.finance.transaction.statistic.MonthTagTransactions;
import ru.fess38.finance.transaction.statistic.YearRubricTransactions;
import ru.fess38.finance.transaction.statistic.YearTagTransactions;
import ru.fess38.finance.user.User;

import java.time.LocalDate;
import java.time.Year;
import java.time.YearMonth;
import java.util.List;

public interface TransactionDao {
  Transaction save(Transaction transaction);

  Transaction get(long id);

  Transaction update(Transaction transaction);

  Transaction delete(Transaction transaction);

  List<Transaction> find(DetachedCriteria detachedCriteria);

  List<Transaction> findDeleted(DetachedCriteria detachedCriteria);

  DetachedCriteria detachedCriteria();

  DayRubricTransactions dayRubricTransactions(YearMonth yearMonth);

  MonthRubricTransactions monthRubricTransactions(Year year);

  MonthTagTransactions monthTagTransactions(Year year);

  YearRubricTransactions yearRubricTransactions();

  YearTagTransactions yearTagTransactions();

  List<Transaction> cellDayRubricTransactions(LocalDate localDate, long rubricId);

  List<Transaction> cellMonthRubricTransactions(YearMonth yearMonth, long rubricId);

  List<Transaction> transactions();

  List<Transaction> transfers();

  List<Transaction> transfers(YearMonth yearMonth);

  int countByAccount(Account account);

  int countByRubric(Rubric rubric);

  int countByTag(Tag tag);

  int countByUser(User user);
}
