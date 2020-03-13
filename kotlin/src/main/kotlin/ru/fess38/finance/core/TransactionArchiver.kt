package ru.fess38.finance.core

import mu.KotlinLogging
import ru.fess38.finance.core.Model.EntityType.TRANSACTION
import ru.fess38.finance.core.Model.EntityType.TRANSACTION_ARCHIVE
import ru.fess38.finance.core.Model.Transaction
import ru.fess38.finance.core.Model.TransactionArchive
import ru.fess38.finance.repository.EntityRepository
import ru.fess38.finance.security.User
import ru.fess38.finance.utils.type
import java.time.LocalDate

class TransactionArchiver(private val entityRepository: EntityRepository) {
  private val log = KotlinLogging.logger {}

  fun archive(user: User) {
    val messages = entityRepository.get(user, 0, listOf(TRANSACTION, TRANSACTION_ARCHIVE))
    val (transactionArchive, transactionsToDelete) = messagesToChange(
        messages.filter {it.type == TRANSACTION}.map {it as Transaction},
        messages.filter {it.type == TRANSACTION_ARCHIVE}.map {it as TransactionArchive}[0]
    )
    if (transactionsToDelete.isNotEmpty()) {
      entityRepository.doCreateUpdateDelete(emptyList(), listOf(transactionArchive),
          transactionsToDelete, user)
      log.info {"Do transaction archivation for user [${user.id}] with " +
          "${transactionsToDelete.size} transactions to delete"}
    }
  }

  internal fun messagesToChange(transactions: List<Transaction>,
                                transactionArchive: TransactionArchive)
      : Pair<TransactionArchive, List<Transaction>> {
    val archivedTransactions = transactionArchive.transactionsList
        .map {it.id to it}
        .toMap()
        .toMutableMap()
    val transactionsToDelete = mutableListOf<Transaction>()

    for (transaction in transactions) {
      if (LocalDate.parse(transaction.created).isBefore(LocalDate.now().minusMonths(1))) {
        transactionsToDelete.add(transaction)
        archivedTransactions[transaction.id] = transaction
      }
    }
    val builder = transactionArchive.toBuilder()
        .clearTransactions()
        .addAllTransactions(archivedTransactions.values)
    return Pair(builder.build(), transactionsToDelete)
  }
}
