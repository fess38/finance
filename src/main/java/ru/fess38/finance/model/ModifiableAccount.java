package ru.fess38.finance.model;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;
import ru.fess38.finance.model.AbstractAccount.Type;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "Account")
public class ModifiableAccount {
  @Id
  @GeneratedValue(generator = "IdSequence", strategy = GenerationType.SEQUENCE)
  @SequenceGenerator(name = "IdSequence")
  private Long id;
  @Column(length = 100, nullable = false)
  private String name;
  @Column(nullable = false)
  private int balance = 0;
  @ManyToOne(fetch = FetchType.EAGER, optional = false, targetEntity = ModifiableCurrency.class)
  @JoinColumn(name = "currencyId", nullable = false)
  private ModifiableCurrency currency;
  @Column(length = 100, nullable = false)
  @Enumerated(EnumType.STRING)
  private Type type = Type.DEFAULT;
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

  public Account toImmutable() {
    return Account.builder()
        .id(id == null ? 0 : id)
        .name(name)
        .balance(balance)
        .currency(currency.toImmutable())
        .type(type)
        .isDeleted(isDeleted)
        .amountTransactions(amountTransactions)
        .build();
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

  public ModifiableCurrency getCurrency() {
    return currency;
  }

  public void setCurrency(ModifiableCurrency currency) {
    this.currency = currency;
  }

  public boolean isDeleted() {
    return isDeleted;
  }

  public void setDeleted(boolean isDeleted) {
    this.isDeleted = isDeleted;
  }

  public Type getType() {
    return type;
  }

  public void setType(Type type) {
    this.type = type;
  }

  public int getBalance() {
    return balance;
  }

  public void setBalance(int balance) {
    this.balance = balance;
  }

  public int getAmountTransactions() {
    return amountTransactions;
  }

  public void setAmountTransactions(int amountTransactions) {
    this.amountTransactions = amountTransactions;
  }
}
