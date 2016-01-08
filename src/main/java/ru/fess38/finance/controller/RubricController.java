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
import ru.fess38.finance.model.Rubric;
import ru.fess38.finance.view.RubricView;
import ru.fess38.finance.view.ViewFactory;


public class RubricController extends AbstractController {
	public RubricController(ControllersFactory factory) {
		super(factory);
		factory.setRubricController(this);
	}

	private final RubricView rubricView = new RubricView();
	private final TableView<Rubric> tableView = rubricView.getTableView();

	public void init() {
		setRubricsToTableView();
		setDeleteRubricAction();
		setAddRubricAction();
		setSaveRubricAction();
		setRubricNameEditAction();
		setTabSelectAction();
	}

	private void setRubricsToTableView() {
		List<Rubric> rubrics = getRubricDao().find();
		tableView.getItems().clear();
		rubrics.forEach(tableView.getItems()::add);
		tableView.sort();
	}

	private void setDeleteRubricAction() {
		tableView.addEventHandler(KeyEvent.KEY_PRESSED, e -> {
			Rubric rubric = tableView.getSelectionModel().getSelectedItem();
			if (e.getCode() == KeyCode.BACK_SPACE && rubric != null) {
				boolean isRubricUsed = getTransactionDao().isEntityUsed(rubric);
				if (!isRubricUsed) {
					getRubricDao().delete(rubric);
					setRubricsToTableView();
				} else {
					Alert alert = new Alert(AlertType.ERROR);
					alert.setHeaderText("У этой рубрики есть транзакции");
					alert.showAndWait();
				}
			}
		});
	}

	private void setAddRubricAction() {
		tableView.addEventHandler(KeyEvent.KEY_RELEASED, e -> {
			if (e.isControlDown() && e.getCode() == KeyCode.ENTER) {
				ViewFactory.buildModalWindow(rubricView.getRubricAdder());
			}
		});
	}

	private void setSaveRubricAction() {
		Button createRubricButton = rubricView.getCreateRubricButton();
		createRubricButton.setOnAction(e -> {
			String name = rubricView.getRubricAdderName().getText();
			boolean isIncome = RubricView.isIncomeToBoolean(rubricView.getRubricType().getValue());
			if (validInputName(name)) {
				Rubric rubric = new Rubric();
				rubric.setName(name);
				rubric.setIsIncome(isIncome);
				getRubricDao().save(rubric);
				rubricView.getRubricAdderName().setText("");
				rubricView.getRubricType().getSelectionModel().selectFirst();
				setRubricsToTableView();
				((Stage) rubricView.getRubricAdder().getScene().getWindow()).close();
			}
		});
	}

	private boolean validInputName(String name) {
		boolean isValid = !name.isEmpty();
		if (!isValid) {
			Alert alert = new Alert(AlertType.ERROR);
			alert.setHeaderText("Введите название рубрики");
			alert.showAndWait();
		}
		return isValid;
	}

	private void setRubricNameEditAction() {
		TableColumn<Rubric, String> nameColumn = rubricView.getNameColumn();
		nameColumn.setOnEditCommit(e -> {
			String newName = e.getNewValue();
			Rubric rubric = e.getRowValue();
			if (validInputName(newName)) {
				rubric.setName(newName);
				getRubricDao().update(rubric);
			} else {
				rubric.setName(e.getOldValue());
			}
		});
	}

	private void setTabSelectAction() {
		rubricView.getTab().setOnSelectionChanged(e -> {
			setRubricsToTableView();
		});
	}

	public Tab getTab() {
		return rubricView.getTab();
	}
}
