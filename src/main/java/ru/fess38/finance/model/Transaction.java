package ru.fess38.finance.model;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;

@Entity
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
  @ManyToOne(fetch = FetchType.EAGER, optional = true, targetEntity = User.class)
  @JoinColumn(name = "userId", nullable = true)
  private User user;
  @ManyToOne(fetch = FetchType.EAGER, optional = true, targetEntity = Tag.class)
  @JoinColumn(name = "tagId", nullable = true)
  private Tag tag;
  @Column(length = 200)
  private String comment;

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
}
