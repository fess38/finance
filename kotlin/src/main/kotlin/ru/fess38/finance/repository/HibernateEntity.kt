package ru.fess38.finance.repository

import com.google.protobuf.Message
import ru.fess38.finance.core.Model.EntityType
import ru.fess38.finance.security.User
import ru.fess38.finance.utils.id
import ru.fess38.finance.utils.type
import java.io.ByteArrayOutputStream
import java.time.LocalDate
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
data class HibernateEntity(
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
    fun from(message: Message, user: User): HibernateEntity {
      return HibernateEntity(
          id = message.id,
          type = message.type,
          userId = user.id,
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
}
