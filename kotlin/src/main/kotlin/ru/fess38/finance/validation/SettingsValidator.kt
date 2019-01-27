package ru.fess38.finance.validation

import ru.fess38.finance.core.MessageService
import ru.fess38.finance.core.Model.EntityType.CURRENCY
import ru.fess38.finance.core.Model.Settings

class SettingsValidator(private val messageService: MessageService): MessageValidator<Settings> {
  override fun validate(value: Settings): ValidatorResponse {
    val errors = mutableListOf<String>()

    if (!messageService.isExist(value.currencyId, CURRENCY)) {
      errors.add("unknown currency [${value.currencyId}]")
    }
    return ValidatorResponse(errors)
  }
}
