package ru.fess38.finance.servlets;

import ru.fess38.finance.service.AccountService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public final class AccountServlet extends AbstractServlet<AccountService> {
	private static final long serialVersionUID = -6553462573322127180L;

	@Override
    protected void createEntity(HttpServletRequest req, HttpServletResponse resp) {
        getService().create(parameterToString(req, "name"), parameterToInteger(req, "currencyId"));
    }
}
