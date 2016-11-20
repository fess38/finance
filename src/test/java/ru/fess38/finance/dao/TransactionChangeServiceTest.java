package ru.fess38.finance.dao;

import org.junit.Assert;
import org.junit.Test;
import org.mockito.Mockito;
import ru.fess38.finance.model.Account;
import ru.fess38.finance.model.Currency;
import ru.fess38.finance.model.Rubric;
import ru.fess38.finance.model.Transaction;

public class TransactionChangeServiceTest {
  @Test
  public void save() throws Exception {
    int amount = 50;
    Transaction transaction = transaction(amount);
    TransactionChangeService service = transactionChangeService(transaction.accountFrom(),
        transaction.accountTo());

    transaction = service.save(transaction);
    Assert.assertEquals(-amount, transaction.accountFrom().balance());
    Assert.assertEquals(amount, transaction.accountTo().balance());
  }

  @Test
  public void update() throws Exception {
    Transaction before = transaction(50);
    Transaction after = transaction(10);
    TransactionChangeService service = transactionChangeService(before.accountFrom(),
        before.accountTo());
    after = service.update(before, after);

    Assert.assertEquals(40, after.accountFrom().balance());
    Assert.assertEquals(-40, after.accountTo().balance());
  }

  @Test
  public void delete() throws Exception {
    int amount = 50;
    Transaction transaction = transaction(amount);
    TransactionChangeService service = transactionChangeService(transaction.accountFrom(),
        transaction.accountTo());
    transaction = service.delete(transaction);
    Assert.assertEquals(amount, transaction.accountFrom().balance());
    Assert.assertEquals(-amount, transaction.accountTo().balance());
  }

  private Transaction transaction(int amount) {
    Currency currency = Currency.of("r", "r");
    Account accountFrom = Account.builder().id(100L).name("a1").currency(currency).build();
    Account accountTo = Account.builder().id(101L).name("a2").currency(currency).build();
    Rubric rubric = Rubric.builder().id(200L).amountTransactions(1).name("r").build();

    return Transaction.builder().id(1L)
        .accountFrom(accountFrom)
        .accountTo(accountTo)
        .amountFrom(amount)
        .amountTo(amount)
        .rubric(rubric)
        .build();
  }

  private TransactionChangeService transactionChangeService(Account accountFrom,
      Account accountTo) {
    AccountDao accountDao = Mockito.mock(AccountDao.class);
    Mockito.when(accountDao.get(100L)).thenReturn(accountFrom);
    Mockito.when(accountDao.get(101L)).thenReturn(accountTo);
    Mockito.doAnswer(invocationOnMock -> invocationOnMock.getArguments()[0]).when(accountDao)
        .update(Mockito.any(Account.class));

    return new TransactionChangeService(accountDao);
  }
}
