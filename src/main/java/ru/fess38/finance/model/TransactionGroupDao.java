package ru.fess38.finance.model;

public interface TransactionGroupDao {
	public void createTransactionGroup(TransactionGroup transactionGroup);
	public void deleteTransactionGroup(TransactionGroup transactionGroup);
	public void updateTransactionGroup(TransactionGroup transactionGroup);
}
