package ru.fess38.finance;


import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;


@EnableAutoConfiguration
@ComponentScan(basePackages = { "ru.fess38.finance" })
@PropertySource("classpath:/ru/fess38/finance/application.properties")
@Controller
public class Main {
	public static void main(String[] args) {
		SpringApplication.run(Main.class, args).getEnvironment().getPropertySources();
	}

	@Bean
	public Gson getGson() {
		return new GsonBuilder().setPrettyPrinting()
			.create();
	}

	@RequestMapping("/resource")
	public @ResponseBody Map<String, Object> home() {
		Map<String, Object> model = new HashMap<String, Object>();
		model.put("id", UUID.randomUUID().toString());
		model.put("content", "Hello World");
		model.put("date", Instant.now());
		return model;
	}
}
