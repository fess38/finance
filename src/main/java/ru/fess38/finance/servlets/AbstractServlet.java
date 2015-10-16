package ru.fess38.finance.servlets;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;
import org.apache.commons.lang3.time.DateUtils;
import ru.fess38.finance.service.EntityService;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.text.ParseException;
import java.util.Date;


public abstract class AbstractServlet<T extends EntityService> extends HttpServlet {
    private static final String DATE_FORMAT = "dd.MM.yyyy";
    private T service;
    private String pathSpec;

    @Override
    public final void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        resp.setCharacterEncoding(StandardCharsets.UTF_8.name());
        resp.getWriter().println(service.makeHtmlForGET());
    }

    @Override
    public final void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        String create = req.getParameter("create");
        String delete = req.getParameter("delete");

        if (create != null) {
            createEntity(req, resp);
        } else if (delete != null) {
            service.deleteEntity(parameterToInteger(req, "deleteEntityId"));
        }
        redirect(resp);
    }

    protected abstract void createEntity(HttpServletRequest req, HttpServletResponse resp);

    protected final void redirect(HttpServletResponse resp) {
        resp.setStatus(HttpServletResponse.SC_MOVED_TEMPORARILY);
        resp.setHeader("Location", getPathSpec());
    }

    protected final Integer parameterToInteger(HttpServletRequest req, String parameter) {
        return NumberUtils.createInteger(StringUtils.stripToNull(req.getParameter(parameter)));
    }

    protected final String parameterToString(HttpServletRequest req, String parameter) {
        return StringUtils.stripToNull(req.getParameter(parameter));
    }

    protected final Date paramterToDate(HttpServletRequest req, String parameter) {
        try {
            return DateUtils.parseDate(req.getParameter(parameter), DATE_FORMAT);
        } catch (ParseException e) {
            throw new IllegalArgumentException(e);
        }
    }

    public T getService() {
        return service;
    }

    public void setService(T service) {
        this.service = service;
    }

    public final String getPathSpec() {
        return pathSpec;
    }

    public final void setPathSpec(String pathSpec) {
        this.pathSpec = pathSpec;
    }
}
