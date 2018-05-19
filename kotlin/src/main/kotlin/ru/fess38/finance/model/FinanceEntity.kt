package ru.fess38.finance.model

import com.google.protobuf.Message
import ru.fess38.finance.model.Model.Account
import ru.fess38.finance.model.Model.Category
import ru.fess38.finance.model.Model.Dump
import ru.fess38.finance.model.Model.EntityType
import ru.fess38.finance.model.Model.FamilyMember
import ru.fess38.finance.model.Model.SubCategory
import ru.fess38.finance.model.Model.Transaction
import java.io.ByteArrayOutputStream
import java.time.LocalDate
import java.util.zip.GZIPInputStream
import java.util.zip.GZIPOutputStream
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.EnumType
import javax.persistence.Enumerated
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.Index
import javax.persistence.SequenceGenerator
import javax.persistence.Table

@Entity
@Table(schema = "model", name = "entity",
    indexes = [(Index(name = "NIX_id_type_userid", columnList = "id, user_id, type"))])
data class FinanceEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "idseq")
    @SequenceGenerator(name = "idseq", sequenceName = "idseq", allocationSize = 25,
        initialValue = 1000)
    val id: Long = 0,

    @Column(name = "type", nullable = false, updatable = false)
    @Enumerated(EnumType.STRING)
    val type: EntityType,

    @Column(name = "user_id", nullable = false, updatable = false)
    val userId: Long = 0,

    @Column(nullable = false, updatable = false)
    val created: LocalDate = LocalDate.now(),

    @Column(nullable = false)
    val modified: Long = System.currentTimeMillis(),

    @Column(name = "data", columnDefinition = "bytea", nullable = false)
    val data: ByteArray
) {
  companion object {
    fun from(message: Message, userId: Long): FinanceEntity {
      val id: Long
      val entityType: EntityType

      when (message) {
        is Dump -> {
          id = message.id
          entityType = EntityType.DUMP
        }
        is Account -> {
          id = message.id
          entityType = EntityType.ACCOUNT
        }
        is Category -> {
          id = message.id
          entityType = EntityType.CATEGORY
        }
        is SubCategory -> {
          id = message.id
          entityType = EntityType.SUB_CATEGORY
        }
        is FamilyMember -> {
          id = message.id
          entityType = EntityType.FAMILY_MEMBER
        }
        is Transaction -> {
          id = message.id
          entityType = EntityType.TRANSACTION
        }
        else -> throw IllegalArgumentException("Unknown entity: $message")
      }
      return FinanceEntity(
          id = id,
          type = entityType,
          userId = userId,
          modified = System.currentTimeMillis(),
          data = gzip(message)
      )
    }

    private fun gzip(message: Message): ByteArray {
      return ByteArrayOutputStream()
          .also {GZIPOutputStream(it).apply {write(message.toByteArray())}.apply {close()}}
          .apply {close()}
          .toByteArray()
    }

  }

  fun toMessage(): Message {
    when (type) {
      EntityType.DUMP -> {
        return Dump.parseFrom(gunzip(data)).toBuilder().setId(id).build()
      }
      EntityType.ACCOUNT -> {
        return Account.parseFrom(gunzip(data)).toBuilder().setId(id).build()
      }
      EntityType.CATEGORY -> {
        return Category.parseFrom(gunzip(data)).toBuilder().setId(id).build()
      }
      EntityType.SUB_CATEGORY -> {
        return SubCategory.parseFrom(gunzip(data)).toBuilder().setId(id).build()
      }
      EntityType.FAMILY_MEMBER -> {
        return FamilyMember.parseFrom(gunzip(data)).toBuilder().setId(id).build()
      }
      EntityType.TRANSACTION -> {
        return Transaction.parseFrom(gunzip(data)).toBuilder().setId(id).build()
      }
      else -> throw IllegalArgumentException("Unknown type: $type")
    }
  }

  private fun gunzip(value: ByteArray): ByteArray {
    return GZIPInputStream(value.inputStream()).readBytes()
  }
}
