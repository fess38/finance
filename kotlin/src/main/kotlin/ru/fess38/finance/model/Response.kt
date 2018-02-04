package ru.fess38.finance.model

import com.google.gson.annotations.SerializedName

data class Response(
    val success: Boolean,
    @SerializedName("error_code")
    val errorCode: Long? = null,
    val message: String? = null
) {
  companion object {
    fun success() = Response(success = true)
  }
}
