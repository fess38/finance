angular.module("app.rubrics", []);

angular.module("app.rubrics").controller("show-rubrics", function($scope, $timeout, RestApi,
    MonthTransactionsService) {
  $scope.refresh = function() {
    RestApi.rubrics().then(function(response) {
      $scope.rubrics = response.data;
    });
  }
  $scope.refresh();
  
  $scope.updateRubric = function(rubric) {
    console.log(rubric);
    RestApi.updateRubric(rubric).then(function(response) {
      MonthTransactionsService.refresh();
      $scope.log = "Рубрика обновлена";
    }, function(response) {
      $scope.log = "Ошибка обновления рубрики";
    });
    $timeout(function() { $scope.log = null; }, 3000);
  }
  
  $scope.save = function() {
    var rubric = {name:$scope.newRubric.name, isIncome:$scope.newRubric.isIncome};
    console.log(rubric);
    RestApi.addRubric(rubric).then(function(response) {
      $scope.log = "Рубрика добавлена";
      $scope.newRubric.name = null;
      $scope.newRubric.isIncome = null;
      $scope.refresh();
    }, function(response) {
      $scope.log = "Ошибка добавления рубрики";
    });
    $timeout(function() { $scope.log = null; }, 3000);
  }
});
