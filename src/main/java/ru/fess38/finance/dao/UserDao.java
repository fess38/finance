package ru.fess38.finance.dao;

import org.hibernate.criterion.DetachedCriteria;
import ru.fess38.finance.model.User;

import java.util.List;

public interface UserDao {
  User save(User user);

  User get(long id);

  User update(User user);

  User delete(User user);

  List<User> find(DetachedCriteria detachedCriteria);

  List<User> findDeleted(DetachedCriteria detachedCriteria);

  DetachedCriteria detachedCriteria();
}
