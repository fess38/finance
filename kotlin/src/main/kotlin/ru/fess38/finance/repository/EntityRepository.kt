package ru.fess38.finance.repository

import com.google.protobuf.Message
import ru.fess38.finance.core.Model.EntityType
import ru.fess38.finance.security.User

interface EntityRepository {
  fun save(message: Message, user: User): Message

  fun update(message: Message, user: User)

  fun isExist(id: Long, type: EntityType, user: User): Boolean

  fun get(user: User): List<Message>
}
