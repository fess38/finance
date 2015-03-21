package ru.fess38.finance.model;

public interface AccountDao {
	public void createAccount(Account account);
	public void deleteAccount(Account account);
	public void updateName(Account account);
	public void updateCurrencyId(Account account);
	public void updateAmount(Account account);
	public void updateIsCurrent(Account account);
	public void updateIsCredit(Account account);
	public void updateIsClosed(Account account);
	public void updateStartDate(Account account);
	public void updateFinishDate(Account account);
}
