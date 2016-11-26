angular.module("app", ["ngRoute", "ui.bootstrap", "ngAnimate", "ngSanitize",
  "app.restApi", "app.transaction", "app.transfer", "app.rubric", "app.tag", "app.user", "app.account"]);

angular.module("app").config(function($routeProvider) {
  $routeProvider
      .when("/", {templateUrl: "transactionAdd.html"})
      .when("/account", {templateUrl: "account.html"})
      .when("/rubric", {templateUrl: "rubric.html"})
      .when("/tag", {templateUrl: "tag.html"})
      .when("/transaction-by-day-rubric", {templateUrl: "transaction-by-day-rubric.html"})
      .when("/transaction-by-day-rubric/m", {templateUrl: "transaction-by-day-rubric-mobile.html"})
      .when("/transaction-by-month-rubric", {templateUrl: "transaction-by-month-rubric.html"})
      .when("/transaction-by-month-tag", {templateUrl: "transaction-by-month-tag.html"})
      .when("/transaction-by-year-rubric", {templateUrl: "transaction-by-year-rubric.html"})
      .when("/transactionAdd", {templateUrl: "transactionAdd.html"})
      .when("/transfer", {templateUrl: "transfer.html"})
      .when("/transfer/m", {templateUrl: "transfer-mobile.html"})
      .when("/transferAdd", {templateUrl: "transferAdd.html"})
      .when("/user", {templateUrl: "user.html"})
});

angular.module("app").service("CurrentDateService", function() {
  var date = new Date();

  this.yearMonth = function() {
    return {year: date.getFullYear(), month: date.getMonth() + 1};
  };

  this.date = function() {
    return date;
  };

  this.year = function() {
    return date.getFullYear();
  };

  this.nextMonth = function() {
    date.setMonth(date.getMonth() + 1);
  };

  this.previousMonth = function() {
    date.setMonth(date.getMonth() - 1);
  };

  this.mextYear = function() {
    date.setYear(date.getFullYear() + 1);
  };

  this.previousYear = function() {
    date.setYear(date.getFullYear() - 1);
  };
});

angular.module("app").service("AlertService", function($timeout) {
  this.info = function(msg) {
    return response("info", msg);
  };

  this.success = function(msg) {
    return response("success", msg);
  };

  this.warning = function(msg) {
    return response("warning", msg);
  };

  this.danger = function(msg) {
    return response("danger", msg);
  };

  function response(type, msg) {
    var alert = {type: "text-center alert alert-" + type, msg: msg, show: true};
    hide(alert);
    return alert;
  }

  function hide(alert) {
    $timeout(function() {
      alert.show = false;
    }, 3000);
  }
});
