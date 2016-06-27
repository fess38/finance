package ru.fess38.finance.model;


import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;

import org.apache.commons.lang3.time.DateUtils;
import org.apache.commons.lang3.tuple.Pair;


public class Transactions implements Iterable<Transaction> {
	private Transactions(YearMonth yearMonth, Collection<Transaction> transactions) {
		this.yearMonth = yearMonth;
		this.transactions = new HashSet<>(transactions);
	}

	private Transactions(Collection<Transaction> transactions) {
		this(YearMonth.now(), transactions);
	}

	public static final Function<Set<Transaction>, Set<Transaction>> TRANSFERS = t -> {
		return t.stream().filter(x -> x.getRubric().isService()).collect(Collectors.toSet());
	};

	public static final Function<Set<Transaction>, Set<Transaction>> TRANSACTIONS = t -> {
		return t.stream().filter(x -> !x.getRubric().isService()).collect(Collectors.toSet());
	};

	public static final Transactions EMPTY = new Transactions(new ArrayList<>());
	private final YearMonth yearMonth;
	private final Set<Transaction> transactions;
	private final Map<Pair<Rubric, LocalDate>, Transactions> rubricDayOfMonth = new HashMap<>();
	private final List<Rubric> rubrics = new ArrayList<>();

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
		return t -> t.getRubric().isIncome() == isIncome;
	}

	public static final Predicate<Transaction> rubric(Rubric rubric) {
		return t -> t.getRubric().equals(rubric);
	}

	public static final Predicate<Transaction> dayOfMonth(int dayOfMonth) {
		return x -> {
			Date date = x.getDayRef();
			return (int) DateUtils.getFragmentInDays(date, Calendar.MONTH) == dayOfMonth;
		};
	}

	public Transactions with(Transaction transaction) {
		transactions.add(transaction);
		return this;
	}

	public Transactions filter(Function<Set<Transaction>, Set<Transaction>> function) {
		return new Transactions(yearMonth, function.apply(transactions));
	}

	public Transactions filter(Predicate<Transaction> predicate) {
		return new Transactions(yearMonth,
				transactions.stream().filter(predicate).collect(Collectors.toSet()));
	}

	public int summary() {
		return transactions.stream().collect(Collectors.summingInt(Transaction::getAmountFrom));
	}

	public Transactions filter(Rubric rubric, int dayOfMonth) {
		if (rubricDayOfMonth.isEmpty()) {
			for (Transaction t: transactions) {
				Pair<Rubric, LocalDate> pair = Pair.of(t.getRubric(), t.getLocalDate());
				rubricDayOfMonth.putIfAbsent(pair, Transactions.of(yearMonth, new ArrayList<>()));
				rubricDayOfMonth.get(pair).with(t);
			}
		}
		LocalDate date = LocalDate.of(yearMonth.getYear(), yearMonth.getMonth(), dayOfMonth);
		return rubricDayOfMonth.getOrDefault(Pair.of(rubric, date), EMPTY);
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
		if (rubrics.isEmpty() && !this.isEmpty()) {
			rubrics.addAll(transactions.stream()
				.map(Transaction::getRubric)
				.distinct()
				.sorted(Comparator.comparing(Rubric::getName))
				.collect(Collectors.toList()));
		}
		return rubrics;
	}

	public List<Integer> daysOfMonth() {
		List<Integer> result = new ArrayList<>();
		for (int i = 1; i <= yearMonth.lengthOfMonth(); i++) {
			result.add(i);
		}
		return result;
	}

	public boolean isEmpty() {
		return transactions.isEmpty();
	}

	public YearMonth getYearMonth() {
		return yearMonth;
	}

	@Override
	public Iterator<Transaction> iterator() {
		return transactions.iterator();
	}
}
