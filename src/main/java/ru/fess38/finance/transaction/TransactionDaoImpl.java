package ru.fess38.finance.transaction;

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
import ru.fess38.finance.account.Account;
import ru.fess38.finance.rubric.Rubric;
import ru.fess38.finance.tag.Tag;
import ru.fess38.finance.transaction.statistic.MonthRubricTransactions;
import ru.fess38.finance.transaction.statistic.MonthTagTransactions;
import ru.fess38.finance.user.User;
import ru.fess38.finance.util.DaoHelper;
import ru.fess38.finance.util.DatabaseEventListener;

import java.time.LocalDate;
import java.time.Year;
import java.time.YearMonth;
import java.util.List;
import java.util.stream.Collectors;

@Repository
@Transactional
public class TransactionDaoImpl implements TransactionDao {
  private SessionFactory sessionFactory;
  private DatabaseEventListener databaseEventListener;

  @Override
  public Transaction save(Transaction transaction) {
    return update(transaction);
  }

  @Override
  public Transaction get(long id) {
    return sessionFactory.getCurrentSession().get(ModifiableTransaction.class, id).toImmutable();
  }

  @Override
  public Transaction update(Transaction transaction) {
    ModifiableTransaction modifiableTransaction = (ModifiableTransaction) sessionFactory
        .getCurrentSession().merge(transaction.toModifiable());
    databaseEventListener.setChangeTrue();
    databaseEventListener.setCalculateBalanceTrue();
    return modifiableTransaction.toImmutable();
  }

  @Override
  public Transaction delete(Transaction transaction) {
    return update(get(transaction.id()).withIsDeleted(true));
  }

  @SuppressWarnings("unchecked")
  @Override
  public List<Transaction> find(DetachedCriteria detachedCriteria) {
    return find(detachedCriteria, false);
  }

  @SuppressWarnings("unchecked")
  @Override
  public List<Transaction> findDeleted(DetachedCriteria detachedCriteria) {
    return find(detachedCriteria, true);
  }

  @SuppressWarnings("unchecked")
  private List<Transaction> find(DetachedCriteria detachedCriteria, boolean isDeleted) {
    detachedCriteria = isDeleted ? DaoHelper.deleted(detachedCriteria) :
        DaoHelper.notDeleted(detachedCriteria);
    return (List<Transaction>) detachedCriteria
        .getExecutableCriteria(sessionFactory.getCurrentSession())
        .list()
        .stream()
        .map(x -> ((ModifiableTransaction) x).toImmutable())
        .collect(Collectors.toList());
  }

  @Override
  public DetachedCriteria detachedCriteria() {
    return DetachedCriteria.forClass(ModifiableTransaction.class);
  }

  @Override
  public List<Transaction> find(YearMonth yearMonth) {
    return find(detachedCriteria().add(yearMonthCriterion(yearMonth)));
  }

  @Override
  public MonthRubricTransactions find(Year year) {
    List<Transaction> transactions = find(detachedCriteria().add(yearCriterion(year))).stream()
        .filter(x -> !x.rubric().isTransfer())
        .collect(Collectors.toList());
    return new MonthRubricTransactions(transactions);
  }

  @Override
  public MonthTagTransactions monthTagTransactions(Year year) {
    List<Transaction> transactions = find(detachedCriteria().add(yearCriterion(year))).stream()
        .filter(x -> !x.rubric().isTransfer())
        .filter(x -> x.tag().isPresent())
        .collect(Collectors.toList());
    return new MonthTagTransactions(transactions);
  }

  @Override
  public List<Transaction> find(long rubricId, YearMonth yearMonth) {
    DetachedCriteria criteria = detachedCriteria()
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

  private Criterion yearCriterion(Year year) {
    String sql = "YEAR({alias}.dayRef) = ?";
    Object[] value = new Object[]{year.getValue()};
    Type[] type = new Type[]{IntegerType.INSTANCE};
    return Restrictions.sqlRestriction(sql, value, type);
  }

  @Override
  public List<Transaction> find(long rubricId, LocalDate localDate) {
    DetachedCriteria criteria = detachedCriteria()
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
    return ((Long) DaoHelper.notDeleted(detachedCriteria())
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
  public void setDatabaseEventListener(DatabaseEventListener databaseEventListener) {
    this.databaseEventListener = databaseEventListener;
  }
}
