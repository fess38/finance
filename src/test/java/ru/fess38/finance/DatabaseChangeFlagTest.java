package ru.fess38.finance;

import org.junit.Assert;
import org.junit.Test;

public class DatabaseChangeFlagTest {
  private final DatabaseChangeFlag databaseChangeFlag = new DatabaseChangeFlag();

  @Test
  public void setTrue() throws Exception {
    databaseChangeFlag.setTrue();
    Assert.assertEquals(true, databaseChangeFlag.value());
  }

  @Test
  public void setFalse() throws Exception {
    databaseChangeFlag.setFalse();
    Assert.assertEquals(false, databaseChangeFlag.value());
  }
}
