package ru.fess38.finance.account;

import org.hibernate.criterion.DetachedCriteria;

import java.util.List;

public interface AccountDao {
  Account save(Account account);

  Account get(long id);

  Account update(Account account);

  Account delete(Account account);

  List<Account> find(DetachedCriteria detachedCriteria);

  List<Account> findDeleted(DetachedCriteria detachedCriteria);

  DetachedCriteria detachedCriteria();

  Account getMasterAccount();

  Account getOuterAccount();
}
