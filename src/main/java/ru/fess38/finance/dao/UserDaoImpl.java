package ru.fess38.finance.dao;

import org.hibernate.SessionFactory;
import org.hibernate.criterion.DetachedCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.fess38.finance.DatabaseEventListener;
import ru.fess38.finance.model.ModifiableUser;
import ru.fess38.finance.model.User;

import java.util.List;
import java.util.stream.Collectors;

@Repository
@Transactional
public class UserDaoImpl implements UserDao {
  private SessionFactory sessionFactory;
  private DatabaseEventListener databaseEventListener;

  @Override
  public User save(User user) {
    return update(user);
  }

  @Override
  public User get(long id) {
    return sessionFactory.getCurrentSession().get(ModifiableUser.class, id).toImmutable();
  }

  @Override
  public User update(User user) {
    ModifiableUser modifiableUser = (ModifiableUser) sessionFactory.getCurrentSession()
        .merge(user.toModifiable());
    databaseEventListener.setChangeTrue();
    return modifiableUser.toImmutable();
  }

  @Override
  public User delete(User user) {
    User savedUser = get(user.id());
    if (!savedUser.hasTransactions()) {
      return update(savedUser.withIsDeleted(true));
    } else {
      return savedUser;
    }
  }

  @Override
  public List<User> find(DetachedCriteria detachedCriteria) {
    return commonFind(notDeleted(detachedCriteria), sessionFactory).stream()
        .map(x -> (ModifiableUser) x)
        .map(ModifiableUser::toImmutable)
        .collect(Collectors.toList());
  }

  @SuppressWarnings("unchecked")
  @Override
  public List<User> findDeleted(DetachedCriteria detachedCriteria) {
    return commonFind(deleted(detachedCriteria), sessionFactory).stream()
        .map(x -> (ModifiableUser) x)
        .map(ModifiableUser::toImmutable)
        .collect(Collectors.toList());
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
