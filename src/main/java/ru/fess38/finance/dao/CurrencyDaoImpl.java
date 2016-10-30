package ru.fess38.finance.dao;

import org.hibernate.SessionFactory;
import org.hibernate.criterion.DetachedCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.fess38.finance.DatabaseChangeFlag;
import ru.fess38.finance.model.Currency;

import java.util.List;

@Repository
@Transactional
public class CurrencyDaoImpl implements CurrencyDao {
  @Autowired
  private SessionFactory sessionFactory;
  @Autowired
  private DatabaseChangeFlag databaseChangeFlag;

  @Override
  public Long save(Currency currency) {
    Long id = (Long) sessionFactory.getCurrentSession().save(currency);
    databaseChangeFlag.setTrue();
    return id;
  }

  @Override
  public Currency get(Long id) {
    return sessionFactory.getCurrentSession().get(Currency.class, id);
  }

  @Override
  public void update(Currency currency) {
    sessionFactory.getCurrentSession().update(currency);
    databaseChangeFlag.setTrue();
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
