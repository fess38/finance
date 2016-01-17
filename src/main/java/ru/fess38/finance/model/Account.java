package ru.fess38.finance.model;


import java.util.Objects;


public class Account extends Entity {
	private Currency currency;
	private Integer amount;
	private Boolean isService;

	@Override
	public boolean equals(Object object) {
		if (this == object) {
			return true;
		}
		if (object == null || getClass() != object.getClass()) {
			return false;
		}

		Account that = (Account) object;
		return Objects.equals(this.getId(), that.getId())
				&& Objects.equals(this.getName(), that.getName())
				&& Objects.equals(this.getCurrency(), that.getCurrency())
				&& Objects.equals(this.getAmount(), that.getAmount());
	}

	@Override
	public int hashCode() {
		return Objects.hash(getId(), getName(), getCurrency(), getAmount());
	}

	public Integer getAmount() {
		return amount;
	}

	public void setAmount(Integer amount) {
		this.amount = amount;
	}

	public Currency getCurrency() {
		return currency;
	}

	public void setCurrency(Currency currency) {
		this.currency = currency;
	}

	public boolean getIsService() {
		return isService;
	}

	public void setIsService(boolean isService) {
		this.isService = isService;
	}
}
