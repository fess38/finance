package ru.fess38.finance.util

import com.google.gson.GsonBuilder
import com.google.gson.JsonPrimitive
import org.junit.Assert
import org.junit.Test
import java.time.LocalDate

class LocalDateConverterTest {
  private val gson = GsonBuilder()
      .registerTypeAdapter(LocalDate::class.java, LocalDateConverter())
      .create()

  @Test
  fun serialize() {
    val expected = "\"2016-02-29\""
    val actual = gson.toJson(LocalDate.of(2016, 2, 29))
    Assert.assertEquals(expected, actual)
  }

  @Test
  fun deserialize() {
    val expected = LocalDate.of(2016, 2, 29)
    val actual = gson.fromJson(JsonPrimitive("\"2016-02-29\""), LocalDate::class.java)
    Assert.assertEquals(expected, actual)
  }

  @Test
  fun deserializeFulldate() {
    val expected = LocalDate.of(2016, 3, 1)
    val actual = gson.fromJson(JsonPrimitive("\"2016-02-29T22:19:13.632Z\""), LocalDate::class.java)
    Assert.assertEquals(expected, actual)
  }
}

