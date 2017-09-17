package ru.fess38.finance.model

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.EnumType
import javax.persistence.Enumerated
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.ManyToOne
import javax.persistence.SequenceGenerator
import javax.persistence.Table

@Entity
@Table(schema = "model", name = "account")
data class Account(
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "idseq")
    @SequenceGenerator(name = "idseq", sequenceName = "idseq")
    val id: Long = 0,

    // TODO: create foreign key
    @Column(name = "user_id", updatable = false, nullable = false)
    val userId: Long = 0,

    @Column(name = "is_deleted", nullable = false)
    val isDeleted: Boolean = false,

    @Column(updatable = false, nullable = false)
    val created: Long = System.currentTimeMillis(),

    @Column(nullable = false)
    val updated: Long = System.currentTimeMillis(),

    @Column(columnDefinition = "TEXT", nullable = false)
    val name: String = "Noname account",

    @Column(updatable = false, nullable = false, length = 20)
    @Enumerated(EnumType.STRING)
    val type: AccountType = AccountType.DEFAULT,

    @Column(nullable = false)
    val balance: Long = 0,

    @ManyToOne(fetch = FetchType.EAGER, targetEntity = Currency::class, optional = false)
    @JoinColumn(name = "currency_id", updatable = false, nullable = false)
    val currency: Currency
) {
  fun addMoney(value: Long): Account {
    return this.copy(balance = balance + value)
  }

  fun delete() = this.copy(isDeleted = true)
}

enum class AccountType {
  DEFAULT
}
