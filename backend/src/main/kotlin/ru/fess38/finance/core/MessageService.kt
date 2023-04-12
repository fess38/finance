package ru.fess38.finance.core

import com.google.protobuf.Message
import ru.fess38.finance.IDSEQ_ALLOCATION_SIZE
import ru.fess38.finance.core.Model.*

interface MessageService {
  fun save(message: Message)

  fun save(messages: List<Message>)

  fun update(message: Message)

  fun delete(messages: List<Message>)

  fun delete()

  fun dataStorage(modifiedAfter: Long): DataStorage

  fun isExist(id: Long, type: EntityType): Boolean

  fun idHolder(amount: Int): IdHolder
}
