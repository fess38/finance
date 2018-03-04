package ru.fess38.finance.util

import com.google.protobuf.Message
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

inline fun <reified T> SessionFactory.list(criteria: DetachedCriteria,
                                           session: Session = this.currentSession): List<T> {
  return criteria.getExecutableCriteria(session).list() as List<T>
}

fun gzip(message: Message): ByteArray {
  return ByteArrayOutputStream()
      .also {GZIPOutputStream(it).apply {write(message.toByteArray())}.apply {close()}}
      .apply {close()}
      .toByteArray()
}

fun gunzip(value: ByteArray): ByteArray {
  return GZIPInputStream(value.inputStream()).readBytes()
}
