package ru.fess38.finance.validator

import ru.fess38.finance.model.Model.FamilyMember

class FamilyMamberValidator {
  fun isValid(familyMemberNew: FamilyMember, familyMemberOld: FamilyMember? = null): Boolean {
    var isValid = true

    if (familyMemberNew.name.trim().isEmpty()) {
      isValid = false
    }

    if (familyMemberNew.id != 0L && familyMemberOld == null) {
      isValid = false
    }
    return isValid
  }
}
