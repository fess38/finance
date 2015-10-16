package ru.fess38.finance.servlets;

import ru.fess38.finance.service.TransactionGroupService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public class TransactionGroupServlet extends AbstractServlet<TransactionGroupService> {
    @Override
    protected void createEntity(HttpServletRequest req, HttpServletResponse resp) {
        getService().create(parameterToString(req, "name"));
    }
}
