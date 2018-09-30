package ru.fess38.finance.validation

import org.junit.Assert
import org.junit.Test
import org.mockito.Mockito
import ru.fess38.finance.core.MessageService
import ru.fess38.finance.core.Model.EntityType.CURRENCY
import ru.fess38.finance.core.Model.Settings

internal class SettingsValidatorTest {
  private val validator = SettingsValidator(mockMessageService())

  @Test
  fun valid() {
    val settings = Settings.newBuilder().setCurrencyId(1).build()
    val expected = ValidatorResponse(true, "ok")
    val actual = validator.validate(settings)
    Assert.assertEquals(expected, actual)
  }

  @Test
  fun invalidCurrencyId() {
    val settings = Settings.newBuilder().setCurrencyId(0).build()
    val expected = ValidatorResponse(false, "unknown currency [0]")
    val actual = validator.validate(settings)
    Assert.assertEquals(expected, actual)
  }

  private fun mockMessageService(): MessageService {
    val messageService = Mockito.mock(MessageService::class.java)
    Mockito.`when`(messageService.isExist(0, CURRENCY)).thenReturn(false)
    Mockito.`when`(messageService.isExist(1, CURRENCY)).thenReturn(true)
    return messageService
  }
}
