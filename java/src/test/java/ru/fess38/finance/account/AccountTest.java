package ru.fess38.finance.account;

import org.junit.Assert;
import org.junit.Test;
import ru.fess38.finance.account.AbstractAccount.Type;
import ru.fess38.finance.currency.Currency;

public class AccountTest {
  @Test
  public void toModifiable() throws Exception {
    Account expected = account();
    Account actual = expected.toModifiable().toImmutable();
    Assert.assertEquals(expected, actual);
  }

  @Test
  public void toModifiableWithoutId() throws Exception {
    Account expected = account().withId(0);
    Account actual = expected.toModifiable().toImmutable();
    Assert.assertEquals(expected, actual);
  }

  private Account account() {
    return Account.builder()
        .id(123)
        .currency(Currency.of("c", "c").withId(123))
        .name("a")
        .balance(123)
        .isDeleted(true)
        .type(Type.MASTER)
        .build();
  }

}
