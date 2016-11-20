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
@Table(name = "Currency")
public class ModifiableCurrency {
  @Id
  @GeneratedValue(generator = "IdSequence", strategy = GenerationType.SEQUENCE)
  @SequenceGenerator(name = "IdSequence")
  private Long id;
  @Column(length = 100, nullable = false)
  private String name;
  @Column(length = 1, nullable = false)
  private String symbol;
  @Column(nullable = false)
  private boolean isDeleted = false;

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

  public Currency toImmutable() {
    return Currency.builder().id(id).name(name).symbol(symbol).isDeleted(isDeleted).build();
  }

  public String getSymbol() {
    return symbol;
  }

  public void setSymbol(String symbol) {
    this.symbol = symbol;
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

  public boolean isDeleted() {
    return isDeleted;
  }

  public void setDeleted(boolean isDeleted) {
    this.isDeleted = isDeleted;
  }
}
