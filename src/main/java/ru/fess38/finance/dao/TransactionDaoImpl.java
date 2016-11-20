package ru.fess38.finance.dao;

import org.hibernate.SessionFactory;
import org.hibernate.criterion.Criterion;
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
import ru.fess38.finance.model.ModifiableTransaction;
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
  public Transaction save(Transaction transaction) {
    return update(changeService.save(transaction));
  }

  @Override
  public Transaction get(long id) {
    return sessionFactory.getCurrentSession().get(ModifiableTransaction.class, id).toImmutable();
  }

  @Override
  public Transaction update(Transaction transaction) {
    if (transaction.id() != 0) {
      changeService.update(get(transaction.id()), transaction);
    }
    ModifiableTransaction modifiableTransaction = (ModifiableTransaction) sessionFactory
        .getCurrentSession().merge(transaction.toModifiable());
    databaseChangeFlag.setTrue();
    return modifiableTransaction.toImmutable();
  }

  @Override
  public Transaction delete(Transaction transaction) {
    changeService.delete(transaction);
    databaseChangeFlag.setTrue();
    return update(get(transaction.id()).withIsDeleted(true));
  }

  @SuppressWarnings("unchecked")
  @Override
  public List<Transaction> find(DetachedCriteria detachedCriteria) {
    return commonFind(notDeleted(detachedCriteria), sessionFactory).stream()
        .map(x -> (ModifiableTransaction) x)
        .map(ModifiableTransaction::toImmutable)
        .collect(Collectors.toList());
  }

  @SuppressWarnings("unchecked")
  @Override
  public List<Transaction> findDeleted(DetachedCriteria detachedCriteria) {
    return commonFind(deleted(detachedCriteria), sessionFactory).stream()
        .map(x -> (ModifiableTransaction) x)
        .map(ModifiableTransaction::toImmutable)
        .collect(Collectors.toList());
  }

  @Override
  public List<Transaction> find(YearMonth yearMonth) {
    DetachedCriteria criteria = DetachedCriteria.forClass(ModifiableTransaction.class)
        .add(yearMonthCriterion(yearMonth));
    return find(criteria);
  }

  @Override
  public List<Transaction> find(long rubricId, YearMonth yearMonth) {
    DetachedCriteria criteria = DetachedCriteria.forClass(ModifiableTransaction.class)
        .add(yearMonthCriterion(yearMonth))
        .add(Restrictions.eq("rubric.id", rubricId));
    return find(criteria).stream().collect(Collectors.toList());
  }

  private Criterion yearMonthCriterion(YearMonth yearMonth) {
    String sql = "YEAR({alias}.dayRef) = ? AND MONTH({alias}.dayRef) = ?";
    Object[] values = new Object[]{yearMonth.getYear(), yearMonth.getMonthValue()};
    Type[] types = new Type[]{IntegerType.INSTANCE, IntegerType.INSTANCE};
    return Restrictions.sqlRestriction(sql, values, types);
  }

  @Override
  public List<Transaction> find(long rubricId, LocalDate localDate) {
    DetachedCriteria criteria = DetachedCriteria.forClass(ModifiableTransaction.class)
        .add(Restrictions.eq("dayRef", localDate))
        .add(Restrictions.eq("rubric.id", rubricId));
    return find(criteria);
  }

  @Override
  public int countByAccount(Account account) {
    return countByProperty("accountFrom.id", account.id()) + countByProperty("accountTo.id",
        account.id());
  }

  @Override
  public int countByRubric(Rubric rubric) {
    return countByProperty("rubric.id", rubric.id());
  }

  @Override
  public int countByTag(Tag tag) {
    return countByProperty("tag.id", tag.id());
  }

  @Override
  public int countByUser(User user) {
    return countByProperty("user.id", user.id());
  }

  private int countByProperty(String propertyName, long id) {
    return ((Long) notDeleted(DetachedCriteria.forClass(ModifiableTransaction.class))
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
