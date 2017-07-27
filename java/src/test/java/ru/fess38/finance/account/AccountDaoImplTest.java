package ru.fess38.finance.account;

import org.hibernate.criterion.DetachedCriteria;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;
import ru.fess38.finance.AppConfigurationTest;
import ru.fess38.finance.account.AbstractAccount.Type;
import ru.fess38.finance.currency.Currency;
import ru.fess38.finance.currency.CurrencyDao;
import ru.fess38.finance.util.DefaultEntitiesCreator;

import java.util.List;
import java.util.UUID;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = AppConfigurationTest.class)
@Transactional
public class AccountDaoImplTest {
  @Autowired
  private AccountDao accountDao;
  @Autowired
  private CurrencyDao currencyDao;
  @Autowired
  private DefaultEntitiesCreator defaultEntitiesCreator;

  @Test
  public void save() throws Exception {
    Assert.assertTrue(accountDao.save(newAccount()).id() != 0);
  }

  @Test
  public void delete() throws Exception {
    Assert.assertTrue(accountDao.delete(accountDao.save(newAccount())).isDeleted());
  }

  @Test
  public void deleteMaster() throws Exception {
    Assert.assertFalse(accountDao.delete(accountDao.save(newAccount().withType(Type.MASTER)))
        .isDeleted());
  }

  @Test
  public void find() throws Exception {
    Account account1 = accountDao.save(newAccount());
    accountDao.delete(accountDao.save(newAccount()));
    accountDao.delete(accountDao.save(newAccount()));
    List<Account> accounts = accountDao.find(DetachedCriteria.forClass(ModifiableAccount.class));
    Assert.assertEquals(1, accounts.size());
    Assert.assertEquals(account1, accounts.get(0));

  }

  @Test
  public void findDeleted() throws Exception {
    Account account1 = accountDao.delete(accountDao.save(newAccount()));
    accountDao.save(newAccount());
    accountDao.save(newAccount());
    List<Account> accounts = accountDao.findDeleted(
        DetachedCriteria.forClass(ModifiableAccount.class));
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
    Currency currency = currencyDao.save(Currency.of("foo", "b"));
    return Account.builder().name(UUID.randomUUID().toString()).currency(currency).build();
  }
}
