package ru.fess38.finance.dao;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import ru.fess38.finance.model.TransactionGroup;

import java.util.List;

import static ru.fess38.finance.db.DbConnection.getJdbcTemplate;

public class TransactionGroupDao extends EntityDao {
    private final RowMapper<TransactionGroup> rowMapper = new BeanPropertyRowMapper<>(TransactionGroup.class);

    public TransactionGroupDao() {
        setTableName("TransactionGroup");
        setSqlSelect(String.format(SQL_SELECT_TEMPLATE, getTableName()));
        setSqlInsert(String.format("INSERT INTO %s(id, name) VALUES (:id, :name)", getTableName()));
    }

    public List<TransactionGroup> getTransactionGroups() {
        return getJdbcTemplate().query(getSqlSelect(), rowMapper);
    }
}
