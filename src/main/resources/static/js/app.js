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
