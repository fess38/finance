package ru.fess38.finance.core

import org.junit.Assert
import org.junit.Test
import ru.fess38.finance.core.Model.Transaction
import ru.fess38.finance.core.Model.TransactionArchive
import ru.fess38.finance.repository.HibernateEntityRepositoryImpl
import java.time.LocalDate

internal class TransactionArchiverTest {
  private val archiver = TransactionArchiver(HibernateEntityRepositoryImpl())

  @Test
  fun messagesToChange1() {
    val ta = TransactionArchive.newBuilder().setId(10).build()
    val actual = archiver.messagesToChange(emptyList(), ta)
    val expected = Pair(ta, emptyList<Transaction>())
    Assert.assertEquals(expected, actual)
  }

  @Test
  fun messagesToChange2() {
    val t1 = transaction(1, "2019-01-01")
    val ta = TransactionArchive.newBuilder().setId(10).build()
    val actual = archiver.messagesToChange(listOf(t1), ta)
    val expected = Pair(ta.toBuilder().addTransactions(t1).build(), listOf(t1))
    Assert.assertEquals(expected, actual)
  }

  @Test
  fun messagesToChange3() {
    val t1 = transaction(1, LocalDate.now().toString())
    val t2 = transaction(2, "2019-01-01")
    val t3 = transaction(3, "2019-03-01").toBuilder().setComment("foo").build()
    val ta = TransactionArchive.newBuilder()
        .setId(10)
        .addTransactions(transaction(3, "2019-03-01"))
        .build()
    val actual = archiver.messagesToChange(listOf(t1, t2, t3), ta)
    val taExpected = ta.toBuilder()
        .clearTransactions()
        .addAllTransactions(listOf(t3, t2))
        .build()
    val expected = Pair(taExpected, listOf(t2, t3))
    Assert.assertEquals(expected, actual)
  }

  private fun transaction(id: Long, created: String): Transaction {
    return Transaction.newBuilder()
        .setId(id)
        .setCreated(created)
        .setAccountIdFrom(0)
        .setAccountIdTo(0)
        .setAmountFrom(0)
        .setAmountTo(0)
        .setCategoryId(0)
        .build()
  }
}
