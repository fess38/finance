angular.module("app", ["ngRoute", "ui.bootstrap",
  "app.restApi", "app.transaction", "app.transfer", "app.rubric", "app.tag", "app.user", "app.account"]);

angular.module("app").config(function($routeProvider) {
  $routeProvider
      .when("/", {templateUrl: "transaction.html"})
      .when("/account", {templateUrl: "account.html"})
      .when("/rubric", {templateUrl: "rubric.html"})
      .when("/tag", {templateUrl: "tag.html"})
      .when("/transaction", {templateUrl: "transaction.html"})
      .when("/transfer", {templateUrl: "transfer.html"})
      .when("/user", {templateUrl: "user.html"})
});

angular.module("app").service("YearMonthService", function() {
  var date = new Date();

  this.getYearMonth = function() {
    return {year: date.getFullYear(), month: date.getMonth() + 1};
  };

  this.getDate = function() {
    return date;
  };

  this.incrementMonth = function() {
    date.setMonth(date.getMonth() + 1);
  };

  this.decrementMonth = function() {
    date.setMonth(date.getMonth() - 1);
  };
});
