package ru.fess38.finance;

import org.springframework.stereotype.Component;

import java.util.concurrent.atomic.AtomicBoolean;

@Component
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
