package ru.fess38.finance;

import org.eclipse.jetty.server.Server;
import org.springframework.context.support.ClassPathXmlApplicationContext;


public class Main {
    public static void main(String[] args) throws Exception {
        String path = "ru/fess38/finance/Config.xml";
        ClassPathXmlApplicationContext ctx = new ClassPathXmlApplicationContext(path);
        Server server = ctx.getBean("server", Server.class);
        server.start();
        server.join();
    }
}