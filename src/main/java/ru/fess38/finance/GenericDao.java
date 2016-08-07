package ru.fess38.finance;

import org.hibernate.criterion.DetachedCriteria;

import java.util.List;

public interface GenericDao<T, V> {
  V save(T object);

  T get(V id);

  void update(T object);

  void delete(T object);

  List<T> find(DetachedCriteria detachedCriteria);
}
