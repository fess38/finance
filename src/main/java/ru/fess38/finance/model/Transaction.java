package ru.fess38.finance.model;

import java.util.Date;

public class Transaction extends Entity {
	private Integer rubricId;
	private Rubric rubric;
	private Date dayRef;
	private Integer accountIdFrom;
	private Account accountFrom;
	private Integer accountIdTo;
	private Account accountTo;
	private Integer amountFrom;
	private Integer amountTo;
	private Integer userId;
	private User user;
	private Integer transactionGroupId;
	private TransactionGroup transactionGroup;
	private Boolean isUseForStat;
	private String comment;

	public Account getAccountFrom() {
		return accountFrom;
	}

	public void setAccountFrom(Account accountFrom) {
		this.accountFrom = accountFrom;
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

	public Account getAccountTo() {
		return accountTo;
	}

	public void setAccountTo(Account accountTo) {
		this.accountTo = accountTo;
	}

	public Integer getAmountFrom() {
		return amountFrom;
	}

	public void setAmountFrom(Integer amountFrom) {
		this.amountFrom = amountFrom;
	}

	public Integer getAmountTo() {
		return amountTo;
	}

	public void setAmountTo(Integer amountTo) {
		this.amountTo = amountTo;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public Date getDayRef() {
		return dayRef;
	}

	public void setDayRef(Date dayRef) {
		this.dayRef = dayRef;
	}

	public Boolean getIsUseForStat() {
		return isUseForStat;
	}

	public void setIsUseForStat(Boolean isUseForStat) {
		this.isUseForStat = isUseForStat;
	}

	public Rubric getRubric() {
		return rubric;
	}

	public void setRubric(Rubric rubric) {
		this.rubric = rubric;
	}

	public Integer getRubricId() {
		return rubricId;
	}

	public void setRubricId(Integer rubricId) {
		this.rubricId = rubricId;
	}

	public TransactionGroup getTransactionGroup() {
		return transactionGroup;
	}

	public void setTransactionGroup(TransactionGroup transactionGroup) {
		this.transactionGroup = transactionGroup;
	}

	public Integer getTransactionGroupId() {
		return transactionGroupId;
	}

	public void setTransactionGroupId(Integer transactionGroupId) {
		this.transactionGroupId = transactionGroupId;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}
}
