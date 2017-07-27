package ru.fess38.finance;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableAutoConfiguration
@ComponentScan(basePackages = {"ru.fess38.finance"})
@EnableScheduling
public class Main {
  public static void main(String[] args) throws Exception {
    SpringApplication.run(Main.class, args);
  }
}
