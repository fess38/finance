package ru.fess38.finance.servlets;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;
import org.apache.commons.lang3.time.DateUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.nio.charset.StandardCharsets;
import java.text.ParseException;
import java.util.Date;

/**
 * Created by admin on 09.08.15.
 */
public final class ServlterUtils {
    private static final String DATE_FORMAT = "DD.MM.YYYY";
    public static void redirect(HttpServletResponse resp, String pathSpec) {
        resp.setStatus(HttpServletResponse.SC_MOVED_TEMPORARILY);
        resp.setHeader("Location", pathSpec);
    }

    public static Integer parameterToInteger(HttpServletRequest req, String parameter) {
        return NumberUtils.createInteger(StringUtils.stripToNull(req.getParameter(parameter)));
    }

    public static String paramterStripToNull(HttpServletRequest req, String parameter) {
        return StringUtils.stripToNull(req.getParameter(parameter));
    }

    public static Date paramterToDate(HttpServletRequest req, String parameter) {
        try {
            return DateUtils.parseDate(req.getParameter(parameter), DATE_FORMAT);
        } catch (ParseException e) {
            throw new IllegalArgumentException(e);
        }
    }

    public static void setUTF8Encoding(HttpServletResponse resp) {
        resp.setCharacterEncoding(StandardCharsets.UTF_8.name());
    }
}
