package ru.fess38.finance.model

import com.google.gson.annotations.SerializedName

data class Currency(
    val id: Long,
    @SerializedName("name_ru")
    val nameRu: String,
    @SerializedName("name_en")
    val nameEn: String,
    val symbol: String,
    val code: String
)
