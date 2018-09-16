package ru.fess38.finance.validation

import ru.fess38.finance.core.MessageService
import ru.fess38.finance.core.Model.EntityType.CURRENCY
import ru.fess38.finance.core.Model.Settings

class SettingsValidator(private val messageService: MessageService): MessageValidator<Settings> {
  override fun validate(value: Settings): ValidatorResponse {
    var isValid = true
    val errors = mutableListOf<String>()

    if (!messageService.isExist(value.currencyId, CURRENCY)) {
      isValid = false
      errors.add("unknown currency [${value.currencyId}]")
    }
    if (isValid) {
      errors.add("ok")
    }
    return ValidatorResponse(isValid, errors)
  }
}
