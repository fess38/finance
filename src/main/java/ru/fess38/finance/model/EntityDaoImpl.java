package ru.fess38.finance.model;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.jdbc.core.JdbcTemplate;

public class EntityDaoImpl {
	public EntityDaoImpl(BasicDataSource dataSource) {
		jdbcTemplate = new JdbcTemplate(dataSource);
	}
	
	protected JdbcTemplate jdbcTemplate;
}
