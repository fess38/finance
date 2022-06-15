package ru.fess38.finance.validation

import org.junit.Assert
import org.junit.Test
import org.mockito.Mockito
import ru.fess38.finance.core.MessageService
import ru.fess38.finance.core.Model

internal class NoteValidatorTest {
  private val validator = NoteValidator(mockMessageService())

  @Test
  fun valid() {
    val note = Model.Note.newBuilder()
      .setCreated(0)
      .setUpdated(0)
      .setName("name")
      .setNotepadId(1)
      .build()
    val expected = ValidatorResponse()
    val actual = validator.validate(note)
    Assert.assertEquals(expected, actual)
  }

  @Test
  fun invalidNotepadId() {
    val note = Model.Note.newBuilder()
      .setCreated(0)
      .setUpdated(0)
      .setName("name")
      .setNotepadId(2)
      .build()
    val expected = ValidatorResponse("unknown notepad [2]")
    val actual = validator.validate(note)
    Assert.assertEquals(expected, actual)
  }

  private fun mockMessageService(): MessageService {
    val messageService = Mockito.mock(MessageService::class.java)
    Mockito.`when`(messageService.isExist(1, Model.EntityType.NOTEPAD)).thenReturn(true)
    Mockito.`when`(messageService.isExist(2, Model.EntityType.NOTEPAD)).thenReturn(false)
    return messageService
  }
}
