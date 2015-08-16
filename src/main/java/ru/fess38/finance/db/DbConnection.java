package ru.fess38.finance.db;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

import javax.sql.DataSource;
import java.io.File;

public final class DbConnection {
	private DbConnection() { }

	private final static String URL = "Finance.db";
	private static BasicDataSource dataSource;
	private static JdbcTemplate jdbcTemplate;
	private static NamedParameterJdbcTemplate npJdbcTemplate;

	public static DataSource getDataSource() {
		return getDataSource(URL);
	}

	public static DataSource getDataSource(String dbFile) {
		if (dataSource == null) {
			initDataSource(dbFile);
		}
		return dataSource;
	}

	public static JdbcTemplate getJdbcTemplate() {
		if (jdbcTemplate == null) {
			jdbcTemplate = new JdbcTemplate(getDataSource());
		}
		return jdbcTemplate;
	}

	public static NamedParameterJdbcTemplate getNpJdbcTemplate() {
		if (npJdbcTemplate == null) {
			npJdbcTemplate = new NamedParameterJdbcTemplate(getDataSource());
		}
		return npJdbcTemplate;
	}

	private static void initDataSource(String dbFile) {
		dataSource = new BasicDataSource();
		dataSource.setDriverClassName("org.sqlite.JDBC");
		dataSource.setUrl("jdbc:sqlite:" + dbFile);
		dataSource.setDefaultCatalog("data");
		dataSource.setValidationQuery("SELECT 1");
		dataSource.setDefaultAutoCommit(true);
		startUpDb(dataSource, dbFile);
	}

	private static void startUpDb(DataSource dataSource, String dbFile) {
		boolean isDbFileExist = new File(dbFile).exists();
		StartUp startUp = new StartUp(dataSource);
		startUp.turnOnForeignKey();
		if (!isDbFileExist) {
			startUp.createTables();
		}
	}
}
