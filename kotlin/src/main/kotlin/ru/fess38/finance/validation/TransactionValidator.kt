package ru.fess38.finance.validation

import ru.fess38.finance.core.MessageService
import ru.fess38.finance.core.Model.EntityType
import ru.fess38.finance.core.Model.Transaction
import java.time.LocalDate

class TransactionValidator(private val messageService: MessageService): MessageValidator<Transaction> {
  private val EMPTY_VALUE: Long = -1

  override fun validate(value: Transaction): ValidatorResponse {
    val errors = mutableListOf<String>()

    try {
      LocalDate.parse(value.created)
    } catch (e: Exception) {
      errors.add("invalid creation date [${value.created}]")
    }

    if (value.accountIdFrom == EMPTY_VALUE) {
      if (!messageService.isExist(value.accountIdTo, EntityType.ACCOUNT)) {
        errors.add("unknown account_to [${value.accountIdTo}]")
      }
      if (value.amountFrom != 0L) {
        errors.add("invalid amount_from for income")
      }
      if (value.amountTo <= 0) {
        errors.add("amount_to is not positive: ${value.amountTo}")
      }
      if (!messageService.isExist(value.categoryId, EntityType.CATEGORY)) {
        errors.add("unknown category [${value.categoryId}]")
      }
    } else if (value.accountIdTo == EMPTY_VALUE) {
      if (!messageService.isExist(value.accountIdFrom, EntityType.ACCOUNT)) {
        errors.add("unknown account_from [${value.accountIdFrom}]")
      }
      if (value.amountFrom <= 0) {
        errors.add("amount_from is not positive: ${value.amountFrom}")
      }
      if (value.amountTo != 0L) {
        errors.add("invalid amount_to for expense")
      }
      if (!messageService.isExist(value.categoryId, EntityType.CATEGORY)) {
        errors.add("unknown category [${value.categoryId}]")
      }
    } else if (value.accountIdFrom > 0 && value.accountIdTo > 0) {
      if (value.accountIdFrom == value.accountIdTo) {
        errors.add("accounts equal each other [${value.accountIdFrom}]")
      }
      if (!messageService.isExist(value.accountIdFrom, EntityType.ACCOUNT)) {
        errors.add("unknown account_from [${value.accountIdFrom}]")
      }
      if (!messageService.isExist(value.accountIdTo, EntityType.ACCOUNT)) {
        errors.add("unknown account_to [${value.accountIdTo}]")
      }
      if (value.amountFrom <= 0) {
        errors.add("amount_from is not positive: ${value.amountFrom}")
      }
      if (value.amountTo <= 0) {
        errors.add("amount_to is not positive: ${value.amountTo}")
      }
      if (value.categoryId != EMPTY_VALUE) {
        errors.add("unknown category for transfer [${value.categoryId}]")
      }
    } else {
      errors.add("unknown accounts")
    }

    if (value.subCategoryId != 0L && !messageService.isExist(value.subCategoryId, EntityType.SUB_CATEGORY)) {
      errors.add("unknown sub_category [${value.subCategoryId}]")
    }
    if (value.familyMemberId != 0L && !messageService.isExist(value.familyMemberId, EntityType.FAMILY_MEMBER)) {
      errors.add("unknown family member [${value.familyMemberId}]")
    }
    return ValidatorResponse(errors)
  }
}
