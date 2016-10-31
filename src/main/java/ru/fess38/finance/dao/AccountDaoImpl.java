package ru.fess38.finance.dao;

import org.hibernate.SessionFactory;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.fess38.finance.DatabaseChangeFlag;
import ru.fess38.finance.model.Account;
import ru.fess38.finance.model.Account.AccountType;

import java.util.List;

@Repository
@Transactional
public class AccountDaoImpl implements AccountDao {
  @Autowired
  private SessionFactory sessionFactory;
  @Autowired
  private DatabaseChangeFlag databaseChangeFlag;

  @Override
  public Long save(Account account) {
    Long id = (Long) sessionFactory.getCurrentSession().save(account);
    databaseChangeFlag.setTrue();
    return id;
  }

  @Override
  public Account get(Long id) {
    return sessionFactory.getCurrentSession().get(Account.class, id);
  }

  @Override
  public void update(Account account) {
    sessionFactory.getCurrentSession().update(account);
    databaseChangeFlag.setTrue();
  }

  @Override
  public void delete(Account account) {
    Account savedAccount = get(account.getId());
    if (!savedAccount.hasTransactions() && savedAccount.getType() == AccountType.DEFAULT) {
      savedAccount.setDeleted(true);
      update(savedAccount);
    }
  }

  @SuppressWarnings("unchecked")
  @Override
  public List<Account> find(DetachedCriteria detachedCriteria) {
    return commonFind(notDeleted(detachedCriteria), sessionFactory);
  }

  @SuppressWarnings("unchecked")
  @Override
  public List<Account> findDeleted(DetachedCriteria detachedCriteria) {
    return commonFind(deleted(detachedCriteria), sessionFactory);
  }

  @Override
  public Account getMasterAccount() {
    return (Account) sessionFactory.getCurrentSession()
        .createCriteria(Account.class)
        .add(Restrictions.eq("type", AccountType.MASTER))
        .uniqueResult();
  }

  @Override
  public Account getOuterAccount() {
    return (Account) sessionFactory.getCurrentSession()
        .createCriteria(Account.class)
        .add(Restrictions.eq("type", AccountType.OUTER))
        .uniqueResult();
  }
}
