package ru.fess38.finance.account;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;
import ru.fess38.finance.AppConfigurationTest;
import ru.fess38.finance.currency.Currency;
import ru.fess38.finance.currency.CurrencyDao;
import ru.fess38.finance.rubric.Rubric;
import ru.fess38.finance.rubric.RubricDao;
import ru.fess38.finance.transaction.Transaction;
import ru.fess38.finance.transaction.TransactionDao;
import ru.fess38.finance.util.DefaultEntitiesCreator;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = AppConfigurationTest.class)
@Transactional
public class AccountBalanceCalculatorTest {
  @Autowired
  private AccountDao accountDao;
  @Autowired
  private TransactionDao transactionDao;
  @Autowired
  private CurrencyDao currencyDao;
  @Autowired
  private RubricDao rubricDao;
  @Autowired
  private DefaultEntitiesCreator entitiesCreator;

  @Before
  public void before() {
    entitiesCreator.create();
  }


  @Test
  public void save() {
    Transaction transaction = transactionDao.save(transaction(100, 75));
    balanceCalculator().run();
    transaction = transactionDao.get(transaction.id());
    Assert.assertEquals(-100, transaction.accountFrom().balance());
    Assert.assertEquals(75, transaction.accountTo().balance());
  }

  @Test
  public void update() {
    Transaction transaction = transactionDao.save(transaction(100, 75));
    balanceCalculator().run();
    transactionDao.update(transaction.withAmountFrom(50).withAmountTo(24));
    balanceCalculator().run();
    transaction = transactionDao.get(transaction.id());
    Assert.assertEquals(-50, transaction.accountFrom().balance());
    Assert.assertEquals(24, transaction.accountTo().balance());
  }

  @Test
  public void delete() {
    Transaction transaction = transactionDao.save(transaction(100, 75));
    balanceCalculator().run();
    transactionDao.delete(transaction);
    balanceCalculator().run();
    transaction = transactionDao.get(transaction.id());
    Assert.assertEquals(0, transaction.accountFrom().balance());
    Assert.assertEquals(0, transaction.accountTo().balance());
  }

  private Transaction transaction(int amountFrom, int amountTo) {
    Currency currency = currencyDao.save(Currency.of("c", "c"));
    Rubric rubric = rubricDao.save(Rubric.of("r"));
    Account account1 = accountDao.save(Account.of("a1", currency));
    Account account2 = accountDao.save(Account.of("a1", currency));
    return Transaction.builder()
        .rubric(rubric)
        .accountFrom(account1)
        .accountTo(account2)
        .amountFrom(amountFrom)
        .amountTo(amountTo)
        .build();
  }

  private AccountBalanceCalculator balanceCalculator() {
    AccountBalanceCalculator balanceCalculator = new AccountBalanceCalculator();
    balanceCalculator.setAccountDao(accountDao);
    balanceCalculator.setTransactionDao(transactionDao);
    return balanceCalculator;
  }

}
