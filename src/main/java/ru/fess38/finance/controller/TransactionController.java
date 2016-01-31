package ru.fess38.finance.controller;


import java.time.YearMonth;
import java.util.Set;

import javafx.event.EventHandler;
import javafx.scene.control.Alert;
import javafx.scene.control.Alert.AlertType;
import javafx.scene.control.Tab;
import javafx.scene.control.TableView;
import javafx.scene.input.KeyCode;
import javafx.scene.input.KeyEvent;
import ru.fess38.finance.model.Transaction;
import ru.fess38.finance.view.TransactionGridBuilder;
import ru.fess38.finance.view.TransactionLabel;
import ru.fess38.finance.view.Transactions;
import ru.fess38.finance.view.ViewFactory;


public class TransactionController extends AbstractController {
	private YearMonth yearMonth = YearMonth.now();
	private final Tab transactionsTab = new Tab("Доходы и расходы");
	private final Tab transfersTab = new Tab("Переводы");
	private TransferAdderController transferAdderController;

	public void handle() {
		Transactions allTransactions = getTransactionDao().find(yearMonth);
		addTransactions(allTransactions.filter(Transactions.TRANSACTIONS));
		addTransfers(allTransactions.filter(Transactions.TRANSFERS));
		addTransferAdderHandler();
	}

	private void addTransactions(Transactions transactions) {
		TransactionGridBuilder gridBuilder = new TransactionGridBuilder(transactions);
		transactionsTab.setContent(gridBuilder.build());
		makeGridLabelsClickable(gridBuilder.getTransactionLabels());
	}

	private void makeGridLabelsClickable(Set<TransactionLabel> transactionLabels) {
		transactionLabels.forEach(x -> {
			x.setOnMouseClicked(e -> {
				Transactions t = x.getTransactions();
				TableView<Transaction> tableView = ViewFactory.transactionEditorWindow(t);
				tableView.setOnKeyPressed(new TableViewSelectedRowRemover(tableView));
				ViewFactory.buildModalWindow(tableView);
				handle();
			});
		});
	}

	private void addTransfers(Transactions transfers) {
		TableView<Transaction> tableView = ViewFactory.transferEditorWindow(transfers);
		tableView.setOnKeyPressed(new TableViewSelectedRowRemover(tableView));
		transfersTab.setContent(tableView);
	}

	private void addTransferAdderHandler() {
		transfersTab.getContent().addEventHandler(KeyEvent.KEY_RELEASED, e -> {
			if (e.isControlDown() && e.getCode() == KeyCode.ENTER) {
				e.consume();
				transferAdderController.handle();
				handle();
			}
		});
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

	public Tab getTransactionsTab() {
		return transactionsTab;
	}

	public Tab getTransfersTab() {
		return transfersTab;
	}

	public void setTransferAdderController(TransferAdderController transferAdderController) {
		this.transferAdderController = transferAdderController;
	}
}
