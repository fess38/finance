package ru.fess38.finance.dao;

import ru.fess38.finance.Utils;
import ru.fess38.finance.model.Transaction;


public class TransactionDao extends EntityDao<Transaction> {
    public boolean isEntityUsed(Integer id) {
        String sql = Utils.readFile("ru/fess38/finance/sql/isEntityUsed.sql");
        int result = getJdbcTemplate().queryForObject(sql, new Object[]{id}, Integer.class);
        return !(result == 0);
    }
}
