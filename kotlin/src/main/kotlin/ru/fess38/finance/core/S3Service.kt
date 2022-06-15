package ru.fess38.finance.core

import com.google.protobuf.StringValue
import ru.fess38.finance.core.Model.File

interface S3Service {
  fun save(file: File): StringValue
}
