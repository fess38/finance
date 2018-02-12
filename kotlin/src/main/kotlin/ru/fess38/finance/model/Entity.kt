package ru.fess38.finance.model

import com.google.gson.Gson
import com.google.gson.annotations.SerializedName
import ru.fess38.finance.util.fromJson
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

    @Column(name = "type", updatable = false, nullable = false)
    @Enumerated(EnumType.STRING)
    val type: EntityType,

    @SerializedName("user_id")
    @Column(name = "user_id", updatable = false, nullable = false)
    val userId: Long = 0,

    @SerializedName("is_deleted")
    @Column(name = "is_deleted", nullable = false)
    val isDeleted: Boolean = false,

    @Column(updatable = false, nullable = false)
    val created: LocalDate = LocalDate.now(),

    @Column(nullable = false)
    val modified: Long = System.currentTimeMillis(),

    @Column(name = "data", nullable = false, columnDefinition = "bytea")
    val data: ByteArray = gzip("{}")
) {
  fun toAccount(gson: Gson) = gson.fromJson<Account>(gunzip(data)).copy(id = id)
}

enum class EntityType {
  ACCOUNT
}
