package ru.fess38.finance.servlets;

import ru.fess38.finance.service.UserService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public final class UserServlet extends AbstractServlet<UserService> {
	private static final long serialVersionUID = 4971226276399353650L;

	@Override
    protected void createEntity(HttpServletRequest req, HttpServletResponse resp) {
        getService().create(parameterToString(req, "name"));
    }
}
