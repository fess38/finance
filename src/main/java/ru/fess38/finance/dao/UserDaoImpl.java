package ru.fess38.finance.dao;

import org.hibernate.SessionFactory;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import ru.fess38.finance.model.User;

import java.util.List;

@Repository
@Transactional
public class UserDaoImpl implements UserDao {
  private SessionFactory sessionFactory;

  @Override
  public Long save(User user) {
    return (Long) sessionFactory.getCurrentSession().save(user);
  }

  @Override
  public User get(Long id) {
    return sessionFactory.getCurrentSession().get(User.class, id);
  }

  @Override
  public void update(User user) {
    sessionFactory.getCurrentSession().update(user);

  }

  @Override
  public void delete(User user) {
    User savedUser = get(user.getId());
    savedUser.setDeleted(true);
    update(savedUser);
  }

  @SuppressWarnings("unchecked")
  @Override
  public List<User> find(DetachedCriteria detachedCriteria) {
    return detachedCriteria.add(Restrictions.eq("isDeleted", false))
        .getExecutableCriteria(sessionFactory.getCurrentSession()).list();
  }

  @Autowired
  public void setSessionFactory(SessionFactory sessionFactory) {
    this.sessionFactory = sessionFactory;
  }
}
