package ru.fess38.finance.controller;


import java.util.List;

import javafx.scene.control.Alert;
import javafx.scene.control.Alert.AlertType;
import javafx.scene.control.Button;
import javafx.scene.control.Tab;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.input.KeyCode;
import javafx.scene.input.KeyEvent;
import javafx.stage.Stage;
import ru.fess38.finance.model.Entity;
import ru.fess38.finance.view.SimpleEntityView;
import ru.fess38.finance.view.ViewFactory;


public abstract class SimpleEntityController<T extends Entity> extends AbstractController {
	public SimpleEntityController(ControllersFactory factory) {
		super(factory);
	}

	private SimpleEntityView<T> entityView;

	public void init() {
		setEntitiesToTableView();
		setDeleteEntityAction();
		setEntityAdderViewAction();
		setSaveEntityAction();
		setEntityNameEditAction();
		setTabSelectAction();
	}

	private void setEntitiesToTableView() {
		List<T> entities = findEntities();
		getTableView().getItems().clear();
		entities.forEach(getTableView().getItems()::add);
		getTableView().sort();
	}

	protected abstract List<T> findEntities();

	protected void setDeleteEntityAction() {
		getTableView().addEventHandler(KeyEvent.KEY_PRESSED, e -> {
			T entity = getTableView().getSelectionModel().getSelectedItem();
			if (e.getCode() == KeyCode.BACK_SPACE && entity != null) {
				boolean isEntityUsed = getTransactionDao().isEntityUsed(entity);
				if (!isEntityUsed) {
					deleteEntity(entity);
					setEntitiesToTableView();
				} else {
					Alert alert = new Alert(AlertType.ERROR);
					alert.setHeaderText("Объект используется в транзакциях");
					alert.showAndWait();
				}
			}
		});
	}

	protected abstract void deleteEntity(T entity);

	private void setEntityAdderViewAction() {
		getTableView().addEventHandler(KeyEvent.KEY_RELEASED, e -> {
			if (e.isControlDown() && e.getCode() == KeyCode.ENTER) {
				ViewFactory.buildModalWindow(entityView.getEntityAdder());
			}
		});
	}

	private void setSaveEntityAction() {
		Button createEntityButton = entityView.getCreateEntityButton();
		createEntityButton.setOnAction(e -> {
			T entity = readEntityFromView();
			if (validInputName(entity.getName())) {
				saveEntity(entity);
				entityView.getEntityAdderName().setText("");
				setEntitiesToTableView();
				((Stage) entityView.getEntityAdder().getScene().getWindow()).close();
			}
		});
	}

	protected abstract T readEntityFromView();

	private boolean validInputName(String name) {
		boolean isValid = !name.isEmpty();
		if (!isValid) {
			Alert alert = new Alert(AlertType.ERROR);
			alert.setHeaderText("Введите название");
			alert.showAndWait();
		}
		return isValid;
	}

	protected abstract void saveEntity(T entity);

	private void setEntityNameEditAction() {
		TableColumn<T, String> nameColumn = entityView.getNameColumn();
		nameColumn.setOnEditCommit(e -> {
			String newName = e.getNewValue();
			T entity = e.getRowValue();
			if (validInputName(newName)) {
				entity.setName(newName);
				updateEntity(entity);
			} else {
				entity.setName(e.getOldValue());
			}
		});
	}

	protected abstract void updateEntity(T entity);

	private void setTabSelectAction() {
		entityView.getTab().setOnSelectionChanged(e -> {
			setEntitiesToTableView();
		});
	}

	public Tab getTab() {
		return entityView.getTab();
	}

	public SimpleEntityView<T> getEntityView() {
		return entityView;
	}

	public TableView<T> getTableView() {
		return entityView.getTableView();
	}

	public void setEntityView(SimpleEntityView<T> entityView) {
		this.entityView = entityView;
	}
}
