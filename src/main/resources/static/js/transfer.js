angular.module("app.transfer", []);

angular.module("app.transfer").controller("show-transfers", function($scope, $timeout, RestApi) {
  RestApi.transfers().then(function(response) {
    $scope.transfers = response.data;
  });

  $scope.updateTransaction = function(transaction) {
    RestApi.updateTransaction(transaction).then(function(response) {
      $scope.log = "Транзация обновлена";
    }, function(response) {
      $scope.log = "Ошибка обновления транзакции";
    });
    $timeout(function() {
      $scope.log = null;
    }, 3000);
  };

  $scope.deleteTransfer = function(transaction) {
    RestApi.deleteTransaction(transaction).then(function(response) {
      $scope.log = "Транзация удалена";
    }, function(response) {
      $scope.log = "Ошибка удаления транзакции";
    });
  };

  var transferRubric;
  RestApi.transferRubric().then(function(response) {
    transferRubric = response.data;
  });
  RestApi.accounts().then(function(response) {
    $scope.accounts = response.data;
  });

  $scope.checkEquals = function() {
    if ($scope.newTransfer.accountFrom && $scope.newTransfer.accountTo &&
        $scope.newTransfer.accountFrom.id === $scope.newTransfer.accountTo.id) {
      $scope.newTransfer.accountTo = null;
    }
  };

  function readTransfer() {
    var newTransfer = $scope.newTransfer;
    newTransfer.rubric = transferRubric;
    return newTransfer;
  }

  function clearTransferFields() {
    $scope.newTransfer.aссountFrom = null;
    $scope.newTransfer.accountTo = null;
    $scope.newTransfer.amountFrom = null;
    $scope.newTransfer.amountTo = null;
    $scope.newTransfer.comment = null;
  }

  $scope.addTransfer = function() {
    RestApi.saveTransaction(readTransfer()).then(function(response) {
      $scope.log = "Перевод добавлен";
      clearTransferFields();
    }, function(response) {
      $scope.log = "Ошибка добавления перевода";
    });
    $timeout(function() {
      $scope.log = null;
    }, 3000);
  };
});
