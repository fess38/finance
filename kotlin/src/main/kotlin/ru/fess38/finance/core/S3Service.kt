package ru.fess38.finance.core

import com.google.protobuf.StringValue

interface S3Service {
  fun save(image: StringValue): StringValue
}
