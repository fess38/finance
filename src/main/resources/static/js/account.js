angular.module("app.account", []);

angular.module("app.account").controller("account", function($scope, $timeout, RestApi) {
  $scope.refresh = function() {
    RestApi.accounts().then(function(response) {
      $scope.accounts = response.data;
    });
    RestApi.currencies().then(function(response) {
      $scope.currencies = response.data;
    });
  };
  $scope.refresh();

  $scope.saveAccount = function() {
    RestApi.saveAccount($scope.newAccount).then(function(response) {
      $scope.newAccount.name = null;
      $scope.newAccount.currency = null;
      $scope.log = "Счет добавлен";
      $scope.refresh();
    }, function(response) {
      $scope.log = "Ошибка добавления счета";
    });
    $timeout(function() {
      $scope.log = null;
    }, 3000);
  };

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
