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
import ru.fess38.finance.model.Currency;

import java.util.UUID;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = AppConfigurationTest.class)
@Transactional
public class CurrencyDaoImplTest {
  @Autowired
  private CurrencyDao currencyDao;
  @Autowired
  private DefaultEntitiesCreator defaultEntitiesCreator;

  @Test
  public void save() throws Exception {
    Currency currency = newCurrency();
    currencyDao.save(currency);
    Assert.assertTrue(currency.getId() != null);
  }

  @Test
  public void delete() throws Exception {
    Currency currency = newCurrency();
    currencyDao.save(currency);
    currencyDao.delete(currency);
    Assert.assertTrue(currency.isDeleted());
  }

  @Test
  public void defaultCurrencies() {
    defaultEntitiesCreator.create();
    Assert.assertEquals(3, currencyDao.find(DetachedCriteria.forClass(Currency.class)).size());
  }

  private Currency newCurrency() {
    Currency currency = new Currency();
    currency.setName(UUID.randomUUID().toString());
    return currency;
  }
}
