angular.module("app.rubric", []);

angular.module("app.rubric").controller("show-rubrics", function($scope, $timeout, RestApi,
    MonthTransactionsService) {
  $scope.refresh = function() {
    RestApi.rubrics().then(function(response) {
      $scope.rubrics = response.data;
    });
  };
  $scope.refresh();
  
  $scope.updateRubric = function(rubric) {
    RestApi.updateRubric(rubric).then(function(response) {
      MonthTransactionsService.refresh();
      $scope.log = "Рубрика обновлена";
    }, function(response) {
      $scope.log = "Ошибка обновления рубрики";
    });
    $timeout(function() { $scope.log = null; }, 3000);
  };
  
  $scope.saveRubric = function(rubric) {
    RestApi.saveRubric(rubric).then(function(response) {
      $scope.log = "Рубрика добавлена";
      $scope.refresh();
    }, function(response) {
      $scope.log = "Ошибка добавления рубрики";
    });
    $scope.newRubric.name = null;
    $scope.newRubric.isIncome = null;
    $timeout(function() { $scope.log = null; }, 3000);
  };
  
  $scope.deleteRubric = function(rubric) {
    RestApi.deleteRubric(rubric).then(function(response) {
      $scope.log = "Рубрика удалена";
      $scope.refresh();
    }, function(response) {
      $scope.log = "Ошибка удаления рубрики";
    });
    $timeout(function() { $scope.log = null; }, 3000);
  }
});
