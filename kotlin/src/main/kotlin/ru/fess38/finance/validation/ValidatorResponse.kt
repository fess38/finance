package ru.fess38.finance.validation

data class ValidatorResponse(val errors: List<String>) {
  constructor(): this(listOf())

  constructor(error: String): this(listOf(error))

  fun isValid(): Boolean = errors.isEmpty()
}

