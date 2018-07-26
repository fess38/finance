package ru.fess38.finance.validation

import ru.fess38.finance.core.Model.Category

class CategoryValidator: MessageValidator<Category> {
  override fun validate(value: Category): ValidatorResponse {
    var isValid = true
    val errors = mutableListOf<String>()

    if (value.isIncome == value.isExpense) {
      isValid = false
      val isIncome = value.isIncome
      val isExpense = value.isExpense
      errors.add("unknown category state: is_income=$isIncome, is_expense=$isExpense")
    }
    if (isValid) {
      errors.add("ok")
    }
    return ValidatorResponse(isValid, errors)
  }
}
