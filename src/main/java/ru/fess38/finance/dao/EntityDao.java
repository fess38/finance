package ru.fess38.finance.dao;

import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import ru.fess38.finance.model.Entity;

import static ru.fess38.finance.db.DbConnection.getJdbcTemplate;
import static ru.fess38.finance.db.DbConnection.getNpJdbcTemplate;

public abstract class EntityDao {
    public static final String SQL_SELECT_TEMPLATE = "SELECT * FROM %s WHERE isDeleted = 0";
    public static final String SQL_DELETE_TEMPLATE = "UPDATE %s SET isDeleted = 1 WHERE ID = ?";
    private String tableName;
    private String sqlSelect;
    private String sqlInsert;

    public final void create(Entity entity) {
        createBySql(entity, getSqlInsert());
    }

    private void createBySql(Entity entity, String sql) {
        SqlParameterSource[] params = {new BeanPropertySqlParameterSource(entity)};
        getNpJdbcTemplate().batchUpdate(sql, params);
    }

    public final void deleteById(int id) {
        getJdbcTemplate().update(String.format(SQL_DELETE_TEMPLATE, getTableName()), id);
    }

    public final String getSqlInsert() {
        return sqlInsert;
    }

    public final void setSqlInsert(String sqlInsert) {
        this.sqlInsert = sqlInsert;
    }

    public final String getSqlSelect() {
        return sqlSelect;
    }

    public final void setSqlSelect(String sqlSelect) {
        this.sqlSelect = sqlSelect;
    }

    public final String getTableName() {
        return tableName;
    }

    public final void setTableName(String tableName) {
        this.tableName = tableName;
    }
}
