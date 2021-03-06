package ru.fess38.finance.currency;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CurrencyController {
  @Autowired
  private CurrencyDao currencyDao;

  @RequestMapping(value = "/currency/get", method = RequestMethod.GET)
  public @ResponseBody List<Currency> get() {
    return currencyDao.find(currencyDao.detachedCriteria());
  }

  @RequestMapping(value = "/currency/save", method = RequestMethod.POST)
  public void save(@RequestBody Currency currency) {
    currencyDao.save(currency);
  }

  @RequestMapping(value = "/currency/update", method = RequestMethod.POST)
  public void update(@RequestBody Currency currency) {
    currencyDao.update(currency);
  }

  @RequestMapping(value = "/currency/delete", method = RequestMethod.POST)
  public void delete(@RequestBody Currency currency) {
    currencyDao.delete(currency);
  }
}
