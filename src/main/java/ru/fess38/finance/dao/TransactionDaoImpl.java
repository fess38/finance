package ru.fess38.finance.dao;

import org.hibernate.SessionFactory;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.hibernate.type.IntegerType;
import org.hibernate.type.Type;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import ru.fess38.finance.model.MonthTransactions;
import ru.fess38.finance.model.Transaction;

import java.time.LocalDate;
import java.time.YearMonth;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

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
        .getExecutableCriteria(sessionFactory.getCurrentSession()).list();
  }

  @Override
  public MonthTransactions find(YearMonth yearMonth) {
    String sql = "YEAR({alias}.dayRef) = ? AND MONTH({alias}.dayRef) = ?";
    Object[] values = new Object[] {yearMonth.getYear(), yearMonth.getMonthValue()};
    Type[] types = new Type[] {IntegerType.INSTANCE, IntegerType.INSTANCE};
    DetachedCriteria criteria = DetachedCriteria.forClass(Transaction.class)
        .add(Restrictions.sqlRestriction(sql, values, types));
    return MonthTransactions.of(yearMonth, find(criteria));
  }

  @Override
  public List<Transaction> find(LocalDate localDate, long rubricId) {
    Date date = Date.from(localDate.atStartOfDay().atZone(ZoneId.systemDefault()).toInstant());
    DetachedCriteria criteria = DetachedCriteria.forClass(Transaction.class)
        .add(Restrictions.eq("dayRef", date)).add(Restrictions.eq("rubric.id", rubricId));
    return find(criteria);
  }

  @Autowired
  public void setSessionFactory(SessionFactory sessionFactory) {
    this.sessionFactory = sessionFactory;
  }
}
