package ru.fess38.finance;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.PropertySource;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;


@SpringBootApplication
@EnableAutoConfiguration
@ComponentScan(basePackages = { "ru.fess38.finance" })
@PropertySource("classpath:/ru/fess38/finance/application.properties")
public class Main {
	public static void main(String[] args) {
		SpringApplication.run(Main.class, args);
	}

	@Bean
	public Gson getGson() {
		return new GsonBuilder().setPrettyPrinting()
			.create();
	}
}
