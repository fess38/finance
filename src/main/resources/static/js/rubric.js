angular.module("app.rubric", []);

angular.module("app.rubric").controller("rubric", function($scope, AlertService, RestApi) {
  $scope.refresh = function() {
    RestApi.rubrics().then(function(response) {
      $scope.rubrics = response.data;
    });
  };
  $scope.refresh();

  $scope.saveRubric = function() {
    RestApi.saveRubric($scope.newRubric).then(function() {
      AlertService.success("Рубрика добавлена");
      $scope.newRubric = null;
      $scope.refresh();
    }, function() {
      AlertService.danger("Ошибка добавления рубрики");
    });
  };

  $scope.updateRubric = function(rubric) {
    RestApi.updateRubric(rubric).then(function() {
      AlertService.success("Рубрика обновлена");
    }, function() {
      AlertService.danger("Ошибка обновления рубрики");
    });
  };

  $scope.deleteRubric = function(rubric) {
    RestApi.deleteRubric(rubric).then(function() {
      AlertService.success("Рубрика удалена");
      $scope.refresh();
    }, function() {
      AlertService.danger("Ошибка удаления рубрики");
    });
  }
});
