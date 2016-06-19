package ru.fess38.finance.temp;


import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import ru.fess38.finance.model.Rubric;
import ru.fess38.finance.model.Transaction;
import ru.fess38.finance.model.User;


@Controller
@RequestMapping(value = "/")
public class DefaultController {
	@Autowired
	private DefaultService service;

	@RequestMapping(method = RequestMethod.GET)
	public String getTransactions(Map<String, Object> model) {
		model.put("incomeRubrics", service.getIncomeRubrics());
		model.put("expenseRubrics", service.getExpenseRubrics());
		model.put("users", service.getUsers());
		model.put("transactions", service.getTransactions());
		return "defaultPage";
	}

	@RequestMapping(value = "/user/add", method = RequestMethod.POST)
	public String addUser(@ModelAttribute("add-user") User user) {
		service.save(user);
		return "redirect:/";
	}

	@RequestMapping(value = "/user/delete", method = RequestMethod.POST)
	public String deleteUser(@ModelAttribute("delete-user") User user) {
		service.delete(user);
		return "redirect:/";
	}

	@RequestMapping(value = "/rubric/add", method = RequestMethod.POST)
	public String addRubrics(@ModelAttribute("add-rubric") Rubric rubric) {
		service.save(rubric);
		return "redirect:/";
	}

	@RequestMapping(value = "/rubric/delete", method = RequestMethod.POST)
	public String deleteRubric(@ModelAttribute("delete-rubric") Rubric rubric) {
		service.delete(rubric);
		return "redirect:/";
	}

	@RequestMapping(value = "/transaction/income/add", method = RequestMethod.POST)
	public String addIncomeTransaction(
			@ModelAttribute("income-transaction") Transaction transaction,
			@ModelAttribute("rubric-id") long rubricId) {
		service.saveIncome(transaction, rubricId);
		return "redirect:/";
	}

	@RequestMapping(value = "/transaction/expense/add", method = RequestMethod.POST)
	public String addExpenseTransaction(
			@ModelAttribute("expense-transaction") Transaction transaction,
			@ModelAttribute("rubric-id") long rubricId) {
		service.saveExpense(transaction, rubricId);
		return "redirect:/";
	}

	@RequestMapping(value = "/transaction/delete", method = RequestMethod.POST)
	public String deleteTransaction(@ModelAttribute("delete-transaction") Transaction transaction) {
		service.delete(transaction);
		return "redirect:/";
	}
}
