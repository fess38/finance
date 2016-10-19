package ru.fess38.finance.dao;

import org.hibernate.SessionFactory;
import org.hibernate.criterion.DetachedCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.fess38.finance.AppConfiguration;
import ru.fess38.finance.model.User;

import java.util.List;

@Repository
@Transactional
public class UserDaoImpl implements UserDao {
  @Autowired
  private SessionFactory sessionFactory;

  @Override
  public Long save(User user) {
    Long id = (Long) sessionFactory.getCurrentSession().save(user);
    AppConfiguration.databaseChanged();
    return id;
  }

  @Override
  public User get(Long id) {
    return sessionFactory.getCurrentSession().get(User.class, id);
  }

  @Override
  public void update(User user) {
    sessionFactory.getCurrentSession().update(user);
    AppConfiguration.databaseChanged();
  }

  @Override
  public void delete(User user) {
    User savedUser = get(user.getId());
    if (!savedUser.hasTransactions()) {
      savedUser.setDeleted(true);
      update(savedUser);
    }
  }

  @SuppressWarnings("unchecked")
  @Override
  public List<User> find(DetachedCriteria detachedCriteria) {
    return commonFind(notDeleted(detachedCriteria), sessionFactory);
  }

  @SuppressWarnings("unchecked")
  @Override
  public List<User> findDeleted(DetachedCriteria detachedCriteria) {
    return commonFind(deleted(detachedCriteria), sessionFactory);
  }
}
