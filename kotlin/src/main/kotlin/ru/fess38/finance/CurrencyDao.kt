package ru.fess38.finance

import com.google.gson.Gson
import org.hibernate.SessionFactory
import org.hibernate.criterion.DetachedCriteria
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.core.io.ClassPathResource
import org.springframework.stereotype.Repository
import org.springframework.transaction.annotation.Transactional
import ru.fess38.finance.model.Currency

interface CurrencyDao {
  fun save(currency: Currency)
  fun find(): List<Currency>
}

@Repository
@Transactional
class CurrencyDaoImpl: CurrencyDao {
  @Autowired
  lateinit var sessionFactory: SessionFactory
  @Autowired
  lateinit var gson: Gson

  override fun save(currency: Currency) {
    sessionFactory.currentSession.save(currency)!!
  }

  override fun find(): List<Currency> {
    val criteria = DetachedCriteria.forClass(Currency::class.java)
    val currencies: List<Currency> = sessionFactory.list(criteria)
    return if (currencies.isEmpty()) { init(); sessionFactory.list(criteria) } else currencies
  }

  private fun init() {
    val data = ClassPathResource("/ru/fess38/finance/model/Currency.json").file.readText()
    val currencies: List<Currency> = gson.fromJson(data)
    currencies.forEach {save(it)}
  }
}
