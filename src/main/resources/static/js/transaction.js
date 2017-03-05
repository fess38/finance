angular.module("app.transaction", []);

angular.module("app.transaction").controller("transaction-by-day-rubric", function($scope,
    AlertService, CurrentDateService, RestApi) {
  $scope.transactions = {};

  function refreshTransactions() {
    RestApi.dayRubricTransactions(CurrentDateService.yearMonth()).then(function(response) {
      var transactions = {};
      transactions.yearMonth = CurrentDateService.date();
      transactions.dates = response.data.dates;
      transactions.rubrics = response.data.rubrics;
      transactions.monthSummary = response.data.monthSummary;
      transactions.daySummary = response.data.daySummary;
      transactions.rubricSummary = response.data.rubricSummary;
      transactions.dayRubricSummary = response.data.dayRubricSummary;
      $scope.transactions = transactions;
    });
  }

  function clearEditor() {
    $scope.editTransactions = [];
    $scope.yearMonth = CurrentDateService.date();
  }

  refreshTransactions();
  clearEditor();

  RestApi.tags().then(function(response) {
    $scope.tags = response.data;
  });

  RestApi.users().then(function(response) {
    $scope.users = response.data;
  });

  $scope.nextMonth = function() {
    CurrentDateService.nextMonth();
    refreshTransactions();
    clearEditor();
  };

  $scope.previousMonth = function() {
    CurrentDateService.previousMonth();
    refreshTransactions();
    clearEditor();
  };

  $scope.nextYear = function() {
    CurrentDateService.nextYear();
    refreshTransactions();
    clearEditor();
  };

  $scope.previousYear = function() {
    CurrentDateService.previousYear();
    refreshTransactions();
    clearEditor();
  };

  $scope.findDayRubricSummary = function(date, rubric) {
    for (var i in $scope.transactions.dayRubricSummary) {
      var cell = $scope.transactions.dayRubricSummary[i];
      if (cell.rubric.id == rubric.id && cell.date == date) {
        return cell.amount.toLocaleString();
      }
    }
  };

  $scope.findDayRubricSummaryNumber = function(date, rubric) {
    for (var i in $scope.transactions.dayRubricSummary) {
      var cell = $scope.transactions.dayRubricSummary[i];
      if (cell.rubric.id == rubric.id && cell.date == date) {
        return cell.amount;
      }
    }
  };

  $scope.findRubricSummary = function(rubric) {
    for (var i in $scope.transactions.rubricSummary) {
      if ($scope.transactions.rubricSummary[i].rubric.id == rubric.id) {
        return $scope.transactions.rubricSummary[i].amount.toLocaleString();
      }
    }
  };

  $scope.findDaySummary = function(date) {
    for (var i in $scope.transactions.daySummary) {
      var cell = $scope.transactions.daySummary[i];
      if (cell.date == date) {
        return cell.amount.toLocaleString();
      }
    }
  };

  $scope.showDayRubricTransactions = function(date, rubric) {
    RestApi.cellDayRubricTransactions(date, rubric).then(function(response) {
      $scope.editTransactions = response.data;
      if ($scope.editTransactions.length > 0) {
        $("#desktop-transaction-editor").modal();
      }
    });
  };

  $scope.showMonthRubricTransactions = function(rubric) {
    RestApi.cellMonthRubricTransactions(CurrentDateService.yearMonth(), rubric).then(function(response) {
      $scope.editTransactions = response.data;
    });
  };

  $scope.updateTransaction = function(transaction) {
    transaction.amountTo = transaction.amountFrom;
    RestApi.updateTransaction(transaction).then(function() {
      AlertService.success("Транзация обновлена");
      refreshTransactions();
    }, function() {
      AlertService.danger("Ошибка обновления транзакции");
    });
  };

  $scope.deleteTransaction = function(transaction) {
    RestApi.deleteTransaction(transaction).then(function() {
      AlertService.success("Транзация удалена");
      refreshTransactions();
      $scope.editTransactions.splice($scope.editTransactions.indexOf(transaction), 1);
    }, function() {
      AlertService.danger("Ошибка удаления транзакции");
    });
  };
});

angular.module("app.transaction").controller("saveTransaction", function($scope, AlertService,
    RestApi) {
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
      AlertService.success("Транзакция добавлена");
      $scope.newTransaction.amountFrom = null;
      $scope.newTransaction.tag = null;
      $scope.newTransaction.user = null;
      $scope.newTransaction.comment = null;
    }, function() {
      AlertService.danger("Ошибка добавления транзакции");
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
    AlertService, CurrentDateService, RestApi) {
  $scope.transactions = {};

  function refreshTransactions() {
    RestApi.monthRubricTransactions(CurrentDateService.year()).then(function(response) {
      var transactions = {};
      transactions.year = CurrentDateService.year();
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
    CurrentDateService.nextYear();
    refreshTransactions();
  };

  $scope.previousYear = function() {
    CurrentDateService.previousYear();
    refreshTransactions();
  };

  $scope.findMonthRubricSummary = function(startOfMonth, rubric) {
    for (var i in $scope.transactions.monthRubricSummary) {
      var cell = $scope.transactions.monthRubricSummary[i];
      if (cell.startOfMonth == startOfMonth && cell.rubric.id == rubric.id) {
        return cell.amount.toLocaleString();
      }
    }
  };

  $scope.findRubricSummary = function(rubric) {
    for (var i in $scope.transactions.rubricSummary) {
      if ($scope.transactions.rubricSummary[i].rubric.id == rubric.id) {
        return $scope.transactions.rubricSummary[i].amount.toLocaleString();
      }
    }
  };

  $scope.findMonthSummary = function(startOfMonth) {
    for (var i in $scope.transactions.monthSummary) {
      var cell = $scope.transactions.monthSummary[i];
      if (cell.startOfMonth == startOfMonth) {
        return cell.amount.toLocaleString();
      }
    }
  };
});

angular.module("app.transaction").controller("transaction-by-month-tag", function($scope,
    AlertService, CurrentDateService, RestApi) {
  $scope.transactions = {};

  function refreshTransactions() {
    RestApi.monthTagTransactions(CurrentDateService.year()).then(function(response) {
      var transactions = {};
      transactions.year = CurrentDateService.year();
      transactions.tags = response.data.tags;
      transactions.startOfMonths = response.data.startOfMonths;
      transactions.yearSummary = response.data.yearSummary;
      transactions.monthSummary = response.data.monthSummary;
      transactions.tagSummary = response.data.tagSummary;
      transactions.monthTagSummary = response.data.monthTagSummary;
      $scope.transactions = transactions;
    });
  }

  refreshTransactions();

  $scope.nextYear = function() {
    CurrentDateService.nextYear();
    refreshTransactions();
  };

  $scope.previousYear = function() {
    CurrentDateService.previousYear();
    refreshTransactions();
  };

  $scope.findMonthTagSummary = function(startOfMonth, tag) {
    for (var i in $scope.transactions.monthTagSummary) {
      var cell = $scope.transactions.monthTagSummary[i];
      if (cell.startOfMonth == startOfMonth && cell.tag.id == tag.id) {
        return cell.amount.toLocaleString();
      }
    }
  };

  $scope.findTagSummary = function(tag) {
    for (var i in $scope.transactions.tagSummary) {
      if ($scope.transactions.tagSummary[i].tag.id == tag.id) {
        return $scope.transactions.tagSummary[i].amount.toLocaleString();
      }
    }
  };

  $scope.findMonthSummary = function(startOfMonth) {
    for (var i in $scope.transactions.monthSummary) {
      var cell = $scope.transactions.monthSummary[i];
      if (cell.startOfMonth == startOfMonth) {
        return cell.amount.toLocaleString();
      }
    }
  };
});

angular.module("app.transaction").controller("transaction-by-year-rubric", function($scope,
    AlertService, CurrentDateService, RestApi) {
  $scope.transactions = {};

  function refreshTransactions() {
    RestApi.yearRubricTransactions().then(function(response) {
      var transactions = {};
      transactions.year = CurrentDateService.year();
      transactions.rubrics = response.data.rubrics;
      transactions.startOfYears = response.data.startOfYears;
      transactions.yearsSummary = response.data.yearsSummary;
      transactions.yearSummary = response.data.yearSummary;
      transactions.rubricSummary = response.data.rubricSummary;
      transactions.yearRubricSummary = response.data.yearRubricSummary;
      $scope.transactions = transactions;
    });
  }

  refreshTransactions();

  $scope.findYearRubricSummary = function(startOfYear, rubric) {
    for (var i in $scope.transactions.yearRubricSummary) {
      var cell = $scope.transactions.yearRubricSummary[i];
      if (cell.startOfYear == startOfYear && cell.rubric.id == rubric.id) {
        return cell.amount.toLocaleString();
      }
    }
  };

  $scope.findRubricSummary = function(rubric) {
    for (var i in $scope.transactions.rubricSummary) {
      if ($scope.transactions.rubricSummary[i].rubric.id == rubric.id) {
        return $scope.transactions.rubricSummary[i].amount.toLocaleString();
      }
    }
  };

  $scope.findYearSummary = function(startOfYear) {
    for (var i in $scope.transactions.yearSummary) {
      var cell = $scope.transactions.yearSummary[i];
      if (cell.startOfYear == startOfYear) {
        return cell.amount.toLocaleString();
      }
    }
  };
});

angular.module("app.transaction").controller("transaction-by-year-tag", function($scope,
    AlertService, CurrentDateService, RestApi) {
  $scope.transactions = {};

  function refreshTransactions() {
    RestApi.yearTagTransactions().then(function(response) {
      var transactions = {};
      transactions.year = CurrentDateService.year();
      transactions.tags = response.data.tags;
      transactions.startOfYears = response.data.startOfYears;
      transactions.yearsSummary = response.data.yearsSummary;
      transactions.yearSummary = response.data.yearSummary;
      transactions.tagSummary = response.data.tagSummary;
      transactions.yearTagSummary = response.data.yearTagSummary;
      $scope.transactions = transactions;
    });
  }

  refreshTransactions();

  $scope.findYearTagSummary = function(startOfYear, tag) {
    for (var i in $scope.transactions.yearTagSummary) {
      var cell = $scope.transactions.yearTagSummary[i];
      if (cell.startOfYear == startOfYear && cell.tag.id == tag.id) {
        return cell.amount.toLocaleString();
      }
    }
  };

  $scope.findTagSummary = function(tag) {
    for (var i in $scope.transactions.tagSummary) {
      if ($scope.transactions.tagSummary[i].tag.id == tag.id) {
        return $scope.transactions.tagSummary[i].amount.toLocaleString();
      }
    }
  };

  $scope.findYearSummary = function(startOfYear) {
    for (var i in $scope.transactions.yearSummary) {
      var cell = $scope.transactions.yearSummary[i];
      if (cell.startOfYear == startOfYear) {
        return cell.amount.toLocaleString();
      }
    }
  };
});

angular.module("app.transaction").controller("transaction-dashboard", function($scope, RestApi) {
  // Доходы и расходы
  RestApi.yearSummaries().then(function(response) {
    var yearSummaries = response.data;
    var yearDimension = crossfilter(yearSummaries).dimension(function(d) {
      return d.year;
    });
    var savingRateGroup = yearDimension.group().reduce(
        function(p, v) {
          return v;
        },
        function(p, v) {
          return v;
        },
        function() {
          return {};
        }
    );

    var maxIncome = (yearSummaries.reduce(function(a, b) {
      return a.income > b.income ? a : b;
    }).incomeInThousands * 1.1).toFixed(0);

    var maxExpence = (yearSummaries.reduce(function(a, b) {
      return a.expence > b.expence ? a : b;
    }).expenceInThousands * 1.3).toFixed(0);

    var maxSavings = yearSummaries.reduce(function(a, b) {
      return a.savings > b.savings ? a : b;
    }).savingsInThousands;

    var chart = dc.bubbleChart("#year-summary")
        .height(400)
        .margins({top: 10, right: 50, bottom: 35, left: 50})
        .dimension(yearDimension)
        .group(savingRateGroup)
        .x(d3.scale.linear().domain([0, maxIncome]))
        .y(d3.scale.linear().domain([0, maxExpence]))
        .r(d3.scale.linear().domain([0, maxSavings]))
        .maxBubbleRelativeSize(0.05)
        .colors(d3.scale.linear().domain([0, 0.3]).range(["yellow", "green"]))
        .colorAccessor(function(p) {
          return p.value.savingRateNotZero;
        })
        .keyAccessor(function(p) {
          return p.value.incomeInThousands;
        })
        .valueAccessor(function(p) {
          return p.value.expenceInThousands;
        })
        .radiusValueAccessor(function(p) {
          return p.value.savingsInThousandsNotMinus;
        })
        .renderHorizontalGridLines(true)
        .renderVerticalGridLines(true)
        .sortBubbleSize(true)
        .xAxisLabel("Доход (тыс.руб.)")
        .yAxisLabel("Расход (тыс.руб.)")
        .renderTitle(true)
        .title(function(p) {
          return [
            p.key + " год",
            "Доход: " + p.value.incomeInThousands + " тыс.руб.",
            "Расход: " + p.value.expenceInThousands + " тыс.руб.",
            "Сбережения: " + p.value.savingsInThousands + " тыс.руб.",
            "Норма сбережний: " + (p.value.savingRateNotZero * 100).toFixed(1) + "%"
          ].join("\n");
        })
        .render();
  });

  // Норма сбережений
  RestApi.transactionMonthSavingRates().then(function(response) {
    var monthSavingRates = response.data;
    var monthDimension = crossfilter(monthSavingRates).dimension(function(d) {
      return [d3.time.format("%Y-%m-%d").parse(d.startOfMonth), d.monthPeriod];
    });
    var savingRateGroup = monthDimension.group().reduceSum(function(d) {
      return (d.savingRate * 100).toFixed(0);
    });

    var minDate = new Date(monthSavingRates.reduce(function(a, b) {
      return a.startOfMonth < b.startOfMonth ? a : b;
    }).startOfMonth);

    var maxDate = new Date(monthSavingRates.reduce(function(a, b) {
      return a.startOfMonth > b.startOfMonth ? a : b;
    }).startOfMonth);

    var chart = dc.seriesChart("#saving-rate")
        .height(400)
        .margins({top: 10, right: 50, bottom: 35, left: 50})
        .chart(function(c) {
          return dc.lineChart(c).interpolate("monotone").renderDataPoints({radius: 2});
        })
        .dimension(monthDimension)
        .group(savingRateGroup)
        .x(d3.time.scale().domain([minDate, maxDate]))
        .xUnits(d3.time.months)
        .seriesAccessor(function(d) {
          return d.key[1] + " мес.";
        })
        .seriesSort(function sort(a, b) {
          a = parseInt(a.split(" ")[0]);
          b = parseInt(b.split(" ")[0]);
          return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
        })
        .keyAccessor(function(d) {
          return d.key[0];
        })
        .valueAccessor(function(d) {
          return d.value;
        })
        .renderVerticalGridLines(true)
        .renderHorizontalGridLines(true)
        .brushOn(false)
        .xAxisLabel("Месяц")
        .yAxisLabel("Норма сбережений")
        .title(function(d) {
          var format = d3.time.format("%b %Y");
          return d.value + "% (" + format(d.key[0]) + ")";
        })
        .legend(dc.legend().x(75).y(50).itemHeight(20).gap(5).horizontal(10).legendWidth(100).itemWidth(70));
    chart.yAxis().tickFormat(function(v) {
      return v + "%";
    });
    chart.render();
  });
});
