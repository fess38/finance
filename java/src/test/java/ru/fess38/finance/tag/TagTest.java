package ru.fess38.finance.tag;

import org.junit.Assert;
import org.junit.Test;
import ru.fess38.finance.rubric.Rubric;

public class TagTest {
  @Test
  public void toModifiable() throws Exception {
    Tag expected = tag();
    Tag actual = expected.toModifiable().toImmutable();
    Assert.assertEquals(expected, actual);
  }

  @Test
  public void toModifiableWithoutId() throws Exception {
    Tag expected = tag().withId(0);
    Tag actual = expected.toModifiable().toImmutable();
    Assert.assertEquals(expected, actual);
  }

  @Test
  public void toModifiableWithRubric() throws Exception {
    Tag expected = tag().withId(0).withRubric(Rubric.of("rubric"));
    Tag actual = expected.toModifiable().toImmutable();
    Assert.assertEquals(expected, actual);
  }

  private Tag tag() {
    return Tag.of("b").withId(123);
  }
}
