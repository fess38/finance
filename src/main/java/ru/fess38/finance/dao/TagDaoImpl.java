package ru.fess38.finance.dao;

import org.hibernate.SessionFactory;
import org.hibernate.criterion.DetachedCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.fess38.finance.DatabaseChangeFlag;
import ru.fess38.finance.model.Tag;

import java.util.List;

@Repository
@Transactional
public class TagDaoImpl implements TagDao {
  private SessionFactory sessionFactory;
  private DatabaseChangeFlag databaseChangeFlag;

  @Override
  public Long save(Tag tag) {
    Long id = (Long) sessionFactory.getCurrentSession().save(tag);
    databaseChangeFlag.setTrue();
    return id;
  }

  @Override
  public Tag get(Long id) {
    return sessionFactory.getCurrentSession().get(Tag.class, id);
  }

  @Override
  public void update(Tag tag) {
    sessionFactory.getCurrentSession().update(tag);
    databaseChangeFlag.setTrue();
  }

  @Override
  public void delete(Tag tag) {
    Tag savedTag = get(tag.getId());
    if (!savedTag.hasTransactions()) {
      savedTag.setDeleted(true);
      update(savedTag);
    }
  }

  @SuppressWarnings("unchecked")
  @Override
  public List<Tag> find(DetachedCriteria detachedCriteria) {
    return commonFind(notDeleted(detachedCriteria), sessionFactory);
  }

  @SuppressWarnings("unchecked")
  @Override
  public List<Tag> findDeleted(DetachedCriteria detachedCriteria) {
    return commonFind(deleted(detachedCriteria), sessionFactory);
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
