package ru.fess38.finance.core

import com.google.protobuf.Message
import ru.fess38.finance.core.Model.Dump

interface MessageService {
  fun save(message: Message): Message

  fun update(message: Message)

  fun dump(): Dump

  fun isExist(id: Long): Boolean
}
