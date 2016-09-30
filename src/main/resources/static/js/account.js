angular.module("app.account", []);

angular.module("app.account").controller("account", function($scope, AlertService, RestApi) {
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
    RestApi.saveAccount($scope.newAccount).then(function() {
      $scope.alert = AlertService.success("Счет добавлен");
      $scope.newAccount = null;
      $scope.refresh();
    }, function() {
      $scope.alert = AlertService.danger("Ошибка добавления счета");
    });
  };

  $scope.updateAccount = function(account) {
    RestApi.updateAccount(account).then(function() {
      $scope.alert = AlertService.success("Счет обновлен");
    }, function() {
      $scope.alert = AlertService.danger("Ошибка обновления счета");
    });
  };

  $scope.deleteAccount = function(account) {
    RestApi.deleteAccount(account).then(function() {
      $scope.alert = AlertService.success("Счет удален");
      $scope.refresh();
    }, function() {
      $scope.alert = AlertService.danger("Ошибка удаления счета");
    });
  }
});
