package ru.fess38.finance.utils

import com.google.protobuf.Descriptors.FieldDescriptor
import com.google.protobuf.Message
import ru.fess38.finance.core.Model.Account
import ru.fess38.finance.core.Model.Category
import ru.fess38.finance.core.Model.EntityType
import ru.fess38.finance.core.Model.EntityType.ACCOUNT
import ru.fess38.finance.core.Model.EntityType.CATEGORY
import ru.fess38.finance.core.Model.EntityType.FAMILY_MEMBER
import ru.fess38.finance.core.Model.EntityType.SUB_CATEGORY
import ru.fess38.finance.core.Model.EntityType.TRANSACTION
import ru.fess38.finance.core.Model.FamilyMember
import ru.fess38.finance.core.Model.SubCategory
import ru.fess38.finance.core.Model.Transaction

private val Message.idField: FieldDescriptor
  get() = this.descriptorForType.findFieldByName("id")!!

fun Message.withId(id: Long) = this.toBuilder().setField(this.idField, id).build()!!

val Message.id: Long
  get() = this.getField(this.idField) as Long

val Message.type: EntityType
  get() = when (this) {
    is Account -> ACCOUNT
    is Category -> CATEGORY
    is SubCategory -> SUB_CATEGORY
    is FamilyMember -> FAMILY_MEMBER
    is Transaction -> TRANSACTION
    else -> throw IllegalArgumentException("Unknown entity: $this")
  }

