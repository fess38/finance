package ru.fess38.finance.view;


import java.io.IOException;
import java.io.UncheckedIOException;
import java.net.URL;

import org.springframework.core.io.ClassPathResource;

import javafx.fxml.FXMLLoader;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.TabPane;
import javafx.scene.control.TabPane.TabClosingPolicy;
import javafx.scene.control.TableView;
import javafx.scene.layout.GridPane;
import javafx.stage.Modality;
import javafx.stage.Stage;
import ru.fess38.finance.model.Transaction;


public class ViewFactory {
	private ViewFactory() {}

	private static final String PACKAGE = "ru/fess38/finance/view/";

	public static void buildModalWindow(Parent parent) {
		Scene scene = parent.getScene() == null ? new Scene(parent) : parent.getScene();
		Stage stage = new Stage();
		stage.setScene(scene);
		stage.setResizable(false);
		stage.initModality(Modality.APPLICATION_MODAL);
		stage.showAndWait();
	}

	public static TabPane mainWindow() {
		TabPane tabPane = new TabPane();
		tabPane.setTabClosingPolicy(TabClosingPolicy.UNAVAILABLE);
		tabPane.setPadding(new Insets(10));
		return tabPane;
	}

	public static GridPane transactionAdderWindow() {
		return loadWrapper("TransactionAdder.fxml");
	}

	public static GridPane transferAdderWindow() {
		return loadWrapper("TransferAdder.fxml");
	}

	public static GridPane transactionViewerWindow() {
		GridPane gridPane = new GridPane();
		gridPane.setHgap(5);
		gridPane.setVgap(5);
		gridPane.setAlignment(Pos.TOP_LEFT);
		gridPane.setPadding(new Insets(5));
		return gridPane;
	}

	public static TableView<Transaction> transactionEditorWindow(Transactions transactions) {
		return new TransactionEditorBuilder().transactionEditorWindow(transactions);
	}

	public static TableView<Transaction> transferEditorWindow(Transactions transactions) {
		return new TransactionEditorBuilder().transferEditorWindow(transactions);
	}

	private static <T> T loadWrapper(String url) {
		try {
			return FXMLLoader.load(getClassPathUrl(PACKAGE + url));
		} catch (IOException e) {
			throw new UncheckedIOException(e);
		}
	}

	private static URL getClassPathUrl(String classpath) {
		ClassPathResource resource = new ClassPathResource(classpath);
		try {
			return resource.getURL();
		} catch (Exception e) {
			throw new IllegalArgumentException("Unknown resource: " + classpath);
		}
	}

}
