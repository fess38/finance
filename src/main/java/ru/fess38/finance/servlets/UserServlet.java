package ru.fess38.finance.servlets;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.math.NumberUtils;
import ru.fess38.finance.service.UserService;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.nio.charset.StandardCharsets;

import static ru.fess38.finance.servlets.ServlterUtils.paramterStripToNull;
import static ru.fess38.finance.servlets.ServlterUtils.setUTF8Encoding;

public class UserServlet extends HttpServlet {
    public static final String PATH_SPEC = "users";
    private final UserService userService = new UserService();

    @Override
    public final void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        setUTF8Encoding(resp);
        resp.getWriter().println(userService.getUsers());
    }

    @Override
    public final void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        String create = req.getParameter("create");
        String delete = req.getParameter("delete");

        if (create != null) {
            userService.create(paramterStripToNull(req, "name"));
        } else if (delete != null) {
            userService.delete(NumberUtils.createInteger(delete));
        }

        ServlterUtils.redirect(resp, PATH_SPEC);
    }
}
