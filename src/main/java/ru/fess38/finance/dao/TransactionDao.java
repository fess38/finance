package ru.fess38.finance.dao;

import java.time.YearMonth;
import java.util.Date;
import java.util.List;

import org.hibernate.criterion.Restrictions;

import ru.fess38.finance.Utils;
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
		Date startDate = Utils.toDate(yearMonth.atDay(1));
		Date endDate = Utils.toDate(yearMonth.atEndOfMonth());

		return Transactions.of(yearMonth, getSession().createCriteria(Transaction.class)
				.add(Restrictions.ge("dayRef", startDate)) 
				.add(Restrictions.le("dayRef", endDate))
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
