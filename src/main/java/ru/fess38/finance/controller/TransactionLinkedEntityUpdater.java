package ru.fess38.finance.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ru.fess38.finance.dao.AccountDao;
import ru.fess38.finance.dao.RubricDao;
import ru.fess38.finance.dao.TagDao;
import ru.fess38.finance.dao.UserDao;
import ru.fess38.finance.model.Account;
import ru.fess38.finance.model.Rubric;
import ru.fess38.finance.model.Tag;
import ru.fess38.finance.model.Transaction;
import ru.fess38.finance.model.User;

@Service
public class TransactionLinkedEntityUpdater {
  @Autowired
  private RubricDao rubricDao;
  @Autowired
  private TagDao tagDao;
  @Autowired
  private UserDao userDao;
  @Autowired
  private AccountDao accountDao;

  public void updateAccountOnSave(Transaction transaction) {
    Account persistedAccountFrom = accountDao.get(transaction.getAccountFrom().getId());
    Account persistedAccountTo = accountDao.get(transaction.getAccountTo().getId());
    persistedAccountFrom.addMoney(-transaction.getAmountFrom());
    persistedAccountTo.addMoney(transaction.getAmountTo());
    persistedAccountFrom.addTransaction();
    persistedAccountTo.addTransaction();
    accountDao.update(persistedAccountFrom);
    accountDao.update(persistedAccountTo);
  }

  public void updateAccountOnUpdate(Transaction persistedTransaction, Transaction transaction) {
    int persistedAmountFrom = persistedTransaction.getAmountFrom();
    int persistedAmountTo = persistedTransaction.getAmountTo();
    int newAmountFrom = transaction.getAmountFrom();
    int newAmountTo = transaction.getAmountTo();

    persistedTransaction.getAccountFrom().addMoney(-newAmountFrom + persistedAmountFrom);
    persistedTransaction.getAccountTo().addMoney(newAmountTo - persistedAmountTo);
    accountDao.update(persistedTransaction.getAccountFrom());
    accountDao.update(persistedTransaction.getAccountTo());
  }

  public void updateAccountOnDelete(Transaction transaction) {
    Account persistedAccountFrom = accountDao.get(transaction.getAccountFrom().getId());
    Account persistedAccountTo = accountDao.get(transaction.getAccountTo().getId());
    persistedAccountFrom.addMoney(transaction.getAmountFrom());
    persistedAccountTo.addMoney(-transaction.getAmountTo());
    persistedAccountFrom.substractTransaction();
    persistedAccountTo.substractTransaction();
    accountDao.update(persistedAccountFrom);
    accountDao.update(persistedAccountTo);
  }

  public void updateRubricOnSave(Transaction transaction) {
    Rubric persistedRubric = rubricDao.get(transaction.getRubric().getId());
    persistedRubric.addTransaction();
    rubricDao.update(persistedRubric);
  }

  public void updateRubricOnDelete(Transaction transaction) {
    Rubric persistedRubric = rubricDao.get(transaction.getRubric().getId());
    persistedRubric.substractTransaction();
    rubricDao.update(persistedRubric);
  }

  public void updateTagOnSave(Transaction transaction) {
    if (transaction.getTag() != null) {
      Tag persistedTag = tagDao.get(transaction.getTag().getId());
      persistedTag.addTransaction();
      tagDao.update(persistedTag);
    }
  }

  public void updateTagOnUpdate(Transaction persistedTransaction, Transaction transaction) {
    Tag oldTag = persistedTransaction.getTag();
    Tag newTag = transaction.getTag();

    if ((oldTag == null && newTag == null) || oldTag.equals(newTag)) {
      return;
    } else {
      if (oldTag != null) {
        Tag persistedTag = tagDao.get(persistedTransaction.getTag().getId());
        persistedTag.substractTransaction();
        tagDao.update(persistedTag);
      }
      if (newTag != null) {
        Tag persistedTag = tagDao.get(transaction.getTag().getId());
        persistedTag.addTransaction();
        tagDao.update(persistedTag);
      }
    }
  }

  public void updateTagOnDelete(Transaction transaction) {
    if (transaction.getTag() != null) {
      Tag persistedTag = tagDao.get(transaction.getTag().getId());
      persistedTag.substractTransaction();
      tagDao.update(persistedTag);
    }
  }

  public void updateUserOnSave(Transaction transaction) {
    if (transaction.getUser() != null) {
      User persistedUser = userDao.get(transaction.getUser().getId());
      persistedUser.addTransaction();
      userDao.update(persistedUser);
    }
  }

  public void updateUserOnUpdate(Transaction persistedTransaction, Transaction transaction) {
    User oldUser = persistedTransaction.getUser();
    User newUser = transaction.getUser();

    if ((oldUser == null && newUser == null) || oldUser.equals(newUser)) {
      return;
    } else {
      if (oldUser != null) {
        User persistedUser = userDao.get(persistedTransaction.getUser().getId());
        persistedUser.substractTransaction();
        userDao.update(persistedUser);
      }
      if (newUser != null) {
        User persistedUser = userDao.get(transaction.getUser().getId());
        persistedUser.addTransaction();
        userDao.update(persistedUser);
      }
    }
  }

  public void updateUserOnDelete(Transaction transaction) {
    if (transaction.getUser() != null) {
      User persistedUser = userDao.get(transaction.getUser().getId());
      persistedUser.substractTransaction();
      userDao.update(persistedUser);
    }
  }
}
