package ru.fess38.finance.validation

import com.google.protobuf.Message

interface MessageValidator<T : Message> {
  fun validate(value: T, isCreate: Boolean): ValidatorResponse
}
