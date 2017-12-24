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

    @SerializedName("user-id")
    @Column(name = "user_id", updatable = false, nullable = false)
    val userId: Long = 0,

    @SerializedName("is-deleted")
    @Column(name = "is_deleted", nullable = false)
    val isDeleted: Boolean = false,

    @Column(updatable = false, nullable = false)
    val created: LocalDate = LocalDate.now(),

    @Column(nullable = false)
    val modified: Long = System.currentTimeMillis(),

    @Column(columnDefinition = "jsonb", nullable = false)
    @Type(type = "accountProperties")
    val properties: AccountProperties
)

data class AccountProperties(
    val name: String,

    val balance: Long = 0,

    val currency: Currency
)

data class SimpleAccount(
    private val id: Long = 0,

    private val name: String,

    private val balance: Long = 0,

    private val currency: Currency
) {
  fun toAccount() = Account(
      id = this.id,
      properties = AccountProperties(
          name = this.name,
          balance = this.balance,
          currency = this.currency
      )
  )

  companion object {
    fun from(account: Account) = SimpleAccount(
        id = account.id,
        name = account.properties.name,
        balance = account.properties.balance,
        currency = account.properties.currency
    )
  }
}
