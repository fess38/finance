angular.module("app.account", []);

angular.module("app.account").controller("show-accounts", function($scope, $timeout, RestApi) {
  $scope.refresh = function() {
    RestApi.accounts().then(function(response) {
      $scope.accounts = response.data;
    });
    RestApi.currencies().then(function(response) {
      $scope.currencies = response.data;
    });
  };
  $scope.refresh();

  $scope.updateAccount = function(account) {
    RestApi.updateAccount(account).then(function(response) {
      $scope.log = "Счет обновлен";
    }, function(response) {
      $scope.log = "Ошибка обновления счета";
    });
    $timeout(function() {
      $scope.log = null;
    }, 3000);
  };

  $scope.saveAccount = function() {
    RestApi.saveAccount($scope.newAccount).then(function(response) {
      $scope.log = "Счет добавлен";
      $scope.newAccount.name = null;
      $scope.newAccount.currency = null;
      $scope.refresh();
    }, function(response) {
      $scope.log = "Ошибка добавления счета";
    });
    $timeout(function() {
      $scope.log = null;
    }, 3000);
  };

  $scope.deleteAccount = function(account) {
    RestApi.deleteAccount(account).then(function(response) {
      $scope.log = "Счет удален";
      $scope.refresh();
    }, function(response) {
      $scope.log = "Ошибка удаления счета";
    });
    $timeout(function() {
      $scope.log = null;
    }, 3000);
  }
});

angular.module("app.account").controller("show-transfers", function($scope, $timeout, RestApi) {
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
});

angular.module("app.account").controller("add-transfer", function($scope, $timeout, RestApi) {
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
