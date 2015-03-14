package ru.fess38.finance.db;

import org.apache.commons.dbcp2.BasicDataSource;

public final class FinanceDB {
	private FinanceDB() { }
	
	private static BasicDataSource DATASOURCE;
	
	public static BasicDataSource getInstance() {
        if (DATASOURCE == null) {
        	DATASOURCE = new BasicDataSource();
        	DATASOURCE.setDriverClassName("org.sqlite.JDBC");
        	DATASOURCE.setUrl("jdbc:sqlite:Finance.db");
        	DATASOURCE.setDefaultCatalog("data");
        	DATASOURCE.setValidationQuery("SELECT 1");
        }
        return DATASOURCE;
    }
}
