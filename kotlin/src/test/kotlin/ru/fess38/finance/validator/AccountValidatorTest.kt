package ru.fess38.finance.validator

import org.junit.Assert
import org.junit.Test
import ru.fess38.finance.model.Model.Account

internal class AccountValidatorTest {
  private val validator: AccountValidator = AccountValidator()
  @Test
  fun validAccount() {
    val account: Account = Account.newBuilder()
        .setName("name")
        .setCurrencyId(1)
        .build()
    Assert.assertTrue(validator.isValid(account))
  }

  @Test
  fun emptyName() {
    val account: Account = Account.newBuilder()
        .setName("")
        .setCurrencyId(1)
        .build()
    Assert.assertFalse(validator.isValid(account))
  }

  @Test
  fun whitespaceName() {
    val account: Account = Account.newBuilder()
        .setName("   ")
        .setCurrencyId(1)
        .build()
    Assert.assertFalse(validator.isValid(account))
  }

  @Test
  fun invalidCurrencyId() {
    val account: Account = Account.newBuilder()
        .setName("name")
        .setCurrencyId(0)
        .build()
    Assert.assertFalse(validator.isValid(account))
  }

  @Test
  fun notExistedAccount() {
    val account: Account = Account.newBuilder()
        .setId(123)
        .setName("name")
        .setCurrencyId(0)
        .build()
    Assert.assertFalse(validator.isValid(account, null))
  }
}
