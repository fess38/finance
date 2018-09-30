package ru.fess38.finance.validation

data class ValidatorResponse(val isValid: Boolean, val errors: List<String>) {
  constructor(isValid: Boolean, error: String): this(isValid, listOf(error))
}

