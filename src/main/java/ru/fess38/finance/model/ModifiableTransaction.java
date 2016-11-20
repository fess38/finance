package ru.fess38.finance.model;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.hibernate.annotations.Check;

import java.time.LocalDate;
import java.util.Optional;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Check(constraints = "accountFromId != accountToId")
@Table(name = "Transaction")
public class ModifiableTransaction {
  @Id
  @GeneratedValue(generator = "IdSequence", strategy = GenerationType.SEQUENCE)
  @SequenceGenerator(name = "IdSequence")
  private Long id;
  @Column(nullable = false)
  private boolean isDeleted = false;
  @ManyToOne(fetch = FetchType.EAGER, optional = false, targetEntity = ModifiableRubric.class)
  @JoinColumn(name = "rubricId", nullable = false)
  private ModifiableRubric rubric;
  @Column(nullable = false, columnDefinition = "DATE")
  private LocalDate dayRef;
  @ManyToOne(fetch = FetchType.EAGER, optional = false, targetEntity = ModifiableAccount.class)
  @JoinColumn(name = "accountFromId", nullable = false)
  private ModifiableAccount accountFrom;
  @ManyToOne(fetch = FetchType.EAGER, optional = false, targetEntity = ModifiableAccount.class)
  @JoinColumn(name = "accountToId", nullable = false)
  private ModifiableAccount accountTo;
  @Column(nullable = false)
  private Integer amountFrom;
  @Column(nullable = false)
  private Integer amountTo;
  @ManyToOne(fetch = FetchType.EAGER, targetEntity = ModifiableUser.class)
  @JoinColumn(name = "userId")
  private ModifiableUser user;
  @ManyToOne(fetch = FetchType.EAGER, targetEntity = ModifiableTag.class)
  @JoinColumn(name = "tagId")
  private ModifiableTag tag;
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

  public Transaction toImmutable() {
    return Transaction.builder()
        .id(id)
        .isDeleted(isDeleted)
        .rubric(rubric.toImmutable())
        .dayRef(dayRef)
        .accountFrom(accountFrom.toImmutable())
        .accountTo(accountTo.toImmutable())
        .amountFrom(amountFrom)
        .amountTo(amountTo)
        .tag(Optional.ofNullable(tag == null ? null : tag.toImmutable()))
        .user(Optional.ofNullable(user == null ? null : user.toImmutable()))
        .comment(Optional.ofNullable(comment))
        .build();
  }

  public ModifiableAccount getAccountFrom() {
    return accountFrom;
  }

  public void setAccountFrom(ModifiableAccount accountFrom) {
    this.accountFrom = accountFrom;
  }

  public ModifiableAccount getAccountTo() {
    return accountTo;
  }

  public void setAccountTo(ModifiableAccount accountTo) {
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

  public LocalDate getDayRef() {
    return dayRef;
  }

  public void setDayRef(LocalDate dayRef) {
    this.dayRef = dayRef;
  }

  public ModifiableRubric getRubric() {
    return rubric;
  }

  public void setRubric(ModifiableRubric rubric) {
    this.rubric = rubric;
  }

  public ModifiableTag getTag() {
    return tag;
  }

  public void setTag(ModifiableTag tag) {
    this.tag = tag;
  }

  public ModifiableUser getUser() {
    return user;
  }

  public void setUser(ModifiableUser user) {
    this.user = user;
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
