package ru.fess38.finance.controller;


import java.util.List;

import org.hibernate.criterion.DetachedCriteria;

import ru.fess38.finance.model.User;
import ru.fess38.finance.view.UserView;


public class UserController extends SimpleEntityController<User> {
	public UserController() {
		setEntityView(new UserView());
	}

	@Override
	protected List<User> findEntities() {
		return getUserDao().find(DetachedCriteria.forClass(User.class));
	}

	@Override
	protected void deleteEntity(User entity) {
		getUserDao().delete(entity);
	}

	@Override
	protected User readEntityFromView() {
		User user = new User();
		user.setName(getEntityView().getEntityAdderName().getText());
		return user;
	}

	@Override
	protected void saveEntity(User entity) {
		getUserDao().save(entity);
	}

	@Override
	protected void updateEntity(User entity) {
		getUserDao().update(entity);
	}
}
