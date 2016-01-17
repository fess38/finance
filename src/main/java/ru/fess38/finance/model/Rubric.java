package ru.fess38.finance.model;


import java.util.Objects;


public class Rubric extends Entity {
	private Boolean isIncome;
	private Boolean isService;

	@Override
	public boolean equals(Object object) {
		if (this == object) {
			return true;
		}
		if (object == null || getClass() != object.getClass()) {
			return false;
		}

		Rubric that = (Rubric) object;
		return Objects.equals(this.getId(), that.getId())
				&& Objects.equals(this.getName(), that.getName())
				&& Objects.equals(this.getIsIncome(), that.getIsIncome());
	}

	@Override
	public int hashCode() {
		return Objects.hash(getId(), getName(), getIsIncome());
	}

	public Boolean getIsIncome() {
		return isIncome;
	}

	public void setIsIncome(Boolean isIncome) {
		this.isIncome = isIncome;
	}

	public Boolean getIsService() {
		return isService;
	}

	public void setIsService(Boolean isService) {
		this.isService = isService;
	}
}
