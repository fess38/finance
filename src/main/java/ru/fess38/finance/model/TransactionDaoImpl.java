package ru.fess38.finance.model;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;

public class TransactionDaoImpl extends EntityDaoImpl implements TransactionDao {
	public TransactionDaoImpl(BasicDataSource dataSource) {
		super(dataSource);
		npJdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
	}
	
	private NamedParameterJdbcTemplate npJdbcTemplate;

	@Override
	public void createTransaction(Transaction transaction) {
		List<SqlParameterSource> params = new ArrayList<SqlParameterSource>();
		params.add(new BeanPropertySqlParameterSource(transaction)); 
		
		npJdbcTemplate.batchUpdate("INSERT INTO Transaction(id, rubricId,"
				+ " amount, dayRef, accountIdFrom, accountIdTo, exchangeRate,"
				+ " userId, transactionGroupId, isUseForStat, comment)"
				+ " VALUES (:id, :rubricId, :amount, :dayRef, :accountIdFrom,"
				+ " :accountIdTo, :exchangeRate, :userId, :transactionGroupId,"
				+ " :isUseForStat, :comment)",
				params.toArray(new SqlParameterSource[0]));
	}

	@Override
	public void deleteTransaction(Transaction transaction) {
		jdbcTemplate.update("UPDATE Transaction SET IsDeleted = 1"
				+ " WHERE id = ?", new Object[] {transaction.getId()});
	}

	@Override
	public void updateRubricId(Transaction transaction) {
		jdbcTemplate.update("UPDATE Transaction SET rubricId = ? WHERE id = ?",
				new Object[] {transaction.getRubricId(), transaction.getId()});
	}

	@Override
	public void updateAmount(Transaction transaction) {
		jdbcTemplate.update("UPDATE Transaction SET amount = ? WHERE id = ?",
				new Object[] {transaction.getAmount(), transaction.getId()});
	}

	@Override
	public void updateDayRef(Transaction transaction) {
		jdbcTemplate.update("UPDATE Transaction SET dayRef = ? WHERE id = ?",
				new Object[] {transaction.getDayRef(), transaction.getId()});
	}

	@Override
	public void updateAccountIdFrom(Transaction transaction) {
		jdbcTemplate.update("UPDATE Transaction SET accountIdFrom = ? WHERE id = ?",
				new Object[] {transaction.getAccountIdFrom(), transaction.getId()});
	}

	@Override
	public void updateAccountIdTo(Transaction transaction) {
		jdbcTemplate.update("UPDATE Transaction SET accountIdTo = ? WHERE id = ?",
				new Object[] {transaction.getAccountIdTo(), transaction.getId()});
	}

	@Override
	public void updateExchangeRate(Transaction transaction) {
		jdbcTemplate.update("UPDATE Transaction SET exchangeRate = ? WHERE id = ?",
				new Object[] {transaction.getExchangeRate(), transaction.getId()});
	}

	@Override
	public void updateUserId(Transaction transaction) {
		jdbcTemplate.update("UPDATE Transaction SET userId = ? WHERE id = ?",
				new Object[] {transaction.getUserId(), transaction.getId()});
	}

	@Override
	public void updateTransactionGroupId(Transaction transaction) {
		jdbcTemplate.update("UPDATE Transaction SET transactionGroupId = ? WHERE id = ?",
				new Object[] {transaction.getTransactionGroupId(), transaction.getId()});
	}

	@Override
	public void updateIsUseForStat(Transaction transaction) {
		jdbcTemplate.update("UPDATE Transaction SET isUseForStat = ? WHERE id = ?",
				new Object[] {transaction.getIsUseForStat(), transaction.getId()});
	}

	@Override
	public void updateComment(Transaction transaction) {
		jdbcTemplate.update("UPDATE Transaction SET comment = ? WHERE id = ?",
				new Object[] {transaction.getComment(), transaction.getId()});
	}
}
