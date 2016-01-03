package ru.fess38.finance.controller;

import org.apache.commons.lang3.NotImplementedException;

import javafx.util.StringConverter;
import ru.fess38.finance.model.Entity;


public class EntityStringConverter<T extends Entity> extends StringConverter<T> {
	@Override
	public String toString(T object) {
		return object.getName();
	}

	@Override
	public T fromString(String string) {
		throw new NotImplementedException("Not implemented");
	}
}
