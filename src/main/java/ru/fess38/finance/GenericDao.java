package ru.fess38.finance;


import java.util.List;

import org.hibernate.criterion.DetachedCriteria;


public interface GenericDao<T, V> {
	V save(T object);

	T get(V id);

	void update(T account);

	void delete(T account);

	List<T> find(DetachedCriteria detachedCriteria);
}
