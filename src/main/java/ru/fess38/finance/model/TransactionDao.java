package ru.fess38.finance.model;

public interface TransactionDao {
	public void createTransaction(Transaction transaction);
	public void deleteTransaction(Transaction transaction);
	public void updateRubricId(Transaction transaction);
	public void updateAmount(Transaction transaction);
	public void updateDayRef(Transaction transaction);
	public void updateAccountIdFrom(Transaction transaction);
	public void updateAccountIdTo(Transaction transaction);
	public void updateExchangeRate(Transaction transaction);
	public void updateUserId(Transaction transaction);
	public void updateTransactionGroupId(Transaction transaction);
	public void updateIsUseForStat(Transaction transaction);
	public void updateComment(Transaction transaction);
}
