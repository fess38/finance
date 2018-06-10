package ru.fess38.finance.validation

import ru.fess38.finance.core.MessageService
import ru.fess38.finance.core.Model.Account
import ru.fess38.finance.core.Model.EntityType.CURRENCY

class AccountValidator(private val messageService: MessageService): MessageValidator<Account> {
  override fun validate(value: Account): ValidatorResponse {
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
