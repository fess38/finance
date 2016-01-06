package ru.fess38.finance.controller;


import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;

import javafx.scene.control.Tab;
import ru.fess38.finance.model.Currency;
import ru.fess38.finance.view.TransactionGridBuilder;
import ru.fess38.finance.view.Transactions;
import ru.fess38.finance.view.ViewFactory;


public class TransactionWindow extends AbstractController {
	public TransactionWindow(ControllersFactory factory) {
		super(factory);
		factory.setTransactionWindow(this);
	}

	private YearMonth yearMonth = YearMonth.now();
	private List<Tab> tabs = new ArrayList<>();

	@Override
	public void init() {
		handle();
	}

	@Override
	public void handle() {
		tabs.clear();
		Transactions allTransactions = getTransactionDao().find(yearMonth);
		addTransactions(allTransactions.filter(Transactions.TRANSACTIONS));
		addTransfers(allTransactions.filter(Transactions.TRANSFERS));
		getMainWindow().addTransactionWindow(tabs);
	}

	private void addTransactions(Transactions transactions) {
		for (Currency currency: transactions.currencies()) {
			Tab tab = new Tab(currency.getName());
			Transactions t = transactions.filter(Transactions.currency(currency));
			TransactionGridBuilder gridBuilder = new TransactionGridBuilder(t);
			tab.setContent(gridBuilder.build());
			gridBuilder.transactionLabels().forEach(x -> {
				x.setOnMouseClicked(e -> getTransactionEditor().handle(x.getTransactions()));
			});
			tabs.add(tab);
		}
	}

	private void addTransfers(Transactions transfers) {
		if (!transfers.isEmpty()) {
			Tab tab = new Tab("Переводы");
			tab.setContent(ViewFactory.transactionEditorWindow(transfers));
			tabs.add(tab);
		}
	}

	public void nextMonth() {
		yearMonth = yearMonth.plusMonths(1);
	}

	public void prevMonth() {
		yearMonth = yearMonth.minusMonths(1);
	}
}
