package ru.fess38.finance.utils

import com.google.protobuf.Timestamp
import org.junit.Assert
import org.junit.Test

internal class MillisToTimestampTest {
  @Test
  fun test() {
    val actual = millisToTimestamp(1234567899900987)
    val expected = timestamp(1234567899900, 987000000)
    Assert.assertEquals(expected, actual)
  }

  @Test
  fun test0() {
    val actual = millisToTimestamp(0)
    val expected = timestamp(0, 0)
    Assert.assertEquals(expected, actual)
  }

  @Test
  fun testNoNanos() {
    val actual = millisToTimestamp(1234567899900000)
    val expected = timestamp(1234567899900, 0)
    Assert.assertEquals(expected, actual)
  }

  private fun timestamp(seconds: Long, nanos: Int) = Timestamp.newBuilder()
      .setSeconds(seconds)
      .setNanos(nanos)
      .build()
}
