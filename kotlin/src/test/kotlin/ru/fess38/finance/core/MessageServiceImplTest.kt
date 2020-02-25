package ru.fess38.finance.core

import com.google.protobuf.Message
import org.junit.Assert
import org.junit.Test
import ru.fess38.finance.core.Model.Transaction
import ru.fess38.finance.core.Model.TransactionArchive

internal class MessageServiceImplTest {
  private val messageService = MessageServiceImpl()

  @Test
  fun transactions1() {
    val messages = listOf<Message>(TransactionArchive.newBuilder().setId(100).build())
    val actual = messageService.transactions(messages)
    val expected = emptyList<Transaction>()
    Assert.assertEquals(expected, actual)
  }

  @Test
  fun transactions2() {
    val messages = listOf<Message>(
        transaction(1),
        TransactionArchive.newBuilder().setId(100).build()
    )
    val actual = messageService.transactions(messages)
    val expected = listOf(transaction(1))
    Assert.assertEquals(expected, actual)
  }

  @Test
  fun transactions3() {
    val t2 = transaction(2).toBuilder().setComment("foo").build()
    val messages = listOf<Message>(
        transaction(1),
        t2,
        TransactionArchive.newBuilder().setId(100).addTransactions(transaction(2)).build()
    )
    val actual = messageService.transactions(messages)
    val expected = listOf(t2, transaction(1))
    Assert.assertEquals(expected, actual)
  }

  @Test
  fun isExistInTransactionArchive1() {
    val ta: TransactionArchive? = null
    Assert.assertFalse(messageService.isExistInTransactionArchive(1, ta))
  }

  @Test
  fun isExistInTransactionArchive2() {
    val ta = TransactionArchive.newBuilder().addTransactions(transaction(2)).build()
    Assert.assertFalse(messageService.isExistInTransactionArchive(1, ta))
  }

  @Test
  fun isExistInTransactionArchive3() {
    val ta = TransactionArchive.newBuilder().addTransactions(transaction(1)).build()
    Assert.assertTrue(messageService.isExistInTransactionArchive(1, ta))
  }

  private fun transaction(id: Long): Transaction {
    return Transaction.newBuilder()
        .setId(id)
        .setCreated("2020-01-01")
        .setAccountIdFrom(0)
        .setAccountIdTo(0)
        .setAmountFrom(0)
        .setAmountTo(0)
        .setCategoryId(0)
        .build()
  }
}
