package ru.fess38.finance.tag;

import org.hibernate.SessionFactory;
import org.hibernate.criterion.DetachedCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.fess38.finance.util.DaoHelper;
import ru.fess38.finance.util.DatabaseEventListener;

import java.util.List;
import java.util.stream.Collectors;

@Repository
@Transactional
public class TagDaoImpl implements TagDao {
  private SessionFactory sessionFactory;
  private DatabaseEventListener databaseEventListener;

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
    databaseEventListener.setChangeTrue();
    return modifiableTag.toImmutable();
  }

  @Override
  public Tag delete(Tag tag) {
    return update(tag.withIsDeleted(true));
  }

  @Override
  public List<Tag> find(DetachedCriteria detachedCriteria) {
    return find(detachedCriteria, false);
  }

  @Override
  public List<Tag> findDeleted(DetachedCriteria detachedCriteria) {
    return find(detachedCriteria, true);
  }

  @SuppressWarnings("unchecked")
  private List<Tag> find(DetachedCriteria detachedCriteria, boolean isDeleted) {
    detachedCriteria = isDeleted ? DaoHelper.deleted(detachedCriteria) :
        DaoHelper.notDeleted(detachedCriteria);
    return (List<Tag>) detachedCriteria
        .getExecutableCriteria(sessionFactory.getCurrentSession())
        .list()
        .stream()
        .map(x -> ((ModifiableTag) x).toImmutable())
        .collect(Collectors.toList());
  }

  @Override
  public DetachedCriteria detachedCriteria() {
    return DetachedCriteria.forClass(ModifiableTag.class);
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
