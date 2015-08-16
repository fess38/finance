package toloka;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletContextHandler;
import ru.fess38.finance.servlets.*;


public class Main {
    public static void main(String[] args) throws Exception {
        Server server = new Server(8081);

        ServletContextHandler context = new ServletContextHandler(server, "/toloka", false, false);
        context.setResourceBase("src/main/java/toloka");
        context.addServlet(FindUrlsServlet.class, "/" + FindUrlsServlet.PATH_SPEC);
        server.setHandler(context);

        server.start();
        server.join();
    }
}