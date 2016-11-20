package ru.fess38.finance.dao;

import org.hibernate.SessionFactory;
import org.hibernate.criterion.DetachedCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.fess38.finance.DatabaseEventListener;
import ru.fess38.finance.model.Currency;
import ru.fess38.finance.model.ModifiableCurrency;

import java.util.List;
import java.util.stream.Collectors;

@Repository
@Transactional
public class CurrencyDaoImpl implements CurrencyDao {
  private SessionFactory sessionFactory;
  private DatabaseEventListener databaseEventListener;

  @Override
  public Currency save(Currency currency) {
    return update(currency);
  }

  @Override
  public Currency get(long id) {
    return sessionFactory.getCurrentSession().get(ModifiableCurrency.class, id).toImmutable();
  }

  @Override
  public Currency update(Currency currency) {
    ModifiableCurrency modifiableCurrency = (ModifiableCurrency) sessionFactory.getCurrentSession()
        .merge(currency.toModifiable());
    databaseEventListener.setChangeTrue();
    return modifiableCurrency.toImmutable();
  }

  @Override
  public Currency delete(Currency currency) {
    return update(currency.withIsDeleted(true));
  }

  @SuppressWarnings("unchecked")
  @Override
  public List<Currency> find(DetachedCriteria detachedCriteria) {
    return commonFind(notDeleted(detachedCriteria), sessionFactory).stream()
        .map(x -> (ModifiableCurrency) x)
        .map(ModifiableCurrency::toImmutable)
        .collect(Collectors.toList());
  }

  @SuppressWarnings("unchecked")
  @Override
  public List<Currency> findDeleted(DetachedCriteria detachedCriteria) {
    return commonFind(deleted(detachedCriteria), sessionFactory).stream()
        .map(x -> (ModifiableCurrency) x)
        .map(ModifiableCurrency::toImmutable)
        .collect(Collectors.toList());
  }

  @Autowired
  public void setSessionFactory(SessionFactory sessionFactory) {
    this.sessionFactory = sessionFactory;
  }

  @Autowired
  public void setDatabaseEventListener(DatabaseEventListener databaseEventListener) {
    this.databaseEventListener = databaseEventListener;
  }
}
