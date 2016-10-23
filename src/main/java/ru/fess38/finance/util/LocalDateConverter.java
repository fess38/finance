package ru.fess38.finance.util;

import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonPrimitive;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

import java.lang.reflect.Type;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

public class LocalDateConverter implements JsonSerializer<LocalDate>, JsonDeserializer<LocalDate> {
  @Override
  public JsonElement serialize(LocalDate src, Type typeOfSrc, JsonSerializationContext context) {
    return new JsonPrimitive(DateTimeFormatter.ISO_LOCAL_DATE.format(src));
  }

  @Override
  public LocalDate deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context) {
    LocalDate result = null;
    String jsonString = json.getAsString().replace("\"", "");
    if (jsonString.contains("T")) {
      result = Instant.parse(jsonString).atZone(ZoneId.systemDefault()).toLocalDate();
    } else {
      result = LocalDate.parse(jsonString, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
    }
    return result;
  }
}
