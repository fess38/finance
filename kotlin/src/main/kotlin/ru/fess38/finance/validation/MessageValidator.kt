package ru.fess38.finance.validation

import com.google.protobuf.Message
import ru.fess38.finance.core.MessageService
import ru.fess38.finance.core.Model.*

interface MessageValidator<T : Message> {
  fun validate(value: T, isCreate: Boolean = true): ValidatorResponse
}

class NotepadValidator : MessageValidator<Notepad> {
  override fun validate(value: Notepad, isCreate: Boolean): ValidatorResponse {
    val errors = mutableListOf<String>()
    return ValidatorResponse(errors)
  }
}

class NoteValidator(private val messageService: MessageService) : MessageValidator<Note> {
  override fun validate(value: Note, isCreate: Boolean): ValidatorResponse {
    val errors = mutableListOf<String>()

    if (!messageService.isExist(value.notepadId, EntityType.NOTEPAD)) {
      errors.add("unknown notepad [${value.notepadId}]")
    }

    return ValidatorResponse(errors)
  }
}
