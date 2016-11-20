package ru.fess38.finance.dao;

import org.hibernate.SessionFactory;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;

import java.util.List;

public interface GenericDao<T> {
  T save(T object);

  T get(long id);

  T update(T object);

  T delete(T object);

  List<T> find(DetachedCriteria detachedCriteria);

  List<T> findDeleted(DetachedCriteria detachedCriteria);

  default <T> List<T> commonFind(DetachedCriteria detachedCriteria, SessionFactory sessionFactory) {
    return detachedCriteria.getExecutableCriteria(sessionFactory.getCurrentSession()).list();
  }

  default DetachedCriteria deleted(DetachedCriteria detachedCriteria) {
    return detachedCriteria.add(Restrictions.eq("isDeleted", true));
  }

  default DetachedCriteria notDeleted(DetachedCriteria detachedCriteria) {
    return detachedCriteria.add(Restrictions.eq("isDeleted", false));
  }
}
