package ru.fess38.finance.servlets;

import org.apache.commons.lang3.math.NumberUtils;
import ru.fess38.finance.service.TransactionGroupService;
import ru.fess38.finance.service.UserService;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static ru.fess38.finance.servlets.ServlterUtils.paramterStripToNull;
import static ru.fess38.finance.servlets.ServlterUtils.setUTF8Encoding;

public class TransactionGroupServlet extends HttpServlet {
    public static final String PATH_SPEC = "transactionGroups";
    private final TransactionGroupService transactionGroupService = new TransactionGroupService();

    @Override
    public final void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        setUTF8Encoding(resp);
        resp.getWriter().println(transactionGroupService.getTransactionGroups());
    }

    @Override
    public final void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        String create = req.getParameter("create");
        String delete = req.getParameter("delete");

        if (create != null) {
            transactionGroupService.create(paramterStripToNull(req, "name"));
        } else if (delete != null) {
            transactionGroupService.delete(NumberUtils.createInteger(delete));
        }

        ServlterUtils.redirect(resp, PATH_SPEC);
    }
}
