package ru.fess38.finance.utils

import com.google.protobuf.Timestamp

fun millisToTimestamp(millis: Long) = Timestamp.newBuilder()
    .setSeconds(millis / 1000)
    .setNanos((millis % 1000).toInt() * 1000000)
    .build()!!
