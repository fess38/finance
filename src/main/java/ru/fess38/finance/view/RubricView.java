package ru.fess38.finance.view;


import org.apache.commons.lang3.BooleanUtils;

import javafx.beans.property.SimpleStringProperty;
import javafx.scene.control.ComboBox;
import javafx.scene.control.Label;
import javafx.scene.control.TableColumn;
import ru.fess38.finance.model.Rubric;


public class RubricView extends SimpleEntityView<Rubric> {
	private TableColumn<Rubric, String> isIncomeColumn;
	private ComboBox<String> isIncomeComboBox;

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

	@Override
	@SuppressWarnings("unchecked")
	protected void initTableView() {
		super.initTableView();
		isIncomeColumn = new TableColumn<>("Тип");
		isIncomeColumn.setCellValueFactory(e -> {
			String result = isIncomeToString(e.getValue().isIncome());
			return new SimpleStringProperty(result);
		});
		getTableView().getColumns().setAll(isIncomeColumn, getNameColumn());
		getTableView().getSortOrder().setAll(isIncomeColumn, getNameColumn());
		getTab().setText("Рубрики");
	}

	@Override
	protected void initAdder() {
		super.initAdder();
		isIncomeComboBox = new ComboBox<>();
		isIncomeComboBox.getItems().addAll(isIncome.TRUE.value, isIncome.FALSE.value);
		isIncomeComboBox.getSelectionModel().selectFirst();
		getEntityAdder().getChildren().setAll(new Label("Название:"), getEntityAdderName(),
				new Label("Тип:"), isIncomeComboBox, getCreateEntityButton());
	}

	public ComboBox<String> getIsIncomeComboBox() {
		return isIncomeComboBox;
	}
}
