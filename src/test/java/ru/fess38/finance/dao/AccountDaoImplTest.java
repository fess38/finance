package ru.fess38.finance.dao;


import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

import org.hibernate.criterion.DetachedCriteria;
import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import ru.fess38.finance.TestUtils;
import ru.fess38.finance.model.Account;
import ru.fess38.finance.model.Currency;


public class AccountDaoImplTest {
	private static ClassPathXmlApplicationContext ctx;
	private static AccountDao accountDao;
	private static Currency currency;

	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
		ctx = TestUtils.getTestContest();
		accountDao = ctx.getBean(AccountDao.class);
		currency = ctx.getBean(CurrencyDao.class)
			.find(DetachedCriteria.forClass(Currency.class))
			.get(0);
	}

	private Account mockAccount() {
		return TestUtils.mockAccount(currency);
	}

	@Test
	public void testSaveGet() {
		Account expectedAccount = mockAccount();
		Long id = accountDao.save(expectedAccount);
		Account actualAccount = accountDao.get(id);
		Assert.assertEquals(expectedAccount, actualAccount);
	}

	@Test
	public void testUpdate() {
		Account expectedAccount = mockAccount();
		accountDao.save(expectedAccount);
		expectedAccount.setName("Досуг");
		accountDao.update(expectedAccount);
		Account actualAccount = accountDao.get(expectedAccount.getId());
		Assert.assertEquals(expectedAccount, actualAccount);
	}

	@Test
	public void testDelete() {
		Account account = mockAccount();
		accountDao.save(account);
		accountDao.delete(account);
		Account actualAccount = accountDao.get(account.getId());
		Assert.assertTrue(actualAccount.isDeleted());
	}

	@Test
	public void testFind() {
		Account account1 = mockAccount();
		Account account2 = mockAccount();
		accountDao.save(account1);
		accountDao.save(account2);
		List<Account> expectedAccounts = Arrays.asList(account1, account2);
		List<Account> actualAccounts = accountDao.find(DetachedCriteria.forClass(Account.class));
		actualAccounts.sort(Comparator.comparing(Account::getId));
		Assert.assertEquals(expectedAccounts, actualAccounts);
	}

	@Test
	public void testGetMasterAccount() {
		Assert.assertNotNull(accountDao.getMasterAccount());
	}

	@Test
	public void testGetOuterAccount() {
		Assert.assertNotNull(accountDao.getOuterAccount());
	}

}
