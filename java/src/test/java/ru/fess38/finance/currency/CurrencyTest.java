package ru.fess38.finance.currency;

import org.junit.Assert;
import org.junit.Test;

public class CurrencyTest {
  @Test
  public void toModifiable() throws Exception {
    Currency expected = currency();
    Currency actual = expected.toModifiable().toImmutable();
    Assert.assertEquals(expected, actual);
  }

  @Test
  public void toModifiableWithoutId() throws Exception {
    Currency expected = currency().withId(0);
    Currency actual = expected.toModifiable().toImmutable();
    Assert.assertEquals(expected, actual);
  }

  private Currency currency() {
    return Currency.of("c", "c").withId(123);
  }
}
