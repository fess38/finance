package ru.fess38.finance.utils

import com.google.protobuf.Descriptors.FieldDescriptor
import com.google.protobuf.Message
import ru.fess38.finance.core.Model.*
import ru.fess38.finance.core.Model.EntityType.*

private val Message.idField: FieldDescriptor
  get() = this.descriptorForType.findFieldByName("id")!!

fun Message.withId(id: Long) = this.toBuilder().setField(this.idField, id).build()!!

val Message.id: Long
  get() = this.getField(this.idField) as Long

val Message.type: EntityType
  get() = when (this) {
    is Settings -> SETTINGS
    is Account -> ACCOUNT
    is Category -> CATEGORY
    is SubCategory -> SUB_CATEGORY
    is FamilyMember -> FAMILY_MEMBER
    is Transaction -> TRANSACTION
    is TransactionTemplate -> TRANSACTION_TEMPLATE
    // new entity
    else -> throw IllegalArgumentException("Unknown entity: $this")
  }

val Message.isDeleted: Boolean
  get() = when (this) {
    is Settings -> false
    is Account -> this.isDeleted
    is Category -> this.isDeleted
    is SubCategory -> this.isDeleted
    is FamilyMember -> this.isDeleted
    is Transaction -> this.isDeleted
    is TransactionTemplate -> this.isDeleted
    // new entity
    else -> throw IllegalArgumentException("Unknown entity: $this")
  }

fun createTextHolder(value: String = "") = TextHolder.newBuilder().setValue(value).build()!!
