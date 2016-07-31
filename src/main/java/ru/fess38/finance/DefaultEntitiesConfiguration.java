package ru.fess38.finance;

import org.hibernate.criterion.DetachedCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

import ru.fess38.finance.dao.AccountDao;
import ru.fess38.finance.dao.CurrencyDao;
import ru.fess38.finance.dao.RubricDao;
import ru.fess38.finance.model.Account;
import ru.fess38.finance.model.AccountType;
import ru.fess38.finance.model.Currency;
import ru.fess38.finance.model.Rubric;

import javax.annotation.PostConstruct;


@Configuration
public class DefaultEntitiesConfiguration {
  @Autowired
  private RubricDao rubricDao;
  @Autowired
  private AccountDao accountDao;
  @Autowired
  private CurrencyDao currencyDao;

  @PostConstruct
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
    masterAccount.setName("Мастер счет");
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
    transferRubric.setIsIncome(false);
    transferRubric.setService(true);
    rubricDao.save(transferRubric);
  }
}
