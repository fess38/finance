package ru.fess38.finance.controller;

import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.scene.control.Alert.AlertType;
import javafx.scene.control.TableView;
import javafx.scene.input.KeyCode;
import javafx.stage.Modality;
import javafx.stage.Stage;
import ru.fess38.finance.model.Transaction;
import ru.fess38.finance.view.TransactionLabel;
import ru.fess38.finance.view.ViewFactory;


public class TransactionEditorController extends AbstractController {
	private TransactionLabel transactionLabel;
	private TransactionWindowController transactionWindowController;
	private boolean isEdited;

	@Override
	public void init() {}

	@Override
	public void handle() {
		isEdited = false;
		TableView<Transaction> tableView = ViewFactory.transactionEditorWindow();
		transactionLabel.getTransactions().forEach(tableView.getItems()::add);
		tableView.sort();
		tableView.setOnKeyPressed(e -> {
			if (e.getCode() == KeyCode.BACK_SPACE) {
				removeTransaction(tableView);
			}
		});
		transactionLabel = null;
		Scene scene = new Scene(tableView);
		Stage stage = new Stage();
		stage.setScene(scene);
		stage.initModality(Modality.APPLICATION_MODAL);
		stage.showAndWait();
		if (isEdited) {
			transactionWindowController.handle();
		}
	}

	private void removeTransaction(TableView<Transaction> tableView) {
		Transaction transaction = tableView.getSelectionModel().getSelectedItem();
		Alert alert = new Alert(AlertType.CONFIRMATION);
		alert.setHeaderText("Удалить транзакцию");
		alert.showAndWait();
		if (alert.getResult().getButtonData().isDefaultButton()) {
			tableView.getItems().remove(transaction);
			getTransactionDao().delete(transaction);
			isEdited = true;
		}
	}

	public void handle(TransactionLabel transactionLabel) {
		this.transactionLabel = transactionLabel;
		handle();
	}

	public void setTransactionWindowController(
			TransactionWindowController transactionWindowController) {
		this.transactionWindowController = transactionWindowController;
	}
}
