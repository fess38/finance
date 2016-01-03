package ru.fess38.finance.view;

import java.io.IOException;
import java.io.UncheckedIOException;

import javafx.fxml.FXMLLoader;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.control.TabPane;
import javafx.scene.layout.GridPane;
import ru.fess38.finance.Utils;


public class ViewRegistry {
	private ViewRegistry() { }

	private static final String PACKAGE = "ru/fess38/finance/view/";

	private static <T> T loadWrapper(String url) {
		try {
			return FXMLLoader.load(Utils.getClassPathUrl(PACKAGE + url));
		} catch (IOException e) {
			throw new UncheckedIOException(e);
		}
	}

	public static TabPane mainWindow() {
		return loadWrapper("MainWindow.fxml");
	}

	public static GridPane transactionAdderWindow() {
		return loadWrapper("TransactionAdder.fxml");
	}

	public static GridPane transferAdderWindow() {
		return loadWrapper("TransferAdder.fxml");
	}

	public static GridPane transactionWindow() {
		GridPane gridPane = new GridPane();
		gridPane.setHgap(5);
		gridPane.setVgap(5);
		gridPane.setAlignment(Pos.TOP_CENTER);
		gridPane.setPadding(new Insets(5));
		return gridPane;
	}
}
