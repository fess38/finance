package ru.fess38.finance.validation

import ru.fess38.finance.core.MessageService
import ru.fess38.finance.core.Model
import java.time.LocalDate

class SecurityTransactionValidator(private val messageService: MessageService) :
  MessageValidator<Model.SecurityTransaction> {
  override fun validate(value: Model.SecurityTransaction, isCreate: Boolean): ValidatorResponse {
    val errors = mutableListOf<String>()

    try {
      LocalDate.parse(value.date)
    } catch (e: Exception) {
      errors.add("invalid transaction date [${value.date}]")
    }

    if (!messageService.isExist(value.securityId, Model.EntityType.SECURITY)) {
      errors.add("unknown security [${value.securityId}]")
    }

    if (value.price.units <= 0 || value.price.micros < 0) {
      errors.add("invalid price [${value.price.units} ${value.price.micros}]")
    }

    if (value.exchangeRate.units <= 0 || value.exchangeRate.micros < 0) {
      errors.add("invalid exchange rate [${value.exchangeRate.units} ${value.exchangeRate.micros}]")
    }

    if (value.amount <= 0) {
      errors.add("invalid amount [${value.amount}]")
    }

    return ValidatorResponse(errors)
  }
}
