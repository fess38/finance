package ru.fess38.finance.validation

import ru.fess38.finance.core.MessageService
import ru.fess38.finance.core.Model.EntityType
import ru.fess38.finance.core.Model.Transaction
import java.time.LocalDate

class TransactionValidator(private val messageService: MessageService): MessageValidator<Transaction> {
  private val EMPTY_VALUE: Long = -1

  override fun validate(value: Transaction): ValidatorResponse {
    var isValid = true
    val errors = mutableListOf<String>()

    try {
      LocalDate.parse(value.created)
    } catch (e: Exception) {
      isValid = false
      errors.add("invalid creation date [${value.created}]")
    }
    if (value.accountIdFrom != EMPTY_VALUE
        && !messageService.isExist(value.accountIdFrom, EntityType.ACCOUNT)) {
      isValid = false
      errors.add("unknown account_from [${value.accountIdFrom}]")
    }
    if (value.accountIdTo != EMPTY_VALUE
        && !messageService.isExist(value.accountIdTo, EntityType.ACCOUNT)) {
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
    if (value.categoryId != EMPTY_VALUE
        && !messageService.isExist(value.categoryId, EntityType.CATEGORY)) {
      isValid = false
      errors.add("unknown category [${value.categoryId}]")
    }
    if (value.categoryId == EMPTY_VALUE
        && !(value.accountIdFrom == EMPTY_VALUE || value.accountIdTo == EMPTY_VALUE)) {
      isValid = false
      errors.add("transaction without category")
    }
    if (value.subCategoryId != 0L && !messageService.isExist(value.subCategoryId, EntityType.SUB_CATEGORY)) {
      isValid = false
      errors.add("unknown sub_category [${value.subCategoryId}]")
    }
    if (value.familyMemberId != 0L && !messageService.isExist(value.familyMemberId, EntityType.FAMILY_MEMBER)) {
      isValid = false
      errors.add("unknown family member [${value.familyMemberId}]")
    }
    if (isValid) {
      errors.add("ok")
    }
    return ValidatorResponse(isValid, errors)
  }
}
