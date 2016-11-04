package ru.fess38.finance.dao;

import org.hibernate.criterion.DetachedCriteria;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;
import ru.fess38.finance.AppConfigurationTest;
import ru.fess38.finance.DefaultEntitiesCreator;
import ru.fess38.finance.model.Account;
import ru.fess38.finance.model.Currency;

import java.util.List;
import java.util.UUID;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = AppConfigurationTest.class)
@Transactional
public class AccountDaoImplTest {
  @Autowired
  private AccountDao accountDao;
  @Autowired
  private DefaultEntitiesCreator defaultEntitiesCreator;

  @Test
  public void save() throws Exception {
    Account account = newAccount();
    accountDao.save(account);
    Assert.assertTrue(account.getId() != null);
  }

  @Test
  public void delete() throws Exception {
    Account account = newAccount();
    accountDao.save(account);
    accountDao.delete(account);
    Assert.assertTrue(account.isDeleted());
  }

  @Test
  public void deleteHasTransactions() throws Exception {
    Account account = newAccount();
    account.addTransaction();
    accountDao.save(account);
    accountDao.delete(account);
    Assert.assertFalse(account.isDeleted());
  }

  @Test
  public void find() throws Exception {
    Account account1 = newAccount();
    Account account2 = newAccount();
    Account account3 = newAccount();
    accountDao.save(account1);
    accountDao.save(account2);
    accountDao.save(account3);
    accountDao.delete(account2);
    accountDao.delete(account3);
    List<Account> accounts = accountDao.find(DetachedCriteria.forClass(Account.class));
    Assert.assertEquals(1, accounts.size());
    Assert.assertEquals(account1, accounts.get(0));

  }

  @Test
  public void findDeleted() throws Exception {
    Account account1 = newAccount();
    Account account2 = newAccount();
    Account account3 = newAccount();
    accountDao.save(account1);
    accountDao.save(account2);
    accountDao.save(account3);
    accountDao.delete(account1);
    List<Account> accounts = accountDao.findDeleted(DetachedCriteria.forClass(Account.class));
    Assert.assertEquals(1, accounts.size());
    Assert.assertEquals(account1, accounts.get(0));
  }

  @Test
  public void getMasterAccount() throws Exception {
    defaultEntitiesCreator.create();
    Assert.assertTrue(accountDao.getMasterAccount() != null);
  }

  @Test
  public void getOuterAccount() throws Exception {
    defaultEntitiesCreator.create();
    Assert.assertTrue(accountDao.getOuterAccount() != null);
  }

  private Account newAccount() {
    Currency currency = new Currency();
    currency.setName("foo");
    currency.setSymbol("b");

    Account account = new Account();
    account.setName(UUID.randomUUID().toString());
    account.setCurrency(currency);
    return account;
  }
}
