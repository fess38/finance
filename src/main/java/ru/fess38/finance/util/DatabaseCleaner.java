package ru.fess38.finance.util;

import org.hibernate.criterion.DetachedCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.fess38.finance.dao.AccountDao;
import ru.fess38.finance.dao.RubricDao;
import ru.fess38.finance.dao.TagDao;
import ru.fess38.finance.dao.TransactionDao;
import ru.fess38.finance.dao.UserDao;
import ru.fess38.finance.model.Account;
import ru.fess38.finance.model.Rubric;
import ru.fess38.finance.model.Tag;
import ru.fess38.finance.model.Transaction;
import ru.fess38.finance.model.User;

@Component
public class DatabaseCleaner {
  @Autowired
  private AccountDao accountDao;
  @Autowired
  private RubricDao rubricDao;
  @Autowired
  private TagDao tagDao;
  @Autowired
  private TransactionDao transactionDao;
  @Autowired
  private UserDao userDao;

  public void clean() {
    transactionDao.find(DetachedCriteria.forClass(Transaction.class)).forEach(
        transactionDao::delete);
    accountDao.find(DetachedCriteria.forClass(Account.class)).forEach(accountDao::delete);
    rubricDao.find(DetachedCriteria.forClass(Rubric.class)).forEach(rubricDao::delete);
    tagDao.find(DetachedCriteria.forClass(Tag.class)).forEach(tagDao::delete);
    userDao.find(DetachedCriteria.forClass(User.class)).forEach(userDao::delete);
  }
}
