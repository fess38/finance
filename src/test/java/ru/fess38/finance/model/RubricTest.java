package ru.fess38.finance.model;

import org.junit.Assert;
import org.junit.Test;

public class RubricTest {
  @Test
  public void toModifiable() throws Exception {
    Rubric expected = rubric();
    Rubric actual = expected.toModifiable().toImmutable();
    Assert.assertEquals(expected, actual);
  }

  @Test
  public void toModifiableWithoutId() throws Exception {
    Rubric expected = rubric().withId(0);
    Rubric actual = expected.toModifiable().toImmutable();
    Assert.assertEquals(expected, actual);
  }

  private Rubric rubric() {
    return Rubric.of("r").withId(89);
  }
}
