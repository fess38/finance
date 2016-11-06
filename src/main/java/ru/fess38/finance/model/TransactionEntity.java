package ru.fess38.finance.model;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class TransactionEntity {
  @Column(nullable = false)
  private int amountTransactions = 0;

  public boolean hasTransactions() {
    return amountTransactions > 0;
  }

  public int getAmountTransactions() {
    return amountTransactions;
  }

  public void addTransaction() {
    amountTransactions++;
  }

  public void subtractTransaction() {
    if (amountTransactions > 0) {
      amountTransactions--;
    }
  }
}
