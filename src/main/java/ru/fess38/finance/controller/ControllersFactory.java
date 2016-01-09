package ru.fess38.finance.controller;


public class ControllersFactory {
	private MainWindow mainWindow;
	private TransactionAdder transactionAdder;
	private TransactionWindow transactionWindow;
	private TransferAdder transferAdder;
	private RubricController rubricController;
	private UserController userController;
	private TransactionGroupController transactionGroupController;
	private CurrencyController currencyController;

	public MainWindow getMainWindow() {
		return mainWindow;
	}

	public void setMainWindow(MainWindow mainWindow) {
		this.mainWindow = mainWindow;
	}

	public TransactionAdder getTransactionAdder() {
		return transactionAdder;
	}

	public void setTransactionAdder(TransactionAdder transactionAdder) {
		this.transactionAdder = transactionAdder;
	}

	public TransactionWindow getTransactionWindow() {
		return transactionWindow;
	}

	public void setTransactionWindow(TransactionWindow transactionWindow) {
		this.transactionWindow = transactionWindow;
	}

	public TransferAdder getTransferAdder() {
		return transferAdder;
	}

	public void setTransferAdder(TransferAdder transferAdder) {
		this.transferAdder = transferAdder;
	}

	public RubricController getRubricController() {
		return rubricController;
	}

	public void setRubricController(RubricController rubricController) {
		this.rubricController = rubricController;
	}

	public UserController getUserController() {
		return userController;
	}

	public void setUserController(UserController userController) {
		this.userController = userController;
	}

	public TransactionGroupController getTransactionGroupController() {
		return transactionGroupController;
	}

	public void setTransactionGroupController(
			TransactionGroupController transactionGroupController) {
		this.transactionGroupController = transactionGroupController;
	}

	public CurrencyController getCurrencyController() {
		return currencyController;
	}

	public void setCurrencyController(CurrencyController currencyController) {
		this.currencyController = currencyController;
	}
}
