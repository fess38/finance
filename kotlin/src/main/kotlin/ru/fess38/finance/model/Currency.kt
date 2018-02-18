package ru.fess38.finance.model

import com.google.gson.annotations.SerializedName

data class Currency(
    val id: Long,
    @SerializedName(value = "nameRu", alternate = ["name_ru"])
    val nameRu: String,
    @SerializedName(value = "nameEn", alternate = ["name_en"])
    val nameEn: String,
    val symbol: String,
    val code: String
)
