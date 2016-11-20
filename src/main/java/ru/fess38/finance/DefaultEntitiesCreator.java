package ru.fess38.finance;

import org.hibernate.criterion.DetachedCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.fess38.finance.dao.AccountDao;
import ru.fess38.finance.dao.CurrencyDao;
import ru.fess38.finance.dao.RubricDao;
import ru.fess38.finance.model.AbstractAccount.Type;
import ru.fess38.finance.model.Account;
import ru.fess38.finance.model.Currency;
import ru.fess38.finance.model.ModifiableCurrency;
import ru.fess38.finance.model.Rubric;

@Component
public class DefaultEntitiesCreator {
  private RubricDao rubricDao;
  private AccountDao accountDao;
  private CurrencyDao currencyDao;

  public void create() {
    if (currencyDao.find(DetachedCriteria.forClass(ModifiableCurrency.class)).isEmpty()) {
      Currency ruble = currencyDao.save(Currency.of("Рубль", "P"));
      currencyDao.save(Currency.of("Доллар", "$"));
      currencyDao.save(Currency.of("Евро", "€"));
      accountDao.save(Account.of("Наличные средства", ruble).withType(Type.MASTER));
      accountDao.save(Account.of("Внешний счет", ruble).withType(Type.OUTER));
      rubricDao.save(Rubric.of("Перевод между счетами").withIsTransfer(true));
    }
  }

  @Autowired
  public void setRubricDao(RubricDao rubricDao) {
    this.rubricDao = rubricDao;
  }

  @Autowired
  public void setAccountDao(AccountDao accountDao) {
    this.accountDao = accountDao;
  }

  @Autowired
  public void setCurrencyDao(CurrencyDao currencyDao) {
    this.currencyDao = currencyDao;
  }
}
