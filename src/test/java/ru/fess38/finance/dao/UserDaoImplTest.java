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
import ru.fess38.finance.model.ModifiableUser;
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
    Assert.assertTrue(userDao.save(newUser()).id() != 0);
  }

  @Test
  public void delete() throws Exception {
    Assert.assertTrue(userDao.delete(userDao.save(newUser())).isDeleted());
  }

  @Test
  public void find() throws Exception {
    User user1 = userDao.save(newUser());
    userDao.delete(userDao.save(newUser()));
    userDao.delete(userDao.save(newUser()));
    List<User> users = userDao.find(DetachedCriteria.forClass(ModifiableUser.class));
    Assert.assertEquals(1, users.size());
    Assert.assertEquals(user1, users.get(0));
  }

  @Test
  public void findDeleted() throws Exception {
    User user1 = userDao.delete(userDao.save(newUser()));
    userDao.save(newUser());
    userDao.save(newUser());
    List<User> users = userDao.findDeleted(DetachedCriteria.forClass(ModifiableUser.class));
    Assert.assertEquals(1, users.size());
    Assert.assertEquals(user1, users.get(0));
  }

  private User newUser() {
    return User.of(UUID.randomUUID().toString());
  }
}
