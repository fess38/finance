package ru.fess38.finance.db;

import java.io.File;

import javax.sql.DataSource;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

public class IdGeneratorTest {
	private static DataSource dataSource;
	private static File dbFile = new File("Test.db");

	@Before
	public void setUp() {
		dataSource = DbConnection.getDataSource(dbFile.getName());
	}

	@Test
	public void testGetId() {
		Integer currentId = IdGenerator.next();
		Integer nextId = IdGenerator.next();
		Assert.assertEquals(++currentId, nextId);
	}

	@After
	public void tearDown() {
		dbFile.delete();
	}
}
