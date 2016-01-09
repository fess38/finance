package ru.fess38.finance.view;


import javafx.beans.property.SimpleStringProperty;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.Tab;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.TextField;
import javafx.scene.control.cell.TextFieldTableCell;
import javafx.scene.layout.HBox;
import ru.fess38.finance.model.Entity;


public abstract class SimpleEntityView<T extends Entity> {
	public SimpleEntityView() {
		initTableView();
		initAdder();
		tab.setContent(tableView);
	}

	private final Tab tab = new Tab();
	private final TableView<T> tableView = new TableView<>();
	private final TableColumn<T, String> nameColumn = new TableColumn<>("Название");
	private final HBox entityAdder = new HBox();
	private final TextField entityAdderName = new TextField();
	private final Button createEntityButton = new Button("Сохранить");

	protected void initTableView() {
		nameColumn.setCellFactory(TextFieldTableCell.forTableColumn());
		nameColumn.setCellValueFactory(e -> {
			return new SimpleStringProperty(e.getValue().getName());
		});
		nameColumn.setEditable(true);
		tableView.getColumns().add(nameColumn);
		tableView.getSortOrder().add(nameColumn);
		tableView.setEditable(true);
	}

	protected void initAdder() {
		getEntityAdder().getChildren().addAll(new Label("Название:"), getEntityAdderName(),
				getCreateEntityButton());
	}

	public Tab getTab() {
		return tab;
	}

	public TableView<T> getTableView() {
		return tableView;
	}

	public TableColumn<T, String> getNameColumn() {
		return nameColumn;
	}

	public TextField getEntityAdderName() {
		return entityAdderName;
	}

	public HBox getEntityAdder() {
		return entityAdder;
	}

	public Button getCreateEntityButton() {
		return createEntityButton;
	}
}
