package ru.fess38.finance.db;

import java.io.File;

import org.apache.commons.dbcp2.BasicDataSource;

public final class FinanceDB {
	private FinanceDB() { }
	
	private static BasicDataSource DATASOURCE;
	private final static String URL = "Finance.db";
	
	public static BasicDataSource getInstance() {
        if (DATASOURCE == null) {
        	DATASOURCE = new BasicDataSource();
        	DATASOURCE.setDriverClassName("org.sqlite.JDBC");
        	DATASOURCE.setUrl("jdbc:sqlite:" + URL);
        	DATASOURCE.setDefaultCatalog("data");
        	DATASOURCE.setValidationQuery("SELECT 1");
        }
        
        StartUp startUp = new StartUp(DATASOURCE);
        if (new File(URL).exists()) {
        	new File(URL).delete();
		}
        
        if (!new File(URL).exists()) {
        	startUp.createTables();
		}
        else {
        	startUp.turnOnForeignKey();
        }
        startUp = null;
        
        return DATASOURCE;
    }
}
