package ru.fess38.finance.dao;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import ru.fess38.finance.model.Currency;

import java.util.List;

import static ru.fess38.finance.db.DbConnection.getJdbcTemplate;

public class CurrencyDao extends EntityDao {
    public CurrencyDao() {
        setTableName("Currency");
        setSqlSelect(String.format(SQL_SELECT_TEMPLATE, getTableName()));
        setSqlInsert(String.format("INSERT INTO %s(id, name, symbol)" +
                " VALUES (:id, :name, :symbol)", getTableName()));
    }

    private final RowMapper<Currency> rowMapper = new BeanPropertyRowMapper<>(Currency.class);

    public List<Currency> getCurrencies() {
        return getJdbcTemplate().query(getSqlSelect(), rowMapper);
    }
}
