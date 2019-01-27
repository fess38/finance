package ru.fess38.finance.validation

import ru.fess38.finance.core.Model.FamilyMember

class FamilyMemberValidator: MessageValidator<FamilyMember> {
  override fun validate(value: FamilyMember): ValidatorResponse {
    val errors = mutableListOf<String>()
    return ValidatorResponse(errors)
  }
}
