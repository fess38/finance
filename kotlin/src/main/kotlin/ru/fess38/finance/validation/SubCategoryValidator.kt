package ru.fess38.finance.validation

import ru.fess38.finance.core.MessageService
import ru.fess38.finance.core.Model.EntityType
import ru.fess38.finance.core.Model.SubCategory

class SubCategoryValidator(private val messageService: MessageService):
    MessageValidator<SubCategory> {
  override fun validate(value: SubCategory): ValidatorResponse {
    val errors = mutableListOf<String>()

    if (!messageService.isExist(value.categoryId, EntityType.CATEGORY)) {
      errors.add("unknown category [${value.categoryId}]")
    }
    return ValidatorResponse(errors)
  }
}
