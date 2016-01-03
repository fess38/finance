package ru.fess38.finance.controller;

import javafx.beans.value.ChangeListener;
import javafx.beans.value.ObservableValue;
import javafx.scene.control.TextField;


public class NumberInputListener implements ChangeListener<String> {
	public NumberInputListener(TextField textField) {
		this.textField = textField;
	}
	
	private final TextField textField;
	
	@Override
	public void changed(ObservableValue<? extends String> observable, String oldValue, String newValue) {
		if (newValue.startsWith("0") || !newValue.matches("\\d*")) {
			textField.setText(oldValue);
        }
	}
}
