package ru.fess38.finance.dao;


import java.time.YearMonth;

import ru.fess38.finance.model.Entity;
import ru.fess38.finance.model.Transaction;
import ru.fess38.finance.view.Transactions;


public class TransactionDao extends EntityDao<Transaction> {
	public boolean isEntityUsed(Entity entity) {
		return !getSession().getNamedQuery("isEntityUsed")
			.setInteger("id", entity.getId())
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
}
