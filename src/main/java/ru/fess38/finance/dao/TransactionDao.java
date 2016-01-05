package ru.fess38.finance.dao;

import java.time.YearMonth;
import java.util.List;

import ru.fess38.finance.model.Transaction;
import ru.fess38.finance.view.Transactions;


public class TransactionDao extends EntityDao<Transaction> {
	public boolean isEntityUsed(Integer id) {
		return !getSession().getNamedQuery("isEntityUsed")
			.setInteger("id", id)
			.uniqueResult()
			.equals(0);
	}

	@SuppressWarnings("unchecked")
	public Transactions find(YearMonth yearMonth) {
		return Transactions.of(yearMonth,
				getSession().getNamedQuery("transactionFindByYearMonth")
					.setInteger("year", yearMonth.getYear())
					.setInteger("month", yearMonth.getMonthValue())
					.list());
	}

	@SuppressWarnings("unchecked")
	public List<Transaction> findByYearMonthRuble(int year, int month) {
		return getSession().getNamedQuery("transactionFindByYearMonthRuble")
			.setInteger("year", year)
			.setInteger("month", month)
			.list();
	}
}
