package ru.fess38.finance.controller;


import java.time.LocalDate;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;

import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.scene.control.Alert.AlertType;
import javafx.scene.control.Button;
import javafx.scene.control.ComboBox;
import javafx.scene.control.DatePicker;
import javafx.scene.control.TextField;
import javafx.scene.layout.GridPane;
import javafx.stage.Modality;
import javafx.stage.Stage;
import ru.fess38.finance.model.Account;
import ru.fess38.finance.model.Rubric;
import ru.fess38.finance.model.Transaction;
import ru.fess38.finance.model.TransactionGroup;
import ru.fess38.finance.model.User;
import ru.fess38.finance.view.ViewFactory;


public class TransferAdder extends AbstractController {
	public TransferAdder(ControllersFactory factory) {
		super(factory);
		factory.setTransferAdder(this);
	}

	private final GridPane gridPane = ViewFactory.transferAdderWindow();
	private final Scene scene = new Scene(gridPane);

	@Override
	public void init() {
		setViewRules();
		refreshValues();
	}

	@Override
	public void handle() {
		refreshValues();
		Stage stage = new Stage();
		stage.setScene(scene);
		stage.sizeToScene();
		stage.initModality(Modality.APPLICATION_MODAL);
		stage.showAndWait();
	}

	private void setViewRules() {
		rubric().setConverter(new EntityStringConverter<Rubric>());
		accountFrom().setConverter(new EntityStringConverter<Account>());
		accountTo().setConverter(new EntityStringConverter<Account>());
		amountFrom().textProperty().addListener(new NumberInputListener(amountFrom()));
		amountTo().textProperty().addListener(new NumberInputListener(amountTo()));
		user().setConverter(new EntityStringConverter<User>());
		user().setOnKeyPressed(new ComboBoxCleanEventHandler(user()));
		transactionGroup().setConverter(new EntityStringConverter<TransactionGroup>());
		transactionGroup().setOnKeyPressed(new ComboBoxCleanEventHandler(transactionGroup()));
		saveButton().setOnAction(e -> this.saveFromInput());
	}

	private void refreshValues() {
		datePicker().setValue(LocalDate.now());
		rubric().setValue(getRubricDao().getTransferRubric());
		accountFrom().getItems().setAll(getAccountDao().find());
		accountFrom().getSelectionModel().selectFirst();
		accountTo().getItems().setAll(getAccountDao().find());
		accountTo().getSelectionModel().selectFirst();
		amountFrom().clear();
		amountTo().clear();
		user().getItems().setAll(getUserDao().find());
		user().setValue(null);
		transactionGroup().getItems().setAll(getTransactionGroupDao().find());
		transactionGroup().setValue(null);
		comment().clear();
	}

	private Transaction getTransaction() {
		Transaction transaction = new Transaction();
		transaction.setLocalDate(datePicker().getValue());
		transaction.setRubric(rubric().getValue());
		transaction.setAccountFrom(accountFrom().getValue());
		transaction.setAccountTo(accountTo().getValue());
		transaction.setAmountFrom(NumberUtils.createInteger(amountFrom().getText()));
		transaction.setAmountTo(NumberUtils.createInteger(amountTo().getText()));
		transaction.setUser(user().getValue());
		transaction.setTransactionGroup(transactionGroup().getValue());
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

	private void saveFromInput() {
		if (validateAmount(amountFrom()) && validateAmount(amountTo())) {
			Transaction transaction = getTransaction();
			getTransactionDao().save(transaction);
			((Stage) scene.getWindow()).close();
		}
	}

	private DatePicker datePicker() {
		return (DatePicker) gridPane.lookup("#date");
	}

	@SuppressWarnings("unchecked")
	private ComboBox<Rubric> rubric() {
		return (ComboBox<Rubric>) gridPane.lookup("#rubric");
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

	@SuppressWarnings("unchecked")
	private ComboBox<User> user() {
		return (ComboBox<User>) gridPane.lookup("#user");
	}

	@SuppressWarnings("unchecked")
	private ComboBox<TransactionGroup> transactionGroup() {
		return (ComboBox<TransactionGroup>) gridPane.lookup("#transactionGroup");
	}

	private TextField comment() {
		return (TextField) gridPane.lookup("#comment");
	}

	private Button saveButton() {
		return (Button) gridPane.lookup("#saveButton");
	}
}
