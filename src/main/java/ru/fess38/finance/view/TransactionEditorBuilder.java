package ru.fess38.finance.view;

import java.time.format.DateTimeFormatter;
import java.util.Arrays;

import javafx.beans.property.SimpleIntegerProperty;
import javafx.beans.property.SimpleStringProperty;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.util.Builder;
import ru.fess38.finance.model.Transaction;
import ru.fess38.finance.model.TransactionGroup;
import ru.fess38.finance.model.User;


public class TransactionEditorBuilder implements Builder<TableView<Transaction>> {
	private DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd MMMM");
	private TableView<Transaction> tableView = new TableView<Transaction>();
	private TableColumn<Transaction, String> localDateColumn = new TableColumn<>("Дата");
	private TableColumn<Transaction, String> rubricColumn = new TableColumn<>("Рубрика");
	private TableColumn<Transaction, Integer> amountColumn = new TableColumn<>("Сумма");
	private TableColumn<Transaction, String> userColumn = new TableColumn<>("Пользователь");
	private TableColumn<Transaction, String> transactionGroupColumn = new TableColumn<>(
			"Группа транзакций");

	@Override
	public TableView<Transaction> build() {
		localDateColumn.setCellValueFactory(x -> {
			return new SimpleStringProperty(x.getValue().getLocalDate().format(formatter));
		});
		rubricColumn.setCellValueFactory(x -> {
			return new SimpleStringProperty(x.getValue().getRubric().getName());
		});
		amountColumn.setCellValueFactory(x -> {
			return new SimpleIntegerProperty(x.getValue().getAmountFrom().intValue()).asObject();
		});
		userColumn.setCellValueFactory(x -> {
			User user = x.getValue().getUser();
			return new SimpleStringProperty(user == null ? null : user.getName());
		});
		transactionGroupColumn.setCellValueFactory(x -> {
			TransactionGroup tg = x.getValue().getTransactionGroup();
			return new SimpleStringProperty(tg == null ? null : tg.getName());
		});
		tableView.getSortOrder().addAll(Arrays.asList(localDateColumn, rubricColumn));
		tableView.getColumns().addAll(Arrays.asList(localDateColumn, rubricColumn, amountColumn,
				userColumn, transactionGroupColumn));
		return tableView;
	}
}
