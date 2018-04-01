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
      AlertService.success("Пользователь добавлен");
      $scope.refresh();
    }, function() {
      AlertService.danger("Ошибка добавления пользователя");
    });
  };

  $scope.updateUser = function(user) {
    RestApi.updateUser(user).then(function() {
      AlertService.success("Пользователь обновлен");
    }, function() {
      AlertService.danger("Ошибка обновления пользователя");
    });
  };

  $scope.deleteUser = function(user) {
    RestApi.deleteUser(user).then(function(response) {
      AlertService.success("Пользователь удален");
      $scope.refresh();
    }, function() {
      AlertService.danger("Ошибка удаления пользователя");
    });
  }
});
