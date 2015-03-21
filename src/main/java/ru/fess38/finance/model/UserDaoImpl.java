package ru.fess38.finance.model;

import org.apache.commons.dbcp2.BasicDataSource;

public class UserDaoImpl extends EntityDaoImpl implements UserDao {
	public UserDaoImpl(BasicDataSource dataSource) {
		super(dataSource);
	}

	@Override
	public void createUser(User user) {
		jdbcTemplate.update("INSERT INTO User(id, name) VALUES (?, ?)",
				new Object[] {user.getId(), user.getName()});
	}

	@Override
	public void deleteUser(User user) {
		jdbcTemplate.update("UPDATE User SET IsDeleted = 1"
				+ " WHERE id = ?",
				new Object[] {user.getId()});
	}
	
	@Override
	public void updateUserName(User user) {
		jdbcTemplate.update("UPDATE User SET name = ? WHERE id = ?",
				new Object[] {user.getName(), user.getId()});
	}
}
