package ru.fess38.finance.dao;

import ru.fess38.finance.Utils;
import ru.fess38.finance.model.Rubric;
import ru.fess38.finance.model.Transaction;

import java.util.List;
import java.util.stream.Collectors;


public class TransactionDao extends EntityDao<Transaction> {
    public boolean isEntityUsed(Integer id) {
        String sql = Utils.readFile("ru/fess38/finance/sql/isEntityUsed.sql");
        int result = getJdbcTemplate().queryForObject(sql, new Object[]{id}, Integer.class);
        return !(result == 0);
    }

    @SuppressWarnings("unchecked")
    public List<Transaction> findByYearMonth(int year, int month, int currencyId) {
        return getSession().getNamedQuery("transactionFindByYearMonth")
                .setInteger("year", year)
                .setInteger("month", month)
                .setInteger("currencyId", currencyId)
                .list();
    }
}
