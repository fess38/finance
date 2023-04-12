package ru.fess38.finance.validation

import org.junit.Assert
import org.junit.Test
import org.mockito.Mockito
import ru.fess38.finance.core.MessageService
import ru.fess38.finance.core.Model.EntityType
import ru.fess38.finance.core.Model.Transaction

internal class TransactionValidatorTest {
  private val validator = TransactionValidator(mockMessageService())

  @Test
  fun valid() {
    val transaction = Transaction.newBuilder()
      .setCreated("2018-01-01")
      .setAccountIdFrom(1)
      .setAccountIdTo(2)
      .setAmountFrom(1)
      .setAmountTo(1)
      .setCategoryId(-1)
      .build()
    val expected = ValidatorResponse()
    val actual = validator.validate(transaction, true)
    Assert.assertEquals(expected, actual)
  }

  @Test
  fun invalidIncome() {
    val transaction = Transaction.newBuilder()
      .setCreated("2018-01-01")
      .setAccountIdFrom(-1)
      .setAccountIdTo(3)
      .setAmountFrom(10)
      .setAmountTo(0)
      .setCategoryId(5)
      .build()
    val expected = ValidatorResponse(
      listOf(
        "unknown account_to [3]",
        "invalid amount_from for income", "amount_to is not positive: 0", "unknown category [5]"
      )
    )
    val actual = validator.validate(transaction, true)
    Assert.assertEquals(expected, actual)
  }

  @Test
  fun invalidExpense() {
    val transaction = Transaction.newBuilder()
      .setCreated("2018-01-01")
      .setAccountIdFrom(3)
      .setAccountIdTo(-1)
      .setAmountFrom(0)
      .setAmountTo(10)
      .setCategoryId(5)
      .build()
    val expected = ValidatorResponse(
      listOf(
        "unknown account_from [3]",
        "amount_from is not positive: 0", "invalid amount_to for expense", "unknown category [5]"
      )
    )
    val actual = validator.validate(transaction, true)
    Assert.assertEquals(expected, actual)
  }

  @Test
  fun invalidTransfer() {
    val transaction = Transaction.newBuilder()
      .setCreated("2018-01-01")
      .setAccountIdFrom(3)
      .setAccountIdTo(3)
      .setAmountFrom(0)
      .setAmountTo(0)
      .setCategoryId(5)
      .build()
    val expected = ValidatorResponse(
      listOf(
        "unknown account_from [3]", "unknown account_to [3]",
        "unknown category for transfer [5]"
      )
    )
    val actual = validator.validate(transaction, true)
    Assert.assertEquals(expected, actual)
  }

  @Test
  fun invalidSubCategory() {
    val transaction = Transaction.newBuilder()
      .setCreated("2018-01-01")
      .setAccountIdFrom(-1)
      .setAccountIdTo(2)
      .setAmountFrom(0)
      .setAmountTo(10)
      .setCategoryId(4)
      .setSubCategoryId(6)
      .build()
    val expected = ValidatorResponse("unknown sub_category [6]")
    val actual = validator.validate(transaction, true)
    Assert.assertEquals(expected, actual)
  }

  @Test
  fun unknownAccounts() {
    val transaction = Transaction.newBuilder()
      .setCreated("2018-01-01")
      .setAccountIdFrom(0)
      .setAccountIdTo(0)
      .setAmountFrom(0)
      .setAmountTo(10)
      .setCategoryId(4)
      .build()
    val expected = ValidatorResponse("unknown accounts")
    val actual = validator.validate(transaction, true)
    Assert.assertEquals(expected, actual)
  }

  @Test
  fun invalidFamilyMember() {
    val transaction = Transaction.newBuilder()
      .setCreated("2018-01-01")
      .setAccountIdFrom(-1)
      .setAccountIdTo(2)
      .setAmountFrom(0)
      .setAmountTo(10)
      .setCategoryId(4)
      .setFamilyMemberId(7)
      .build()
    val expected = ValidatorResponse("unknown family member [7]")
    val actual = validator.validate(transaction, true)
    Assert.assertEquals(expected, actual)
  }

  @Test
  fun invalidDate() {
    val transaction = Transaction.newBuilder()
      .setCreated("2018-91-01")
      .setAccountIdFrom(1)
      .setAccountIdTo(2)
      .setAmountFrom(1)
      .setAmountTo(1)
      .setCategoryId(-1)
      .build()
    val expected = ValidatorResponse("invalid creation date [2018-91-01]")
    val actual = validator.validate(transaction, true)
    Assert.assertEquals(expected, actual)
  }

  private fun mockMessageService(): MessageService {
    val messageService = Mockito.mock(MessageService::class.java)
    Mockito.`when`(messageService.isExist(1, EntityType.ACCOUNT)).thenReturn(true)
    Mockito.`when`(messageService.isExist(2, EntityType.ACCOUNT)).thenReturn(true)
    Mockito.`when`(messageService.isExist(3, EntityType.ACCOUNT)).thenReturn(false)
    Mockito.`when`(messageService.isExist(4, EntityType.CATEGORY)).thenReturn(true)
    Mockito.`when`(messageService.isExist(5, EntityType.CATEGORY)).thenReturn(false)
    Mockito.`when`(messageService.isExist(6, EntityType.SUB_CATEGORY)).thenReturn(false)
    Mockito.`when`(messageService.isExist(7, EntityType.FAMILY_MEMBER)).thenReturn(false)
    return messageService
  }
}
