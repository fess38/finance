package ru.fess38.finance.model;

public class TransactionGroup extends Entity {
	public TransactionGroup() { }
	
	private String name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	@Override
	public String toString() {
		return String.format("id: %s, name: %s, isDeleted: %s", id, name,
				isDeleted);
	}
}
