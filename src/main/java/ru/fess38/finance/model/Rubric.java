package ru.fess38.finance.model;

import java.util.Comparator;
import java.util.Objects;

public class Rubric extends Entity {
	private Boolean isIncome;

	public boolean equals(Object object) {
		if (object == null || !(object instanceof Rubric)) {
			return false;
		}
		Rubric that = (Rubric) object;
		return Objects.equals(this.getId(), that.getId())
				&& Objects.equals(this.getName(), that.getName())
				&& Objects.equals(this.getIsIncome(), that.getIsIncome());
	}

	public Boolean getIsIncome() {
		return isIncome;
	}
	
	public void setIsIncome(Boolean isIncome) {
		this.isIncome = isIncome;
	}
}
