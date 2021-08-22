package ru.fess38.finance.validation

import com.google.protobuf.Message
import ru.fess38.finance.core.MessageService
import ru.fess38.finance.core.Model.*
import ru.fess38.finance.utils.id
import ru.fess38.finance.utils.type

class CompositeValidator(private val messageService: MessageService) : MessageValidator<Message> {
  private val settingsValidator = SettingsValidator(messageService)
  private val accountValidator = AccountValidator(messageService)
  private val categoryValidator = CategoryValidator()
  private val subCategoryValidator = SubCategoryValidator(messageService)
  private val familyMemberValidator = FamilyMemberValidator()
  private val transactionValidator = TransactionValidator(messageService)
  private val transactionTemplateValidator = TransactionTemplateValidator()
  private val securityValidator = SecurityValidator(messageService)
  private val securityTransactionValidator = SecurityTransactionValidator(messageService)

  override fun validate(value: Message, isCreate: Boolean): ValidatorResponse {
    val validatorResponse: ValidatorResponse
    val isExist = messageService.isExist(value.id, value.type)
    if (value.id == 0L) {
      validatorResponse = ValidatorResponse("try to store [${value.type}] without id")
    } else if (isCreate && isExist) {
      validatorResponse = ValidatorResponse("try to save already existed [${value.type}] with id [${value.id}]")
    } else if (!isCreate && !isExist) {
      validatorResponse = ValidatorResponse("try to update unknown [${value.type}] with id [${value.id}]")
    } else {
      validatorResponse = when (value) {
        is Settings -> settingsValidator.validate(value, isCreate)
        is Account -> accountValidator.validate(value, isCreate)
        is Category -> categoryValidator.validate(value, isCreate)
        is SubCategory -> subCategoryValidator.validate(value, isCreate)
        is FamilyMember -> familyMemberValidator.validate(value, isCreate)
        is Transaction -> transactionValidator.validate(value, isCreate)
        is TransactionTemplate -> {
          ValidatorResponse(
            transactionTemplateValidator.validate(value, isCreate).errors
                + transactionValidator.validate(value.transaction, isCreate).errors
          )
        }
        is Security -> securityValidator.validate(value, isCreate)
        is SecurityTransaction -> securityTransactionValidator.validate(value, isCreate)
        // new entity
        else -> throw IllegalArgumentException("Unknown entity $value")
      }
    }
    return validatorResponse
  }
}
