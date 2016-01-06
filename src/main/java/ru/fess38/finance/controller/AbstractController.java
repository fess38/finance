package ru.fess38.finance.controller;


import ru.fess38.finance.dao.AccountDao;
import ru.fess38.finance.dao.CurrencyDao;
import ru.fess38.finance.dao.RubricDao;
import ru.fess38.finance.dao.TransactionDao;
import ru.fess38.finance.dao.TransactionGroupDao;
import ru.fess38.finance.dao.UserDao;


public abstract class AbstractController {
	private AccountDao accountDao;
	private CurrencyDao currencyDao;
	private RubricDao rubricDao;
	private TransactionDao transactionDao;
	private TransactionGroupDao transactionGroupDao;
	private UserDao userDao;

	public void init() {}

	public abstract void handle();

	public AccountDao getAccountDao() {
		return accountDao;
	}

	public void setAccountDao(AccountDao accountDao) {
		this.accountDao = accountDao;
	}

	public CurrencyDao getCurrencyDao() {
		return currencyDao;
	}

	public void setCurrencyDao(CurrencyDao currencyDao) {
		this.currencyDao = currencyDao;
	}

	public RubricDao getRubricDao() {
		return rubricDao;
	}

	public void setRubricDao(RubricDao rubricDao) {
		this.rubricDao = rubricDao;
	}

	public TransactionDao getTransactionDao() {
		return transactionDao;
	}

	public void setTransactionDao(TransactionDao transactionDao) {
		this.transactionDao = transactionDao;
	}

	public TransactionGroupDao getTransactionGroupDao() {
		return transactionGroupDao;
	}

	public void setTransactionGroupDao(TransactionGroupDao transactionGroupDao) {
		this.transactionGroupDao = transactionGroupDao;
	}

	public UserDao getUserDao() {
		return userDao;
	}

	public void setUserDao(UserDao userDao) {
		this.userDao = userDao;
	}
}
