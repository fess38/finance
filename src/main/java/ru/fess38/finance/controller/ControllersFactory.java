package ru.fess38.finance.controller;


public class ControllersFactory {
	private MainWindow mainWindow;
	private TransactionAdder transactionAdder;
	private TransactionWindow transactionWindow;
	private TransferAdder transferAdder;

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
}
