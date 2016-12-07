angular.module("app.tag", []);

angular.module("app.tag").controller("tag", function($scope, AlertService, RestApi) {
  $scope.refresh = function() {
    RestApi.tags().then(function(response) {
      $scope.tags = response.data;
    });
    RestApi.rubrics().then(function(response) {
      $scope.rubrics = response.data;
    });
  };
  $scope.refresh();

  $scope.saveTag = function() {
    RestApi.saveTag($scope.newTag).then(function() {
      AlertService.success("Тэг добавлен");
      $scope.newTag = null;
      $scope.refresh();
    }, function() {
      AlertService.danger("Ошибка добавления тэга");
    });
  };

  $scope.updateTag = function(tag) {
    RestApi.updateTag(tag).then(function() {
      AlertService.success("Тэг обновлен");
    }, function() {
      AlertService.danger("Ошибка обновления тэга");
    });
  };

  $scope.deleteTag = function(tag) {
    RestApi.deleteTag(tag).then(function() {
      AlertService.success("Тэг удален");
      $scope.refresh();
    }, function() {
      AlertService.danger("Ошибка удаления тэга");
    });
  }
});
