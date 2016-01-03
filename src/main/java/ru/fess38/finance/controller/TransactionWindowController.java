package ru.fess38.finance.controller;

import java.time.YearMonth;

import javafx.scene.control.Tab;
import javafx.scene.control.TabPane;
import ru.fess38.finance.model.Currency;
import ru.fess38.finance.view.TransactionGridCreator;
import ru.fess38.finance.view.Transactions;


public class TransactionWindowController extends AbstractController {
	public TransactionWindowController(TabPane mainWindow) {
		this.mainWindow = mainWindow;
	}

	private final TabPane mainWindow;
	private YearMonth yearMonth = YearMonth.now(); 

	@Override
	public void init() {
		handle();
	}
	
	@Override
	public void handle() {
		transactionWindow().getTabs().clear();
		Transactions allTransactions = getTransactionDao().find(yearMonth);
		addTransactions(allTransactions.filter(Transactions.TRANSACTIONS));
		addTransfers(allTransactions.filter(Transactions.TRANSFERS));
	}
	
	private void addTransactions(Transactions transactions) {
		for (Currency currency: transactions.currencies()) {
			Tab tab = new Tab(currency.getName());
			Transactions t = transactions.filter(Transactions.currency(currency));
			TransactionGridCreator gridCreator = new TransactionGridCreator(t);
			tab.setContent(gridCreator.create());
			transactionWindow().getTabs().add(tab);
		}	
	}
	
	private void addTransfers(Transactions transfers) {
		
	}

	public void nextMonth() {
		yearMonth = yearMonth.plusMonths(1);
	}

	public void prevMonth() {
		yearMonth = yearMonth.minusMonths(1);
	}

	private TabPane transactionWindow() {
		return (TabPane) mainWindow.lookup("#transactionWindow");
	}
}
