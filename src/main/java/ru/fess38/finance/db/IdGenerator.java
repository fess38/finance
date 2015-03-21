package ru.fess38.finance.db;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.jdbc.core.JdbcTemplate;

public class IdGenerator {
	public IdGenerator(BasicDataSource datasource) {
		jdbcTemplate = new JdbcTemplate(datasource);
	}

	private JdbcTemplate jdbcTemplate;
	
	public Integer getId() {
		jdbcTemplate.update("UPDATE IdSequence SET id = id + 1");
		Integer id = jdbcTemplate.queryForObject("SELECT id FROM IdSequence",
				Integer.class);
		return id;
	}
}
