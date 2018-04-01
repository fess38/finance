package ru.fess38.finance

import com.google.protobuf.Message
import ru.fess38.finance.model.Model.Account
import ru.fess38.finance.model.Model.Category
import ru.fess38.finance.model.Model.FamilyMember
import ru.fess38.finance.model.Model.SubCategory
import ru.fess38.finance.model.Model.Transaction

class InputValuesValidator {
  fun isValid(value: Message, oldValue: Message? = null): Boolean {
    return when (value) {
      is Account -> isValid(value, oldValue)
      is Category -> isValid(value, oldValue)
      is SubCategory -> isValid(value, oldValue)
      is FamilyMember -> isValid(value, oldValue)
      is Transaction -> isValid(value, oldValue)
      else -> throw IllegalArgumentException("Unknown entity $value")
    }
  }

  private fun isValid(value: Account, oldValue: Message? = null): Boolean {
    var isValid = true

    if (isEmptyName(value.name)) {
      isValid = false
    }
    if (isInvalidUpdate(value.id, oldValue)) {
      isValid = false
    }
    if (!AppConfiguration.CURRENCIES.map {it.id}.contains(value.currencyId)) {
      isValid = false
    }
    return isValid
  }

  private fun isValid(value: Category, oldValue: Message? = null): Boolean {
    var isValid = true

    if (isEmptyName(value.name)) {
      isValid = false
    }
    if (isInvalidUpdate(value.id, oldValue)) {
      isValid = false
    }
    return isValid
  }

  private fun isValid(value: SubCategory, oldValue: Message? = null): Boolean {
    var isValid = true

    if (isEmptyName(value.name)) {
      isValid = false
    }
    if (isInvalidUpdate(value.id, oldValue)) {
      isValid = false
    }
    if (value.categoryId <= 0L) {
      isValid = false;
    }
    return isValid
  }

  private fun isValid(value: FamilyMember, oldValue: Message? = null): Boolean {
    var isValid = true

    if (isEmptyName(value.name)) {
      isValid = false
    }
    if (isInvalidUpdate(value.id, oldValue)) {
      isValid = false
    }
    return isValid
  }

  private fun isValid(value: Transaction, oldValue: Message? = null): Boolean {
    var isValid = true

    if (isInvalidUpdate(value.id, oldValue)) {
      isValid = false
    }
    if (value.accountIdFrom <= 0L || value.accountIdTo <= 0L) {
      isValid = false
    }
    if (value.amountFrom < 0 || value.amountTo < 0) {
      isValid = false
    }
    if (value.categoryId <= 0L || value.subCategoryId < 0L || value.familyMemberId < 0L) {
      isValid = false
    }
    return isValid
  }

  private fun isEmptyName(name: String): Boolean {
    return name.trim().isEmpty()
  }

  private fun isInvalidUpdate(id: Long, oldValue: Message?): Boolean {
    return (id == 0L && oldValue != null) || (id != 0L && oldValue == null)
  }
}
