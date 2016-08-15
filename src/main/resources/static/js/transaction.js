angular.module("app.transaction", []);

angular.module("app.transaction").service("YearMonthService", function() {
	var date = new Date();
	this.getYear = function() {
		return date.getFullYear();
	}
	this.getMonth = function() {
		return date.getMonth() + 1;
	}
	this.toString = function() {
		return date.toLocaleString("ru", { month: 'long', year: 'numeric'});
	}
	this.incrementMonth = function() {
		date.setMonth(date.getMonth() + 1);
	}
	this.decrementMonth = function() {
	  date.setMonth(date.getMonth() - 1);
	}
});


angular.module("app.transaction").service("MonthTransactionsService", function(RestApi, YearMonthService) {
	var transactions = {};
	this.refresh = function() {
		var year = YearMonthService.getYear();
		var month = YearMonthService.getMonth();
		RestApi.findYearMonthTransactions(year, month).then(function(response) {
		  transactions.yearMonth = YearMonthService.toString();
		  transactions.daysOfMonth = response.data.daysOfMonth;
		  transactions.rubrics = response.data.rubrics;
		  transactions.monthSummary = response.data.monthSummary;
		  transactions.daySummary = response.data.daySummary;
		  transactions.rubricSummary = response.data.rubricSummary;
		  transactions.rubricByDaySummary = response.data.rubricDaySummary;
		});
		return transactions;
	}
});


angular.module("app.transaction").service("EditTransactionsService", function(RestApi) {
  var scope = function() {
    var show = false;
    var cellTransactions = {};
    var users = [];
  };
  this.refresh = function(rubric, year, month, day) {
    if (angular.isDefined(rubric) && angular.isDefined(year) && angular.isDefined(month) &&
        angular.isDefined(day)) {
      scope.rubric = rubric;
      scope.year = year;
      scope.month = month;
      scope.day = day
    }
    RestApi.findCellTransactions(scope.rubric, scope.year, scope.month, scope.day).then(function(response) {
      scope.show = angular.isDefined(response.data[0]);
      scope.cellTransactions = response.data;
    });
    RestApi.users().then(function(response) {
      scope.users = response.data;
    });
    RestApi.tags().then(function(response) {
      scope.tags = response.data;
    });
  }
  
  this.clear = function() {
    scope.show = false;
  }
  
  this.init = function() {
    return scope;
  }
});


angular.module("app.transaction").controller("edit-transactions", function($scope, $timeout, 
    EditTransactionsService, RestApi, MonthTransactionsService) {
  $scope.editor = EditTransactionsService.init();
  
  $scope.updateTransaction = function(transaction) {
    // TODO Неявное поведение при обновлении транзации
    transaction.amountTo = transaction.amountFrom;
    RestApi.updateTransaction(transaction).then(function(response) {
      MonthTransactionsService.refresh();
      $scope.log = "Транзация обновлена";
    }, function(response) {
      $scope.log = "Ошибка обновления транзакции";
    });
    $timeout(function() { $scope.log = null; }, 3000);
  }
  
  $scope.deleteTransaction = function(transaction) {
    RestApi.deleteTransaction(transaction).then(function(response) {
      MonthTransactionsService.refresh();
      EditTransactionsService.refresh()
      $scope.log = "Транзация удалена";
    }, function(response) {
      $scope.log = "Ошибка удаления транзакции";
    });
  }
});


angular.module("app.transaction").controller("show-transactions", function($scope, MonthTransactionsService,
    YearMonthService, RestApi, EditTransactionsService) {
  $scope.transactions = MonthTransactionsService.refresh();

	$scope.nextMonth = function() {
		YearMonthService.incrementMonth();
		MonthTransactionsService.refresh();
		EditTransactionsService.clear();
	}
	
	$scope.previousMonth = function() {
		YearMonthService.decrementMonth();
		MonthTransactionsService.refresh();
		EditTransactionsService.clear();
	}
	
	$scope.filterIncomeRubrics = function(rubric) {
        return rubric.isIncome;
    }
	
	$scope.filterExpenceRubrics = function(rubric) {
        return !rubric.isIncome;
    } 
	
	$scope.findRubricByDaySummary = function(rubric, day) {
		for (rd in $scope.transactions.rubricByDaySummary) {
		  var cell = $scope.transactions.rubricByDaySummary[rd]; 
			if (cell.rubric.id == rubric.id && cell.date.day == day) {
				return cell.amount;
			}
		}
	}
	
	$scope.findRubricSummary = function(rubric) {
		for (r in $scope.transactions.rubricSummary) {
			if ($scope.transactions.rubricSummary[r].rubric.id == rubric.id) {
				return $scope.transactions.rubricSummary[r].amount;
			}
		}
	}
	
	$scope.findDaySummary = function(day) {
		for (d in $scope.transactions.daySummary) {
			if ($scope.transactions.daySummary[d].date.day == day) {
				return $scope.transactions.daySummary[d].amount;
			}
		}
	}
	
	$scope.updateCellTransactions = function(rubric, day) {
		var year = YearMonthService.getYear();
		var month = YearMonthService.getMonth();
		EditTransactionsService.refresh(rubric, year, month, day);
	}
});

angular.module("app.transaction").controller("add-transaction", function($scope, $timeout,
		RestApi, MonthTransactionsService) {
	var masterAccount, outerAccount;
	RestApi.masterAccount().then(function(response) {
		masterAccount = response.data;
	});
	RestApi.outerAccount().then(function(response) {
		outerAccount = response.data;
	});
	
	$scope.changeType = function(type) {
		if (type == "income") {
			RestApi.incomeRubrics().then(function(response) {
				$scope.rubrics = response.data;
			});
		} else if (type == "expense") {
			RestApi.expenseRubrics().then(function(response) {
				$scope.rubrics = response.data;
			});
		}
	};

	RestApi.users().then(function(response) {
		$scope.users = response.data;
	});
	
	RestApi.tags().then(function(response) {
    $scope.tags = response.data;
  });
	
	function readTransaction() {
	  var newTransaction = $scope.newTransaction;
	  newTransaction.amountTo = $scope.newTransaction.amountFrom;
	  newTransaction.amountTo = newTransaction.amountFrom;
		if ($scope.type == "income") {
		  newTransaction.accountFrom = outerAccount;
		  newTransaction.accountTo = masterAccount;
		} else if ($scope.type == "expense") {
		  newTransaction.accountFrom = masterAccount;
		  newTransaction.accountTo = outerAccount;
		}
		return newTransaction;
	}
	
	function clearTransactionFields() {
		$scope.newTransaction.amountFrom = null;
		$scope.newTransaction.tag = null;
		$scope.newTransaction.user = null;
		$scope.newTransaction.comment = null;
	}
	
	$scope.addTransaction = function() {
	  RestApi.saveTransaction(readTransaction()).then(function(response) {
		  $scope.log = "Транзакция добавлена";
		  clearTransactionFields();
			MonthTransactionsService.refresh();
		}, function(response) {
		  $scope.log = "Ошибка добавления транзакции";
		});
		$timeout(function() { $scope.log = null; }, 3000);
	}
});
