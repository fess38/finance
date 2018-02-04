package ru.fess38.finance.util

import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import com.typesafe.config.Config
import org.hibernate.Session
import org.hibernate.SessionFactory
import org.hibernate.criterion.DetachedCriteria
import java.io.ByteArrayOutputStream
import java.util.Properties
import java.util.zip.GZIPInputStream
import java.util.zip.GZIPOutputStream

fun Config.toProperties(): Properties {
  val properties = Properties()
  this.entrySet().forEach {properties[it.key] = it.value.unwrapped()}
  return properties
}

inline fun <reified T> Gson.fromJson(json: String): T {
  return this.fromJson<T>(json, object: TypeToken<T>() {}.type)
}

inline fun <reified T> SessionFactory.list(criteria: DetachedCriteria,
                                           session: Session = this.currentSession): List<T> {
  return criteria.getExecutableCriteria(session).list() as List<T>
}

fun gzip(value: String): ByteArray {
  val bos = ByteArrayOutputStream()
  GZIPOutputStream(bos).bufferedWriter().use {it.write(value)}
  return bos.toByteArray()
}

fun ungzip(value: ByteArray): String {
  return GZIPInputStream(value.inputStream()).bufferedReader().use {it.readText()}
}
