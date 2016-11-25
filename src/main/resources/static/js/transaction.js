angular.module("app.transaction", []);

angular.module("app.transaction").controller("transaction-by-day-rubric", function($scope,
    AlertService, YearMonthService, RestApi) {
  $scope.transactions = {};

  function refreshTransactions() {
    RestApi.findTransactions(YearMonthService.getYearMonth()).then(function(response) {
      var transactions = {};
      transactions.yearMonth = YearMonthService.getDate();
      transactions.dates = response.data.dates;
      transactions.rubrics = response.data.rubrics;
      transactions.monthSummary = response.data.monthSummary;
      transactions.daySummary = response.data.daySummary;
      transactions.rubricSummary = response.data.rubricSummary;
      transactions.rubricDaySummary = response.data.rubricDaySummary;
      $scope.transactions = transactions;
    });
  }

  function clearEditor() {
    $scope.editTransactions = [];
    $scope.yearMonth = YearMonthService.getDate();
  }

  refreshTransactions();
  clearEditor();

  RestApi.users().then(function(response) {
    $scope.users = response.data;
  });

  RestApi.tags().then(function(response) {
    $scope.tags = response.data;
  });

  $scope.nextMonth = function() {
    YearMonthService.incrementMonth();
    refreshTransactions();
    clearEditor();
  };

  $scope.previousMonth = function() {
    YearMonthService.decrementMonth();
    refreshTransactions();
    clearEditor();
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

  $scope.showRubricMonthTransactions = function(rubric) {
    RestApi.findRubricMonthTransactions(rubric, YearMonthService.getYearMonth()).then(function(response) {
      $scope.editTransactions = response.data;
    });
  };

  $scope.updateTransaction = function(transaction) {
    transaction.amountTo = transaction.amountFrom;
    RestApi.updateTransaction(transaction).then(function() {
      $scope.alert = AlertService.success("Транзация обновлена");
      refreshTransactions();
    }, function() {
      $scope.alert = AlertService.danger("Ошибка обновления транзакции");
    });
  };

  $scope.deleteTransaction = function(transaction) {
    RestApi.deleteTransaction(transaction).then(function() {
      $scope.alert = AlertService.success("Транзация удалена");
      refreshTransactions();
      $scope.editTransactions.splice($scope.editTransactions.indexOf(transaction), 1);
    }, function() {
      $scope.alert = AlertService.danger("Ошибка удаления транзакции");
    });
  };
});

angular.module("app.transaction").controller("saveTransaction", function($scope, AlertService,
    RestApi, YearMonthService) {
  var masterAccount, outerAccount;
  $scope.newTransaction = {dayRef: new Date()};

  RestApi.masterAccount().then(function(response) {
    masterAccount = response.data;
  });
  RestApi.outerAccount().then(function(response) {
    outerAccount = response.data;
  });

  RestApi.rubrics().then(function(response) {
    $scope.rubrics = response.data;
  });

  RestApi.tags().then(function(response) {
    $scope.tags = response.data;
  });

  RestApi.users().then(function(response) {
    $scope.users = response.data;
  });

  function readTransaction() {
    var newTransaction = $scope.newTransaction;
    newTransaction.amountTo = newTransaction.amountFrom;
    if (newTransaction.rubric.isIncome) {
      newTransaction.accountFrom = outerAccount;
      newTransaction.accountTo = masterAccount;
    } else {
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

  // Календарь
  $scope.calendar = {};
  $scope.calendar.open = function() {
    $scope.calendar.opened = !$scope.calendar.opened;
  };
  $scope.calendar.options = {
    initDate: new Date(),
    showWeeks: false
  };
});

angular.module("app.transaction").controller("transaction-by-month-rubric", function($scope,
    AlertService, YearMonthService, RestApi) {
  $scope.transactions = {};

  function refreshTransactions() {
    RestApi.findYearTransactions(YearMonthService.getYear()).then(function(response) {
      var transactions = {};
      transactions.year = YearMonthService.getYear();
      transactions.rubrics = response.data.rubrics;
      transactions.startOfMonths = response.data.startOfMonths;
      transactions.yearSummary = response.data.yearSummary;
      transactions.monthSummary = response.data.monthSummary;
      transactions.rubricSummary = response.data.rubricSummary;
      transactions.monthRubricSummary = response.data.monthRubricSummary;
      $scope.transactions = transactions;
    });
  }

  refreshTransactions();

  $scope.nextYear = function() {
    YearMonthService.incrementYear();
    refreshTransactions();
  };

  $scope.previousYear = function() {
    YearMonthService.decrementYear();
    refreshTransactions();
  };

  $scope.findMonthRubricSummary = function(startOfMonth, rubric) {
    for (var i in $scope.transactions.monthRubricSummary) {
      var cell = $scope.transactions.monthRubricSummary[i];
      if (cell.startOfMonth == startOfMonth && cell.rubric.id == rubric.id) {
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

  $scope.findMonthSummary = function(startOfMonth) {
    for (var i in $scope.transactions.monthSummary) {
      var cell = $scope.transactions.monthSummary[i];
      if (cell.startOfMonth == startOfMonth) {
        return cell.amount;
      }
    }
  };
});
