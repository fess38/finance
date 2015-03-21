package ru.fess38.finance.model;

import org.apache.commons.dbcp2.BasicDataSource;

public class TransactionGroupDaoImpl extends EntityDaoImpl implements
		TransactionGroupDao {
	public TransactionGroupDaoImpl(BasicDataSource dataSource) {
		super(dataSource);
	}

	@Override
	public void createTransactionGroup(TransactionGroup transactionGroup) {
		jdbcTemplate.update("INSERT INTO TransactionGroup(id, name)"
				+ " VALUES (?, ?)", new Object[] {transactionGroup.getId(),
						transactionGroup.getName()});
	}

	@Override
	public void deleteTransactionGroup(TransactionGroup transactionGroup) {
		jdbcTemplate.update("UPDATE TransactionGroup SET IsDeleted = 1"
				+ " WHERE id = ?", new Object[] {transactionGroup.getId()});
	}

	@Override
	public void updateTransactionGroup(TransactionGroup transactionGroup) {
		jdbcTemplate.update("UPDATE TransactionGroup SET name = ? WHERE id = ?",
				new Object[] {transactionGroup.getName(),
				transactionGroup.getId()});
	}
}
