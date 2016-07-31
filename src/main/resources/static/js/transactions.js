angular.module("app.transactions", []);

angular.module("app.transactions").service("YearMonthService", function() {
	var monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август",
	                  "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
	var year = new Date().getFullYear();
	var month = new Date().getMonth() + 1;
	
	this.getYear = function() {
		return year;
	}
	this.getMonth = function() {
		return month;
	}
	this.toString = function() {
		return monthNames[month - 1] + " " + year;
	}
	this.incrementMonth = function() {
		if (month != 12) {
			month++;
		} else {
			month = 1;
			year++;
		}
	}
	this.decrementMonth = function() {
		if (month != 1) {
			month--;
		} else {
			month = 12;
			year--;
		}
	}
});

angular.module("app.transactions").service("MonthTransactionsService", function(RestApi, YearMonthService) {
	var defaultScope;
	this.show = function(scope) {
		if (!defaultScope) {
			defaultScope = scope;
		}
		RestApi.transactions(YearMonthService.getYear(), YearMonthService.getMonth()).then(function(response) {
			defaultScope.yearMonth = YearMonthService.toString();
			defaultScope.daysOfMonth = response.daysOfMonth;
			defaultScope.rubrics = response.rubrics;
			defaultScope.monthSummary = response.monthSummary;
			defaultScope.daySummary = response.daySummary;
			defaultScope.rubricSummary = response.rubricSummary;
			defaultScope.rubricByDaySummary = response.rubricDaySummary;
		});
	}
});

angular.module("app.transactions").controller("show-transactions", function($scope, MonthTransactionsService, YearMonthService,
		RestApi) {
	// При запуске приложения
	MonthTransactionsService.show($scope);

	$scope.nextMonth = function() {
		YearMonthService.incrementMonth();
		MonthTransactionsService.show();
	}
	
	$scope.previousMonth = function() {
		YearMonthService.decrementMonth();
		MonthTransactionsService.show();
	}
	
	$scope.filterIncomeRubrics = function(rubric) {
        return rubric.isIncome;
    }
	
	$scope.filterExpenceRubrics = function(rubric) {
        return !rubric.isIncome;
    } 
	
	$scope.findRubricByDaySummary = function(rubric, day) {
		var cell;
		for (rd in $scope.rubricByDaySummary) {
			cell = $scope.rubricByDaySummary[rd]; 
			if (cell.rubric.id == rubric.id && cell.date.day == day) {
				return cell.amount;
			}
		}
	}
	
	$scope.findRubricSummary = function(rubric) {
		for (r in $scope.rubricSummary) {
			if ($scope.rubricSummary[r].rubric.id == rubric.id) {
				return $scope.rubricSummary[r].amount;
			}
		}
	}
	
	$scope.findDaySummary = function(day) {
		for (d in $scope.daySummary) {
			if ($scope.daySummary[d].date.day == day) {
				return $scope.daySummary[d].amount;
			}
		}
	}
	
	$scope.transactionsForCell = function(rubric, day) {
		var year = YearMonthService.getYear();
		var month = YearMonthService.getMonth();
		RestApi.transactionsForCell(year, month, day, rubric).then(function(response) {
			$scope.cellTransactions = response;
		});
	}
});

angular.module("app.transactions").controller("add-transaction", function($scope, $http, $window, $timeout,
		RestApi, MonthTransactionsService) {
	var masterAccount, outerAccount;
	RestApi.masterAccount().then(function(response) {
		masterAccount = response;
	});
	RestApi.outerAccount().then(function(response) {
		outerAccount = response;
	});
	
	$scope.changeType = function(type) {
		if (type == "income") {
			RestApi.incomeRubrics().then(function(response) {
				$scope.rubrics = response;
			});
		} else if (type == "expense") {
			RestApi.expenseRubrics().then(function(response) {
				$scope.rubrics = response;
			});
		}
	};

	RestApi.users().then(function(response) {
		$scope.users = response;
	});
	
	function readTransaction() {
		var transaction = {};
		transaction.dayRef = $scope.dayRef;
		transaction.rubric = {id: $scope.rubric};
		transaction.amountFrom = $scope.amount;
		transaction.amountTo = $scope.amount;
		transaction.comment = $scope.comment;
		if ($scope.type == "income") {
			transaction.accountFrom = outerAccount;
			transaction.accountTo = masterAccount;
		} else if ($scope.type == "expense") {
			transaction.accountFrom = masterAccount;
			transaction.accountTo = outerAccount;
		}
		if ($scope.user) {
			transaction.user = {id: $scope.user};
		}
		return transaction;
	}
	
	function clearTransactionFields() {
		$scope.amount = null;
		$scope.user = null;
		$scope.comment = null;
	}
	
	function afterTransactionSave(message) {
		clearTransactionFields();
		$scope.adderLabel = message;
		$timeout(function() { $scope.adderLabel = null; }, 3000);
	}
	
	$scope.addTransaction = function() {
		$http.post("/transactions/add", readTransaction()).then(function(response) {
			afterTransactionSave("Транзакция добавлена");
			MonthTransactionsService.show();
		}, function(response) {
			afterTransactionSave("Ошибка добавления транзакции");
		});
	}
});
