package ru.fess38.finance.db;

import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;

import javax.sql.DataSource;

public final class StartUp {
	public StartUp(DataSource dataSource) {
		this.dataSource = dataSource;
	}
	
	private DataSource dataSource;
	private final ResourceDatabasePopulator rdp = new ResourceDatabasePopulator();

	public void createTables() {
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
