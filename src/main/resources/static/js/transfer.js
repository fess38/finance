angular.module("app.transfer", []);

angular.module("app.transfer").controller("transfer", function($scope, $timeout, RestApi,
    YearMonthService) {
  var transferRubric;

  RestApi.transferRubric().then(function(response) {
    transferRubric = response.data;
  });

  RestApi.accounts().then(function(response) {
    $scope.accounts = response.data;
  });

  function refresh() {
    RestApi.findTransfers(YearMonthService.getYearMonth()).then(function(response) {
      $scope.transfers = response.data;
    });
  }

  function clearForm() {
    $scope.newTransfer = {dayRef: YearMonthService.getFormattedDate()};
  }


  $scope.nextMonth = function() {
    YearMonthService.incrementMonth();
    refresh();
  };

  $scope.previousMonth = function() {
    YearMonthService.decrementMonth();
    refresh();
  };

  refresh();
  clearForm();

  $scope.saveTransfer = function() {
    $scope.newTransfer.rubric = transferRubric;
    RestApi.saveTransaction($scope.newTransfer).then(function() {
      refresh();
      clearForm();
      $scope.log = "Перевод добавлен";
    }, function() {
      $scope.log = "Ошибка добавления перевода";
    });
    $timeout(function() {
      $scope.log = null;
    }, 3000);
  };

  $scope.updateTransfer = function(transfer) {
    RestApi.updateTransaction(transfer).then(function() {
      $scope.log = "Перевод обновлен";
    }, function() {
      $scope.log = "Ошибка обновления перевода";
    });
    $timeout(function() {
      $scope.log = null;
    }, 3000);
  };

  $scope.deleteTransfer = function(transfer) {
    RestApi.deleteTransaction(transfer).then(function() {
      refresh();
      $scope.log = "Перевод удален";
    }, function() {
      $scope.log = "Ошибка удаления перевода";
    });
  };

  $scope.checkEquals = function() {
    if ($scope.newTransfer.accountFrom && $scope.newTransfer.accountTo &&
        $scope.newTransfer.accountFrom.id === $scope.newTransfer.accountTo.id) {
      $scope.newTransfer.accountTo = null;
    }
  };
});
