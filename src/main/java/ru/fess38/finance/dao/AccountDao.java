package ru.fess38.finance.dao;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import ru.fess38.finance.model.Account;
import ru.fess38.finance.model.Currency;

import java.util.List;

import static ru.fess38.finance.db.DbConnection.getJdbcTemplate;

public final class AccountDao extends EntityDao {
    private final RowMapper<Account> rowMapper = new BeanPropertyRowMapper<>(Account.class);

    public AccountDao() {
        setTableName("Account");
        setSqlSelect(String.format(SQL_SELECT_TEMPLATE, getTableName()));
        setSqlInsert(String.format("INSERT INTO %s(id, name, currencyId, isCredit, startDate, finishDate)"
                + " VALUES (:id, :name, :currencyId, :isCredit, :startDate, :finishDate)", getTableName()));
    }

    public List<Account> getAccounts() {
        List<Account> accounts = getJdbcTemplate().query(getSqlSelect(), rowMapper);
        setCurrencies(accounts);
        return accounts;
    }

    private void setCurrencies(List<Account> accounts) {
        List<Currency> currencies = new CurrencyDao().getCurrencies();
        accounts.stream().forEach(a -> {
            Currency currency = currencies.stream()
                    .filter(c -> c.getId().equals(a.getCurrencyId()))
                    .findFirst()
                    .get();
            a.setCurrency(currency);
        });
    }

}
