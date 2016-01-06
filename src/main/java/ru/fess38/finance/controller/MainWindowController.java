package ru.fess38.finance.controller;


import javafx.scene.control.Button;
import javafx.scene.control.TabPane;
import javafx.scene.input.KeyCode;


public class MainWindowController extends AbstractController {
	public MainWindowController(TabPane mainWindow) {
		this.mainWindow = mainWindow;
	}

	private final TabPane mainWindow;
	private TransactionAdderController transactionAdderController;
	private TransferAdderController transferAdderController;
	private TransactionWindowController transactionWindowController;

	@Override
	public void init() {
		transactionAdderButton().setOnAction(e -> transactionAdderController.handle());
		transferAdderButton().setOnAction(e -> transferAdderController.handle());
		prevMonthButton().setOnAction(e -> prevMonth());
		nextMonthButton().setOnAction(e -> nextMonth());
		addKeyEventHandler();
	}

	@Override
	public void handle() {

	}

	private void addKeyEventHandler() {
		mainWindow.setOnKeyPressed(e -> {
			if (e.getCode() == KeyCode.LEFT) {
				prevMonth();
			} else if (e.getCode() == KeyCode.RIGHT) {
				nextMonth();
			}
		});
	}

	private void prevMonth() {
		transactionWindowController.prevMonth();
		transactionWindowController.handle();
	}

	private void nextMonth() {
		transactionWindowController.nextMonth();
		transactionWindowController.handle();
	}

	private Button transactionAdderButton() {
		return (Button) mainWindow.lookup("#transactionAdder");
	}

	private Button transferAdderButton() {
		return (Button) mainWindow.lookup("#transferAdder");
	}

	private Button prevMonthButton() {
		return (Button) mainWindow.lookup("#prevMonth");
	}

	private Button nextMonthButton() {
		return (Button) mainWindow.lookup("#nextMonth");
	}

	public void setTransactionWindowController(
			TransactionWindowController transactionWindowController) {
		this.transactionWindowController = transactionWindowController;
	}

	public void setTransactionAdderController(
			TransactionAdderController transactionAdderController) {
		this.transactionAdderController = transactionAdderController;
	}

	public void setTransferAdderController(TransferAdderController transferAdderController) {
		this.transferAdderController = transferAdderController;
	}
}
