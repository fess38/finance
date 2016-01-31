package ru.fess38.finance.controller;


import java.time.LocalDate;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;

import javafx.scene.control.Alert;
import javafx.scene.control.Alert.AlertType;
import javafx.scene.control.Button;
import javafx.scene.control.ComboBox;
import javafx.scene.control.DatePicker;
import javafx.scene.control.TextField;
import javafx.scene.layout.GridPane;
import javafx.stage.Stage;
import ru.fess38.finance.model.Account;
import ru.fess38.finance.model.Transaction;
import ru.fess38.finance.view.EntityStringConverter;
import ru.fess38.finance.view.NumberInputListener;
import ru.fess38.finance.view.ViewFactory;


public class TransferAdderController extends AbstractController {
	private GridPane gridPane;

	public void handle() {
		gridPane = ViewFactory.transferAdderWindow();
		setViewRules();
		refreshValues();
		ViewFactory.buildModalWindow(gridPane);
	}

	private void setViewRules() {
		accountFrom().setConverter(new EntityStringConverter<Account>());
		accountTo().setConverter(new EntityStringConverter<Account>());
		amountFrom().textProperty().addListener(new NumberInputListener(amountFrom()));
		amountTo().textProperty().addListener(new NumberInputListener(amountTo()));
		saveButton().setOnAction(e -> save());
	}

	private void refreshValues() {
		datePicker().setValue(LocalDate.now());
		accountFrom().getItems().setAll(getAccountDao().find());
		accountFrom().getSelectionModel().selectFirst();
		accountTo().getItems().setAll(getAccountDao().find());
		accountTo().getSelectionModel().selectFirst();
	}

	private Transaction getTransaction() {
		Transaction transaction = new Transaction();
		transaction.setLocalDate(datePicker().getValue());
		transaction.setAccountFrom(accountFrom().getValue());
		transaction.setAccountTo(accountTo().getValue());
		transaction.setAmountFrom(NumberUtils.createInteger(amountFrom().getText()));
		transaction.setAmountTo(NumberUtils.createInteger(amountTo().getText()));
		transaction.setComment(StringUtils.trimToNull(comment().getText()));
		return transaction;
	}

	private boolean validateAmount(TextField amountField) {
		if (amountField.getText().isEmpty()) {
			Alert alert = new Alert(AlertType.ERROR);
			alert.setHeaderText("Введите сумму");
			alert.showAndWait();
			amountField.requestFocus();
			return false;
		}
		return true;
	}

	private void save() {
		if (validateAmount(amountFrom()) && validateAmount(amountTo())) {
			Transaction transaction = getTransaction();
			transaction.setRubric(getRubricDao().getTransferRubric());
			getTransactionDao().save(transaction);
			((Stage) gridPane.getScene().getWindow()).close();
		}
	}

	private DatePicker datePicker() {
		return (DatePicker) gridPane.lookup("#date");
	}

	@SuppressWarnings("unchecked")
	private ComboBox<Account> accountFrom() {
		return (ComboBox<Account>) gridPane.lookup("#accountFrom");
	}

	@SuppressWarnings("unchecked")
	private ComboBox<Account> accountTo() {
		return (ComboBox<Account>) gridPane.lookup("#accountTo");
	}

	private TextField amountFrom() {
		return (TextField) gridPane.lookup("#amountFrom");
	}

	private TextField amountTo() {
		return (TextField) gridPane.lookup("#amountTo");
	}

	private TextField comment() {
		return (TextField) gridPane.lookup("#comment");
	}

	private Button saveButton() {
		return (Button) gridPane.lookup("#saveButton");
	}
}
