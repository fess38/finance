package ru.fess38.finance;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Controller;

@EnableAutoConfiguration
@ComponentScan(basePackages = {"ru.fess38.finance"})
@PropertySource("classpath:/ru/fess38/finance/application.properties")
@Controller
public class Main {
  public static void main(String[] args) throws InterruptedException {
    SpringApplication.run(Main.class, args);
  }
}
