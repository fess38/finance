package ru.fess38.finance.transaction.statistic;

import org.junit.Assert;
import org.junit.Test;

public class TransactionsHelperTest {
  @Test
  public void savingRate() throws Exception {
    double expected = 0.5;
    double actual = TransactionsHelper.savingRate(10, 5);
    Assert.assertEquals(expected, actual, 0.01);
  }

  @Test
  public void savingRateZero() throws Exception {
    double expected = 0.0;
    double actual = TransactionsHelper.savingRate(10, 20);
    Assert.assertEquals(expected, actual, 0.01);
  }

}
