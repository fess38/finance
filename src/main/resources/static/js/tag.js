angular.module("app.tag", []);

angular.module("app.tag").controller("tag", function($scope, AlertService, RestApi) {
  $scope.refresh = function() {
    RestApi.tags().then(function(response) {
      $scope.tags = response.data;
    });
  };
  $scope.refresh();

  $scope.saveTag = function() {
    RestApi.saveTag($scope.newTag).then(function() {
      $scope.alert = AlertService.success("Тэг добавлен");
      $scope.newTag = null;
      $scope.refresh();
    }, function() {
      $scope.alert = AlertService.danger("Ошибка добавления тэга");
    });
  };

  $scope.updateTag = function(tag) {
    RestApi.updateTag(tag).then(function() {
      $scope.alert = AlertService.success("Тэг обновлен");
    }, function() {
      $scope.alert = AlertService.danger("Ошибка обновления тэга");
    });
  };

  $scope.deleteTag = function(tag) {
    RestApi.deleteTag(tag).then(function() {
      $scope.alert = AlertService.success("Тэг удален");
      $scope.refresh();
    }, function() {
      $scope.alert = AlertService.danger("Ошибка удаления тэга");
    });
  }
});