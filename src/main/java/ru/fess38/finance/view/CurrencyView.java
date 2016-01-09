package ru.fess38.finance.view;


import javafx.beans.property.SimpleStringProperty;
import javafx.scene.control.Label;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TextField;
import ru.fess38.finance.model.Currency;


public class CurrencyView extends SimpleEntityView<Currency> {
	private TableColumn<Currency, String> currencySymbolColumn;
	private TextField currencySymbolTextField;

	@Override
	@SuppressWarnings("unchecked")
	protected void initTableView() {
		super.initTableView();
		currencySymbolColumn = new TableColumn<>("Символ");
		currencySymbolColumn.setCellValueFactory(e -> {
			return new SimpleStringProperty(e.getValue().getSymbol());
		});
		getTableView().getColumns().setAll(getNameColumn(), currencySymbolColumn);
		getTableView().getSortOrder().setAll(getNameColumn());
		getTab().setText("Валюта");
	}

	@Override
	protected void initAdder() {
		super.initAdder();
		currencySymbolTextField = new TextField();
		getEntityAdder().getChildren().setAll(new Label("Название:"), getEntityAdderName(),
				new Label("Символ:"), currencySymbolTextField, getCreateEntityButton());
	}

	public TableColumn<Currency, String> getCurrencySymbolColumn() {
		return currencySymbolColumn;
	}

	public TextField getCurrencySymbolTextField() {
		return currencySymbolTextField;
	}
}
