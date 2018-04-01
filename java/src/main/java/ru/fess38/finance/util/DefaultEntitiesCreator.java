package ru.fess38.finance.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.fess38.finance.account.AbstractAccount.Type;
import ru.fess38.finance.account.Account;
import ru.fess38.finance.account.AccountDao;
import ru.fess38.finance.currency.Currency;
import ru.fess38.finance.currency.CurrencyDao;
import ru.fess38.finance.rubric.Rubric;
import ru.fess38.finance.rubric.RubricDao;

@Component
public class DefaultEntitiesCreator {
  private RubricDao rubricDao;
  private AccountDao accountDao;
  private CurrencyDao currencyDao;

  public void create() {
    if (currencyDao.find(currencyDao.detachedCriteria()).isEmpty()) {
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
