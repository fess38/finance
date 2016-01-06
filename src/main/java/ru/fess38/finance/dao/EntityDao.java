package ru.fess38.finance.dao;


import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;

import ru.fess38.finance.model.Entity;


public abstract class EntityDao<T extends Entity> {
	private Session session;
	private String findAllQuery;

	public void create(T entity) {
		Transaction transaction = session.beginTransaction();
		try {
			session.save(entity);
			transaction.commit();
		} catch (Exception e) {
			transaction.rollback();
			throw new RuntimeException(e);
		}
	}

	public void update(T entity) {
		Transaction transaction = session.beginTransaction();
		try {
			session.update(entity);
			transaction.commit();
		} catch (Exception e) {
			transaction.rollback();
			throw new RuntimeException(e);
		}
	}

	public void delete(T entity) {
		Transaction transaction = session.beginTransaction();
		getSession().delete(entity);
		transaction.commit();
	}

	@SuppressWarnings("unchecked")
	public List<T> findAll() {
		return session.getNamedQuery(findAllQuery).list();
	}

	public Session getSession() {
		return session;
	}

	public void setSession(Session session) {
		this.session = session;
	}

	public void setFindAllQuery(String findAllQuery) {
		this.findAllQuery = findAllQuery;
	}
}
