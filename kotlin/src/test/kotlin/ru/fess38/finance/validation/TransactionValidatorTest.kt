package ru.fess38.finance.validation

import org.junit.Assert
import org.junit.Test
import org.mockito.Mockito
import ru.fess38.finance.core.MessageService
import ru.fess38.finance.core.Model.EntityType.TRANSACTION
import ru.fess38.finance.core.Model.Transaction
import ru.fess38.finance.utils.millisToTimestamp

internal class TransactionValidatorTest {
  private val validator = TransactionValidator(mockMessageService())

  @Test
  fun valid() {
    val transaction = Transaction.newBuilder()
        .setCreated(millisToTimestamp(1000))
        .setAccountIdFrom(1)
        .setAccountIdTo(2)
        .setAmountFrom(1)
        .setAmountTo(1)
        .setCategoryId(3)
        .build()
    val expected = ValidatorResponse(true, "ok")
    val actual = validator.validate(transaction)
    Assert.assertEquals(expected, actual)
  }

  @Test
  fun unknownAccountFrom() {
    val transaction = Transaction.newBuilder()
        .setCreated(millisToTimestamp(1000))
        .setAccountIdFrom(4)
        .setAccountIdTo(2)
        .setAmountFrom(1)
        .setAmountTo(1)
        .setCategoryId(3)
        .build()
    val expected = ValidatorResponse(false, "unknown account_from [4]")
    val actual = validator.validate(transaction)
    Assert.assertEquals(expected, actual)
  }

  @Test
  fun accountFromMinus1() {
    val transaction = Transaction.newBuilder()
        .setCreated(millisToTimestamp(1000))
        .setAccountIdFrom(-1)
        .setAccountIdTo(2)
        .setAmountFrom(1)
        .setAmountTo(1)
        .setCategoryId(3)
        .build()
    val expected = ValidatorResponse(true, "ok")
    val actual = validator.validate(transaction)
    Assert.assertEquals(expected, actual)
  }

  @Test
  fun unknownAccountTo() {
    val transaction = Transaction.newBuilder()
        .setCreated(millisToTimestamp(1000))
        .setAccountIdFrom(1)
        .setAccountIdTo(4)
        .setAmountFrom(1)
        .setAmountTo(1)
        .setCategoryId(3)
        .build()
    val expected = ValidatorResponse(false, "unknown account_to [4]")
    val actual = validator.validate(transaction)
    Assert.assertEquals(expected, actual)
  }

  @Test
  fun accountToMinus1() {
    val transaction = Transaction.newBuilder()
        .setCreated(millisToTimestamp(1000))
        .setAccountIdFrom(1)
        .setAccountIdTo(-1)
        .setAmountFrom(1)
        .setAmountTo(1)
        .setCategoryId(3)
        .build()
    val expected = ValidatorResponse(true, "ok")
    val actual = validator.validate(transaction)
    Assert.assertEquals(expected, actual)
  }

  @Test
  fun equalAccounts() {
    val transaction = Transaction.newBuilder()
        .setCreated(millisToTimestamp(1000))
        .setAccountIdFrom(1)
        .setAccountIdTo(1)
        .setAmountFrom(1)
        .setAmountTo(1)
        .setCategoryId(3)
        .build()
    val expected = ValidatorResponse(false, "accounts equal each other [1]")
    val actual = validator.validate(transaction)
    Assert.assertEquals(expected, actual)
  }

  @Test
  fun invalidAmountFrom() {
    val transaction = Transaction.newBuilder()
        .setCreated(millisToTimestamp(1000))
        .setAccountIdFrom(1)
        .setAccountIdTo(2)
        .setAmountFrom(-1)
        .setAmountTo(1)
        .setCategoryId(3)
        .build()
    val expected = ValidatorResponse(false, "amount_from is negative: -1")
    val actual = validator.validate(transaction)
    Assert.assertEquals(expected, actual)
  }

  @Test
  fun invalidAmountTo() {
    val transaction = Transaction.newBuilder()
        .setCreated(millisToTimestamp(1000))
        .setAccountIdFrom(1)
        .setAccountIdTo(2)
        .setAmountFrom(2)
        .setAmountTo(-1)
        .setCategoryId(3)
        .build()
    val expected = ValidatorResponse(false, "amount_to is negative: -1")
    val actual = validator.validate(transaction)
    Assert.assertEquals(expected, actual)
  }

  @Test
  fun emptyTransaction() {
    val transaction = Transaction.newBuilder()
        .setCreated(millisToTimestamp(1000))
        .setAccountIdFrom(1)
        .setAccountIdTo(2)
        .setAmountFrom(0)
        .setAmountTo(0)
        .setCategoryId(3)
        .build()
    val expected = ValidatorResponse(false, "empty transaction")
    val actual = validator.validate(transaction)
    Assert.assertEquals(expected, actual)
  }

  @Test
  fun unknownCategory() {
    val transaction = Transaction.newBuilder()
        .setCreated(millisToTimestamp(1000))
        .setAccountIdFrom(1)
        .setAccountIdTo(2)
        .setAmountFrom(1)
        .setAmountTo(0)
        .setCategoryId(5)
        .build()
    val expected = ValidatorResponse(false, "unknown category [5]")
    val actual = validator.validate(transaction)
    Assert.assertEquals(expected, actual)
  }

  @Test
  fun categoryMinus1() {
    val transaction = Transaction.newBuilder()
        .setCreated(millisToTimestamp(1000))
        .setAccountIdFrom(1)
        .setAccountIdTo(2)
        .setAmountFrom(1)
        .setAmountTo(0)
        .setCategoryId(-1)
        .build()
    val expected = ValidatorResponse(true, "ok")
    val actual = validator.validate(transaction)
    Assert.assertEquals(expected, actual)
  }

  @Test
  fun unknownSubCategory() {
    val transaction = Transaction.newBuilder()
        .setCreated(millisToTimestamp(1000))
        .setAccountIdFrom(1)
        .setAccountIdTo(2)
        .setAmountFrom(1)
        .setAmountTo(0)
        .setCategoryId(3)
        .setSubCategoryId(5)
        .build()
    val expected = ValidatorResponse(false, "unknown sub_category [5]")
    val actual = validator.validate(transaction)
    Assert.assertEquals(expected, actual)
  }

  @Test
  fun unknownFamilyMember() {
    val transaction = Transaction.newBuilder()
        .setCreated(millisToTimestamp(1000))
        .setAccountIdFrom(1)
        .setAccountIdTo(2)
        .setAmountFrom(1)
        .setAmountTo(0)
        .setCategoryId(3)
        .setFamilyMemberId(5)
        .build()
    val expected = ValidatorResponse(false, "unknown family member [5]")
    val actual = validator.validate(transaction)
    Assert.assertEquals(expected, actual)
  }

  private fun mockMessageService(): MessageService {
    val messageService = Mockito.mock(MessageService::class.java)
    Mockito.`when`(messageService.isExist(1, TRANSACTION)).thenReturn(true)
    Mockito.`when`(messageService.isExist(2, TRANSACTION)).thenReturn(true)
    Mockito.`when`(messageService.isExist(3, TRANSACTION)).thenReturn(true)
    Mockito.`when`(messageService.isExist(4, TRANSACTION)).thenReturn(false)
    Mockito.`when`(messageService.isExist(5, TRANSACTION)).thenReturn(false)
    return messageService
  }
}
