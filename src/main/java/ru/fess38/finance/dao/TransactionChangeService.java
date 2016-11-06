package ru.fess38.finance.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import ru.fess38.finance.model.Account;
import ru.fess38.finance.model.Rubric;
import ru.fess38.finance.model.Tag;
import ru.fess38.finance.model.Transaction;
import ru.fess38.finance.model.User;

import java.util.Objects;

@Repository
public class TransactionChangeService {
  private AccountDao accountDao;
  private RubricDao rubricDao;
  private TagDao tagDao;
  private UserDao userDao;

  public void save(Transaction transaction) {
    updateAccountOnSave(transaction);
    updateRubricOnSave(transaction);
    updateTagOnSave(transaction);
    updateUserOnSave(transaction);
  }

  private void updateAccountOnSave(Transaction transaction) {
    Account persistedAccountFrom = accountDao.get(transaction.getAccountFrom().getId());
    Account persistedAccountTo = accountDao.get(transaction.getAccountTo().getId());
    persistedAccountFrom.addMoney(-transaction.getAmountFrom());
    persistedAccountTo.addMoney(transaction.getAmountTo());
    persistedAccountFrom.addTransaction();
    persistedAccountTo.addTransaction();
    accountDao.update(persistedAccountFrom);
    accountDao.update(persistedAccountTo);
  }

  private void updateRubricOnSave(Transaction transaction) {
    Rubric persistedRubric = rubricDao.get(transaction.getRubric().getId());
    persistedRubric.addTransaction();
    rubricDao.update(persistedRubric);
  }

  private void updateTagOnSave(Transaction transaction) {
    if (transaction.getTag() != null) {
      Tag persistedTag = tagDao.get(transaction.getTag().getId());
      persistedTag.addTransaction();
      tagDao.update(persistedTag);
    }
  }

  private void updateUserOnSave(Transaction transaction) {
    if (transaction.getUser() != null) {
      User persistedUser = userDao.get(transaction.getUser().getId());
      persistedUser.addTransaction();
      userDao.update(persistedUser);
    }
  }

  public void update(Transaction savedTransaction, Transaction transaction) {
    updateAccountOnUpdate(savedTransaction, transaction);
    updateTagOnUpdate(savedTransaction, transaction);
    updateUserOnUpdate(savedTransaction, transaction);
  }

  private void updateAccountOnUpdate(Transaction persistedTransaction, Transaction transaction) {
    int persistedAmountFrom = persistedTransaction.getAmountFrom();
    int persistedAmountTo = persistedTransaction.getAmountTo();
    int newAmountFrom = transaction.getAmountFrom();
    int newAmountTo = transaction.getAmountTo();

    persistedTransaction.getAccountFrom().addMoney(-newAmountFrom + persistedAmountFrom);
    persistedTransaction.getAccountTo().addMoney(newAmountTo - persistedAmountTo);
    accountDao.update(persistedTransaction.getAccountFrom());
    accountDao.update(persistedTransaction.getAccountTo());
  }

  private void updateTagOnUpdate(Transaction persistedTransaction, Transaction transaction) {
    Tag oldTag = persistedTransaction.getTag();
    Tag newTag = transaction.getTag();

    if ((oldTag != null || newTag != null) && !Objects.equals(oldTag, newTag)) {
      if (oldTag != null) {
        Tag persistedTag = tagDao.get(oldTag.getId());
        persistedTag.subtractTransaction();
        tagDao.update(persistedTag);
      }
      if (newTag != null) {
        Tag persistedTag = tagDao.get(newTag.getId());
        persistedTag.addTransaction();
        tagDao.update(persistedTag);
      }
    }
  }

  private void updateUserOnUpdate(Transaction persistedTransaction, Transaction transaction) {
    User oldUser = persistedTransaction.getUser();
    User newUser = transaction.getUser();

    if ((oldUser != null || newUser != null) && !Objects.equals(oldUser, newUser)) {
      if (oldUser != null) {
        User persistedUser = userDao.get(oldUser.getId());
        persistedUser.subtractTransaction();
        userDao.update(persistedUser);
      }
      if (newUser != null) {
        User persistedUser = userDao.get(newUser.getId());
        persistedUser.addTransaction();
        userDao.update(persistedUser);
      }
    }
  }

  public void delete(Transaction transaction) {
    updateAccountOnDelete(transaction);
    updateRubricOnDelete(transaction);
    updateTagOnDelete(transaction);
    updateUserOnDelete(transaction);
  }

  private void updateAccountOnDelete(Transaction transaction) {
    Account persistedAccountFrom = accountDao.get(transaction.getAccountFrom().getId());
    Account persistedAccountTo = accountDao.get(transaction.getAccountTo().getId());
    persistedAccountFrom.addMoney(transaction.getAmountFrom());
    persistedAccountTo.addMoney(-transaction.getAmountTo());
    persistedAccountFrom.subtractTransaction();
    persistedAccountTo.subtractTransaction();
    accountDao.update(persistedAccountFrom);
    accountDao.update(persistedAccountTo);
  }

  private void updateRubricOnDelete(Transaction transaction) {
    Rubric persistedRubric = rubricDao.get(transaction.getRubric().getId());
    persistedRubric.subtractTransaction();
    rubricDao.update(persistedRubric);
  }


  private void updateTagOnDelete(Transaction transaction) {
    if (transaction.getTag() != null) {
      Tag persistedTag = tagDao.get(transaction.getTag().getId());
      persistedTag.subtractTransaction();
      tagDao.update(persistedTag);
    }
  }

  private void updateUserOnDelete(Transaction transaction) {
    if (transaction.getUser() != null) {
      User persistedUser = userDao.get(transaction.getUser().getId());
      persistedUser.subtractTransaction();
      userDao.update(persistedUser);
    }
  }

  @Autowired
  public void setAccountDao(AccountDao accountDao) {
    this.accountDao = accountDao;
  }

  @Autowired
  public void setRubricDao(RubricDao rubricDao) {
    this.rubricDao = rubricDao;
  }

  @Autowired
  public void setTagDao(TagDao tagDao) {
    this.tagDao = tagDao;
  }

  @Autowired
  public void setUserDao(UserDao userDao) {
    this.userDao = userDao;
  }
}
