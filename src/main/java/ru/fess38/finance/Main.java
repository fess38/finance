package ru.fess38.finance;


import java.io.IOException;

import org.springframework.context.support.ClassPathXmlApplicationContext;

import javafx.application.Application;
import javafx.geometry.Rectangle2D;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Screen;
import javafx.stage.Stage;
import ru.fess38.finance.controller.MainWindow;


public class Main extends Application {
	public static void main(String[] args) {
		Application.launch(Main.class, args);
	}

	private final String path = "ru/fess38/finance/Config.xml";
	private ClassPathXmlApplicationContext ctx;

	@Override
	public void start(Stage primaryStage) throws IOException {
		ctx = new ClassPathXmlApplicationContext(path);
		Parent root = ctx.getBean("mainWindow", MainWindow.class).getMainWindowView();
		Scene scene = new Scene(root);
		primaryStage.setScene(scene);
		setWindowFullscreen(primaryStage);
		primaryStage.show();
	}

	@Override
	public void stop() {
		ctx.close();
	}

	private void setWindowFullscreen(Stage stage) {
		Rectangle2D primScreenBounds = Screen.getPrimary().getBounds();
		stage.setWidth(primScreenBounds.getWidth());
		stage.setHeight(primScreenBounds.getHeight());
	}
}
