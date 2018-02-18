package ru.fess38.finance.model

data class Account(
    val id: Long,
    val name: String,
    val balance: Long,
    val currencyId: Long,
    val transactionAmount: Long
)
