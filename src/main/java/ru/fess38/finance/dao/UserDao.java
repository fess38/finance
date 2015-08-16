package ru.fess38.finance.dao;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import ru.fess38.finance.model.User;

import java.util.List;

import static ru.fess38.finance.db.DbConnection.getJdbcTemplate;

public class UserDao extends EntityDao {
    private final RowMapper<User> rowMapper = new BeanPropertyRowMapper<>(User.class);

    public UserDao() {
        setTableName("User");
        setSqlSelect(String.format(SQL_SELECT_TEMPLATE, getTableName()));
        setSqlInsert(String.format("INSERT INTO %s(id, name) VALUES (:id, :name)", getTableName()));
    }

    public List<User> getUsers() {
        return getJdbcTemplate().query(getSqlSelect(), rowMapper);
    }
}
