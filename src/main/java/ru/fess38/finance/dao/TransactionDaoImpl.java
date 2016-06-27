package ru.fess38.finance.dao;


import java.time.YearMonth;
import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.hibernate.type.IntegerType;
import org.hibernate.type.Type;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import ru.fess38.finance.model.Transaction;
import ru.fess38.finance.model.Transactions;


@Repository
@Transactional
public class TransactionDaoImpl implements TransactionDao {
	private SessionFactory sessionFactory;

	@Override
	public Long save(Transaction transaction) {
		return (Long) sessionFactory.getCurrentSession().save(transaction);
	}

	@Override
	public Transaction get(Long id) {
		return sessionFactory.getCurrentSession().get(Transaction.class, id);
	}

	@Override
	public void update(Transaction transaction) {
		sessionFactory.getCurrentSession().update(transaction);

	}

	@Override
	public void delete(Transaction transaction) {
		Transaction savedTransaction = get(transaction.getId());
		savedTransaction.setDeleted(true);
		update(savedTransaction);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Transaction> find(DetachedCriteria detachedCriteria) {
		return detachedCriteria.add(Restrictions.eq("isDeleted", false))
			.getExecutableCriteria(sessionFactory.getCurrentSession())
			.list();
	}

	@Override
	public Transactions find(YearMonth yearMonth) {
		String sql = "YEAR({alias}.dayRef) = ? AND MONTH({alias}.dayRef) = ?";
		Object[] values = new Object[] { yearMonth.getYear(), yearMonth.getMonthValue() };
		Type[] types = new Type[] { IntegerType.INSTANCE, IntegerType.INSTANCE };
		DetachedCriteria criteria = DetachedCriteria.forClass(Transaction.class)
			.add(Restrictions.sqlRestriction(sql, values, types));
		return Transactions.of(yearMonth, find(criteria));
	}

	@Autowired
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
}
