package ru.fess38.finance.model

import com.google.protobuf.Message
import ru.fess38.finance.model.Model.Account
import ru.fess38.finance.model.Model.Dump
import ru.fess38.finance.util.gunzip
import ru.fess38.finance.util.gzip
import java.time.LocalDate
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.EnumType
import javax.persistence.Enumerated
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.SequenceGenerator
import javax.persistence.Table

@Entity
@Table(schema = "model", name = "entity")
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

    @Column(name = "is_deleted", nullable = false)
    val isDeleted: Boolean = false,

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
        is Account -> {
          id = message.id
          entityType = EntityType.ACCOUNT
        }
        is Dump -> {
          id = message.id
          entityType = EntityType.DUMP
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
  }

  fun toDump(): Dump {
    return Dump.parseFrom(gunzip(data)).toBuilder().setId(id).build()
  }

  fun toAccount(): Account {
    return Account.parseFrom(gunzip(data)).toBuilder().setId(id).build()
  }
}

enum class EntityType {
  DUMP,
  ACCOUNT
}
