package ru.fess38.finance.view;


import java.time.format.DateTimeFormatter;
import java.util.Comparator;

import javafx.beans.property.SimpleObjectProperty;
import javafx.beans.property.SimpleStringProperty;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.cell.ComboBoxTableCell;
import javafx.scene.control.cell.TextFieldTableCell;
import javafx.util.converter.DefaultStringConverter;
import ru.fess38.finance.model.Account;
import ru.fess38.finance.model.Rubric;
import ru.fess38.finance.model.Transaction;
import ru.fess38.finance.model.TransactionGroup;
import ru.fess38.finance.model.User;


public class TransactionEditorBuilder {
	private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("dd MMMM");
	private final TableView<Transaction> tableView = new TableView<Transaction>();
	private final TableColumn<Transaction, String> localDateColumn = new TableColumn<>("Дата");
	private final TableColumn<Transaction, Rubric> rubricColumn = new TableColumn<>("Рубрика");
	private final TableColumn<Transaction, Account> accountFromColumn = new TableColumn<>("Счет 1");
	private final TableColumn<Transaction, Account> accountToColumn = new TableColumn<>("Счет 2");
	private final TableColumn<Transaction, String> amountFromColumn = new TableColumn<>("Сумма 1");
	private final TableColumn<Transaction, String> amountToColumn = new TableColumn<>("Сумма 2");
	private final TableColumn<Transaction, User> userColumn = new TableColumn<>("Пользователь");
	private final TableColumn<Transaction, TransactionGroup> transactionGroupColumn = new TableColumn<>(
			"Группа транзакций");
	private final TableColumn<Transaction, String> commentColumn = new TableColumn<>("Комментарий");

	@SuppressWarnings("unchecked")
	public TableView<Transaction> transactionEditorWindow(Transactions transactions) {
		initLocalDateColumn();
		initRubricColumn();
		initAmountFromColumn();
		initUserColumn();
		initTransactionGroupColumn();
		initCommentColumn();

		tableView.getColumns().addAll(localDateColumn, rubricColumn, amountFromColumn, userColumn,
				transactionGroupColumn, commentColumn);
		setDataAndSort(transactions, localDateColumn, rubricColumn);
		return tableView;
	}

	@SuppressWarnings("unchecked")
	public TableView<Transaction> transferEditorWindow(Transactions transactions) {
		initLocalDateColumn();
		initAccountFromColumn();
		initAccountToColumn();
		initAmountFromColumn();
		initAmountToColumn();
		initUserColumn();
		initTransactionGroupColumn();
		initCommentColumn();

		tableView.getColumns().addAll(localDateColumn, accountFromColumn, accountToColumn,
				amountFromColumn, amountToColumn, userColumn, transactionGroupColumn,
				commentColumn);
		setDataAndSort(transactions, localDateColumn, accountFromColumn);
		return tableView;
	}

	@SuppressWarnings("unchecked")
	private void setDataAndSort(Transactions t, TableColumn<Transaction, ?>... columnsToSort) {
		t.forEach(tableView.getItems()::add);
		tableView.getSortOrder().addAll(columnsToSort);
		tableView.sort();
	}

	private void initLocalDateColumn() {
		localDateColumn.setCellValueFactory(x -> {
			return new SimpleStringProperty(x.getValue().getLocalDate().format(FORMATTER));
		});
	}

	private void initRubricColumn() {
		rubricColumn.setCellFactory(x -> {
			return new ComboBoxTableCell<>(new EntityStringConverter<>());
		});
		rubricColumn.setCellValueFactory(x -> {
			return new SimpleObjectProperty<>(x.getValue().getRubric());
		});
		rubricColumn.setComparator(Comparator.comparing(Rubric::getName));
	}

	private void initAccountFromColumn() {
		accountFromColumn.setCellFactory(x -> {
			return new ComboBoxTableCell<>(new EntityStringConverter<>());
		});
		accountFromColumn.setCellValueFactory(x -> {
			return new SimpleObjectProperty<>(x.getValue().getAccountFrom());
		});
		accountFromColumn.setComparator(Comparator.comparing(Account::getName));
	}

	private void initAccountToColumn() {
		accountToColumn.setCellFactory(x -> {
			return new ComboBoxTableCell<>(new EntityStringConverter<Account>());
		});
		accountToColumn.setCellValueFactory(x -> {
			return new SimpleObjectProperty<>(x.getValue().getAccountTo());
		});
		accountToColumn.setComparator(Comparator.comparing(Account::getName));
	}

	private void initAmountFromColumn() {
		amountFromColumn.setCellFactory(x -> {
			return new TextFieldTableCell<>(new DefaultStringConverter());
		});
		amountFromColumn.setCellValueFactory(x -> {
			return new SimpleStringProperty(x.getValue().getAmountFrom().toString());
		});
	}

	private void initAmountToColumn() {
		amountToColumn.setCellFactory(x -> {
			return new TextFieldTableCell<>(new DefaultStringConverter());
		});
		amountToColumn.setCellValueFactory(x -> {
			return new SimpleStringProperty(x.getValue().getAmountTo().toString());
		});
	}

	private void initUserColumn() {
		userColumn.setCellFactory(x -> {
			return new ComboBoxTableCell<>(new EntityStringConverter<User>());
		});
		userColumn.setCellValueFactory(x -> {
			return new SimpleObjectProperty<>(x.getValue().getUser());
		});
	}

	private void initTransactionGroupColumn() {
		transactionGroupColumn.setCellFactory(x -> {
			return new ComboBoxTableCell<>(new EntityStringConverter<>());
		});
		transactionGroupColumn.setCellValueFactory(x -> {
			return new SimpleObjectProperty<>(x.getValue().getTransactionGroup());
		});
	}

	private void initCommentColumn() {
		commentColumn.setCellFactory(x -> {
			return new TextFieldTableCell<>(new DefaultStringConverter());
		});
		commentColumn.setCellValueFactory(x -> {
			return new SimpleStringProperty(x.getValue().getComment());
		});
	}
}
