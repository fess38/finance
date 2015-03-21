package ru.fess38.finance.model;

import java.util.Date;

public class Transaction extends Entity {
	public Transaction() { }
	
	private Integer rubricId;
	private Integer amount;
	private Date dayRef;
	private Integer accountIdFrom;
	private Integer accountIdTo;
	private Float exchangeRate;
	private Integer userId;
	private Integer transactionGroupId;
	private Integer isUseForStat;
	private String comment;
	
	public Integer getRubricId() {
		return rubricId;
	}
	public void setRubricId(Integer rubricId) {
		this.rubricId = rubricId;
	}
	public Integer getAmount() {
		return amount;
	}
	public void setAmount(Integer amount) {
		this.amount = amount;
	}
	public Date getDayRef() {
		return dayRef;
	}
	public void setDayRef(Date dayRef) {
		this.dayRef = dayRef;
	}
	public Integer getAccountIdFrom() {
		return accountIdFrom;
	}
	public void setAccountIdFrom(Integer accountIdFrom) {
		this.accountIdFrom = accountIdFrom;
	}
	public Integer getAccountIdTo() {
		return accountIdTo;
	}
	public void setAccountIdTo(Integer accountIdTo) {
		this.accountIdTo = accountIdTo;
	}
	public Float getExchangeRate() {
		return exchangeRate;
	}
	public void setExchangeRate(Float exchangeRate) {
		this.exchangeRate = exchangeRate;
	}
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	public Integer getTransactionGroupId() {
		return transactionGroupId;
	}
	public void setTransactionGroupId(Integer transactionGroupId) {
		this.transactionGroupId = transactionGroupId;
	}
	public Integer getIsUseForStat() {
		return isUseForStat;
	}
	public void setIsUseForStat(Integer isUseForStat) {
		this.isUseForStat = isUseForStat;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	
	@Override
	public String toString() {
		return String.format("id: %s, rubricId: %s, amount: %s, dayRef: %s,"
				+ " accountIdFrom: %s, accountIdTo: %s,"
				+ " exchangeRate: %s, userId: %s, transactionGroupId: %s,"
				+ " isUseForStat: %s, comment: %s, isDeleted: %s",
				id, rubricId, amount, dayRef, accountIdFrom, accountIdTo,
				exchangeRate, userId, transactionGroupId, isUseForStat,
				comment, isDeleted);
	}
}
