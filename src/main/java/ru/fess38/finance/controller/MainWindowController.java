package ru.fess38.finance.controller;


import java.util.List;

import javafx.scene.control.Tab;
import javafx.scene.control.TabPane;
import javafx.scene.input.KeyCode;
import ru.fess38.finance.view.ViewFactory;


public class MainWindowController extends AbstractController {
	private final TabPane mainWindow = ViewFactory.mainWindow();
	private RubricController rubricController;
	private TransactionGroupController transactionGroupController;
	private TransactionController transactionController;
	private UserController userController;
	private TransactionAdderController transactionAdderController;

	public void handle() {
		List<Tab> tabs = mainWindow.getTabs();
		transactionController.handle();
		tabs.add(transactionController.getTransactionsTab());
		tabs.add(transactionController.getTransfersTab());
		rubricController.init();
		tabs.add(rubricController.getTab());
		userController.init();
		tabs.add(userController.getTab());
		transactionGroupController.init();
		tabs.add(transactionGroupController.getTab());
		addKeyEventHandler();
	}

	private void addKeyEventHandler() {
		mainWindow.setOnKeyPressed(e -> {
			if (e.getCode() == KeyCode.LEFT) {
				e.consume();
				transactionController.prevMonth();
				transactionController.handle();
			} else if (e.getCode() == KeyCode.RIGHT) {
				e.consume();
				transactionController.nextMonth();
				transactionController.handle();
			}
		});

		mainWindow.setOnKeyReleased(e -> {
			if (e.isControlDown() && e.getCode() == KeyCode.ENTER && isTransactionTabSelected()) {
				e.consume();
				transactionAdderController.handle();
				transactionController.handle();
			}
		});
	}

	private boolean isTransactionTabSelected() {
		return transactionController.getTransactionsTab()
			.equals(mainWindow.getSelectionModel().getSelectedItem());
	}

	public TabPane getMainWindow() {
		return mainWindow;
	}

	public void setRubricController(RubricController rubricController) {
		this.rubricController = rubricController;
	}

	public void setTransactionGroupController(
			TransactionGroupController transactionGroupController) {
		this.transactionGroupController = transactionGroupController;
	}

	public void setUserController(UserController userController) {
		this.userController = userController;
	}

	public void setTransactionController(TransactionController transactionController) {
		this.transactionController = transactionController;
	}

	public void setTransactionAdderController(
			TransactionAdderController transactionAdderController) {
		this.transactionAdderController = transactionAdderController;
	}
}
