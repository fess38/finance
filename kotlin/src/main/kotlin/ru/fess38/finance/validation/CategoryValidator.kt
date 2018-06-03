package ru.fess38.finance.validation

import ru.fess38.finance.core.Model.Category

class CategoryValidator: MessageValidator<Category> {
  override fun validate(value: Category): ValidatorResponse {
    var isValid = true
    val errors = mutableListOf<String>()

    if (value.isIncome == value.isExpence) {
      isValid = false
      val isIncome = value.isIncome
      val isExpence = value.isExpence
      errors.add("unknown category state: is_income=$isIncome, is_expence=$isExpence")
    }
    if (isValid) {
      errors.add("ok")
    }
    return ValidatorResponse(isValid, errors)
  }
}
