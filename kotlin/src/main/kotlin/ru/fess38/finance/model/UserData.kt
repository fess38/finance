package ru.fess38.finance.model

import com.google.gson.Gson
import ru.fess38.finance.util.fromJson
import ru.fess38.finance.util.gunzip

data class UserData(
    val accounts: List<Account> = listOf(),
    val currencies: List<Currency> = listOf()
) {
  companion object {
    fun fromByteArray(data: ByteArray, gson: Gson): UserData = gson.fromJson(gunzip(data))
  }
}
