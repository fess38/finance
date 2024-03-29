package ru.fess38.finance.validation

import org.junit.Assert
import org.junit.Test
import org.mockito.Mockito
import ru.fess38.finance.core.MessageService
import ru.fess38.finance.core.Model.*

class SecurityValidatorTest {
  private val validator = SecurityValidator(mockMessageService())

  @Test
  fun valid() {
    val security = Security.newBuilder()
      .setName("")
      .setCurrencyId(1)
      .setPrice(Money.newBuilder().setUnits(1).build())
      .setExchangeRate(Money.newBuilder().setUnits(1).build())
      .build()
    val expected = ValidatorResponse()
    val actual = validator.validate(security, true)
    Assert.assertEquals(expected, actual)
  }

  @Test
  fun invalidCurrencyId() {
    val security = Security.newBuilder()
      .setName("")
      .setCurrencyId(0)
      .setPrice(Money.newBuilder().setUnits(1).build())
      .setExchangeRate(Money.newBuilder().setUnits(1).build())
      .build()
    val expected = ValidatorResponse("unknown currency [0]")
    val actual = validator.validate(security, true)
    Assert.assertEquals(expected, actual)
  }

  @Test
  fun invalidPrice() {
    val security = Security.newBuilder()
      .setName("")
      .setCurrencyId(1)
      .setPrice(Money.newBuilder().setUnits(-1).build())
      .setExchangeRate(Money.newBuilder().setUnits(1).build())
      .build()
    val expected = ValidatorResponse("invalid price [-1 0]")
    val actual = validator.validate(security, true)
    Assert.assertEquals(expected, actual)
  }

  @Test
  fun invalidExchangeRate() {
    val security = Security.newBuilder()
      .setName("")
      .setCurrencyId(1)
      .setPrice(Money.newBuilder().setUnits(1).build())
      .setExchangeRate(Money.newBuilder().setUnits(-1).build())
      .build()
    val expected = ValidatorResponse("invalid exchange rate [-1 0]")
    val actual = validator.validate(security, true)
    Assert.assertEquals(expected, actual)
  }

  private fun mockMessageService(): MessageService {
    val messageService = Mockito.mock(MessageService::class.java)
    Mockito.`when`(messageService.isExist(0, EntityType.CURRENCY)).thenReturn(false)
    Mockito.`when`(messageService.isExist(1, EntityType.CURRENCY)).thenReturn(true)
    return messageService
  }
}
