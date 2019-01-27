package ru.fess38.finance.validation

import org.junit.Assert
import org.junit.Test
import org.mockito.Mockito
import ru.fess38.finance.core.MessageService
import ru.fess38.finance.core.Model.EntityType.CATEGORY
import ru.fess38.finance.core.Model.SubCategory

internal class SubCategoryValidatorTest {
  private val validator = SubCategoryValidator(mockMessageService())

  @Test
  fun valid() {
    val subCategory = SubCategory.newBuilder()
        .setName("name")
        .setCategoryId(1)
        .build()
    val expected = ValidatorResponse()
    val actual = validator.validate(subCategory)
    Assert.assertEquals(expected, actual)
  }

  @Test
  fun unknownCategory() {
    val subCategory = SubCategory.newBuilder()
        .setName("name")
        .setCategoryId(2)
        .build()
    val expected = ValidatorResponse("unknown category [2]")
    val actual = validator.validate(subCategory)
    Assert.assertEquals(expected, actual)
  }

  private fun mockMessageService(): MessageService {
    val messageService = Mockito.mock(MessageService::class.java)
    Mockito.`when`(messageService.isExist(1, CATEGORY)).thenReturn(true)
    Mockito.`when`(messageService.isExist(2, CATEGORY)).thenReturn(false)
    return messageService
  }
}
