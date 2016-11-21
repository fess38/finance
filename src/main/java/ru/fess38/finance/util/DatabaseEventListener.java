package ru.fess38.finance.util;

import java.util.concurrent.atomic.AtomicBoolean;

public class DatabaseEventListener {
  private final AtomicBoolean isChange = new AtomicBoolean(false);
  private final AtomicBoolean isCalculateBalance = new AtomicBoolean(false);

  public boolean isChange() {
    return isChange.get();
  }

  public void setChangeTrue() {
    isChange.set(true);
  }

  public void setChangeFalse() {
    isChange.set(false);
  }

  public boolean isCalculateBalance() {
    return isCalculateBalance.get();
  }

  public void setCalculateBalanceTrue() {
    isCalculateBalance.set(true);
  }

  public void setCalculateBalanceFalse() {
    isCalculateBalance.set(false);
  }
}
