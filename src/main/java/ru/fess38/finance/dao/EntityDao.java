package ru.fess38.finance.dao;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.springframework.jdbc.core.JdbcTemplate;
import ru.fess38.finance.model.Entity;

import java.util.List;


public abstract class EntityDao<T extends Entity> {
    private JdbcTemplate jdbcTemplate;
    private Session session;
    private String deleteByIdQuery;
    private String findAllQuery;
    private String findByIdQuery;

    public void create(T entity) {
        Transaction transaction = session.beginTransaction();
        try {
            session.save(entity);
            session.flush();
            transaction.commit();
        } catch (Exception e) {
            transaction.rollback();
            throw new RuntimeException(e);
        } finally {
            session.clear();
        }
    }

    public void update(T entity) {
        Transaction transaction = session.beginTransaction();
        try {
            session.update(entity);
            session.flush();
            transaction.commit();
        } catch (Exception e) {
            transaction.rollback();
            throw new RuntimeException(e);
        } finally {
            session.clear();
        }
    }

    public void delete(T entity) {
        deleteById(entity.getId());
    }

    public void deleteById(Integer id) {
        Transaction transaction = session.beginTransaction();
        try {
            session.getNamedQuery(deleteByIdQuery).setInteger("id", id).executeUpdate();
            session.flush();
            transaction.commit();
        } catch (Exception e) {
            transaction.rollback();
            throw new RuntimeException(e);
        } finally {
            session.clear();
        }
    }

    @SuppressWarnings("unchecked")
    public List<T> findAll() {
        return session.getNamedQuery(findAllQuery).list();
    }

    @SuppressWarnings("unchecked")
    public T findById(Integer id) {
        Query query = session.getNamedQuery(findByIdQuery).setInteger("id", id);
        return (T) query.list().get(0);
    }

    public JdbcTemplate getJdbcTemplate() {
        return jdbcTemplate;
    }

    public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
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
