package ru.fess38.finance.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import ru.fess38.finance.transaction.TransactionDao;

import java.util.List;

@RestController
public class UserController {
  @Autowired
  private UserDao userDao;
  @Autowired
  private TransactionDao transactionDao;

  @RequestMapping(value = "/user/get", method = RequestMethod.GET)
  public @ResponseBody List<User> get() {
    return userDao.find(userDao.detachedCriteria());
  }

  @RequestMapping(value = "/user/save", method = RequestMethod.POST)
  public void save(@RequestBody User user) {
    userDao.save(user);
  }

  @RequestMapping(value = "/user/update", method = RequestMethod.POST)
  public void update(@RequestBody User user) {
    userDao.update(user);
  }

  @RequestMapping(value = "/user/delete", method = RequestMethod.POST)
  public void delete(@RequestBody User user) {
    if (transactionDao.countByUser(user) == 0) {
      userDao.delete(user);
    }
  }
}
