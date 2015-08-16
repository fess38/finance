package ru.fess38.finance.servlets;

import org.apache.commons.lang3.math.NumberUtils;
import ru.fess38.finance.service.TransactionService;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static ru.fess38.finance.servlets.ServlterUtils.*;


public class TransactionServlet extends HttpServlet {
    public static final String PATH_SPEC = "transactions";
    private final TransactionService transactionService = new TransactionService();

    @Override
    public final void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        setUTF8Encoding(resp);
        resp.getWriter().println(transactionService.getTransactions());
    }

    @Override
    public final void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        String create = req.getParameter("create");
        String delete = req.getParameter("delete");

        if (create != null) {
            transactionService.create(
                    parameterToInteger(req, "rubricId"),
                    paramterToDate(req, "dayRef"),
                    parameterToInteger(req, "accountIdFrom"),
                    parameterToInteger(req, "accountIdTo"),
                    parameterToInteger(req, "amountFrom"),
                    parameterToInteger(req, "amountTo"),
                    parameterToInteger(req, "userId"),
                    parameterToInteger(req, "transactionGroupId"),
                    req.getParameter("isUseForStat").equals("true"),
                    paramterStripToNull(req, "comment")
            );
        } else if (delete != null) {
            transactionService.delete(NumberUtils.createInteger(delete));
        }

        ServlterUtils.redirect(resp, PATH_SPEC);
    }
}
