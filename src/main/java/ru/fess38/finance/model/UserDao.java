package ru.fess38.finance.model;

public interface UserDao {
	public void createUser(User user);
	public void deleteUser(User user);
	public void updateUserName(User user);
}
