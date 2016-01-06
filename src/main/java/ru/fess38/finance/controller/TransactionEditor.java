package ru.fess38.finance.controller;


import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.scene.control.Alert.AlertType;
import javafx.scene.control.TableView;
import javafx.scene.input.KeyCode;
import javafx.stage.Modality;
import javafx.stage.Stage;
import ru.fess38.finance.model.Transaction;
import ru.fess38.finance.view.Transactions;
import ru.fess38.finance.view.ViewFactory;


public class TransactionEditor extends AbstractController {
	public TransactionEditor(ControllersFactory factory) {
		super(factory);
		factory.setTransactionEditor(this);
	}

	private Transactions transactions;
	private boolean isEdited;

	public void handle(Transactions transactions) {
		this.transactions = transactions;
		handle();
	}

	@Override
	public void handle() {
		isEdited = false;
		TableView<Transaction> tableView = ViewFactory.transactionEditorWindow(transactions);
		tableView.setOnKeyPressed(e -> {
			if (e.getCode() == KeyCode.BACK_SPACE) {
				removeTransaction(tableView);
			}
		});
		transactions = null;
		Scene scene = new Scene(tableView);
		Stage stage = new Stage();
		stage.setScene(scene);
		stage.initModality(Modality.APPLICATION_MODAL);
		stage.showAndWait();
		if (isEdited) {
			getTransactionWindow().handle();
		}
	}

	private void removeTransaction(TableView<Transaction> tableView) {
		Transaction transaction = tableView.getSelectionModel().getSelectedItem();
		Alert alert = new Alert(AlertType.CONFIRMATION);
		alert.setHeaderText("Удалить транзакцию?");
		alert.showAndWait();
		if (alert.getResult().getButtonData().isDefaultButton()) {
			tableView.getItems().remove(transaction);
			getTransactionDao().delete(transaction);
			isEdited = true;
		}
	}
}
