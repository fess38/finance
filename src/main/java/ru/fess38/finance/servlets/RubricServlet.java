package ru.fess38.finance.servlets;

import ru.fess38.finance.service.RubricService;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static ru.fess38.finance.servlets.ServlterUtils.paramterStripToNull;
import static ru.fess38.finance.servlets.ServlterUtils.setUTF8Encoding;

public class RubricServlet extends HttpServlet {
    public static final String PATH_SPEC = "rubrics";
    private final RubricService rubricService = new RubricService();

    @Override
    public final void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        setUTF8Encoding(resp);
        resp.getWriter().println(rubricService.getRubrics());
    }

    @Override
    public final void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        String create = req.getParameter("create");
        String delete = req.getParameter("delete");

        if (create != null) {
            rubricService.create(paramterStripToNull(req, "name"),
                    req.getParameter("isIncome").equals("true"));
        } else if (delete != null) {
            rubricService.delete(Integer.parseInt(delete));
        }

        ServlterUtils.redirect(resp, PATH_SPEC);
    }
}
