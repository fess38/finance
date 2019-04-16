package ru.fess38.finance.validation

import org.junit.Assert
import org.junit.Test
import org.mockito.Mockito
import ru.fess38.finance.core.MessageService
import ru.fess38.finance.core.Model.Account
import ru.fess38.finance.core.Model.EntityType.CURRENCY

internal class AccountValidatorTest {
  private val validator = AccountValidator(mockMessageService())

  @Test
  fun valid() {
    val account = Account.newBuilder()
        .setName("name")
        .setCurrencyId(1)
        .build()
    val expected = ValidatorResponse()
    val actual = validator.validate(account)
    Assert.assertEquals(expected, actual)
  }

  @Test
  fun invalidCurrencyId() {
    val account = Account.newBuilder()
        .setName("name")
        .setCurrencyId(0)
        .build()
    val expected = ValidatorResponse("unknown currency [0]")
    val actual = validator.validate(account)
    Assert.assertEquals(expected, actual)
  }

  private fun mockMessageService(): MessageService {
    val messageService = Mockito.mock(MessageService::class.java)
    Mockito.`when`(messageService.isExist(0, CURRENCY)).thenReturn(false)
    Mockito.`when`(messageService.isExist(1, CURRENCY)).thenReturn(true)
    return messageService
  }
}
