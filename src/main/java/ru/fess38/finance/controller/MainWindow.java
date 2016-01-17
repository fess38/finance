package ru.fess38.finance.controller;


import java.util.List;

import javafx.scene.control.Button;
import javafx.scene.control.Tab;
import javafx.scene.control.TabPane;
import javafx.scene.input.KeyCode;
import ru.fess38.finance.view.ViewFactory;


public class MainWindow extends AbstractController {
	public MainWindow(ControllersFactory factory) {
		super(factory);
		factory.setMainWindow(this);
	}

	private final TabPane mainWindowView = ViewFactory.mainWindow();

	public void handle() {
		transactionAdderButton().setOnAction(e -> getTransactionAdder().handle());
		transferAdderButton().setOnAction(e -> getTransferAdder().handle());
		prevMonthButton().setOnAction(e -> prevMonth());
		nextMonthButton().setOnAction(e -> nextMonth());
		getRubricController().init();
		mainWindowView.getTabs().add(getRubricController().getTab());
		getUserController().init();
		mainWindowView.getTabs().add(getUserController().getTab());
		getTransactionGroupController().init();
		mainWindowView.getTabs().add(getTransactionGroupController().getTab());
		getCurrencyController().init();
		mainWindowView.getTabs().add(getCurrencyController().getTab());
		addKeyEventHandler();
		getTransactionWindow().handle();
	}

	private void addKeyEventHandler() {
		mainWindowView.setOnKeyPressed(e -> {
			if (e.getCode() == KeyCode.LEFT) {
				e.consume();
				prevMonth();
			} else if (e.getCode() == KeyCode.RIGHT) {
				e.consume();
				nextMonth();
			}
		});
	}

	public void addTransactionWindow(List<Tab> tabs) {
		((TabPane) mainWindowView.lookup("#transactionWindow")).getTabs().setAll(tabs);
	}

	private void prevMonth() {
		getTransactionWindow().prevMonth();
		getTransactionWindow().handle();
	}

	private void nextMonth() {
		getTransactionWindow().nextMonth();
		getTransactionWindow().handle();
	}

	private Button transactionAdderButton() {
		return (Button) mainWindowView.lookup("#transactionAdder");
	}

	private Button transferAdderButton() {
		return (Button) mainWindowView.lookup("#transferAdder");
	}

	private Button prevMonthButton() {
		return (Button) mainWindowView.lookup("#prevMonth");
	}

	private Button nextMonthButton() {
		return (Button) mainWindowView.lookup("#nextMonth");
	}

	public TabPane getMainWindowView() {
		return mainWindowView;
	}
}
