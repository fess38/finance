package ru.fess38.finance.rubric;

import org.hibernate.SessionFactory;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.fess38.finance.util.DaoHelper;
import ru.fess38.finance.util.DatabaseEventListener;

import java.util.List;
import java.util.stream.Collectors;

@Repository
@Transactional
public class RubricDaoImpl implements RubricDao {
  private SessionFactory sessionFactory;
  private DatabaseEventListener databaseEventListener;

  @Override
  public Rubric save(Rubric rubric) {
    return update(rubric);
  }

  @Override
  public Rubric get(long id) {
    return sessionFactory.getCurrentSession().get(ModifiableRubric.class, id).toImmutable();
  }

  @Override
  public Rubric update(Rubric rubric) {
    ModifiableRubric modifiableRubric = (ModifiableRubric) sessionFactory.getCurrentSession()
        .merge(rubric.toModifiable());
    databaseEventListener.setChangeTrue();
    return modifiableRubric.toImmutable();
  }

  @Override
  public Rubric delete(Rubric rubric) {
    return update(rubric.withIsDeleted(true));
  }

  @Override
  public List<Rubric> find(DetachedCriteria detachedCriteria) {
    return find(detachedCriteria, false);
  }

  @Override
  public List<Rubric> findDeleted(DetachedCriteria detachedCriteria) {
    return find(detachedCriteria, true);
  }

  @SuppressWarnings("unchecked")
  private List<Rubric> find(DetachedCriteria detachedCriteria, boolean isDeleted) {
    detachedCriteria = isDeleted ? DaoHelper.deleted(detachedCriteria) :
        DaoHelper.notDeleted(detachedCriteria);
    detachedCriteria = notTransfer(detachedCriteria);
    return (List<Rubric>) detachedCriteria
        .getExecutableCriteria(sessionFactory.getCurrentSession())
        .list()
        .stream()
        .map(x -> ((ModifiableRubric) x).toImmutable())
        .collect(Collectors.toList());
  }

  @Override
  public DetachedCriteria detachedCriteria() {
    return DetachedCriteria.forClass(ModifiableRubric.class);
  }

  private DetachedCriteria notTransfer(DetachedCriteria detachedCriteria) {
    return detachedCriteria.add(Restrictions.eq("isTransfer", false));
  }

  @Override
  public Rubric getTransferRubric() {
    return ((ModifiableRubric) sessionFactory.getCurrentSession()
        .createCriteria(ModifiableRubric.class)
        .add(Restrictions.eq("isTransfer", true))
        .uniqueResult())
        .toImmutable();
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
