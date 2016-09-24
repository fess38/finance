angular.module("app.tag", []);

angular.module("app.tag").controller("tag", function($scope, $timeout, RestApi) {
  $scope.refresh = function() {
    RestApi.tags().then(function(response) {
      $scope.tags = response.data;
    });
  };
  $scope.refresh();

  $scope.saveTag = function() {
    RestApi.saveTag($scope.newTag).then(function() {
      $scope.newTag = null;
      $scope.log = "Тэг добавлен";
      $scope.refresh();
    }, function() {
      $scope.log = "Ошибка добавления тэга";
    });
    $timeout(function() {
      $scope.log = null;
    }, 3000);
  };

  $scope.updateTag = function(tag) {
    RestApi.updateTag(tag).then(function() {
      $scope.log = "Тэг обновлен";
    }, function() {
      $scope.log = "Ошибка обновления тэга";
    });
    $timeout(function() {
      $scope.log = null;
    }, 3000);
  };

  $scope.deleteTag = function(tag) {
    RestApi.deleteTag(tag).then(function() {
      $scope.log = "Тэг удален";
      $scope.refresh();
    }, function() {
      $scope.log = "Ошибка удаления тэга";
    });
    $timeout(function() {
      $scope.log = null;
    }, 3000);
  }
});
