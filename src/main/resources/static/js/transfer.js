angular.module("app.transfer", []);

angular.module("app.transfer").controller("transfer", function($scope, RestApi, YearMonthService,
    AlertService) {
  function refresh() {
    $scope.yearMonth = YearMonthService.getDate();
    RestApi.findTransfers(YearMonthService.getYearMonth()).then(function(response) {
      $scope.transfers = response.data;
    });
  }

  refresh();

  $scope.nextMonth = function() {
    YearMonthService.incrementMonth();
    refresh();
  };

  $scope.previousMonth = function() {
    YearMonthService.decrementMonth();
    refresh();
  };

  $scope.updateTransfer = function(transfer) {
    RestApi.updateTransaction(transfer).then(function() {
      $scope.alert = AlertService.success("Перевод обновлен");
    }, function() {
      $scope.alert = AlertService.danger("Ошибка обновления перевода");
    });
  };

  $scope.deleteTransfer = function(transfer) {
    RestApi.deleteTransaction(transfer).then(function() {
      $scope.alert = AlertService.success("Перевод удален");
      refresh();
    }, function() {
      $scope.alert = AlertService.danger("Ошибка удаления перевода");
    });
  };
});

angular.module("app.transfer").controller("saveTransfer", function($scope, AlertService,
    RestApi, YearMonthService) {
  var transferRubric;
  $scope.newTransfer = {dayRef: new Date()};

  RestApi.transferRubric().then(function(response) {
    transferRubric = response.data;
  });

  RestApi.accounts().then(function(response) {
    $scope.accounts = response.data;
  });

  $scope.saveTransfer = function() {
    $scope.newTransfer.rubric = transferRubric;
    RestApi.saveTransaction($scope.newTransfer).then(function() {
      $scope.alert = AlertService.success("Перевод добавлен");
      refresh();
      $scope.newTransfer.amountFrom = null;
      $scope.newTransfer.amountTo = null;
    }, function() {
      $scope.alert = AlertService.danger("Ошибка добавления перевода");
    });
  };

  $scope.checkEquals = function() {
    if ($scope.newTransfer.accountFrom && $scope.newTransfer.accountTo &&
        $scope.newTransfer.accountFrom.id === $scope.newTransfer.accountTo.id) {
      $scope.newTransfer.accountTo = null;
    }
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
