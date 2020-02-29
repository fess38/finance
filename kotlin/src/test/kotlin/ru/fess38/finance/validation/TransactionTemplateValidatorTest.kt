package ru.fess38.finance.validation

import org.junit.Assert
import org.junit.Test
import ru.fess38.finance.core.Model.Transaction
import ru.fess38.finance.core.Model.TransactionTemplate

internal class TransactionTemplateValidatorTest {
  private val validator = TransactionTemplateValidator()

  @Test
  fun valid() {
    val transactionTemplate = TransactionTemplate.newBuilder()
        .setName("name")
        .setTransaction(transaction())
        .setInterval(1)
        .build()
    val expected = ValidatorResponse()
    val actual = validator.validate(transactionTemplate)
    Assert.assertEquals(expected, actual)
  }

  @Test
  fun noSchedule() {
    val transactionTemplate = TransactionTemplate.newBuilder()
        .setName("name")
        .setTransaction(transaction())
        .build()
    val expected = ValidatorResponse(listOf("template has no schedule"))
    val actual = validator.validate(transactionTemplate)
    Assert.assertEquals(expected, actual)
  }

  @Test
  fun illegalDayOfWeek() {
    val transactionTemplate = TransactionTemplate.newBuilder()
        .setName("name")
        .setTransaction(transaction())
        .addAllDaysOfWeek(listOf(-1, 0, 1, 8))
        .build()
    val expected = ValidatorResponse(listOf("illegal day of week [-1]", "illegal day of week [0]",
        "illegal day of week [8]"))
    val actual = validator.validate(transactionTemplate)
    Assert.assertEquals(expected, actual)
  }

  @Test
  fun illegalDayOfMonth() {
    val transactionTemplate = TransactionTemplate.newBuilder()
        .setName("name")
        .setTransaction(transaction())
        .addAllDaysOfMonth(listOf(-1, 0, 1, 32))
        .build()
    val expected = ValidatorResponse(listOf("illegal day of month [-1]", "illegal day of month [0]",
        "illegal day of month [32]"))
    val actual = validator.validate(transactionTemplate)
    Assert.assertEquals(expected, actual)
  }

  private fun transaction() = Transaction.newBuilder()
      .setCreated("2018-01-01")
      .setAccountIdFrom(1)
      .setAccountIdTo(2)
      .setAmountFrom(1)
      .setAmountTo(1)
      .setCategoryId(1)
      .build()


}
