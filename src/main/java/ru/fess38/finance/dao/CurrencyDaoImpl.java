package ru.fess38.finance.dao;

import org.hibernate.SessionFactory;
import org.hibernate.criterion.DetachedCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.fess38.finance.model.Currency;

import java.util.List;

@Repository
@Transactional
public class CurrencyDaoImpl implements CurrencyDao {
  @Autowired
  private SessionFactory sessionFactory;

  @Override
  public Long save(Currency currency) {
    return (Long) sessionFactory.getCurrentSession().save(currency);
  }

  @Override
  public Currency get(Long id) {
    return sessionFactory.getCurrentSession().get(Currency.class, id);
  }

  @Override
  public void update(Currency currency) {
    sessionFactory.getCurrentSession().update(currency);
  }

  @Override
  public void delete(Currency currency) {
    Currency savedCurrency = get(currency.getId());
    savedCurrency.setDeleted(true);
    update(savedCurrency);
  }

  @SuppressWarnings("unchecked")
  @Override
  public List<Currency> find(DetachedCriteria detachedCriteria) {
    return commonFind(notDeleted(detachedCriteria), sessionFactory);
  }

  @SuppressWarnings("unchecked")
  @Override
  public List<Currency> findDeleted(DetachedCriteria detachedCriteria) {
    return commonFind(deleted(detachedCriteria), sessionFactory);
  }
}
