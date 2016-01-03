package ru.fess38.finance.controller;

import javafx.event.EventHandler;
import javafx.scene.control.ComboBox;
import javafx.scene.input.KeyCode;
import javafx.scene.input.KeyEvent;


public class ComboBoxCleanEventHandler implements EventHandler<KeyEvent> {
	public ComboBoxCleanEventHandler(ComboBox<?> comboBox) {
		this.comboBox = comboBox;
	}
	
	private final ComboBox<?> comboBox;
	
	@Override
	public void handle(KeyEvent event) {
		if (event.getCode() == KeyCode.BACK_SPACE) {
			comboBox.getSelectionModel().clearSelection();
		}
	}
}
