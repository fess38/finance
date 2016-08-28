angular.module("app.user", []);

angular.module("app.user").controller("user", function($scope, $timeout, RestApi) {
  $scope.refresh = function() {
    RestApi.users().then(function(response) {
      $scope.users = response.data;
    });
  };
  $scope.refresh();
  
  $scope.updateUser = function(user) {
    RestApi.updateUser(user).then(function(response) {
      $scope.log = "Пользователь обновлен";
    }, function(response) {
      $scope.log = "Ошибка обновления пользователя";
    });
    $timeout(function() { $scope.log = null; }, 3000);
  };
  
  $scope.saveUser = function(user) {
    RestApi.saveUser(user).then(function(response) {
      $scope.log = "Пользователь добавлен";
      $scope.refresh();
    }, function(response) {
      $scope.log = "Ошибка добавления пользователя";
    });
    $scope.newUser.name = null;
    $timeout(function() { $scope.log = null; }, 3000);
  };
  
  $scope.deleteUser = function(user) {
    RestApi.deleteUser(user).then(function(response) {
      $scope.log = "Пользователь удален";
      $scope.refresh();
    }, function(response) {
      $scope.log = "Ошибка удаления пользователя";
    });
    $timeout(function() { $scope.log = null; }, 3000);
  }
});
