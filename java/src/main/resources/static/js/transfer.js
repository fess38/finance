angular.module("app.transfer", []);

angular.module("app.transfer").controller("transfer", function($scope, RestApi, CurrentDateService,
    AlertService) {
  function refresh() {
    $scope.yearMonth = CurrentDateService.date();
    RestApi.transfers(CurrentDateService.yearMonth()).then(function(response) {
      $scope.transfers = response.data;
    });
  }

  refresh();

  $scope.nextMonth = function() {
    CurrentDateService.nextMonth();
    refresh();
  };

  $scope.previousMonth = function() {
    CurrentDateService.previousMonth();
    refresh();
  };

  $scope.updateTransfer = function(transfer) {
    RestApi.updateTransaction(transfer).then(function() {
      AlertService.success("Перевод обновлен");
    }, function() {
      AlertService.danger("Ошибка обновления перевода");
    });
  };

  $scope.deleteTransfer = function(transfer) {
    RestApi.deleteTransaction(transfer).then(function() {
      AlertService.success("Перевод удален");
      refresh();
    }, function() {
      AlertService.danger("Ошибка удаления перевода");
    });
  };
});

angular.module("app.transfer").controller("saveTransfer", function($scope, AlertService, RestApi) {
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
      AlertService.success("Перевод добавлен");
      $scope.newTransfer.amountFrom = null;
      $scope.newTransfer.amountTo = null;
    }, function() {
      AlertService.danger("Ошибка добавления перевода");
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
