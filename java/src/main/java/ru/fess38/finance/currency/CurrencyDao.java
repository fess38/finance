package ru.fess38.finance.currency;

import org.hibernate.criterion.DetachedCriteria;

import java.util.List;

public interface CurrencyDao {
  Currency save(Currency currency);

  Currency get(long id);

  Currency update(Currency currency);

  Currency delete(Currency currency);

  List<Currency> find(DetachedCriteria detachedCriteria);

  List<Currency> findDeleted(DetachedCriteria detachedCriteria);

  DetachedCriteria detachedCriteria();
}
