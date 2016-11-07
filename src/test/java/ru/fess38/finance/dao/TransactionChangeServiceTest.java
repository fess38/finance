package ru.fess38.finance.dao;

import org.junit.Assert;
import org.junit.Test;
import org.mockito.Mockito;
import ru.fess38.finance.model.Account;
import ru.fess38.finance.model.Rubric;
import ru.fess38.finance.model.Tag;
import ru.fess38.finance.model.Transaction;
import ru.fess38.finance.model.User;

public class TransactionChangeServiceTest {
  @Test
  public void save() throws Exception {
    int amount = 50;
    int amountTransactions = 2;
    Transaction t = transaction(amount);
    TransactionChangeService service = transactionChangeService(t.getAccountFrom(),
        t.getAccountTo(), t.getRubric(), t.getTag(), null, t.getUser(), null);

    service.save(t);
    Assert.assertEquals(amountTransactions, t.getAccountFrom().getAmountTransactions());
    Assert.assertEquals(-amount, t.getAccountFrom().getBalance());
    Assert.assertEquals(amountTransactions, t.getAccountTo().getAmountTransactions());
    Assert.assertEquals(amount, t.getAccountTo().getBalance());
    Assert.assertEquals(amountTransactions, t.getRubric().getAmountTransactions());
    Assert.assertEquals(amountTransactions, t.getTag().getAmountTransactions());
    Assert.assertEquals(amountTransactions, t.getUser().getAmountTransactions());
  }

  @Test
  public void saveWithoutTagUser() throws Exception {
    int amount = 50;
    int amountTransactions = 2;
    Transaction t = transaction(amount);
    t.setTag(null);
    t.setUser(null);
    TransactionChangeService service = transactionChangeService(t.getAccountFrom(),
        t.getAccountTo(), t.getRubric(), t.getTag(), t.getUser());

    service.save(t);
    Assert.assertEquals(amountTransactions, t.getAccountFrom().getAmountTransactions());
    Assert.assertEquals(-amount, t.getAccountFrom().getBalance());
    Assert.assertEquals(amountTransactions, t.getAccountTo().getAmountTransactions());
    Assert.assertEquals(amount, t.getAccountTo().getBalance());
    Assert.assertEquals(amountTransactions, t.getRubric().getAmountTransactions());
  }

  @Test
  public void updateAmount() throws Exception {
    Transaction before = transaction(50);
    Transaction after = transaction(10);
    TransactionChangeService service = transactionChangeService(before.getAccountFrom(),
        before.getAccountTo(), before.getRubric(), before.getTag(), before.getUser());
    service.update(before, after);

    Assert.assertEquals(40, before.getAccountFrom().getBalance());
    Assert.assertEquals(-40, before.getAccountTo().getBalance());
  }

  @Test
  public void updateNotTag() throws Exception {
    Transaction before = transaction(0);
    before.setTag(null);
    Transaction after = transaction(0);
    after.setTag(null);
    TransactionChangeService service = transactionChangeService(before.getAccountFrom(),
        before.getAccountTo(), before.getRubric(), before.getTag(), before.getUser());
    service.update(before, after);

    Assert.assertEquals(before, after);
  }

  @Test
  public void updateAddTag() throws Exception {
    Transaction before = transaction(0);
    before.setTag(null);
    Transaction after = transaction(0);
    after.getTag().setId(301L);
    TransactionChangeService service = transactionChangeService(before.getAccountFrom(),
        before.getAccountTo(), before.getRubric(), before.getTag(), after.getTag(), before
            .getUser(), after.getUser());
    service.update(before, after);

    Assert.assertEquals(2, after.getTag().getAmountTransactions());
  }

  @Test
  public void updateDeleteTag() throws Exception {
    Transaction before = transaction(0);
    Transaction after = transaction(0);
    after.setTag(null);
    TransactionChangeService service = transactionChangeService(before.getAccountFrom(),
        before.getAccountTo(), before.getRubric(), before.getTag(), before.getUser());
    service.update(before, after);

    Assert.assertEquals(0, before.getTag().getAmountTransactions());
  }

  @Test
  public void updateAddUser() throws Exception {
    Transaction before = transaction(0);
    before.setUser(null);
    Transaction after = transaction(0);
    after.getUser().setId(401L);
    TransactionChangeService service = transactionChangeService(before.getAccountFrom(),
        before.getAccountTo(), before.getRubric(), before.getTag(), after.getTag(), before
            .getUser(), after.getUser());
    service.update(before, after);

    Assert.assertEquals(2, after.getUser().getAmountTransactions());
  }

  @Test
  public void updateDeleteUser() throws Exception {
    Transaction before = transaction(0);
    Transaction after = transaction(0);
    after.setUser(null);
    TransactionChangeService service = transactionChangeService(before.getAccountFrom(),
        before.getAccountTo(), before.getRubric(), before.getTag(), before.getUser());
    service.update(before, after);

    Assert.assertEquals(0, before.getUser().getAmountTransactions());
  }

  @Test
  public void updateSameTagUser() throws Exception {
    Transaction before = transaction(0);
    Transaction after = transaction(0);
    TransactionChangeService service = transactionChangeService(before.getAccountFrom(),
        before.getAccountTo(), before.getRubric(), before.getTag(), before.getUser());
    service.update(before, after);

    Assert.assertEquals(1, before.getTag().getAmountTransactions());
    Assert.assertEquals(1, before.getUser().getAmountTransactions());
  }

  @Test
  public void delete() throws Exception {
    int amount = 50;
    int amountTransactions = 0;
    Transaction t = transaction(amount);
    TransactionChangeService service = transactionChangeService(t.getAccountFrom(),
        t.getAccountTo(), t.getRubric(), t.getTag(), t.getUser());
    service.delete(t);
    Assert.assertEquals(amountTransactions, t.getAccountFrom().getAmountTransactions());
    Assert.assertEquals(amount, t.getAccountFrom().getBalance());
    Assert.assertEquals(amountTransactions, t.getAccountTo().getAmountTransactions());
    Assert.assertEquals(-amount, t.getAccountTo().getBalance());
    Assert.assertEquals(amountTransactions, t.getRubric().getAmountTransactions());
    Assert.assertEquals(amountTransactions, t.getTag().getAmountTransactions());
    Assert.assertEquals(amountTransactions, t.getUser().getAmountTransactions());
  }

  @Test
  public void deleteWithoutTagUser() throws Exception {
    int amount = 50;
    int amountTransactions = 0;
    Transaction t = transaction(amount);
    t.setTag(null);
    t.setUser(null);
    TransactionChangeService service = transactionChangeService(t.getAccountFrom(),
        t.getAccountTo(), t.getRubric(), t.getTag(), t.getUser());
    service.delete(t);
    Assert.assertEquals(amountTransactions, t.getAccountFrom().getAmountTransactions());
    Assert.assertEquals(amount, t.getAccountFrom().getBalance());
    Assert.assertEquals(amountTransactions, t.getAccountTo().getAmountTransactions());
    Assert.assertEquals(-amount, t.getAccountTo().getBalance());
    Assert.assertEquals(amountTransactions, t.getRubric().getAmountTransactions());
  }

  private Transaction transaction(int amount) {
    Account accountFrom = new Account();
    accountFrom.setId(100L);
    accountFrom.addTransaction();
    Account accountTo = new Account();
    accountTo.setId(101L);
    accountTo.addTransaction();

    Rubric rubric = new Rubric();
    rubric.setId(200L);
    rubric.addTransaction();

    Tag tag = new Tag();
    tag.setId(300L);
    tag.addTransaction();

    User user = new User();
    user.setId(400L);
    user.addTransaction();

    Transaction transaction = new Transaction();
    transaction.setId(1L);
    transaction.setAccountFrom(accountFrom);
    transaction.setAccountTo(accountTo);
    transaction.setAmountFrom(amount);
    transaction.setAmountTo(amount);
    transaction.setRubric(rubric);
    transaction.setTag(tag);
    transaction.setUser(user);

    return transaction;
  }

  private TransactionChangeService transactionChangeService(Account accountFrom, Account accountTo,
      Rubric rubric, Tag tag, User user) {
    return transactionChangeService(accountFrom, accountTo, rubric, tag, null, user, null);
  }

  private TransactionChangeService transactionChangeService(Account accountFrom, Account accountTo,
      Rubric rubric, Tag tag1, Tag tag2, User user1, User user2) {
    AccountDao accountDao = Mockito.mock(AccountDao.class);
    Mockito.when(accountDao.get(Mockito.anyLong())).thenReturn(accountFrom, accountTo);
    Mockito.doAnswer(invocationOnMock -> null).when(accountDao).update(Mockito.any(Account.class));

    RubricDao rubricDao = Mockito.mock(RubricDao.class);
    Mockito.when(rubricDao.get(Mockito.anyLong())).thenReturn(rubric);
    Mockito.doAnswer(invocationOnMock -> null).when(rubricDao).update(Mockito.any(Rubric.class));

    TagDao tagDao = Mockito.mock(TagDao.class);
    Mockito.when(tagDao.get(300L)).thenReturn(tag1);
    Mockito.when(tagDao.get(301L)).thenReturn(tag2);
    Mockito.doAnswer(invocationOnMock -> null).when(tagDao).update(Mockito.any(Tag.class));

    UserDao userDao = Mockito.mock(UserDao.class);
    Mockito.when(userDao.get(400L)).thenReturn(user1);
    Mockito.when(userDao.get(401L)).thenReturn(user2);
    Mockito.doAnswer(invocationOnMock -> null).when(userDao).update(Mockito.any(User.class));

    TransactionChangeService service = new TransactionChangeService();
    service.setAccountDao(accountDao);
    service.setRubricDao(rubricDao);
    service.setTagDao(tagDao);
    service.setUserDao(userDao);

    return service;
  }
}
