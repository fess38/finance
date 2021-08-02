package ru.fess38.finance.validation

import ru.fess38.finance.core.MessageService
import ru.fess38.finance.core.Model

class SecurityValidator(private val messageService: MessageService) : MessageValidator<Model.Security> {
  override fun validate(value: Model.Security, isCreate: Boolean): ValidatorResponse {
    val errors = mutableListOf<String>()

    if (!messageService.isExist(value.currencyId, Model.EntityType.CURRENCY)) {
      errors.add("unknown currency [${value.currencyId}]")
    }

    return ValidatorResponse(errors)
  }
}
