package ru.fess38.finance.model

import com.google.gson.annotations.SerializedName
import org.hibernate.annotations.Type
import org.hibernate.annotations.TypeDef
import org.hibernate.annotations.TypeDefs
import ru.fess38.finance.util.LangString
import ru.fess38.finance.util.ListLangStringType
import java.time.LocalDate
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.SequenceGenerator
import javax.persistence.Table

@Entity
@Table(schema = "model", name = "currency")
@TypeDefs(TypeDef(name = "listLangString", typeClass = ListLangStringType::class))
data class Currency(
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "idseq")
    @SequenceGenerator(name = "idseq", sequenceName = "idseq")
    val id: Long = 0,

    @SerializedName("is_deleted")
    @Column(name = "is_deleted", nullable = false)
    val isDeleted: Boolean = false,

    @Column(updatable = false, nullable = false)
    val created: LocalDate = LocalDate.now(),

    @Column(nullable = false)
    val modified: Long = System.currentTimeMillis(),

    @Column(columnDefinition = "jsonb", nullable = false)
    @Type(type = "listLangString")
    val names: List<LangString> = listOf(),

    @Column(columnDefinition = "varchar(1)", nullable = false)
    val symbol: String,

    @Column(columnDefinition = "varchar(3)", nullable = false)
    val code: String
) {
  fun toSimpleCurrency() = SimpleCurrency(
      id = this.id,
      modified = this.modified,
      nameRu = this.names[0].value,
      nameEn = this.names[1].value,
      symbol = this.symbol,
      code = this.code
  )
}

data class SimpleCurrency(
    val id: Long = 0,
    val modified: Long = 0,
    @SerializedName("name_ru")
    val nameRu: String,
    @SerializedName("name_en")
    val nameEn: String,
    val symbol: String,
    val code: String
)
