package ru.fess38.finance.validation

import org.junit.Assert
import org.junit.Test
import ru.fess38.finance.core.Model

internal class NotepadValidatorTest {
  private val validator = NotepadValidator()

  @Test
  fun valid() {
    val notepad = Model.Notepad.newBuilder()
      .setCreated(0)
      .setUpdated(0)
      .setName("name")
      .build()
    val expected = ValidatorResponse()
    val actual = validator.validate(notepad)
    Assert.assertEquals(expected, actual)
  }
}
