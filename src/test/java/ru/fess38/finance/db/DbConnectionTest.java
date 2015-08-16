package ru.fess38.finance.db;

import static org.junit.Assert.assertTrue;

import java.io.File;

import org.junit.After;
import org.junit.Test;

public class DbConnectionTest {
	private File dbFile = new File("Test.db");

	@Test
	public void testDbFileCreation() {
		DbConnection.getDataSource(dbFile.getName());
		assertTrue("Db file created", dbFile.exists());
	}
	
	@After
	public void tearDown() {
		dbFile.delete();
	}

}
