package ru.fess38.finance.dao;

import org.hibernate.criterion.DetachedCriteria;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;
import ru.fess38.finance.AppConfigurationTest;
import ru.fess38.finance.model.User;

import java.util.List;
import java.util.UUID;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = AppConfigurationTest.class)
@Transactional
public class UserDaoImplTest {
  @Autowired
  private UserDao userDao;

  @Test
  public void save() throws Exception {
    User user = newUser();
    userDao.save(user);
    Assert.assertTrue(user.getId() != null);
  }

  @Test
  public void delete() throws Exception {
    User user = newUser();
    userDao.save(user);
    userDao.delete(user);
    Assert.assertTrue(user.isDeleted());
  }

  @Test
  public void deleteHasTransactions() throws Exception {
    User user = newUser();
    user.addTransaction();
    userDao.save(user);
    userDao.delete(user);
    Assert.assertFalse(user.isDeleted());
  }

  @Test
  public void find() throws Exception {
    User user1 = newUser();
    User user2 = newUser();
    User user3 = newUser();
    userDao.save(user1);
    userDao.save(user2);
    userDao.save(user3);
    userDao.delete(user2);
    userDao.delete(user3);
    List<User> users = userDao.find(DetachedCriteria.forClass(User.class));
    Assert.assertEquals(1, users.size());
    Assert.assertEquals(user1, users.get(0));
  }

  @Test
  public void findDeleted() throws Exception {
    User user1 = newUser();
    User user2 = newUser();
    User user3 = newUser();
    userDao.save(user1);
    userDao.save(user2);
    userDao.save(user3);
    userDao.delete(user1);
    List<User> users = userDao.findDeleted(DetachedCriteria.forClass(User.class));
    Assert.assertEquals(1, users.size());
    Assert.assertEquals(user1, users.get(0));
  }

  private User newUser() {
    User user = new User();
    user.setName(UUID.randomUUID().toString());
    return user;
  }
}
