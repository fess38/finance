package ru.fess38.finance.model;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "Rubric")
public class ModifiableRubric {
  @Id
  @GeneratedValue(generator = "IdSequence", strategy = GenerationType.SEQUENCE)
  @SequenceGenerator(name = "IdSequence")
  private Long id;
  @Column(length = 100, nullable = false)
  private String name;
  @Column(nullable = false)
  private boolean isIncome = false;
  @Column(nullable = false)
  private boolean isTransfer = false;
  @Column(nullable = false)
  private boolean isDeleted = false;
  @Column(nullable = false)
  private int amountTransactions = 0;

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

  public Rubric toImmutable() {
    return Rubric.builder().id(id).name(name).isTransfer(isTransfer()).isIncome(isIncome())
        .isDeleted(isDeleted).amountTransactions(amountTransactions).build();
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public boolean isIncome() {
    return isIncome;
  }

  public void setIncome(boolean isIncome) {
    this.isIncome = isIncome;
  }

  public boolean isTransfer() {
    return isTransfer;
  }

  public void setTransfer(boolean isTransfer) {
    this.isTransfer = isTransfer;
  }

  public boolean isDeleted() {
    return isDeleted;
  }

  public void setDeleted(boolean isDeleted) {
    this.isDeleted = isDeleted;
  }

  public int getAmountTransactions() {
    return amountTransactions;
  }

  public void setAmountTransactions(int amountTransactions) {
    this.amountTransactions = amountTransactions;
  }
}
