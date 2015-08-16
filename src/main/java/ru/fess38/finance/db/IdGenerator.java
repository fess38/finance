package ru.fess38.finance.db;

import static ru.fess38.finance.db.DbConnection.getJdbcTemplate;

public final class IdGenerator {
    private IdGenerator() { }

    private final static String updateSql = "UPDATE IdSequence SET id = id + 1";
    private final static String selectSql = "SELECT id FROM IdSequence";

    public static int getId() {
        getJdbcTemplate().update(updateSql);
        return getJdbcTemplate().queryForObject(selectSql, Integer.class);
    }
}
