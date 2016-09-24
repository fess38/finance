angular.module("app.transfer", []);

angular.module("app.transfer").controller("transfer", function($scope, $timeout, RestApi) {
  var transferRubric;

  $scope.refresh = function() {
    RestApi.transfers().then(function(response) {
      $scope.transfers = response.data;
    });

    RestApi.transferRubric().then(function(response) {
      transferRubric = response.data;
    });

    RestApi.accounts().then(function(response) {
      $scope.accounts = response.data;
    });
  };
  $scope.refresh();

  $scope.saveTransfer = function() {
    $scope.newTransfer.rubric = transferRubric;
    RestApi.saveTransaction($scope.newTransfer).then(function(response) {
      $scope.newTransfer.aссountFrom = null;
      $scope.newTransfer.accountTo = null;
      $scope.newTransfer.amountFrom = null;
      $scope.newTransfer.amountTo = null;
      $scope.newTransfer.comment = null;
      $scope.refresh();
      $scope.log = "Перевод добавлен";
    }, function(response) {
      $scope.log = "Ошибка добавления перевода";
    });
    $timeout(function() {
      $scope.log = null;
    }, 3000);
  };

  $scope.updateTransfer = function(transfer) {
    RestApi.updateTransaction(transfer).then(function(response) {
      $scope.log = "Перевод обновлен";
    }, function(response) {
      $scope.log = "Ошибка обновления перевода";
    });
    $timeout(function() {
      $scope.log = null;
    }, 3000);
  };

  $scope.deleteTransfer = function(transfer) {
    RestApi.deleteTransaction(transfer).then(function(response) {
      $scope.refresh();
      $scope.log = "Перевод удален";
    }, function(response) {
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
