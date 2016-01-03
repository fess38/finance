package ru.fess38.finance.servlets;

import ru.fess38.finance.service.TransactionService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public final class TransactionServlet extends AbstractServlet<TransactionService> {
	private static final long serialVersionUID = 3664646270305708817L;

	@Override
    protected void createEntity(HttpServletRequest req, HttpServletResponse resp) {
        getService().create(
                parameterToInteger(req, "rubricId"),
                paramterToDate(req, "dayRef"),
                parameterToInteger(req, "accountFromId"),
                parameterToInteger(req, "accountToId"),
                parameterToInteger(req, "amountFrom"),
                parameterToInteger(req, "amountTo"),
                parameterToInteger(req, "userId"),
                parameterToInteger(req, "transactionGroupId"),
                parameterToString(req, "comment"));
    }
}
