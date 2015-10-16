package ru.fess38.finance.db;

import org.junit.After;
import org.junit.Test;

import java.io.File;
import java.util.ArrayList;

import static org.junit.Assert.assertTrue;


public class DbConnectionTest {
    private File dbFile = new File("Test.db");

    @Test
    public void testDatabaseCreation() {
        DbConnection.getDataSource(dbFile.getName(), new ArrayList<>());
        assertTrue(dbFile.exists());
    }

    @After
    public void tearDown() {
        dbFile.delete();
    }

}
