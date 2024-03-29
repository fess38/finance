package ru.fess38.finance.validation

import org.junit.Assert
import org.junit.Test
import org.mockito.Mockito
import ru.fess38.finance.core.MessageService
import ru.fess38.finance.core.Model.Account
import ru.fess38.finance.core.Model.EntityType.*
import ru.fess38.finance.core.Model.FamilyMember

internal class CompositeValidatorTest {
  private val validator = CompositeValidator(mockMessageService())

  @Test
  fun valid() {
    val account = Account.newBuilder()
      .setId(10)
      .setName("name")
      .setCurrencyId(1)
      .build()
    val expected = ValidatorResponse()
    val actual = validator.validate(account, false)
    Assert.assertEquals(expected, actual)
  }

  @Test
  fun unknownId() {
    val familyMember = FamilyMember.newBuilder()
      .setId(20)
      .setName("name")
      .build()
    val error = "try to update unknown [FAMILY_MEMBER] with id [20]"
    val expected = ValidatorResponse(error)
    val actual = validator.validate(familyMember, false)
    Assert.assertEquals(expected, actual)
  }

  @Test
  fun zeroId() {
    val familyMember = FamilyMember.newBuilder()
      .setName("name")
      .build()
    val error = "try to store [FAMILY_MEMBER] without id"
    val expected = ValidatorResponse(error)
    val actual = validator.validate(familyMember, true)
    Assert.assertEquals(expected, actual)
  }

  private fun mockMessageService(): MessageService {
    val messageService = Mockito.mock(MessageService::class.java)
    Mockito.`when`(messageService.isExist(10, ACCOUNT)).thenReturn(true)
    Mockito.`when`(messageService.isExist(1, CURRENCY)).thenReturn(true)
    Mockito.`when`(messageService.isExist(20, FAMILY_MEMBER)).thenReturn(false)
    return messageService
  }
}
