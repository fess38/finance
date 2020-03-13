package ru.fess38.finance.validation

import ru.fess38.finance.core.Model.TransactionTemplate

class TransactionTemplateValidator: MessageValidator<TransactionTemplate> {
  override fun validate(value: TransactionTemplate): ValidatorResponse {
    val errors = mutableListOf<String>()

    val hasInterval = value.interval > 0
    val hasDaysOfWeek = value.daysOfWeekCount > 0
    val hasDaysOfMonth = value.daysOfMonthCount > 0
    if (!hasInterval && !hasDaysOfWeek && !hasDaysOfMonth) {
      errors.add("template has no schedule")
    }
    for (dayOfWeek in value.daysOfWeekList) {
      if (dayOfWeek < 1 || dayOfWeek > 7) {
        errors.add("illegal day of week [${dayOfWeek}]")
      }
    }
    for (dayOfMonth in value.daysOfMonthList) {
      if (dayOfMonth < 1 || dayOfMonth > 31) {
        errors.add("illegal day of month [${dayOfMonth}]")
      }
    }
    return ValidatorResponse(errors)
  }
}
