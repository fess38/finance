package ru.fess38.finance.view;


import org.apache.commons.lang3.NotImplementedException;

import javafx.util.StringConverter;


public class EntityStringConverter<T> extends StringConverter<T> {
	@Override
	public String toString(T object) {
		return object == null ? null : "";// object.getName();
	}

	@Override
	public T fromString(String string) {
		throw new NotImplementedException("Not implemented");
	}
}
