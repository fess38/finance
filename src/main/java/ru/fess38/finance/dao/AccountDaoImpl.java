package ru.fess38.finance.dao;

import org.hibernate.SessionFactory;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.fess38.finance.DatabaseEventListener;
import ru.fess38.finance.model.AbstractAccount.Type;
import ru.fess38.finance.model.Account;
import ru.fess38.finance.model.ModifiableAccount;

import java.util.List;
import java.util.stream.Collectors;

@Repository
@Transactional
public class AccountDaoImpl implements AccountDao {
  private SessionFactory sessionFactory;
  private DatabaseEventListener databaseEventListener;

  @Override
  public Account save(Account account) {
    return update(account);
  }

  @Override
  public Account get(long id) {
    return sessionFactory.getCurrentSession().get(ModifiableAccount.class, id).toImmutable();
  }

  @Override
  public Account update(Account account) {
    ModifiableAccount modifiableAccount = (ModifiableAccount) sessionFactory.getCurrentSession()
        .merge(account.toModifiable());
    databaseEventListener.setChangeTrue();
    return modifiableAccount.toImmutable();
  }

  @Override
  public Account delete(Account account) {
    if (account.type() == Type.DEFAULT) {
      return update(account.withIsDeleted(true));
    } else {
      return account;
    }
  }

  @Override
  public List<Account> find(DetachedCriteria detachedCriteria) {
    return find(detachedCriteria, false);
  }

  @Override
  public List<Account> findDeleted(DetachedCriteria detachedCriteria) {
    return find(detachedCriteria, true);
  }

  @SuppressWarnings("unchecked")
  private List<Account> find(DetachedCriteria detachedCriteria, boolean isDeleted) {
    detachedCriteria = isDeleted ? DaoHelper.deleted(detachedCriteria) :
        DaoHelper.notDeleted(detachedCriteria);
    return (List<Account>) detachedCriteria
        .getExecutableCriteria(sessionFactory.getCurrentSession())
        .list()
        .stream()
        .map(x -> ((ModifiableAccount) x).toImmutable())
        .collect(Collectors.toList());
  }

  @Override public DetachedCriteria detachedCriteria() {
    return DetachedCriteria.forClass(ModifiableAccount.class);
  }

  @Override
  public Account getMasterAccount() {
    return ((ModifiableAccount) sessionFactory.getCurrentSession()
        .createCriteria(ModifiableAccount.class)
        .add(Restrictions.eq("type", Type.MASTER))
        .uniqueResult())
        .toImmutable();
  }

  @Override
  public Account getOuterAccount() {
    return ((ModifiableAccount) sessionFactory.getCurrentSession()
        .createCriteria(ModifiableAccount.class)
        .add(Restrictions.eq("type", Type.OUTER))
        .uniqueResult())
        .toImmutable();
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
