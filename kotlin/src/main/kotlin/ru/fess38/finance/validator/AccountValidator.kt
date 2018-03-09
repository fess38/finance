package ru.fess38.finance.validator

import ru.fess38.finance.AppConfiguration
import ru.fess38.finance.model.Model.Account

class AccountValidator {
  fun isValid(accountNew: Account, accountOld: Account? = null): Boolean {
    var isValid = true

    if (accountNew.name.trim().isEmpty()) {
      isValid = false
    }

    if (!AppConfiguration.CURRENCIES.map {it.id}.contains(accountNew.currencyId)) {
      isValid = false
    }

    if (accountNew.id != 0L && accountOld == null) {
      isValid = false
    }
    return isValid
  }
}
