package ru.fess38.finance.validation

import ru.fess38.finance.core.Model.Category

class CategoryValidator: MessageValidator<Category> {
  override fun validate(value: Category): ValidatorResponse {
    val errors = mutableListOf<String>()

    if (value.isIncome == value.isExpense) {
      val isIncome = value.isIncome
      val isExpense = value.isExpense
      errors.add("unknown category state: is_income=$isIncome, is_expense=$isExpense")
    }
    return ValidatorResponse(errors)
  }
}
