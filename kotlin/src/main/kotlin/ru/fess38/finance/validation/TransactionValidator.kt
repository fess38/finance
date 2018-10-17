package ru.fess38.finance.validation

import ru.fess38.finance.core.MessageService
import ru.fess38.finance.core.Model.EntityType.TRANSACTION
import ru.fess38.finance.core.Model.Transaction
import java.time.LocalDate

class TransactionValidator(private val messageService: MessageService): MessageValidator<Transaction> {
  override fun validate(value: Transaction): ValidatorResponse {
    var isValid = true
    val errors = mutableListOf<String>()

    try {
      LocalDate.parse(value.created)
    } catch (e: Exception) {
      isValid = false
      errors.add("invalid creation date [${value.created}]")
    }
    if (value.accountIdFrom != -1L && !messageService.isExist(value.accountIdFrom, TRANSACTION)) {
      isValid = false
      errors.add("unknown account_from [${value.accountIdFrom}]")
    }
    if (value.accountIdTo != -1L && !messageService.isExist(value.accountIdTo, TRANSACTION)) {
      isValid = false
      errors.add("unknown account_to [${value.accountIdTo}]")
    }
    if (value.accountIdFrom == value.accountIdTo) {
      isValid = false
      errors.add("accounts equal each other [${value.accountIdFrom}]")
    }
    if (value.amountFrom < 0) {
      isValid = false
      errors.add("amount_from is negative: ${value.amountFrom}")
    }
    if (value.amountTo < 0) {
      isValid = false
      errors.add("amount_to is negative: ${value.amountTo}")
    }
    if (value.amountFrom == value.amountTo && value.amountFrom == 0L) {
      isValid = false
      errors.add("empty transaction")
    }
    if (value.categoryId != -1L && !messageService.isExist(value.categoryId, TRANSACTION)) {
      isValid = false
      errors.add("unknown category [${value.categoryId}]")
    }
    if (value.subCategoryId != 0L && !messageService.isExist(value.subCategoryId, TRANSACTION)) {
      isValid = false
      errors.add("unknown sub_category [${value.subCategoryId}]")
    }
    if (value.familyMemberId != 0L && !messageService.isExist(value.familyMemberId, TRANSACTION)) {
      isValid = false
      errors.add("unknown family member [${value.familyMemberId}]")
    }
    if (isValid) {
      errors.add("ok")
    }
    return ValidatorResponse(isValid, errors)
  }
}
