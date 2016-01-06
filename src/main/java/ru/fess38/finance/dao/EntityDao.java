package ru.fess38.finance.dao;


import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;

import ru.fess38.finance.model.Entity;


public abstract class EntityDao<T extends Entity> {
	private Class<T> clazz;
	private Session session;

	public void save(T entity) {
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
	public List<T> find() {
		return session.createCriteria(clazz).add(Restrictions.eq("isDeleted", false)).list();
	}

	public Session getSession() {
		return session;
	}

	public void setSession(Session session) {
		this.session = session;
	}

	public void setClazz(Class<T> clazz) {
		this.clazz = clazz;
	}

	public Class<T> getClazz() {
		return clazz;
	}
}
