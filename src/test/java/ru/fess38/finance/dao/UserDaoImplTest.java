package ru.fess38.finance.dao;


import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import ru.fess38.finance.TestUtils;
import ru.fess38.finance.model.User;


public class UserDaoImplTest {
	private static ClassPathXmlApplicationContext ctx;
	private static UserDao userDao;

	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
		ctx = TestUtils.getTestContest();
		userDao = ctx.getBean(UserDao.class);
	}

	@Test
	public void testSaveGet() {
		User expectedUser = TestUtils.mockUser();
		Long id = userDao.save(expectedUser);
		User actualUser = userDao.get(id);
		Assert.assertEquals(expectedUser, actualUser);
	}

	@Test
	public void testUpdate() {
		User expectedUser = TestUtils.mockUser();
		userDao.save(expectedUser);
		expectedUser.setName("Досуг");
		userDao.update(expectedUser);
		User actualUser = userDao.get(expectedUser.getId());
		Assert.assertEquals(expectedUser, actualUser);
	}

	@Test
	public void testDelete() {
		User user = TestUtils.mockUser();
		userDao.save(user);
		userDao.delete(user);
		User actualUser = userDao.get(user.getId());
		Assert.assertTrue(actualUser.isDeleted());
	}

	@Test
	public void testFind() {
		User user1 = TestUtils.mockUser();
		User user2 = TestUtils.mockUser();
		userDao.save(user1);
		userDao.save(user2);
		List<User> expectedUsers = Arrays.asList(user1, user2);
		List<User> actualUsers = userDao.find(DetachedCriteria.forClass(User.class)
			.add(Restrictions.in("id", Arrays.asList(user1.getId(), user2.getId()))));
		actualUsers.sort(Comparator.comparing(User::getId));
		Assert.assertEquals(expectedUsers, actualUsers);
	}
}
