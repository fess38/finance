package ru.fess38.finance.dao;

import org.hibernate.SessionFactory;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.fess38.finance.DatabaseChangeFlag;
import ru.fess38.finance.model.Rubric;

import java.util.List;

@Repository
@Transactional
public class RubricDaoImpl implements RubricDao {
  private SessionFactory sessionFactory;
  private DatabaseChangeFlag databaseChangeFlag;

  @Override
  public Long save(Rubric rubric) {
    Long id = (Long) sessionFactory.getCurrentSession().save(rubric);
    databaseChangeFlag.setTrue();
    return id;
  }

  @Override
  public Rubric get(Long id) {
    return sessionFactory.getCurrentSession().get(Rubric.class, id);
  }

  @Override
  public void update(Rubric rubric) {
    sessionFactory.getCurrentSession().update(rubric);
    databaseChangeFlag.setTrue();
  }

  @Override
  public void delete(Rubric rubric) {
    Rubric savedRubric = get(rubric.getId());
    if (!savedRubric.hasTransactions()) {
      savedRubric.setDeleted(true);
      update(savedRubric);
    }
  }

  @SuppressWarnings("unchecked")
  @Override
  public List<Rubric> find(DetachedCriteria detachedCriteria) {
    return commonFind(notDeleted(notTransfer(detachedCriteria)), sessionFactory);
  }

  @SuppressWarnings("unchecked")
  @Override
  public List<Rubric> findDeleted(DetachedCriteria detachedCriteria) {
    return commonFind(deleted(notTransfer(detachedCriteria)), sessionFactory);
  }

  private DetachedCriteria notTransfer(DetachedCriteria detachedCriteria) {
    return detachedCriteria.add(Restrictions.eq("isTransfer", false));
  }

  @Override
  public List<Rubric> findByType(boolean isIncome) {
    DetachedCriteria criteria = DetachedCriteria.forClass(Rubric.class)
        .add(Restrictions.eq("isIncome", isIncome));
    return find(criteria);
  }

  @Override
  public Rubric getTransferRubric() {
    return (Rubric) sessionFactory.getCurrentSession().createCriteria(Rubric.class)
        .add(Restrictions.eq("isTransfer", true))
        .uniqueResult();
  }

  @Autowired
  public void setSessionFactory(SessionFactory sessionFactory) {
    this.sessionFactory = sessionFactory;
  }

  @Autowired
  public void setDatabaseChangeFlag(DatabaseChangeFlag databaseChangeFlag) {
    this.databaseChangeFlag = databaseChangeFlag;
  }
}
