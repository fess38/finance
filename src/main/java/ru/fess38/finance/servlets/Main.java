package ru.fess38.finance.servlets;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletContextHandler;


public class Main {
    public static void main(String[] args) throws Exception {
        Server server = new Server(8080);

        ServletContextHandler context = new ServletContextHandler();
        context.setContextPath("/");
        context.addServlet(UserServlet.class, "/" + UserServlet.PATH_SPEC);
        context.addServlet(RubricServlet.class, "/" + RubricServlet.PATH_SPEC);
        context.addServlet(TransactionGroupServlet.class, "/" + TransactionGroupServlet.PATH_SPEC);
        context.addServlet(AccountServlet.class, "/" + AccountServlet.PATH_SPEC);
        context.addServlet(TransactionServlet.class, "/" + TransactionServlet.PATH_SPEC);
        server.setHandler(context);

        server.start();
        server.join();
    }
}