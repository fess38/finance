package ru.fess38.finance.validation

import org.junit.Assert
import org.junit.Test
import ru.fess38.finance.core.Model.FamilyMember

internal class FamilyMemberValidatorTest {
  private val validator = FamilyMemberValidator()

  @Test
  fun valid() {
    val familyMember = FamilyMember.newBuilder()
        .setName("name")
        .build()
    val expected = ValidatorResponse()
    val actual = validator.validate(familyMember)
    Assert.assertEquals(expected, actual)
  }
}
