package ru.fess38.finance.dao;


import java.time.YearMonth;

import ru.fess38.finance.GenericDao;
import ru.fess38.finance.model.Transaction;
import ru.fess38.finance.view.Transactions;


public interface TransactionDao extends GenericDao<Transaction, Long> {
	Transactions find(YearMonth yearMonth);
}
