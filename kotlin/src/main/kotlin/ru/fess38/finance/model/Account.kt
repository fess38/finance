package ru.fess38.finance.model

import com.google.gson.annotations.SerializedName
import org.hibernate.annotations.Type
import org.hibernate.annotations.TypeDef
import org.hibernate.annotations.TypeDefs
import ru.fess38.finance.util.AccountPropertiesType
import java.time.LocalDate
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.SequenceGenerator
import javax.persistence.Table

@Entity
@Table(schema = "model", name = "account")
@TypeDefs(TypeDef(name = "accountProperties", typeClass = AccountPropertiesType::class))
data class Account(
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "idseq")
    @SequenceGenerator(name = "idseq", sequenceName = "idseq")
    val id: Long = 0,

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

    @Column(columnDefinition = "jsonb", nullable = false)
    @Type(type = "accountProperties")
    val properties: AccountProperties
) {
  fun toSimpleAccount(currencies: List<Currency>) = SimpleAccount(
      id = this.id,
      modified = this.modified,
      name = this.properties.name,
      balance = this.properties.balance,
      currency = currencies.first {it.id == this.properties.currencyId}.toSimpleCurrency()
  )
}

data class AccountProperties(
    val name: String,
    val balance: Long = 0,
    @SerializedName("currency_id")
    val currencyId: Long
)

data class SimpleAccount(
    val id: Long = 0,
    val modified: Long = 0,
    val name: String,
    val balance: Long = 0,
    val currency: SimpleCurrency
) {
  fun toAccount() = Account(
      id = this.id,
      modified = this.modified,
      properties = AccountProperties(
          name = this.name,
          balance = this.balance,
          currencyId = this.currency.id
      )
  )
}
