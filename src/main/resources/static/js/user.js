angular.module("app.user", []);

angular.module("app.user").controller("user", function($scope, RestApi, AlertService) {
  $scope.refresh = function() {
    RestApi.users().then(function(response) {
      $scope.users = response.data;
    });
  };
  $scope.refresh();

  $scope.saveUser = function() {
    RestApi.saveUser($scope.newUser).then(function() {
      $scope.newUser = null;
      $scope.alert = AlertService.success("Пользователь добавлен");
      $scope.refresh();
    }, function() {
      $scope.alert = AlertService.danger("Ошибка добавления пользователя");
    });
  };

  $scope.updateUser = function(user) {
    RestApi.updateUser(user).then(function() {
      $scope.alert = AlertService.success("Пользователь обновлен");
    }, function() {
      $scope.alert = AlertService.danger("Ошибка обновления пользователя");
    });
  };

  $scope.deleteUser = function(user) {
    RestApi.deleteUser(user).then(function(response) {
      console.log(response.data);
      $scope.alert = AlertService.success("Пользователь удален");
      $scope.refresh();
    }, function() {
      $scope.alert = AlertService.danger("Ошибка удаления пользователя");
    });
  }
});
