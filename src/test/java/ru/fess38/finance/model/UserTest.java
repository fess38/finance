package ru.fess38.finance.model;

import org.junit.Assert;
import org.junit.Test;

public class UserTest {
  @Test
  public void toModifiable() throws Exception {
    User expected = user();
    User actual = expected.toModifiable().toImmutable();
    Assert.assertEquals(expected, actual);
  }

  @Test
  public void toModifiableWithoutId() throws Exception {
    User expected = user().withId(0);
    User actual = expected.toModifiable().toImmutable();
    Assert.assertEquals(expected, actual);
  }

  private User user() {
    return User.of("u").withId(123);
  }
}
