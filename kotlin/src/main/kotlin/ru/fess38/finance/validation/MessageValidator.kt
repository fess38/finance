package ru.fess38.finance.validation

import com.google.protobuf.Message
import ru.fess38.finance.core.MessageService
import ru.fess38.finance.core.Model.*
import java.time.LocalDate

interface MessageValidator<T : Message> {
  fun validate(value: T, isCreate: Boolean = true): ValidatorResponse
}

class AccountValidator(private val messageService: MessageService) : MessageValidator<Account> {
  override fun validate(value: Account, isCreate: Boolean): ValidatorResponse {
    val errors = mutableListOf<String>()

    if (!messageService.isExist(value.currencyId, EntityType.CURRENCY)) {
      errors.add("unknown currency [${value.currencyId}]")
    }
    return ValidatorResponse(errors)
  }
}

class CategoryValidator : MessageValidator<Category> {
  override fun validate(value: Category, isCreate: Boolean): ValidatorResponse {
    val errors = mutableListOf<String>()

    if (value.isIncome == value.isExpense) {
      val isIncome = value.isIncome
      val isExpense = value.isExpense
      errors.add("unknown category state: is_income=$isIncome, is_expense=$isExpense")
    }
    return ValidatorResponse(errors)
  }
}

class FamilyMemberValidator : MessageValidator<FamilyMember> {
  override fun validate(value: FamilyMember, isCreate: Boolean): ValidatorResponse {
    val errors = mutableListOf<String>()
    return ValidatorResponse(errors)
  }
}

class NotepadValidator : MessageValidator<Notepad> {
  override fun validate(value: Notepad, isCreate: Boolean): ValidatorResponse {
    val errors = mutableListOf<String>()
    return ValidatorResponse(errors)
  }
}

class NoteValidator(private val messageService: MessageService) : MessageValidator<Note> {
  override fun validate(value: Note, isCreate: Boolean): ValidatorResponse {
    val errors = mutableListOf<String>()

    if (!messageService.isExist(value.notepadId, EntityType.NOTEPAD)) {
      errors.add("unknown notepad [${value.notepadId}]")
    }

    return ValidatorResponse(errors)
  }
}

class SecurityTransactionValidator(private val messageService: MessageService) :
  MessageValidator<SecurityTransaction> {
  override fun validate(value: SecurityTransaction, isCreate: Boolean): ValidatorResponse {
    val errors = mutableListOf<String>()

    try {
      LocalDate.parse(value.date)
    } catch (e: Exception) {
      errors.add("invalid transaction date [${value.date}]")
    }

    if (!messageService.isExist(value.securityId, EntityType.SECURITY)) {
      errors.add("unknown security [${value.securityId}]")
    }

    if (!(value.price.units > 0 || value.price.micros > 0)) {
      errors.add("invalid price [${value.price.units} ${value.price.micros}]")
    }

    if (!(value.exchangeRate.units > 0 || value.exchangeRate.micros > 0)) {
      errors.add("invalid exchange rate [${value.exchangeRate.units} ${value.exchangeRate.micros}]")
    }

    if (value.amount <= 0) {
      errors.add("invalid amount [${value.amount}]")
    }

    if (value.purchaseFee.units < 0 || value.purchaseFee.micros < 0) {
      errors.add("invalid purchase fee [${value.purchaseFee.units} ${value.purchaseFee.micros}]")
    }

    return ValidatorResponse(errors)
  }
}

class SecurityValidator(private val messageService: MessageService) : MessageValidator<Security> {
  override fun validate(value: Security, isCreate: Boolean): ValidatorResponse {
    val errors = mutableListOf<String>()

    if (!messageService.isExist(value.currencyId, EntityType.CURRENCY)) {
      errors.add("unknown currency [${value.currencyId}]")
    }

    if (!(value.price.units > 0 || value.price.micros > 0)) {
      errors.add("invalid price [${value.price.units} ${value.price.micros}]")
    }

    if (!(value.exchangeRate.units > 0 || value.exchangeRate.micros > 0)) {
      errors.add("invalid exchange rate [${value.exchangeRate.units} ${value.exchangeRate.micros}]")
    }

    return ValidatorResponse(errors)
  }
}

class SettingsValidator(private val messageService: MessageService) : MessageValidator<Settings> {
  override fun validate(value: Settings, isCreate: Boolean): ValidatorResponse {
    val errors = mutableListOf<String>()

    if (!messageService.isExist(value.currencyId, EntityType.CURRENCY)) {
      errors.add("unknown currency [${value.currencyId}]")
    }
    return ValidatorResponse(errors)
  }
}

class SubCategoryValidator(private val messageService: MessageService) :
  MessageValidator<SubCategory> {
  override fun validate(value: SubCategory, isCreate: Boolean): ValidatorResponse {
    val errors = mutableListOf<String>()

    if (!messageService.isExist(value.categoryId, EntityType.CATEGORY)) {
      errors.add("unknown category [${value.categoryId}]")
    }
    return ValidatorResponse(errors)
  }
}

class TransactionTemplateValidator : MessageValidator<TransactionTemplate> {
  override fun validate(value: TransactionTemplate, isCreate: Boolean): ValidatorResponse {
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

class TransactionValidator(private val messageService: MessageService) : MessageValidator<Transaction> {
  private val EMPTY_VALUE: Long = -1

  override fun validate(value: Transaction, isCreate: Boolean): ValidatorResponse {
    val errors = mutableListOf<String>()

    try {
      LocalDate.parse(value.created)
    } catch (e: Exception) {
      errors.add("invalid creation date [${value.created}]")
    }

    val type: Transaction.Type = transactionType(value)
    if (type == Transaction.Type.INCOME) {
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
    } else if (type == Transaction.Type.EXPENSE) {
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
    } else if (type == Transaction.Type.TRANSFER) {
      if (!messageService.isExist(value.accountIdFrom, EntityType.ACCOUNT)) {
        errors.add("unknown account_from [${value.accountIdFrom}]")
      }
      if (!messageService.isExist(value.accountIdTo, EntityType.ACCOUNT)) {
        errors.add("unknown account_to [${value.accountIdTo}]")
      }
      if (value.amountFrom < 0) {
        errors.add("amount_from is not positive: ${value.amountFrom}")
      }
      if (value.amountTo < 0) {
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

  fun transactionType(transaction: Transaction): Transaction.Type {
    var type: Transaction.Type = Transaction.Type.UNDEFINED
    if (transaction.accountIdFrom == EMPTY_VALUE) {
      type = Transaction.Type.INCOME
    } else if (transaction.accountIdTo == EMPTY_VALUE) {
      type = Transaction.Type.EXPENSE
    } else if (transaction.accountIdFrom > 0 && transaction.accountIdTo > 0) {
      type = Transaction.Type.TRANSFER
    }
    return type
  }
}
