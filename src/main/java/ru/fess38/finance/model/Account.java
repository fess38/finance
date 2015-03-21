package ru.fess38.finance.model;

import java.util.Date;

public class Account extends Entity {
	public Account() { }
	
	private String name;
	private Integer currencyId;
	private Integer amount;
	private Integer isCurrent;
	private Integer isCredit;
	private Integer isClosed;
	private Date startDate;
	private Date finishDate;
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public Integer getCurrencyId() {
		return currencyId;
	}
	
	public void setCurrencyId(Integer currencyId) {
		this.currencyId = currencyId;
	}
	
	public Integer getAmount() {
		return amount;
	}
	
	public void setAmount(Integer amount) {
		this.amount = amount;
	}
	
	public Integer getIsCurrent() {
		return isCurrent;
	}
	
	public void setIsCurrent(Integer isCurrent) {
		this.isCurrent = isCurrent;
	}
	
	public Integer getIsCredit() {
		return isCredit;
	}
	
	public void setIsCredit(Integer isCredit) {
		this.isCredit = isCredit;
	}
	
	public Integer getIsClosed() {
		return isClosed;
	}
	
	public void setIsClosed(Integer isClosed) {
		this.isClosed = isClosed;
	}
	
	public Date getStartDate() {
		return startDate;
	}
	
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
	
	public Date getFinishDate() {
		return finishDate;
	}
	
	public void setFinishDate(Date finishDate) {
		this.finishDate = finishDate;
	}
	
	@Override
	public String toString() {
		return String.format("id: %s, name: %s, currencyId: %s, amount: %s,"
				+ " isCurrent: %s, isCredit: %s, isClosed: %s, startDate: %s,"
				+ " finishDate: %s, isDeleted: %s", id, name, currencyId,
				amount, isCurrent, isCredit, isClosed, startDate, finishDate,
				isDeleted);
	}
}
