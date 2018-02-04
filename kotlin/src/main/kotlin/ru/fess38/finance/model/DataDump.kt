package ru.fess38.finance.model

import com.google.gson.Gson
import com.google.gson.annotations.SerializedName
import ru.fess38.finance.util.fromJson
import ru.fess38.finance.util.ungzip

data class DataDump(
    val version: DataVersion = DataVersion(),
    @SerializedName("slice_from")
    val slicefrom: Long = 0,
    val accounts: List<SimpleAccount> = listOf(),
    val currencies: List<SimpleCurrency> = listOf()
) {
  companion object {
    fun fromByteArray(byteDataDump: ByteArray, gson: Gson): DataDump {
      return gson.fromJson(ungzip(byteDataDump))
    }
  }
}

data class DataVersion(
    val account: Long = 0,
    val currency: Long = 0
)
