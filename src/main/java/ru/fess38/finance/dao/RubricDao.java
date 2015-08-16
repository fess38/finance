package ru.fess38.finance.dao;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import ru.fess38.finance.model.Rubric;

import java.util.List;

import static ru.fess38.finance.db.DbConnection.getJdbcTemplate;

public final class RubricDao extends EntityDao {
    private final RowMapper<Rubric> rowMapper = new BeanPropertyRowMapper<>(Rubric.class);

    public RubricDao() {
        setTableName("Rubric");
        setSqlSelect(String.format(SQL_SELECT_TEMPLATE, getTableName()));
        setSqlInsert(String.format("INSERT INTO %s(id, name, isIncome)" +
                " VALUES (:id, :name, :isIncome)", getTableName()));
    }

    public List<Rubric> getRubrics() {
        return getJdbcTemplate().query(getSqlSelect(), rowMapper);
    }

}
