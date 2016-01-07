package ru.fess38.finance.controller;


import ru.fess38.finance.dao.AccountDao;
import ru.fess38.finance.dao.CurrencyDao;
import ru.fess38.finance.dao.RubricDao;
import ru.fess38.finance.dao.TransactionDao;
import ru.fess38.finance.dao.TransactionGroupDao;
import ru.fess38.finance.dao.UserDao;


public abstract class AbstractController {
	public AbstractController(ControllersFactory factory) {
		this.factory = factory;
	}

	private final ControllersFactory factory;

	private AccountDao accountDao;
	private CurrencyDao currencyDao;
	private RubricDao rubricDao;
	private TransactionDao transactionDao;
	private TransactionGroupDao transactionGroupDao;
	private UserDao userDao;

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

	public ControllersFactory factory() {
		return factory;
	}

	public MainWindow getMainWindow() {
		return factory().getMainWindow();
	}

	public TransactionAdder getTransactionAdder() {
		return factory().getTransactionAdder();
	}

	public TransactionWindow getTransactionWindow() {
		return factory().getTransactionWindow();
	}

	public TransferAdder getTransferAdder() {
		return factory().getTransferAdder();
	}
}
