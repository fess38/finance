package ru.fess38.finance.util

import com.google.gson.JsonDeserializationContext
import com.google.gson.JsonDeserializer
import com.google.gson.JsonElement
import com.google.gson.JsonPrimitive
import com.google.gson.JsonSerializationContext
import com.google.gson.JsonSerializer
import java.lang.reflect.Type
import java.time.Instant
import java.time.LocalDate
import java.time.ZoneId
import java.time.format.DateTimeFormatter

class LocalDateConverter: JsonSerializer<LocalDate>, JsonDeserializer<LocalDate> {
  override fun serialize(src: LocalDate, typeOfSrc: Type,
                         context: JsonSerializationContext): JsonElement {
    return JsonPrimitive(DateTimeFormatter.ISO_LOCAL_DATE.format(src))
  }

  override fun deserialize(json: JsonElement, typeOfT: Type,
                           context: JsonDeserializationContext): LocalDate {
    val result: LocalDate
    val jsonString = json.asString.replace("\"", "")
    if (jsonString.contains("T")) {
      result = Instant.parse(jsonString).atZone(ZoneId.systemDefault()).toLocalDate()
    } else {
      result = LocalDate.parse(jsonString, DateTimeFormatter.ofPattern("yyyy-MM-dd"))
    }
    return result
  }
}
