package ru.fess38.finance.model;

import org.junit.Assert;
import org.junit.Test;

import java.util.Optional;

public class TransactionTest {
  @Test
  public void toModifiable() throws Exception {
    Transaction expected = transaction();
    Transaction actual = expected.toModifiable().toImmutable();
    Assert.assertEquals(expected, actual);
  }

  @Test
  public void toModifiableWithoutId() throws Exception {
    Transaction expected = transaction().withId(0);
    Transaction actual = expected.toModifiable().toImmutable();
    Assert.assertEquals(expected, actual);
  }

  @Test
  public void toModifiableWithoutCommentTagUser() throws Exception {
    Transaction expected = transaction().withComment(Optional.empty()).withTag(Optional.empty())
        .withUser(Optional.empty());
    Transaction actual = expected.toModifiable().toImmutable();
    Assert.assertEquals(expected, actual);
  }

  private Transaction transaction() {
    return Transaction.builder()
        .id(123)
        .rubric(Rubric.of("r"))
        .amountFrom(123)
        .amountTo(432)
        .accountFrom(Account.of("a", Currency.of("f", "d")))
        .accountTo(Account.of("a", Currency.of("f", "d")))
        .comment("cc")
        .tag(Tag.of("t"))
        .user(User.of("u"))
        .build();
  }
}
