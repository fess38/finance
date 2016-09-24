angular.module("app.rubric", []);

angular.module("app.rubric").controller("rubric", function($scope, $timeout, RestApi) {
  $scope.refresh = function() {
    RestApi.rubrics().then(function(response) {
      $scope.rubrics = response.data;
    });
  };
  $scope.refresh();

  $scope.saveRubric = function() {
    RestApi.saveRubric($scope.newRubric).then(function(response) {
      $scope.newRubric.name = null;
      $scope.newRubric.isIncome = null;
      $scope.log = "Рубрика добавлена";
      $scope.refresh();
    }, function(response) {
      $scope.log = "Ошибка добавления рубрики";
    });
    $timeout(function() {
      $scope.log = null;
    }, 3000);
  };

  $scope.updateRubric = function(rubric) {
    RestApi.updateRubric(rubric).then(function(response) {
      $scope.log = "Рубрика обновлена";
    }, function(response) {
      $scope.log = "Ошибка обновления рубрики";
    });
    $timeout(function() {
      $scope.log = null;
    }, 3000);
  };

  $scope.deleteRubric = function(rubric) {
    RestApi.deleteRubric(rubric).then(function(response) {
      $scope.log = "Рубрика удалена";
      $scope.refresh();
    }, function(response) {
      $scope.log = "Ошибка удаления рубрики";
    });
    $timeout(function() {
      $scope.log = null;
    }, 3000);
  }
});
