angular.module("app.transaction", []);

angular.module("app.transaction").service("YearMonthService", function() {
  var date = new Date();
  this.getYear = function() {
    return date.getFullYear();
  };
  this.getMonth = function() {
    return date.getMonth() + 1;
  };
  this.getDate = function() {
    return date;
  };
  this.incrementMonth = function() {
    date.setMonth(date.getMonth() + 1);
  };
  this.decrementMonth = function() {
    date.setMonth(date.getMonth() - 1);
  };
});

angular.module("app.transaction").service("MonthTransactionsService", function(RestApi,
    YearMonthService) {
  var transactions = {};
  this.refresh = function() {
    var year = YearMonthService.getYear();
    var month = YearMonthService.getMonth();
    RestApi.findYearMonthTransactions(year, month).then(function(response) {
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

angular.module("app.transaction").service("EditTransactionsService", function(RestApi) {
  var scope = function() {
    var show = false;
    var cellTransactions = [];
    var users = [];
  };
  this.refresh = function(rubric, date) {
    if (angular.isDefined(rubric) && angular.isDefined(date)) {
      scope.rubric = rubric;
      scope.date = date;
    }
    RestApi.findCellTransactions(scope.rubric, scope.date).then(function(response) {
      scope.show = angular.isDefined(response.data[0]);
      scope.cellTransactions = response.data;
    });
    RestApi.users().then(function(response) {
      scope.users = response.data;
    });
    RestApi.tags().then(function(response) {
      scope.tags = response.data;
    });
  };

  this.clear = function() {
    scope.show = false;
  };

  this.init = function() {
    return scope;
  }
});

angular.module("app.transaction").controller("edit-transactions", function($scope, $timeout,
    EditTransactionsService, RestApi, MonthTransactionsService) {
  $scope.editor = EditTransactionsService.init();

  $scope.updateTransaction = function(transaction) {
    transaction.amountTo = transaction.amountFrom;
    RestApi.updateTransaction(transaction).then(function(response) {
      MonthTransactionsService.refresh();
      $scope.log = "Транзация обновлена";
    }, function(response) {
      $scope.log = "Ошибка обновления транзакции";
    });
    $timeout(function() {
      $scope.log = null;
    }, 3000);
  };

  $scope.deleteTransaction = function(transaction) {
    RestApi.deleteTransaction(transaction).then(function(response) {
      MonthTransactionsService.refresh();
      EditTransactionsService.refresh();
      $scope.log = "Транзация удалена";
    }, function(response) {
      $scope.log = "Ошибка удаления транзакции";
    });
  };
});

angular.module("app.transaction").controller("show-transactions", function($scope,
    MonthTransactionsService, YearMonthService, RestApi, EditTransactionsService) {
  $scope.transactions = MonthTransactionsService.refresh();

  $scope.nextMonth = function() {
    YearMonthService.incrementMonth();
    MonthTransactionsService.refresh();
    EditTransactionsService.clear();
  };

  $scope.previousMonth = function() {
    YearMonthService.decrementMonth();
    MonthTransactionsService.refresh();
    EditTransactionsService.clear();
  };

  $scope.filterIncomeRubrics = function(rubric) {
    return rubric.isIncome;
  };

  $scope.filterExpenceRubrics = function(rubric) {
    return !rubric.isIncome;
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

  $scope.updateCellTransactions = function(rubric, date) {
    EditTransactionsService.refresh(rubric, date);
  };
});

angular.module("app.transaction").controller("add-transaction", function($scope, $timeout,
    RestApi) {
  var masterAccount, outerAccount;
  RestApi.masterAccount().then(function(response) {
    masterAccount = response.data;
  });
  RestApi.outerAccount().then(function(response) {
    outerAccount = response.data;
  });

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

  RestApi.users().then(function(response) {
    $scope.users = response.data;
  });

  RestApi.tags().then(function(response) {
    $scope.tags = response.data;
  });

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
    }, function(response) {
      $scope.log = "Ошибка добавления транзакции";
    });
    $timeout(function() {
      $scope.log = null;
    }, 3000);
  };
});
