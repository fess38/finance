package ru.fess38.finance.db;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;

public final class StartUp {
	public StartUp(BasicDataSource dataSource) {
		this.dataSource = dataSource;
	}
	
	private BasicDataSource dataSource;
	private ResourceDatabasePopulator rdp = new ResourceDatabasePopulator();

	public void createTables() {
		turnOnForeignKey();
		rdp.setScripts(
				new ClassPathResource("ru/fess38/finance/db/Rubric.sql"),
				new ClassPathResource("ru/fess38/finance/db/Currency.sql"),
				new ClassPathResource("ru/fess38/finance/db/Account.sql"),
				new ClassPathResource("ru/fess38/finance/db/User.sql"),
				new ClassPathResource("ru/fess38/finance/db/TransactionGroup.sql"),
				new ClassPathResource("ru/fess38/finance/db/Transaction_.sql"),
				new ClassPathResource("ru/fess38/finance/db/IdSequence.sql")
				);
		rdp.execute(dataSource);
	}

	public void turnOnForeignKey() {
		rdp.setScripts(new ClassPathResource("ru/fess38/finance/db/ForeignKey.sql"));
		rdp.execute(dataSource);
	}
}
