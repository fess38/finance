package ru.fess38.finance.validation

import org.junit.Assert
import org.junit.Test
import org.mockito.Mockito
import ru.fess38.finance.core.MessageService
import ru.fess38.finance.core.Model
import ru.fess38.finance.core.Model.SecurityTransaction.Type

class SecurityTransactionValidatorTest {
  private val validator = SecurityTransactionValidator(mockMessageService())

  @Test
  fun valid() {
    val securityTransaction = Model.SecurityTransaction.newBuilder()
      .setDate("1970-01-01")
      .setSecurityId(1)
      .setType(Type.SERVICE_FEE)
      .setPrice(Model.Money.newBuilder().setUnits(1).build())
      .setExchangeRate(Model.Money.newBuilder().setUnits(1).build())
      .build()
    val expected = ValidatorResponse()
    val actual = validator.validate(securityTransaction, true)
    Assert.assertEquals(expected, actual)
  }

  @Test
  fun invalidDate() {
    val securityTransaction = Model.SecurityTransaction.newBuilder()
      .setDate("foo")
      .setSecurityId(1)
      .setType(Type.SERVICE_FEE)
      .setPrice(Model.Money.newBuilder().setUnits(1).build())
      .setExchangeRate(Model.Money.newBuilder().setUnits(1).build())
      .build()
    val expected = ValidatorResponse("invalid transaction date [foo]")
    val actual = validator.validate(securityTransaction, true)
    Assert.assertEquals(expected, actual)
  }

  @Test
  fun invalidSecurityId() {
    val securityTransaction = Model.SecurityTransaction.newBuilder()
      .setDate("1970-01-01")
      .setSecurityId(0)
      .setType(Type.SERVICE_FEE)
      .setPrice(Model.Money.newBuilder().setUnits(1).build())
      .setExchangeRate(Model.Money.newBuilder().setUnits(1).build())
      .build()
    val expected = ValidatorResponse("unknown security [0]")
    val actual = validator.validate(securityTransaction, true)
    Assert.assertEquals(expected, actual)
  }

  @Test
  fun invalidPrice() {
    val securityTransaction = Model.SecurityTransaction.newBuilder()
      .setDate("1970-01-01")
      .setSecurityId(1)
      .setType(Type.SERVICE_FEE)
      .setPrice(Model.Money.newBuilder().setUnits(-1).build())
      .setExchangeRate(Model.Money.newBuilder().setUnits(1).build())
      .build()
    val expected = ValidatorResponse("invalid price [-1 0]")
    val actual = validator.validate(securityTransaction, true)
    Assert.assertEquals(expected, actual)
  }

  @Test
  fun invalidExchangeRate() {
    val securityTransaction = Model.SecurityTransaction.newBuilder()
      .setDate("1970-01-01")
      .setSecurityId(1)
      .setType(Type.SERVICE_FEE)
      .setPrice(Model.Money.newBuilder().setUnits(1).build())
      .setExchangeRate(Model.Money.newBuilder().setUnits(-1).build())
      .build()
    val expected = ValidatorResponse("invalid exchange rate [-1 0]")
    val actual = validator.validate(securityTransaction, true)
    Assert.assertEquals(expected, actual)
  }

  @Test
  fun invalidAmount() {
    val securityTransaction = Model.SecurityTransaction.newBuilder()
      .setDate("1970-01-01")
      .setSecurityId(1)
      .setType(Type.SERVICE_FEE)
      .setPrice(Model.Money.newBuilder().setUnits(1).build())
      .setExchangeRate(Model.Money.newBuilder().setUnits(1).build())
      .setAmount(0)
      .build()
    val expected = ValidatorResponse("invalid amount [0]")
    val actual = validator.validate(securityTransaction, true)
    Assert.assertEquals(expected, actual)
  }

  private fun mockMessageService(): MessageService {
    val messageService = Mockito.mock(MessageService::class.java)
    Mockito.`when`(messageService.isExist(0, Model.EntityType.SECURITY)).thenReturn(false)
    Mockito.`when`(messageService.isExist(1, Model.EntityType.SECURITY)).thenReturn(true)
    return messageService
  }
}
