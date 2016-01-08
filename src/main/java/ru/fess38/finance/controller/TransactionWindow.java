package ru.fess38.finance.controller;


import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javafx.event.EventHandler;
import javafx.scene.control.Alert;
import javafx.scene.control.Alert.AlertType;
import javafx.scene.control.Tab;
import javafx.scene.control.TableView;
import javafx.scene.input.KeyCode;
import javafx.scene.input.KeyEvent;
import ru.fess38.finance.model.Currency;
import ru.fess38.finance.model.Transaction;
import ru.fess38.finance.view.TransactionGridBuilder;
import ru.fess38.finance.view.TransactionLabel;
import ru.fess38.finance.view.Transactions;
import ru.fess38.finance.view.ViewFactory;


public class TransactionWindow extends AbstractController {
	public TransactionWindow(ControllersFactory factory) {
		super(factory);
		factory.setTransactionWindow(this);
	}

	private YearMonth yearMonth = YearMonth.now();
	private List<Tab> tabs = new ArrayList<>();

	public void handle() {
		tabs.clear();
		Transactions allTransactions = getTransactionDao().find(yearMonth);
		addTransactions(allTransactions.filter(Transactions.TRANSACTIONS));
		addTransfers(allTransactions.filter(Transactions.TRANSFERS));
		getMainWindow().addTransactionWindow(tabs);
	}

	private void addTransactions(Transactions transactions) {
		for (Currency currency: transactions.currencies()) {
			Tab tab = createTabForCurrency(transactions, currency);
			tabs.add(tab);

		}
	}

	private Tab createTabForCurrency(Transactions transactions, Currency currency) {
		Tab tab = new Tab(currency.getName());
		Transactions t = transactions.filter(Transactions.currency(currency));
		TransactionGridBuilder gridBuilder = new TransactionGridBuilder(t);
		tab.setContent(gridBuilder.build());
		makeGridLabelsClickable(gridBuilder.getTransactionLabels());
		return tab;
	}

	private void makeGridLabelsClickable(Set<TransactionLabel> transactionLabels) {
		transactionLabels.forEach(x -> {
			x.setOnMouseClicked(e -> {
				TableView<Transaction> tableView = createTransactionLabelView(x);
				tableView.setOnKeyPressed(new TableViewSelectedRowRemover(tableView));
				ViewFactory.buildModalWindow(tableView);
				handle();
			});
		});
	}

	private TableView<Transaction> createTransactionLabelView(TransactionLabel transactionLabel) {
		Transactions transactions = transactionLabel.getTransactions();
		TableView<Transaction> tableView = ViewFactory.transactionEditorWindow(transactions);
		tableView.setOnKeyPressed(new TableViewSelectedRowRemover(tableView));
		return tableView;
	}

	private void addTransfers(Transactions transfers) {
		if (!transfers.isEmpty()) {
			Tab tab = new Tab("Переводы");
			TableView<Transaction> tableView = ViewFactory.transferEditorWindow(transfers);
			tableView.setOnKeyPressed(new TableViewSelectedRowRemover(tableView));
			tab.setContent(tableView);
			tabs.add(tab);
		}
	}

	public void nextMonth() {
		yearMonth = yearMonth.plusMonths(1);
	}

	public void prevMonth() {
		yearMonth = yearMonth.minusMonths(1);
	}

	private class TableViewSelectedRowRemover implements EventHandler<KeyEvent> {
		public TableViewSelectedRowRemover(TableView<Transaction> tableView) {
			this.tableView = tableView;
		}

		private final TableView<Transaction> tableView;

		@Override
		public void handle(KeyEvent event) {
			if (event.getCode() == KeyCode.BACK_SPACE) {
				Transaction transaction = tableView.getSelectionModel().getSelectedItem();
				Alert alert = new Alert(AlertType.CONFIRMATION);
				alert.setHeaderText("Удалить транзакцию?");
				alert.showAndWait();
				if (alert.getResult().getButtonData().isDefaultButton()) {
					tableView.getItems().remove(transaction);
					getTransactionDao().delete(transaction);
				}
			}
		}
	}
}
