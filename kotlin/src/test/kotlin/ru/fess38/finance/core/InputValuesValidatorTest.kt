package ru.fess38.finance.core

import com.google.protobuf.Timestamp
import org.junit.Assert
import org.junit.Test
import ru.fess38.finance.model.Model.Account
import ru.fess38.finance.model.Model.SubCategory
import ru.fess38.finance.model.Model.Transaction

internal class InputValuesValidatorTest {
  private val validator = InputValuesValidator()
  @Test
  fun accountValid() {
    val account = Account.newBuilder()
        .setName("name")
        .setCurrencyId(1)
        .build()
    Assert.assertTrue(validator.isValid(account))
  }

  @Test
  fun accountEmptyName() {
    val account = Account.newBuilder()
        .setName("")
        .setCurrencyId(1)
        .build()
    Assert.assertFalse(validator.isValid(account))
  }

  @Test
  fun accountWhitespaceName() {
    val account = Account.newBuilder()
        .setName("   ")
        .setCurrencyId(1)
        .build()
    Assert.assertFalse(validator.isValid(account))
  }

  @Test
  fun accountInvalidCurrencyId() {
    val account = Account.newBuilder()
        .setName("name")
        .setCurrencyId(0)
        .build()
    Assert.assertFalse(validator.isValid(account))
  }

  @Test
  fun accountNotExistedAccount() {
    val account = Account.newBuilder()
        .setId(123)
        .setName("name")
        .setCurrencyId(0)
        .build()
    Assert.assertFalse(validator.isValid(account))
  }

  @Test
  fun subCategoryWrongCategoryId() {
    val subCategory = SubCategory.newBuilder()
        .setId(0L)
        .setName("name")
        .setCategoryId(0L)
        .build()
    Assert.assertFalse(validator.isValid(subCategory))
  }

  @Test
  fun transactionInvalidAccountId() {
    val transaction = Transaction.newBuilder()
        .setId(0L)
        .setCreated(Timestamp.newBuilder().setSeconds(0L).setNanos(123).build())
        .setAccountIdFrom(0L)
        .setAccountIdTo(0L)
        .setAmountFrom(1L)
        .setAmountTo(3L)
        .setCategoryId(1L)
        .build();
    Assert.assertFalse(validator.isValid(transaction))
  }

  @Test
  fun transactionInvalidAmount() {
    val transaction = Transaction.newBuilder()
        .setId(0L)
        .setCreated(Timestamp.newBuilder().setSeconds(0L).setNanos(123).build())
        .setAccountIdFrom(1L)
        .setAccountIdTo(0L)
        .setAmountFrom(1L)
        .setAmountTo(-3L)
        .setCategoryId(1L)
        .build();
    Assert.assertFalse(validator.isValid(transaction))
  }

  @Test
  fun transactionInvalidCategory() {
    val transaction = Transaction.newBuilder()
        .setId(0L)
        .setCreated(Timestamp.newBuilder().setSeconds(0L).setNanos(123).build())
        .setAccountIdFrom(1L)
        .setAccountIdTo(0L)
        .setAmountFrom(1L)
        .setAmountTo(3L)
        .setCategoryId(0L)
        .build();
    Assert.assertFalse(validator.isValid(transaction))
  }

  @Test
  fun transactionInvalidSubCategory() {
    val transaction = Transaction.newBuilder()
        .setId(0L)
        .setCreated(Timestamp.newBuilder().setSeconds(0L).setNanos(123).build())
        .setAccountIdFrom(1L)
        .setAccountIdTo(0L)
        .setAmountFrom(1L)
        .setAmountTo(3L)
        .setCategoryId(1L)
        .setCategoryId(0L)
        .build();
    Assert.assertFalse(validator.isValid(transaction))
  }

  @Test
  fun transactionInvalidFamilyMember() {
    val transaction = Transaction.newBuilder()
        .setId(0L)
        .setCreated(Timestamp.newBuilder().setSeconds(0L).setNanos(123).build())
        .setAccountIdFrom(1L)
        .setAccountIdTo(0L)
        .setAmountFrom(1L)
        .setAmountTo(3L)
        .setCategoryId(1L)
        .setFamilyMemberId(0L)
        .build();
    Assert.assertFalse(validator.isValid(transaction))
  }
}
