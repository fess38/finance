package ru.fess38.finance.dao;

import ru.fess38.finance.model.Account;

public interface AccountDao extends GenericDao<Account> {
  Account getMasterAccount();

  Account getOuterAccount();
}
