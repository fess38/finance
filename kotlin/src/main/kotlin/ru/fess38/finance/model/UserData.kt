package ru.fess38.finance.model

import com.google.gson.Gson
import ru.fess38.finance.util.fromJson
import ru.fess38.finance.util.ungzip

data class UserData(
    val accounts: List<SimpleAccount> = listOf(),
    val currencies: List<SimpleCurrency> = listOf()
) {
  fun accountsVersion() = accounts.map {it.modified}.max() ?: 0

  fun currenciesVersion() = currencies.map {it.modified}.max() ?: 0

  companion object {
    fun fromByteArray(data: ByteArray, gson: Gson): UserData {
      return gson.fromJson(ungzip(data))
    }
  }
}
