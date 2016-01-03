package ru.fess38.finance.view;

import java.time.YearMonth;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;

import org.apache.commons.lang3.tuple.Pair;

import ru.fess38.finance.Utils;
import ru.fess38.finance.model.Account;
import ru.fess38.finance.model.Currency;
import ru.fess38.finance.model.Rubric;
import ru.fess38.finance.model.Transaction;


public class Transactions {
	private Transactions(YearMonth yearMonth, Collection<Transaction> transactions) {
		this.yearMonth = yearMonth;
		this.transactions = new HashSet<>(transactions);
	}

	private Transactions(Collection<Transaction> transactions) {
		this(YearMonth.now(), transactions);
	}

	public static final Function<Set<Transaction>, Set<Transaction>> TRANSFERS = t -> {
		return t.stream().filter(x -> x.getRubric().getIsService())
				.collect(Collectors.toSet());
	};

	public static final Function<Set<Transaction>, Set<Transaction>> TRANSACTIONS = t -> {
		return t.stream().filter(x -> !x.getRubric().getIsService())
				.collect(Collectors.toSet());
	};
	
	public static final Transactions EMPTY = new Transactions(new ArrayList<>());
	private final YearMonth yearMonth;
	private final Set<Transaction> transactions;
	private Map<Pair<Rubric, Integer>, Transactions> rubricDayOfMonth;

	public static Transactions of(YearMonth yearMonth, Collection<Transaction> transactions) {
		return new Transactions(yearMonth, transactions);
	}

	public static Transactions of(Collection<Transaction> transactions) {
		return new Transactions(transactions);
	}

	public static final Predicate<Transaction> currency(Currency currency) {
		return t -> t.getAccountFrom().getCurrency().equals(currency);
	}
	
	public static final Predicate<Transaction> isIncome(boolean isIncome) {
		return t -> t.getRubric().getIsIncome() == isIncome;
	}
	
	public static final Predicate<Transaction> rubric(Rubric rubric) {
		return t -> t.getRubric().equals(rubric);
	}
	
	public static final Predicate<Transaction> dayOfMonth(int dayOfMonth) {
		return x -> Utils.dayOfMonth(x.getDayRef()) == dayOfMonth;
	}
	
	public static final Predicate<Transaction> sumAmount() {
		return x -> x != null;
	}
	
	public Transactions with(Transaction transaction) {
		transactions.add(transaction);
		return this;
	}

	public Transactions filter(Function<Set<Transaction>, Set<Transaction>> function) {
		return new Transactions(yearMonth, function.apply(transactions));
	}

	public Transactions filter(Predicate<Transaction> predicate) {
		return new Transactions(yearMonth, transactions.stream()
				.filter(predicate)
				.collect(Collectors.toSet()));
	}
	
	public int summary(Predicate<Transaction> predicate) {
		return transactions.stream()
				.filter(predicate)
				.collect(Collectors.summingInt(Transaction::getAmountFrom));
	}
	
	public Transactions filter(Rubric rubric, int dayOfMonth) {
		if (rubricDayOfMonth == null) {
			rubricDayOfMonth = new HashMap<>();
			for (Transaction t: transactions) {
				int dayOfMonthPos = Utils.dayOfMonth(t.getDayRef());
				Pair<Rubric, Integer> pair = Pair.of(t.getRubric(), dayOfMonthPos);
				rubricDayOfMonth.putIfAbsent(pair, Transactions.of(yearMonth, new ArrayList<>()));
				rubricDayOfMonth.get(pair).with(t);
			}
		}
		return rubricDayOfMonth.getOrDefault(Pair.of(rubric, dayOfMonth), EMPTY);
	}
	
	public List<Currency> currencies() {
		return transactions.stream()
				.map(Transaction::getAccountFrom)
				.map(Account::getCurrency)
				.distinct()
				.sorted(Comparator.comparing(Currency::getId))
				.collect(Collectors.toList());
	}
	
	public List<Rubric> rubrics() {
		return transactions.stream()
				.map(Transaction::getRubric)
				.distinct()
				.sorted(Comparator.comparing(Rubric::getName))
				.collect(Collectors.toList());
	}
	
	public List<Integer> daysOfMonth() {
		List<Integer> result = new ArrayList<>();
		for (int i = 1; i <= yearMonth.lengthOfMonth(); i++) {
			result.add(i);
		}
		return result;
	}

	public YearMonth getYearMonth() {
		return yearMonth;
	}
}
