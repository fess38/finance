package ru.fess38.finance.dao;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import ru.fess38.finance.model.Entity;


public abstract class EntityDao<T extends Entity> {
	private Session session;
	private String deleteByIdQuery;
	private String findAllQuery;
	private String findByIdQuery;

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

	public void deleteById(Integer id) {
		Transaction transaction = session.beginTransaction();
		try {
			session.getNamedQuery(deleteByIdQuery).setInteger("id", id).executeUpdate();
			transaction.commit();
		} catch (Exception e) {
			transaction.rollback();
			throw new RuntimeException(e);
		}
	}

	@SuppressWarnings("unchecked")
	public List<T> findAll() {
		return session.getNamedQuery(findAllQuery).list();
	}

	@SuppressWarnings("unchecked")
	public T findById(int id) {
		Query query = session.getNamedQuery(findByIdQuery).setInteger("id", id);
		return (T) query.list().get(0);
	}

	public Session getSession() {
		return session;
	}

	public void setSession(Session session) {
		this.session = session;
	}

	public void setDeleteByIdQuery(String deleteByIdQuery) {
		this.deleteByIdQuery = deleteByIdQuery;
	}

	public void setFindAllQuery(String findAllQuery) {
		this.findAllQuery = findAllQuery;
	}

	public void setFindByIdQuery(String findByIdQuery) {
		this.findByIdQuery = findByIdQuery;
	}
}
