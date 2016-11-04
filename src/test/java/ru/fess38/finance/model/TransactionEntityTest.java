package ru.fess38.finance.model;

import org.junit.Assert;
import org.junit.Test;

public class TransactionEntityTest {
  @Test
  public void addTransaction() throws Exception {
    TestEntity testEntity = new TestEntity();
    testEntity.addTransaction();
    testEntity.addTransaction();
    Assert.assertEquals(2, testEntity.getAmountTransactions());
    Assert.assertTrue(testEntity.hasTransactions());
  }

  @Test
  public void substractTransaction() throws Exception {
    TestEntity testEntity = new TestEntity();
    testEntity.addTransaction();
    testEntity.substractTransaction();
    testEntity.substractTransaction();
    Assert.assertEquals(0, testEntity.getAmountTransactions());
    Assert.assertFalse(testEntity.hasTransactions());
  }

  private class TestEntity extends TransactionEntity {
  }
}
