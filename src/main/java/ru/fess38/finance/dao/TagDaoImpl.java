package ru.fess38.finance.dao;

import org.hibernate.SessionFactory;
import org.hibernate.criterion.DetachedCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.fess38.finance.DatabaseChangeFlag;
import ru.fess38.finance.model.ModifiableTag;
import ru.fess38.finance.model.Tag;

import java.util.List;
import java.util.stream.Collectors;

@Repository
@Transactional
public class TagDaoImpl implements TagDao {
  private SessionFactory sessionFactory;
  private DatabaseChangeFlag databaseChangeFlag;

  @Override
  public Tag save(Tag tag) {
    return update(tag);
  }

  @Override
  public Tag get(long id) {
    return sessionFactory.getCurrentSession().get(ModifiableTag.class, id).toImmutable();
  }

  @Override
  public Tag update(Tag tag) {
    ModifiableTag modifiableTag = (ModifiableTag) sessionFactory.getCurrentSession()
        .merge(tag.toModifiable());
    databaseChangeFlag.setTrue();
    return modifiableTag.toImmutable();
  }

  @Override
  public Tag delete(Tag tag) {
    Tag savedTag = get(tag.id());
    if (!savedTag.hasTransactions()) {
      return update(savedTag.withIsDeleted(true));
    } else {
      return savedTag;
    }
  }

  @Override
  public List<Tag> find(DetachedCriteria detachedCriteria) {
    return commonFind(notDeleted(detachedCriteria), sessionFactory).stream()
        .map(x -> (ModifiableTag) x)
        .map(ModifiableTag::toImmutable)
        .collect(Collectors.toList());
  }

  @Override
  public List<Tag> findDeleted(DetachedCriteria detachedCriteria) {
    return commonFind(deleted(detachedCriteria), sessionFactory).stream()
        .map(x -> (ModifiableTag) x)
        .map(ModifiableTag::toImmutable)
        .collect(Collectors.toList());
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
