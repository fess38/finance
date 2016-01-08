package ru.fess38.finance.view;


import org.apache.commons.lang3.BooleanUtils;

import javafx.beans.property.SimpleStringProperty;
import javafx.scene.control.Button;
import javafx.scene.control.ComboBox;
import javafx.scene.control.Label;
import javafx.scene.control.Tab;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.TextField;
import javafx.scene.control.cell.TextFieldTableCell;
import javafx.scene.layout.HBox;
import ru.fess38.finance.model.Rubric;


public class RubricView {
	public RubricView() {
		initTableView();
		initAdder();
		tab.setContent(tableView);
	}

	private final Tab tab = new Tab("Рубрики");
	private final TableView<Rubric> tableView = new TableView<>();
	private final TableColumn<Rubric, String> nameColumn = new TableColumn<>("Название");
	private final TableColumn<Rubric, String> isIncomeColumn = new TableColumn<>("Тип");
	private final HBox rubricAdder = new HBox();
	private final TextField rubricAdderName = new TextField();
	private final ComboBox<String> rubricType = new ComboBox<>();
	private final Button createRubricButton = new Button("Сохранить");

	public static boolean isIncomeToBoolean(String value) {
		return BooleanUtils.toBoolean(value, isIncome.TRUE.value, isIncome.FALSE.value);
	}

	public static String isIncomeToString(boolean value) {
		return BooleanUtils.toString(value, isIncome.TRUE.value, isIncome.FALSE.value);
	}

	private enum isIncome {
		TRUE("Доход"), FALSE("Расход");

		private isIncome(String value) {
			this.value = value;
		}

		protected final String value;
	}

	@SuppressWarnings("unchecked")
	private void initTableView() {
		nameColumn.setCellFactory(TextFieldTableCell.forTableColumn());
		nameColumn.setCellValueFactory(e -> {
			return new SimpleStringProperty(e.getValue().getName());
		});
		nameColumn.setEditable(true);
		isIncomeColumn.setCellValueFactory(e -> {
			String result = isIncomeToString(e.getValue().getIsIncome());
			return new SimpleStringProperty(result);
		});
		tableView.getColumns().addAll(isIncomeColumn, nameColumn);
		tableView.getSortOrder().addAll(isIncomeColumn, nameColumn);
		tableView.setEditable(true);
	}

	private void initAdder() {
		rubricType.getItems().addAll(isIncome.TRUE.value, isIncome.FALSE.value);
		rubricType.getSelectionModel().selectFirst();
		rubricAdder.getChildren().addAll(new Label("Название:"), rubricAdderName, new Label("Тип:"),
				rubricType, createRubricButton);
	}

	public Tab getTab() {
		return tab;
	}

	public TableView<Rubric> getTableView() {
		return tableView;
	}

	public TableColumn<Rubric, String> getNameColumn() {
		return nameColumn;
	}

	public TextField getRubricAdderName() {
		return rubricAdderName;
	}

	public ComboBox<String> getRubricType() {
		return rubricType;
	}

	public HBox getRubricAdder() {
		return rubricAdder;
	}

	public Button getCreateRubricButton() {
		return createRubricButton;
	}
}
