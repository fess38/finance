package ru.fess38.finance.dao;

import org.apache.commons.lang3.time.DateUtils;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import ru.fess38.finance.model.*;
import ru.fess38.finance.utils.Utils;

import java.util.Date;
import java.util.List;

import static ru.fess38.finance.db.DbConnection.getJdbcTemplate;

public class TransactionDao extends EntityDao {
    private final RowMapper<Transaction> rowMapper = new BeanPropertyRowMapper<>(Transaction.class);
    private final String sql = "INSERT INTO %s(id, rubricId,"
            + " dayRef, accountIdFrom, accountIdTo, amountFrom, amountTo," +
            " userId, transactionGroupId, isUseForStat, comment)"
            + " VALUES (:id, :rubricId, :dayRef, :accountIdFrom," +
            " :accountIdTo, :amountFrom, :amountTo, :userId," +
            " :transactionGroupId, :isUseForStat, :comment)";
    private final String selectMonth = "SELECT * FROM Transaction_" +
            " WHERE dayRef BETWEEN ? AND ?";

    public TransactionDao() {
        setTableName("Transaction_");
        setSqlSelect(String.format(SQL_SELECT_TEMPLATE, getTableName()));
        setSqlInsert(String.format(sql, getTableName()));
    }

    public List<Transaction> getAllTransactions() {
        List<Transaction> transactions = getJdbcTemplate().query(getSqlSelect(), rowMapper);
        queryComplexObjects(transactions);
        return transactions;
    }

    public List<Transaction> getTransactionsForPeriod(Date startDate, Date endDate) {
        Object[] params = new Object[]{startDate, endDate};
        List<Transaction> transactions = getJdbcTemplate().query(selectMonth, params, rowMapper);
        queryComplexObjects(transactions);
        return transactions;
    }

    private void queryComplexObjects(List<Transaction> transactions) {
        setRubrics(transactions);
        setAccountsFrom(transactions);
        setAccountsTo(transactions);
        setUsers(transactions);
        setTransactionGroups(transactions);
    }

    private void setRubrics(List<Transaction> transactions) {
        List<Rubric> rubrics = new RubricDao().getRubrics();
        transactions.stream().forEach(t -> {
            Rubric rubric = rubrics.stream()
                    .filter(c -> c.getId().equals(t.getRubricId()))
                    .findFirst()
                    .get();
            t.setRubric(rubric);
        });
    }

    private void setAccountsFrom(List<Transaction> transactions) {
        List<Account> accounts = new AccountDao().getAccounts();
        transactions.stream().forEach(t -> {
            Account account = accounts.stream()
                    .filter(c -> c.getId().equals(t.getAccountIdFrom()))
                    .findFirst()
                    .get();
            t.setAccountFrom(account);
        });
    }

    private void setAccountsTo(List<Transaction> transactions) {
        List<Account> accounts = new AccountDao().getAccounts();
        transactions.stream().forEach(t -> {
            Account account = accounts.stream()
                    .filter(c -> c.getId().equals(t.getAccountIdTo()))
                    .findFirst()
                    .get();
            t.setAccountTo(account);
        });
    }

    private void setUsers(List<Transaction> transactions) {
        List<User> users = new UserDao().getUsers();
        transactions.stream().forEach(t -> {
            User user = users.stream()
                    .filter(c -> c.getId().equals(t.getUserId()))
                    .findFirst()
                    .orElse(null);
            t.setUser(user);
        });
    }

    public void setTransactionGroups(List<Transaction> transactions) {
        List<TransactionGroup> transactionGroups = new TransactionGroupDao().getTransactionGroups();
        transactions.stream().forEach(t -> {
            TransactionGroup tg = transactionGroups.stream()
                    .filter(c -> c.getId().equals(t.getTransactionGroupId()))
                    .findFirst()
                    .orElse(null);
            t.setTransactionGroup(tg);
        });
    }
}
