package ru.fess38.finance;

import java.util.concurrent.atomic.AtomicBoolean;

public class DatabaseChangeFlag {
  private final AtomicBoolean changeFlag = new AtomicBoolean(false);

  public boolean value() {
    return changeFlag.get();
  }

  public void setTrue() {
    changeFlag.set(true);
  }

  public void setFalse() {
    changeFlag.set(false);
  }
}
