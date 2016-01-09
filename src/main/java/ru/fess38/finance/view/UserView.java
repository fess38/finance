package ru.fess38.finance.view;


import ru.fess38.finance.model.User;


public class UserView extends SimpleEntityView<User> {
	@Override
	protected void initTableView() {
		super.initTableView();
		getTab().setText("Пользователи");
	}
}
