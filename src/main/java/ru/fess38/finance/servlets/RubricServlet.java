package ru.fess38.finance.servlets;

import ru.fess38.finance.service.RubricService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public class RubricServlet extends AbstractServlet<RubricService> {
	private static final long serialVersionUID = 4222685988701701191L;

	@Override
    protected void createEntity(HttpServletRequest req, HttpServletResponse resp) {
        getService().create(parameterToString(req, "name"), "true".equals(req.getParameter("isIncome")));
    }
}
