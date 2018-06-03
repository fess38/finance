package ru.fess38.finance.validation

import org.junit.Assert
import org.junit.Test
import ru.fess38.finance.core.Model.Category

internal class CategoryValidatorTest {
  private val validator = CategoryValidator()

  @Test
  fun valid() {
    val category = Category.newBuilder()
        .setName("name")
        .setIsIncome(true)
        .build()
    val expected = ValidatorResponse(true, "ok")
    val actual = validator.validate(category)
    Assert.assertEquals(expected, actual)
  }

  @Test
  fun unknownStateTrueTrue() {
    val category = Category.newBuilder()
        .setName(" ")
        .setIsIncome(true)
        .setIsExpence(true)
        .build()
    val message = "unknown category state: is_income=true, is_expence=true"
    val expected = ValidatorResponse(false, message)
    val actual = validator.validate(category)
    Assert.assertEquals(expected, actual)
  }

  @Test
  fun unknownStateFalseFalse() {
    val category = Category.newBuilder()
        .setName(" ")
        .build()
    val message = "unknown category state: is_income=false, is_expence=false"
    val expected = ValidatorResponse(false, message)
    val actual = validator.validate(category)
    Assert.assertEquals(expected, actual)
  }
}
