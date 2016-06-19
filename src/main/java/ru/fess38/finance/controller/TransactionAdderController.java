package ru.fess38.finance.controller;


import java.time.LocalDate;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;
import org.hibernate.criterion.DetachedCriteria;

import javafx.beans.value.ChangeListener;
import javafx.beans.value.ObservableValue;
import javafx.scene.control.Alert;
import javafx.scene.control.Alert.AlertType;
import javafx.scene.control.Button;
import javafx.scene.control.ComboBox;
import javafx.scene.control.DatePicker;
import javafx.scene.control.RadioButton;
import javafx.scene.control.TextField;
import javafx.scene.control.ToggleGroup;
import javafx.scene.layout.GridPane;
import javafx.stage.Stage;
import ru.fess38.finance.model.Account;
import ru.fess38.finance.model.Rubric;
import ru.fess38.finance.model.Transaction;
import ru.fess38.finance.model.TransactionGroup;
import ru.fess38.finance.model.User;
import ru.fess38.finance.view.ComboBoxCleanEventHandler;
import ru.fess38.finance.view.EntityStringConverter;
import ru.fess38.finance.view.NumberInputListener;
import ru.fess38.finance.view.ViewFactory;


public class TransactionAdderController extends AbstractController {
	private GridPane gridPane;

	public void handle() {
		gridPane = ViewFactory.transactionAdderWindow();
		setViewRules();
		refreshValues();
		ViewFactory.buildModalWindow(gridPane);
	}

	private void setViewRules() {
		ToggleGroup toggleGroup = new ToggleGroup();
		toggleGroup.getToggles().setAll(income(), expence());

		income().selectedProperty().addListener(new RubricChangeListener(true));
		expence().selectedProperty().addListener(new RubricChangeListener(false));
		rubric().setConverter(new EntityStringConverter<Rubric>());
		amount().textProperty().addListener(new NumberInputListener(amount()));
		user().setConverter(new EntityStringConverter<User>());
		user().setOnKeyPressed(new ComboBoxCleanEventHandler(user()));
		transactionGroup().setConverter(new EntityStringConverter<TransactionGroup>());
		transactionGroup().setOnKeyPressed(new ComboBoxCleanEventHandler(transactionGroup()));
		saveButton().setOnAction(e -> save());
	}

	private void refreshValues() {
		datePicker().setValue(LocalDate.now());
		expence().selectedProperty().set(true);
		rubric().getSelectionModel().selectFirst();
		user().getItems().setAll(getUserDao().find(DetachedCriteria.forClass(User.class)));
		transactionGroup().getItems().setAll(getTransactionGroupDao().find(
				DetachedCriteria.forClass(TransactionGroup.class)));
	}

	private Transaction getTransaction() {
		Transaction transaction = new Transaction();
		transaction.setLocalDate(datePicker().getValue());
		transaction.setRubric(rubric().getValue());

		int amount = NumberUtils.createInteger(amount().getText());
		transaction.setAmountFrom(amount);
		transaction.setAmountTo(amount);

		transaction.setUser(user().getValue());
		transaction.setTransactionGroup(transactionGroup().getValue());
		transaction.setComment(StringUtils.trimToNull(comment().getText()));
		return transaction;
	}

	private boolean validateAmount() {
		if (amount().getText().isEmpty()) {
			Alert alert = new Alert(AlertType.ERROR);
			alert.setHeaderText("Введите сумму");
			alert.showAndWait();
			amount().requestFocus();
			return false;
		}
		return true;
	}

	private boolean validateRubric() {
		if (rubric().getValue() == null) {
			Alert alert = new Alert(AlertType.ERROR);
			alert.setHeaderText("Введите рубрику");
			alert.showAndWait();
			rubric().requestFocus();
			return false;
		}
		return true;
	}

	private void save() {
		if (validateAmount() && validateRubric()) {
			Transaction t = getTransaction();
			Account masterAccount = getAccountDao().getMasterAccount();
			Account outerAccount = getAccountDao().getOuterAccount();

			if (t.getRubric().isIncome()) {
				t.setAccountFrom(outerAccount);
				t.setAccountTo(masterAccount);
			} else {
				t.setAccountFrom(masterAccount);
				t.setAccountTo(outerAccount);
			}
			getTransactionDao().save(t);
			((Stage) gridPane.getScene().getWindow()).close();
		}
	}

	private class RubricChangeListener implements ChangeListener<Boolean> {
		public RubricChangeListener(boolean isIncome) {
			this.isIncome = isIncome;
		}

		private final boolean isIncome;

		@Override
		public void changed(ObservableValue<? extends Boolean> observable, Boolean oldValue,
				Boolean newValue) {
			if (newValue) {
				rubric().getItems().setAll(getRubricDao().findByType(isIncome));
				rubric().getSelectionModel().selectFirst();
			}
		}
	}

	private DatePicker datePicker() {
		return (DatePicker) gridPane.lookup("#date");
	}

	private RadioButton income() {
		return (RadioButton) gridPane.lookup("#income");
	}

	private RadioButton expence() {
		return (RadioButton) gridPane.lookup("#expence");
	}

	@SuppressWarnings("unchecked")
	private ComboBox<Rubric> rubric() {
		return (ComboBox<Rubric>) gridPane.lookup("#rubric");
	}

	private TextField amount() {
		return (TextField) gridPane.lookup("#amount");
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
