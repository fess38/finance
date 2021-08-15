package ru.fess38.finance.validation

import ru.fess38.finance.core.MessageService
import ru.fess38.finance.core.Model.Security
import ru.fess38.finance.core.Model.EntityType

class SecurityValidator(private val messageService: MessageService) : MessageValidator<Security> {
  override fun validate(value: Security, isCreate: Boolean): ValidatorResponse {
    val errors = mutableListOf<String>()

    if (!messageService.isExist(value.currencyId, EntityType.CURRENCY)) {
      errors.add("unknown currency [${value.currencyId}]")
    }

    if (!(value.price.units > 0 || value.price.micros > 0)) {
      errors.add("invalid price [${value.price.units} ${value.price.micros}]")
    }

    if (!(value.exchangeRate.units > 0 || value.exchangeRate.micros > 0)) {
      errors.add("invalid exchange rate [${value.exchangeRate.units} ${value.exchangeRate.micros}]")
    }

    return ValidatorResponse(errors)
  }
}
