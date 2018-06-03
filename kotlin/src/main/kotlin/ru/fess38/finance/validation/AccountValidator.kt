package ru.fess38.finance.validation

import ru.fess38.finance.AppConfiguration
import ru.fess38.finance.core.Model.Account

class AccountValidator: MessageValidator<Account> {
  override fun validate(value: Account): ValidatorResponse {
    var isValid = true
    val errors = mutableListOf<String>()

    if (!AppConfiguration.CURRENCIES.map {it.id}.contains(value.currencyId)) {
      isValid = false
      errors.add("unknown currency [${value.currencyId}]")
    }
    if (isValid) {
      errors.add("ok")
    }
    return ValidatorResponse(isValid, errors)
  }
}
