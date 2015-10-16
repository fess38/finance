package ru.fess38.finance.db;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;

import javax.sql.DataSource;
import java.io.File;
import java.util.List;


public final class DbConnection {
    private DbConnection() { }

    public static DataSource getDataSource(String dbFilepath, List<String> createTablesSql) {
        BasicDataSource dataSource = new BasicDataSource();
        dataSource.setDriverClassName("org.hsqldb.jdbcDriver");
        dataSource.setUrl("jdbc:hsqldb:file:" + dbFilepath);

        if (!new File(dbFilepath).getParentFile().exists()) {
            createTables(dataSource, createTablesSql);
        }
        return dataSource;
    }

    private static void createTables(DataSource dataSource, List<String> createTablesSql) {
        ResourceDatabasePopulator rdp = new ResourceDatabasePopulator();
        createTablesSql.stream().map(ClassPathResource::new).forEach(rdp::addScript);
        rdp.execute(dataSource);
    }
}
