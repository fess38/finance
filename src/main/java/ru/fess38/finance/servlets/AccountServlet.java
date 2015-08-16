package ru.fess38.finance.servlets;

import org.apache.commons.lang3.math.NumberUtils;
import ru.fess38.finance.service.AccountService;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static ru.fess38.finance.servlets.ServlterUtils.*;

public class AccountServlet extends HttpServlet {
    public static final String PATH_SPEC = "accounts";
    private final AccountService accountService = new AccountService();

    @Override
    public final void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        setUTF8Encoding(resp);
        resp.getWriter().println(accountService.getAccounts());
    }

    @Override
    public final void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        String create = req.getParameter("create");
        String delete = req.getParameter("delete");

        if (create != null) {
            accountService.create(paramterStripToNull(req, "name"),
                    parameterToInteger(req, "currencyId"),
                    paramterStripToNull(req, "isCredit").equals("true"));
        } else if (delete != null) {
            accountService.delete(NumberUtils.createInteger(delete));
        }

        ServlterUtils.redirect(resp, PATH_SPEC);
    }
}
