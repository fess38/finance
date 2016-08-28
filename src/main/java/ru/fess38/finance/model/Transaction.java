package ru.fess38.finance.model;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.hibernate.annotations.Check;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;

@Entity
@Check(constraints = "accountFromId != accountToId")
public class Transaction {
  @Id
  @GeneratedValue(generator = "IdSequence", strategy = GenerationType.SEQUENCE)
  @SequenceGenerator(name = "IdSequence")
  private Long id;
  @Column(nullable = false)
  private boolean isDeleted = false;
  @ManyToOne(fetch = FetchType.EAGER, optional = false, targetEntity = Rubric.class)
  @JoinColumn(name = "rubricId", nullable = false)
  private Rubric rubric;
  @Column(nullable = false)
  @DateTimeFormat(pattern = "yyyy-MM-dd")
  private Date dayRef;
  @ManyToOne(fetch = FetchType.EAGER, optional = false, targetEntity = Account.class)
  @JoinColumn(name = "accountFromId", nullable = false)
  private Account accountFrom;
  @ManyToOne(fetch = FetchType.EAGER, optional = false, targetEntity = Account.class)
  @JoinColumn(name = "accountToId", nullable = false)
  private Account accountTo;
  @Column(nullable = false)
  private Integer amountFrom;
  @Column(nullable = false)
  private Integer amountTo;
  @ManyToOne(fetch = FetchType.EAGER, targetEntity = User.class)
  @JoinColumn(name = "userId")
  private User user;
  @ManyToOne(fetch = FetchType.EAGER, targetEntity = Tag.class)
  @JoinColumn(name = "tagId")
  private Tag tag;
  @Column(length = 200)
  private String comment;

  public Group group() {
    Type type = type();
    if (type == Type.UNKNOWN) {
      return Group.UNKNOWN;
    } else if (type == Type.INCOME || type == Type.EXPENSE) {
      return Group.EXTERNAL;
    } else if (type == Type.TRANSFER || type == Type.EXCHANGE) {
      return Group.INTERNAL;
    }
    throw new IllegalStateException("Transaction in the unkwown state");
  }

  public Type type() {
    if (accountFrom == null || accountTo == null || rubric == null) {
      return Type.UNKNOWN;
    } else if (rubric.isTransfer() && accountFrom.getType() != AccountType.OUTER
        && accountTo.getType() != AccountType.OUTER) {
      if (accountFrom.getCurrency().equals(accountTo.getCurrency())) {
        return Type.TRANSFER;
      } else {
        return Type.EXCHANGE;
      }
    } else if (!rubric.isTransfer() && accountFrom.getCurrency().equals(accountTo.getCurrency())) {
      if (accountFrom.getType() == AccountType.OUTER && accountTo.getType() == AccountType.MASTER) {
        return Type.INCOME;
      } else if (accountFrom.getType() == AccountType.MASTER
          && accountTo.getType() == AccountType.OUTER) {
        return Type.EXPENSE;
      }
    }
    throw new IllegalStateException("Transaction in the unkwown state");
  }

  @Override
  public boolean equals(Object object) {
    return EqualsBuilder.reflectionEquals(this, object, true);
  }

  @Override
  public int hashCode() {
    return HashCodeBuilder.reflectionHashCode(this, true);
  }

  @Override
  public String toString() {
    return ToStringBuilder.reflectionToString(this);
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

  public Tag getTag() {
    return tag;
  }

  public void setTag(Tag tag) {
    this.tag = tag;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public LocalDate getLocalDate() {
    return dayRef.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
  }

  public void setLocalDate(LocalDate localDate) {
    Date date = Date.from(localDate.atStartOfDay().atZone(ZoneId.systemDefault()).toInstant());
    setDayRef(date);
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public boolean isDeleted() {
    return isDeleted;
  }

  public void setDeleted(boolean isDeleted) {
    this.isDeleted = isDeleted;
  }

  public enum Group {
    INTERNAL,
    EXTERNAL,
    UNKNOWN
  }

  public enum Type {
    INCOME,
    EXPENSE,
    TRANSFER,
    EXCHANGE,
    UNKNOWN
  }
}
