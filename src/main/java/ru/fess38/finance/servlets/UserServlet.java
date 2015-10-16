package ru.fess38.finance.servlets;

import ru.fess38.finance.service.UserService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public final class UserServlet extends AbstractServlet<UserService> {
    @Override
    protected void createEntity(HttpServletRequest req, HttpServletResponse resp) {
        getService().create(parameterToString(req, "name"));
    }
}
