package ru.fess38.finance.dao;

import org.hibernate.SessionFactory;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.type.IntegerType;
import org.hibernate.type.Type;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.fess38.finance.DatabaseChangeFlag;
import ru.fess38.finance.model.Account;
import ru.fess38.finance.model.Rubric;
import ru.fess38.finance.model.Tag;
import ru.fess38.finance.model.Transaction;
import ru.fess38.finance.model.User;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
import java.util.stream.Collectors;

@Repository
@Transactional
public class TransactionDaoImpl implements TransactionDao {
  private SessionFactory sessionFactory;
  private TransactionChangeService changeService;
  private DatabaseChangeFlag databaseChangeFlag;

  @Override
  public Long save(Transaction transaction) {
    changeService.save(transaction);
    Long id = (Long) sessionFactory.getCurrentSession().save(transaction);
    databaseChangeFlag.setTrue();
    return id;
  }

  @Override
  public Transaction get(Long id) {
    return sessionFactory.getCurrentSession().get(Transaction.class, id);
  }

  @Override
  public void update(Transaction transaction) {
    Transaction savedTransaction = get(transaction.getId());
    changeService.update(savedTransaction, transaction);
    sessionFactory.getCurrentSession().flush();
    sessionFactory.getCurrentSession().clear();
    sessionFactory.getCurrentSession().update(transaction);
    databaseChangeFlag.setTrue();
  }

  @Override
  public void delete(Transaction transaction) {
    Transaction savedTransaction = get(transaction.getId());
    savedTransaction.setDeleted(true);
    update(savedTransaction);
    changeService.delete(transaction);
  }

  @SuppressWarnings("unchecked")
  @Override
  public List<Transaction> find(DetachedCriteria detachedCriteria) {
    return commonFind(notDeleted(detachedCriteria), sessionFactory);
  }

  @SuppressWarnings("unchecked")
  @Override
  public List<Transaction> findDeleted(DetachedCriteria detachedCriteria) {
    return commonFind(deleted(detachedCriteria), sessionFactory);
  }

  public List<Transaction> find(YearMonth yearMonth) {
    String sql = "YEAR({alias}.dayRef) = ? AND MONTH({alias}.dayRef) = ?";
    Object[] values = new Object[]{yearMonth.getYear(), yearMonth.getMonthValue()};
    Type[] types = new Type[]{IntegerType.INSTANCE, IntegerType.INSTANCE};
    DetachedCriteria criteria = DetachedCriteria.forClass(Transaction.class)
        .add(Restrictions.sqlRestriction(sql, values, types));
    return find(criteria);
  }

  @Override
  public List<Transaction> find(long rubricId, LocalDate localDate) {
    DetachedCriteria criteria = DetachedCriteria.forClass(Transaction.class)
        .add(Restrictions.eq("dayRef", localDate))
        .add(Restrictions.eq("rubric.id", rubricId));
    return find(criteria);
  }

  @Override public List<Transaction> find(long rubricId, YearMonth yearMonth) {
    String sql = "YEAR({alias}.dayRef) = ? AND MONTH({alias}.dayRef) = ?";
    Object[] values = new Object[]{yearMonth.getYear(), yearMonth.getMonthValue()};
    Type[] types = new Type[]{IntegerType.INSTANCE, IntegerType.INSTANCE};
    DetachedCriteria criteria = DetachedCriteria.forClass(Transaction.class)
        .add(Restrictions.sqlRestriction(sql, values, types))
        .add(Restrictions.eq("rubric.id", rubricId));
    ;
    return find(criteria).stream().collect(Collectors.toList());
  }

  @Override
  public int countByAccount(Account account) {
    return countByProperty("accountFrom.id", account.getId()) + countByProperty("accountTo.id",
        account.getId());
  }

  @Override
  public int countByRubric(Rubric rubric) {
    return countByProperty("rubric.id", rubric.getId());
  }

  @Override
  public int countByTag(Tag tag) {
    return countByProperty("tag.id", tag.getId());
  }

  @Override
  public int countByUser(User user) {
    return countByProperty("user.id", user.getId());
  }

  private int countByProperty(String propertyName, long id) {
    return ((Long) notDeleted(DetachedCriteria.forClass(Transaction.class))
        .add(Restrictions.eq(propertyName, id))
        .setProjection(Projections.rowCount())
        .getExecutableCriteria(sessionFactory.getCurrentSession())
        .uniqueResult()).intValue();
  }

  @Autowired
  public void setSessionFactory(SessionFactory sessionFactory) {
    this.sessionFactory = sessionFactory;
  }

  @Autowired
  public void setDatabaseChangeFlag(DatabaseChangeFlag databaseChangeFlag) {
    this.databaseChangeFlag = databaseChangeFlag;
  }

  @Autowired
  public void setChangeService(TransactionChangeService changeService) {
    this.changeService = changeService;
  }
}
