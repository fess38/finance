package ru.fess38.finance.model;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class TransactionEntity {
  @Column(nullable = false)
  private int amountTransactions = 0;
  @Column(nullable = false)
  private boolean hasTransactions = false;

  public boolean hasTransactions() {
    return hasTransactions;
  }

  public int getAmountTransactions() {
    return amountTransactions;
  }

  public void addTransaction() {
    amountTransactions++;
    hasTransactions = amountTransactions > 0;
  }

  public void substractTransaction() {
    if (amountTransactions > 0) {
      amountTransactions--;
    }
    hasTransactions = amountTransactions > 0;
  }
}
