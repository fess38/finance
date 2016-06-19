package ru.fess38.finance.dao;


import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import ru.fess38.finance.TestUtils;
import ru.fess38.finance.model.Currency;


public class CurrencyDaoImplTest {
	private static ClassPathXmlApplicationContext ctx;
	private static CurrencyDao currencyDao;

	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
		ctx = TestUtils.getTestContest();
		currencyDao = ctx.getBean(CurrencyDao.class);
	}

	@Test
	public void testSaveGet() {
		Currency expectedCurrency = TestUtils.mockCurrency();
		Long id = currencyDao.save(expectedCurrency);
		Currency actualCurrency = currencyDao.get(id);
		Assert.assertEquals(expectedCurrency, actualCurrency);
	}

	@Test
	public void testUpdate() {
		Currency expectedCurrency = TestUtils.mockCurrency();
		currencyDao.save(expectedCurrency);
		expectedCurrency.setName("ruble");
		currencyDao.update(expectedCurrency);
		Currency actualCurrency = currencyDao.get(expectedCurrency.getId());
		Assert.assertEquals(expectedCurrency, actualCurrency);
	}

	@Test
	public void testDelete() {
		Currency currency = TestUtils.mockCurrency();
		currencyDao.save(currency);
		currencyDao.delete(currency);
		Currency actualCurrency = currencyDao.get(currency.getId());
		Assert.assertTrue(actualCurrency.isDeleted());
	}

	@Test
	public void testFind() {
		Currency currency1 = TestUtils.mockCurrency();
		Currency currency2 = TestUtils.mockCurrency();
		currencyDao.save(currency1);
		currencyDao.save(currency2);
		List<Currency> expectedCurrencies = Arrays.asList(currency1, currency2);
		List<Currency> actualCurrencies = currencyDao.find(DetachedCriteria.forClass(Currency.class)
			.add(Restrictions.in("id", Arrays.asList(currency1.getId(), currency2.getId()))));
		actualCurrencies.sort(Comparator.comparing(Currency::getId));
		Assert.assertEquals(expectedCurrencies, actualCurrencies);
	}
}
