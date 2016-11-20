package ru.fess38.finance.dao;

import ru.fess38.finance.model.Account;
import ru.fess38.finance.model.Rubric;
import ru.fess38.finance.model.Tag;
import ru.fess38.finance.model.Transaction;
import ru.fess38.finance.model.User;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

public interface TransactionDao extends GenericDao<Transaction> {
  List<Transaction> find(YearMonth yearMonth);

  List<Transaction> find(long rubricId, LocalDate localDate);

  List<Transaction> find(long rubricId, YearMonth yearMonth);

  int countByAccount(Account account);

  int countByRubric(Rubric rubric);

  int countByTag(Tag tag);

  int countByUser(User user);
}
