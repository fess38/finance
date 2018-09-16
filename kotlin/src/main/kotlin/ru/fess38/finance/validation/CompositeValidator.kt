package ru.fess38.finance.validation

import com.google.protobuf.Message
import ru.fess38.finance.core.MessageService
import ru.fess38.finance.core.Model.Account
import ru.fess38.finance.core.Model.Category
import ru.fess38.finance.core.Model.FamilyMember
import ru.fess38.finance.core.Model.Settings
import ru.fess38.finance.core.Model.SubCategory
import ru.fess38.finance.core.Model.Transaction
import ru.fess38.finance.utils.id
import ru.fess38.finance.utils.type

class CompositeValidator(private val messageService: MessageService): MessageValidator<Message> {
  private val settingsValidator = SettingsValidator(messageService)
  private val accountValidator = AccountValidator(messageService)
  private val categoryValidator = CategoryValidator()
  private val subCategoryValidator = SubCategoryValidator(messageService)
  private val familyMemberValidator = FamilyMemberValidator()
  private val transactionValidator = TransactionValidator(messageService)

  override fun validate(value: Message): ValidatorResponse {
    val validatorResponse: ValidatorResponse

    if (value.id != 0L && !messageService.isExist(value.id, value.type)) {
      val error = "try to update uknown [${value.type}] with id [${value.id}]"
      validatorResponse = ValidatorResponse(false, error)
    }
    else {
      validatorResponse = when (value) {
        is Settings -> settingsValidator.validate(value)
        is Account -> accountValidator.validate(value)
        is Category -> categoryValidator.validate(value)
        is SubCategory -> subCategoryValidator.validate(value)
        is FamilyMember -> familyMemberValidator.validate(value)
        is Transaction -> transactionValidator.validate(value)
        else -> throw IllegalArgumentException("Unknown entity $value")
      }
    }
    return validatorResponse
  }
}
