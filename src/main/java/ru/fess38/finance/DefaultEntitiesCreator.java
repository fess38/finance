package ru.fess38.finance;

import org.hibernate.criterion.DetachedCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.fess38.finance.dao.AccountDao;
import ru.fess38.finance.dao.CurrencyDao;
import ru.fess38.finance.dao.RubricDao;
import ru.fess38.finance.model.Account;
import ru.fess38.finance.model.Account.AccountType;
import ru.fess38.finance.model.Currency;
import ru.fess38.finance.model.Rubric;

@Component
public class DefaultEntitiesCreator {
  private RubricDao rubricDao;
  private AccountDao accountDao;
  private CurrencyDao currencyDao;

  public void create() {
    if (currencyDao.find(DetachedCriteria.forClass(Currency.class)).isEmpty()) {
      createCurrenciesAndAccounts();
      createTransferRubric();
    }
  }

  private void createCurrenciesAndAccounts() {
    Currency ruble = new Currency();
    ruble.setName("Рубль");
    ruble.setSymbol("P");
    currencyDao.save(ruble);

    Currency dollar = new Currency();
    dollar.setName("Доллар");
    dollar.setSymbol("$");
    currencyDao.save(dollar);

    Currency euro = new Currency();
    euro.setName("Евро");
    euro.setSymbol("€");
    currencyDao.save(euro);

    Account masterAccount = new Account();
    masterAccount.setName("Наличные средства");
    masterAccount.setCurrency(ruble);
    masterAccount.setType(AccountType.MASTER);
    accountDao.save(masterAccount);

    Account outerAccount = new Account();
    outerAccount.setName("Внешний счет");
    outerAccount.setCurrency(ruble);
    outerAccount.setType(AccountType.OUTER);
    accountDao.save(outerAccount);
  }

  private void createTransferRubric() {
    Rubric transferRubric = new Rubric();
    transferRubric.setName("Перевод между счетами");
    transferRubric.setIncome(false);
    transferRubric.setTransfer(true);
    rubricDao.save(transferRubric);
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
