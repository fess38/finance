package ru.fess38.finance.model;

public class Currency extends Entity {
	public Currency() { }
	
	private String name;
	private String symbol;
	
	public String getName() {
		return name;
	}
	
	public String getSymbol() {
		return symbol;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	public void setSymbol(String symbol) {
		this.symbol = symbol;
	}
	
	@Override
	public String toString() {
		return String.format("id: %s, name: %s, symbol: %s, isDeleted: %s",
				id, name, symbol, isDeleted);
	}
}
