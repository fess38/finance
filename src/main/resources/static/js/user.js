angular.module("app.user", []);

angular.module("app.user").controller("user", function($scope, $timeout, RestApi) {
  $scope.refresh = function() {
    RestApi.users().then(function(response) {
      $scope.users = response.data;
    });
  };
  $scope.refresh();

  $scope.saveUser = function() {
    RestApi.saveUser($scope.newUser).then(function(response) {
      $scope.newUser.name = null;
      $scope.log = "Пользователь добавлен";
      $scope.refresh();
    }, function(response) {
      $scope.log = "Ошибка добавления пользователя";
    });

    $timeout(function() {
      $scope.log = null;
    }, 3000);
  };

  $scope.updateUser = function(user) {
    RestApi.updateUser(user).then(function(response) {
      $scope.log = "Пользователь обновлен";
    }, function(response) {
      $scope.log = "Ошибка обновления пользователя";
    });
    $timeout(function() {
      $scope.log = null;
    }, 3000);
  };

  $scope.deleteUser = function(user) {
    RestApi.deleteUser(user).then(function(response) {
      $scope.log = "Пользователь удален";
      $scope.refresh();
    }, function(response) {
      $scope.log = "Ошибка удаления пользователя";
    });
    $timeout(function() {
      $scope.log = null;
    }, 3000);
  }
});
