package ru.fess38.finance.dao;

import ru.fess38.finance.GenericDao;
import ru.fess38.finance.model.MonthTransactions;
import ru.fess38.finance.model.Transaction;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

public interface TransactionDao extends GenericDao<Transaction, Long> {
  MonthTransactions find(YearMonth yearMonth);

  List<Transaction> find(LocalDate localDate, long rubricId);
}
