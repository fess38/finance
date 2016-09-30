angular.module("app.transaction", []);

angular.module("app.transaction").service("MonthTransactionsService", function(RestApi,
    YearMonthService) {
  var transactions = {};
  this.refresh = function() {
    RestApi.findTransactions(YearMonthService.getYearMonth()).then(function(response) {
      transactions.yearMonth = YearMonthService.getDate();
      transactions.dates = response.data.dates;
      transactions.rubrics = response.data.rubrics;
      transactions.monthSummary = response.data.monthSummary;
      transactions.daySummary = response.data.daySummary;
      transactions.rubricSummary = response.data.rubricSummary;
      transactions.rubricDaySummary = response.data.rubricDaySummary;
    });
    return transactions;
  };
});

angular.module("app.transaction").controller("transaction", function($scope, AlertService,
    MonthTransactionsService, YearMonthService, RestApi) {
  function clearEditor() {
    $scope.editTransactions = [];
  }

  RestApi.users().then(function(response) {
    $scope.users = response.data;
  });

  RestApi.tags().then(function(response) {
    $scope.tags = response.data;
  });

  $scope.transactions = MonthTransactionsService.refresh();

  $scope.nextMonth = function() {
    YearMonthService.incrementMonth();
    MonthTransactionsService.refresh();
    clearEditor();
  };

  $scope.previousMonth = function() {
    YearMonthService.decrementMonth();
    MonthTransactionsService.refresh();
    clearEditor();
  };

  $scope.filterIncomeRubrics = function(rubric) {
    return rubric.isIncome;
  };

  $scope.filterExpenceRubrics = function(rubric) {
    return !$scope.filterIncomeRubrics(rubric);
  };

  $scope.findRubricDaySummary = function(rubric, date) {
    for (var i in $scope.transactions.rubricDaySummary) {
      var cell = $scope.transactions.rubricDaySummary[i];
      if (cell.rubric.id == rubric.id && cell.date == date) {
        return cell.amount;
      }
    }
  };

  $scope.findRubricSummary = function(rubric) {
    for (var i in $scope.transactions.rubricSummary) {
      if ($scope.transactions.rubricSummary[i].rubric.id == rubric.id) {
        return $scope.transactions.rubricSummary[i].amount;
      }
    }
  };

  $scope.findDaySummary = function(date) {
    for (var i in $scope.transactions.daySummary) {
      var cell = $scope.transactions.daySummary[i];
      if (cell.date == date) {
        return cell.amount;
      }
    }
  };

  $scope.showRubricDateTransactions = function(rubric, date) {
    RestApi.findRubricDayTransactions(rubric, date).then(function(response) {
      $scope.editTransactions = response.data;
    });
  };

  $scope.updateTransaction = function(transaction) {
    transaction.amountTo = transaction.amountFrom;
    RestApi.updateTransaction(transaction).then(function() {
      $scope.alert = AlertService.success("Транзация обновлена");
      MonthTransactionsService.refresh();
    }, function() {
      $scope.alert = AlertService.danger("Ошибка обновления транзакции");
    });
  };

  $scope.deleteTransaction = function(transaction) {
    RestApi.deleteTransaction(transaction).then(function() {
      $scope.alert = AlertService.success("Транзация удалена");
      MonthTransactionsService.refresh();
      $scope.editTransactions.splice($scope.editTransactions.indexOf(transaction), 1);
    }, function() {
      $scope.alert = AlertService.danger("Ошибка удаления транзакции");
    });
  };
});

angular.module("app.transaction").controller("saveTransaction", function($scope, AlertService,
    RestApi, YearMonthService) {
  var masterAccount, outerAccount;
  RestApi.masterAccount().then(function(response) {
    masterAccount = response.data;
  });
  RestApi.outerAccount().then(function(response) {
    outerAccount = response.data;
  });

  RestApi.users().then(function(response) {
    $scope.users = response.data;
  });

  RestApi.tags().then(function(response) {
    $scope.tags = response.data;
  });

  $scope.newTransaction = {dayRef: YearMonthService.getFormattedDate()};

  function readTransaction() {
    var newTransaction = $scope.newTransaction;
    newTransaction.amountTo = newTransaction.amountFrom;
    if ($scope.type === "income") {
      newTransaction.accountFrom = outerAccount;
      newTransaction.accountTo = masterAccount;
    } else if ($scope.type === "expense") {
      newTransaction.accountFrom = masterAccount;
      newTransaction.accountTo = outerAccount;
    }
    return newTransaction;
  }

  $scope.saveTransaction = function() {
    RestApi.saveTransaction(readTransaction()).then(function() {
      $scope.alert = AlertService.success("Транзакция добавлена");
      $scope.newTransaction.amountFrom = null;
      $scope.newTransaction.tag = null;
      $scope.newTransaction.user = null;
      $scope.newTransaction.comment = null;
    }, function() {
      $scope.alert = AlertService.danger("Ошибка добавления транзакции");
    });
  };

  $scope.changeType = function(type) {
    if (type === "income") {
      RestApi.incomeRubrics().then(function(response) {
        $scope.rubrics = response.data;
      });
    } else if (type === "expense") {
      RestApi.expenseRubrics().then(function(response) {
        $scope.rubrics = response.data;
      });
    }
  };
});
