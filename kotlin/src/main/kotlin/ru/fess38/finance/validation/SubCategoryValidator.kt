package ru.fess38.finance.validation

import ru.fess38.finance.core.MessageService
import ru.fess38.finance.core.Model.EntityType.SUB_CATEGORY
import ru.fess38.finance.core.Model.SubCategory

class SubCategoryValidator(private val messageService: MessageService): MessageValidator<SubCategory> {
  override fun validate(value: SubCategory): ValidatorResponse {
    var isValid = true
    val errors = mutableListOf<String>()

    if (!messageService.isExist(value.categoryId, SUB_CATEGORY)) {
      isValid = false
      errors.add("unknown category [${value.categoryId}]")
    }
    if (isValid) {
      errors.add("ok")
    }
    return ValidatorResponse(isValid, errors)
  }
}
