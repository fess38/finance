package ru.fess38.finance.model;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.Objects;


public final class Transaction extends Entity {
	private Rubric rubric;
	private Date dayRef;
	private Account accountFrom;
	private Account accountTo;
	private Integer amountFrom;
	private Integer amountTo;
	private User user;
	private TransactionGroup transactionGroup;
	private String comment;

	@Override
	public boolean equals(Object object) {
		if (this == object) {
			return true;
		}
		if (object == null || getClass() != object.getClass()) {
			return false;
		}

		Transaction that = (Transaction) object;
		return Objects.equals(this.getId(), that.getId());
	}

	@Override
	public int hashCode() {
		return Objects.hash(getId());
	}

	@Override
	public String toString() {
		final StringBuffer sb = new StringBuffer("Transaction{");
		sb.append("id=").append(getId());
		sb.append(", name=").append(getName());
		sb.append(", rubric=").append(rubric);
		sb.append(", dayRef=").append(dayRef);
		sb.append(", accountFrom=").append(accountFrom);
		sb.append(", amountFrom=").append(amountFrom);
		sb.append(", accountTo=").append(accountTo);
		sb.append(", amountTo=").append(amountTo);
		sb.append(", user=").append(user);
		sb.append(", transactionGroup=").append(transactionGroup);
		sb.append(", comment=").append(comment);
		sb.append('}');
		return sb.toString();
	}

	public Account getAccountFrom() {
		return accountFrom;
	}

	public void setAccountFrom(Account accountFrom) {
		this.accountFrom = accountFrom;
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

	public Rubric getRubric() {
		return rubric;
	}

	public void setRubric(Rubric rubric) {
		this.rubric = rubric;
	}

	public TransactionGroup getTransactionGroup() {
		return transactionGroup;
	}

	public void setTransactionGroup(TransactionGroup transactionGroup) {
		this.transactionGroup = transactionGroup;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Integer getAccountFromId() {
		return accountFrom.getId();
	}

	public void setAccountFromId(Integer accountFromId) {
		setAccountFrom(new Account(accountFromId));
	}

	public Integer getAccountToId() {
		return accountTo.getId();
	}

	public void setAccountToId(Integer accountToId) {
		setAccountTo(new Account(accountToId));
	}

	public Integer getRubricId() {
		return rubric.getId();
	}

	public void setRubricId(Integer rubricId) {
		setRubric(new Rubric(rubricId));
	}

	public Integer getTransactionGroupId() {
		return transactionGroup.getId();
	}

	public void setTransactionGroupId(Integer transactionGroupId) {
		if (transactionGroupId != null) {
			setTransactionGroup(new TransactionGroup(transactionGroupId));
		}
	}

	public Integer getUserId() {
		return user.getId();
	}

	public void setUserId(Integer userId) {
		if (userId != null) {
			setUser(new User(userId));
		}
	}

	public LocalDate getLocalDate() {
		Objects.requireNonNull(dayRef);
		return dayRef.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
	}
}
