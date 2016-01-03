package ru.fess38.finance.servlets;

import ru.fess38.finance.service.TransactionGroupService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public class TransactionGroupServlet extends AbstractServlet<TransactionGroupService> {
	private static final long serialVersionUID = 5276250915649644802L;

	@Override
    protected void createEntity(HttpServletRequest req, HttpServletResponse resp) {
        getService().create(parameterToString(req, "name"));
    }
}
