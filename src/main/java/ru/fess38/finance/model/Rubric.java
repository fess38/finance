package ru.fess38.finance.model;

public class Rubric extends Entity {
	public Rubric() { }
	
	private String name;
	private Boolean isIncome;
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public Boolean getIsIncome() {
		return isIncome;
	}
	
	public void setIsIncome(Boolean isIncome) {
		this.isIncome = isIncome;
	}
	
	@Override
	public String toString() {
		return String.format("id: %s, name: %s, isIncome: %s, isDeleted: %s",
				id, name, isIncome, isDeleted);
	}
}
