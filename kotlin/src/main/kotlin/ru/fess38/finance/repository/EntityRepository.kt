package ru.fess38.finance.repository

import com.google.protobuf.Message
import ru.fess38.finance.IDSEQ_ALLOCATION_SIZE
import ru.fess38.finance.core.Model.*
import ru.fess38.finance.security.User

interface EntityRepository {
  fun save(message: Message, user: User)

  fun update(message: Message, user: User)

  fun doCreateUpdateDelete(
    toSave: List<Message>, toUpdate: List<Message>,
    toDelete: List<Message>, user: User
  )

  fun isExist(id: Long, type: EntityType, user: User): Boolean

  fun get(user: User, modifiedAfter: Long, types: List<EntityType>): List<Message>

  fun count(user: User, type: EntityType): Long

  fun currencies(): List<Currency>

  fun idHolder(amount: Int = IDSEQ_ALLOCATION_SIZE): IdHolder

  fun maxId(): Long
}
