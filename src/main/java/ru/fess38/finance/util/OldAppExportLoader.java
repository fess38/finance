package ru.fess38.finance.util;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;
import ru.fess38.finance.dao.AccountDao;
import ru.fess38.finance.dao.RubricDao;
import ru.fess38.finance.dao.TransactionDao;
import ru.fess38.finance.model.Account;
import ru.fess38.finance.model.Rubric;
import ru.fess38.finance.model.Transaction;

import java.io.File;
import java.io.FileReader;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class OldAppExportLoader {
  @Autowired
  private RubricDao rubricDao;
  @Autowired
  private TransactionDao transactionDao;
  @Autowired
  private AccountDao accountDao;
  private SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

  public void load(String path) throws Exception {
    Account master = accountDao.getMasterAccount();
    Account outer = accountDao.getOuterAccount();

    List<SimpleTransaction> simpleTransactions = Arrays.stream(FileCopyUtils.copyToString(new
        FileReader(new File(path))).split("\n"))
        .filter(x -> !x.startsWith("t"))
        .map(this::toSimpleTransaction)
        .collect(Collectors.toList());
    List<Rubric> rubrics = simpleTransactions.stream()
        .map(SimpleTransaction::getRubric)
        .distinct()
        .map(this::toRubric)
        .collect(Collectors.toList());
    simpleTransactions.forEach(x -> {
      Transaction transaction = new Transaction();
      transaction.setAmountFrom(x.getAmountFrom());
      transaction.setAmountTo(x.getAmountFrom());
      Rubric rubric = rubrics.stream()
          .filter(y -> y.getName().equals(x.getRubric()))
          .findFirst()
          .get();
      transaction.setRubric(rubric);
      transaction.setDayRef(x.getDate());
      transaction.setComment(x.getComment());
      if (rubric.isIncome()) {
        transaction.setAccountFrom(outer);
        transaction.setAccountTo(master);
      } else {
        transaction.setAccountFrom(master);
        transaction.setAccountTo(outer);
      }
      transactionDao.save(transaction);
    });
  }

  private SimpleTransaction toSimpleTransaction(String row) {
    List<String> rowList = Arrays.asList(row.split("\t"));
    LocalDate date = null;
    try {
      date = LocalDate.parse(rowList.get(1), DateTimeFormatter.ofPattern("yyyy-MM-dd"));
    } catch (Exception e) {
      e.printStackTrace();
    }
    String rubric = rowList.get(2);
    int amountFrom = Integer.parseInt(rowList.get(3));

    String comment = null;
    if (rowList.size() == 5) {
      comment = rowList.get(4);
    }
    return new SimpleTransaction(date, rubric, amountFrom, comment);
  }

  private Rubric toRubric(String rubricName) {
    Rubric rubric = new Rubric();
    rubric.setName(rubricName);
    rubric.setIncome(incomeRubrics().contains(rubricName));
    rubricDao.save(rubric);
    return rubric;
  }

  private List<String> incomeRubrics() {
    return Arrays.asList("Зарплата", "Иной доход");
  }

  private static class SimpleTransaction {
    public SimpleTransaction(LocalDate date, String rubric, int amountFrom, String comment) {
      this.date = date;
      this.rubric = rubric;
      this.amountFrom = amountFrom;
      this.comment = comment;
    }

    private final LocalDate date;
    private final String rubric;
    private final int amountFrom;
    private final String comment;

    @Override
    public boolean equals(Object object) {
      return EqualsBuilder.reflectionEquals(this, object, true);
    }

    @Override
    public int hashCode() {
      return HashCodeBuilder.reflectionHashCode(this, true);
    }

    @Override
    public String toString() {
      return ToStringBuilder.reflectionToString(this);
    }

    public LocalDate getDate() {
      return date;
    }

    public String getRubric() {
      return rubric;
    }

    public int getAmountFrom() {
      return amountFrom;
    }

    public String getComment() {
      return comment;
    }
  }
}
