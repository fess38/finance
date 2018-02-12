package ru.fess38.finance.model

import com.google.gson.annotations.SerializedName

data class Account(
    val id: Long,
    val name: String,
    val balance: Long,
    @SerializedName("currency_id")
    val currencyId: Long
)
