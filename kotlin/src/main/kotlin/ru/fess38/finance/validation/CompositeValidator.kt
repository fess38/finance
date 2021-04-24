package ru.fess38.finance.validation

import com.google.protobuf.Message
import ru.fess38.finance.core.MessageService
import ru.fess38.finance.core.Model.*
import ru.fess38.finance.utils.id
import ru.fess38.finance.utils.type

class CompositeValidator(private val messageService: MessageService): MessageValidator<Message> {
  private val settingsValidator = SettingsValidator(messageService)
  private val accountValidator = AccountValidator(messageService)
  private val categoryValidator = CategoryValidator()
  private val subCategoryValidator = SubCategoryValidator(messageService)
  private val familyMemberValidator = FamilyMemberValidator()
  private val transactionValidator = TransactionValidator(messageService)
  private val transactionTemplateValidator = TransactionTemplateValidator()

  override fun validate(value: Message): ValidatorResponse {
    val validatorResponse: ValidatorResponse

    if (value.id != 0L && !messageService.isExist(value.id, value.type)) {
      val error = "try to update unknown [${value.type}] with id [${value.id}]"
      validatorResponse = ValidatorResponse(error)
    } else {
      validatorResponse = when (value) {
        is Settings -> settingsValidator.validate(value)
        is Account -> accountValidator.validate(value)
        is Category -> categoryValidator.validate(value)
        is SubCategory -> subCategoryValidator.validate(value)
        is FamilyMember -> familyMemberValidator.validate(value)
        is Transaction -> transactionValidator.validate(value)
        is TransactionTemplate -> {
          ValidatorResponse(transactionTemplateValidator.validate(value).errors
              + transactionValidator.validate(value.transaction).errors)
        }
        // new entity
        else -> throw IllegalArgumentException("Unknown entity $value")
      }
    }
    return validatorResponse
  }
}
