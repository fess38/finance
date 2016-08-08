package ru.fess38.finance.dao;

import org.hibernate.SessionFactory;
import org.hibernate.criterion.DetachedCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import ru.fess38.finance.model.TransactionGroup;

import java.util.List;

@Repository
@Transactional
public class TransactionGroupDaoImpl implements TransactionGroupDao {
  @Autowired
  private SessionFactory sessionFactory;

  @Override
  public Long save(TransactionGroup transactionGroup) {
    return (Long) sessionFactory.getCurrentSession().save(transactionGroup);
  }

  @Override
  public TransactionGroup get(Long id) {
    return sessionFactory.getCurrentSession().get(TransactionGroup.class, id);
  }

  @Override
  public void update(TransactionGroup transactionGroup) {
    sessionFactory.getCurrentSession().update(transactionGroup);
  }

  @Override
  public void delete(TransactionGroup transactionGroup) {
    TransactionGroup savedTransactionGroup = get(transactionGroup.getId());
    savedTransactionGroup.setDeleted(true);
    update(savedTransactionGroup);
  }

  @SuppressWarnings("unchecked")
  @Override
  public List<TransactionGroup> find(DetachedCriteria detachedCriteria) {
    return commonFind(notDeleted(detachedCriteria), sessionFactory);
  }

  @SuppressWarnings("unchecked")
  @Override
  public List<TransactionGroup> findDeleted(DetachedCriteria detachedCriteria) {
    return commonFind(deleted(detachedCriteria), sessionFactory);
  }
}
