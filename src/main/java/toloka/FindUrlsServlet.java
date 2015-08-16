package toloka;

import org.apache.commons.io.IOUtils;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.io.StringReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by admin on 15.08.15.
 */
public class FindUrlsServlet extends HttpServlet {
    public static final String PATH_SPEC = "findurls";

    @Override
    public final void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        resp.setCharacterEncoding(StandardCharsets.UTF_8.name());
        resp.getWriter().println(readFromClassPath());
    }

    @Override
    public final void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        List<Long> companyIds = IOUtils
                .readLines(new StringReader(req.getParameter("companies")))
                .stream()
                .map(Long::parseLong)
                .collect(Collectors.toList());
        List<Long> goldensetIds = IOUtils
                .readLines(new StringReader(req.getParameter("goldenset")))
                .stream()
                .map(Long::parseLong)
                .collect(Collectors.toList());
        int companyAmount = Integer.parseInt(req.getParameter("companyAmount"));
        int goldensetAmount = Integer.parseInt(req.getParameter("goldensetAmount"));
        resp.getWriter().println(companyIds);
        resp.getWriter().println(goldensetIds);
        resp.getWriter().println(companyAmount);
        resp.getWriter().println(goldensetAmount);
    }

    private String readFromClassPath() {
        Resource resource = new FileSystemResource("/Users/admin/projects/finance/src/main/java/toloka/url.html");
        try (InputStream inputStream = resource.getInputStream()) {
            return IOUtils.toString(inputStream, StandardCharsets.UTF_8);
        } catch (IOException e) {
            return e.getMessage();
        }
    }
}
