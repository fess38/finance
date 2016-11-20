package ru.fess38.finance.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import ru.fess38.finance.model.Account;
import ru.fess38.finance.model.Transaction;

@Repository
public class TransactionChangeService {
  @Autowired
  public TransactionChangeService(AccountDao accountDao) {
    this.accountDao = accountDao;
  }

  private final AccountDao accountDao;

  public Transaction save(Transaction transaction) {
    Account updatedAccountFrom = accountDao.get(transaction.accountFrom().id())
        .addMoney(-transaction.amountFrom());
    accountDao.update(updatedAccountFrom);
    Account updatedAccountTo = accountDao.get(transaction.accountTo().id())
        .addMoney(transaction.amountTo());
    accountDao.update(updatedAccountTo);
    return transaction.withAccountFrom(updatedAccountFrom).withAccountTo(updatedAccountTo);
  }

  public Transaction update(Transaction before, Transaction after) {
    int persistedAmountFrom = before.amountFrom();
    int persistedAmountTo = before.amountTo();
    int newAmountFrom = after.amountFrom();
    int newAmountTo = after.amountTo();

    Account updatedAccountFrom = accountDao.update(before.accountFrom()
        .addMoney(persistedAmountFrom - newAmountFrom));
    Account updatedAccountTo = accountDao.update(before.accountTo()
        .addMoney(-persistedAmountTo + newAmountTo));
    return before.withAccountFrom(updatedAccountFrom).withAccountTo(updatedAccountTo);
  }

  public Transaction delete(Transaction transaction) {
    Account updatedAccountFrom = accountDao.get(transaction.accountFrom().id())
        .addMoney(transaction.amountFrom());
    updatedAccountFrom = accountDao.update(updatedAccountFrom);

    Account updatedAccountTo = accountDao.get(transaction.accountTo().id())
        .addMoney(-transaction.amountTo());
    updatedAccountTo = accountDao.update(updatedAccountTo);
    return transaction.withAccountFrom(updatedAccountFrom).withAccountTo(updatedAccountTo);
  }
}
