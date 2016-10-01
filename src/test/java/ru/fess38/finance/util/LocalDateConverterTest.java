package ru.fess38.finance.util;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonPrimitive;
import org.junit.Assert;
import org.junit.Test;

import java.time.LocalDate;

public class LocalDateConverterTest {
  private final Gson gson = new GsonBuilder()
      .registerTypeAdapter(LocalDate.class, new LocalDateConverter())
      .create();

  @Test
  public void serialize() throws Exception {
    String expected = "\"2016-02-29\"";
    String actual = gson.toJson(LocalDate.of(2016, 2, 29));
    Assert.assertEquals(expected, actual);
  }

  @Test
  public void deserialize() throws Exception {
    LocalDate expected = LocalDate.of(2016, 2, 29);
    LocalDate actual = gson.fromJson(new JsonPrimitive("\"2016-02-29\""), LocalDate.class);
    Assert.assertEquals(expected, actual);
  }

  @Test
  public void deserializeFulldate() throws Exception {
    LocalDate expected = LocalDate.of(2016, 2, 29);
    LocalDate actual = gson.fromJson(new JsonPrimitive("\"2016-02-29T09:19:13.632Z\""), LocalDate
        .class);
    Assert.assertEquals(expected, actual);
  }
}
