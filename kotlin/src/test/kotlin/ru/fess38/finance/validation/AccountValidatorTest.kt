package ru.fess38.finance.validation

import org.junit.Assert
import org.junit.Test
import ru.fess38.finance.core.Model.Account

internal class AccountValidatorTest {
  private val validator = AccountValidator()

  @Test
  fun valid() {
    val account = Account.newBuilder()
        .setName("name")
        .setCurrencyId(1)
        .build()
    val expected = ValidatorResponse(true, "ok")
    val actual = validator.validate(account)
    Assert.assertEquals(expected, actual)
  }

  @Test
  fun invalidCurrencyId() {
    val account = Account.newBuilder()
        .setName("name")
        .setCurrencyId(0)
        .build()
    val expected = ValidatorResponse(false, "unknown currency [0]")
    val actual = validator.validate(account)
    Assert.assertEquals(expected, actual)
  }
}
