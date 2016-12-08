angular.module("app.restApi", []);

angular.module("app.restApi").service("RestApi", function($http) {
  // Account
  this.accounts = function() {
    return $http.get("/account/get");
  };

  this.saveAccount = function(account) {
    return $http.post("/account/save", account);
  };

  this.updateAccount = function(account) {
    return $http.post("/account/update", account);
  };

  this.deleteAccount = function(account) {
    return $http.post("/account/delete", account);
  };

  this.masterAccount = function() {
    return $http.get("/account/master");
  };

  this.outerAccount = function() {
    return $http.get("/account/outer");
  };

  // Currency
  this.currencies = function() {
    return $http.get("/currency/get");
  };

  this.saveCurrency = function(currency) {
    return $http.post("/currency/save", currency);
  };

  this.updateCurrency = function(currency) {
    return $http.post("/currency/update", currency);
  };

  this.deleteCurrency = function(currency) {
    return $http.post("/currency/delete", currency);
  };

  // Rubric
  this.rubrics = function() {
    return $http.get("/rubric/get");
  };

  this.transferRubric = function() {
    return $http.get("/rubric/transfer");
  };

  this.saveRubric = function(rubric) {
    return $http.post("/rubric/save", rubric);
  };

  this.updateRubric = function(rubric) {
    return $http.post("/rubric/update", rubric);
  };

  this.deleteRubric = function(rubric) {
    return $http.post("/rubric/delete", rubric);
  };

  // Tag
  this.tags = function() {
    return $http.get("/tag/get");
  };

  this.saveTag = function(tag) {
    return $http.post("/tag/save", tag);
  };

  this.updateTag = function(tag) {
    return $http.post("/tag/update", tag);
  };

  this.deleteTag = function(tag) {
    return $http.post("/tag/delete", tag);
  };

  // Transaction
  this.dayRubricTransactions = function(yearMonth) {
    return $http.get("/transaction/year/" + yearMonth.year + "/month/" + yearMonth.month + "/rubric");
  };

  this.monthRubricTransactions = function(year) {
    return $http.get("/transaction/year/" + year + "/rubric");
  };

  this.monthTagTransactions = function(year) {
    return $http.get("/transaction/year/" + year + "/tag");
  };

  this.yearRubricTransactions = function() {
    return $http.get("/transaction/year/all/rubric");
  };

  this.yearTagTransactions = function() {
    return $http.get("/transaction/year/all/tag");
  };

  this.cellDayRubricTransactions = function(date, rubric) {
    return $http.get("/transaction/day/" + date + "/rubric/" + rubric.id);
  };

  this.cellMonthRubricTransactions = function(yearMonth, rubric) {
    return $http.get("/transaction/year/" + yearMonth.year + "/month/" + yearMonth.month
        + "/rubric/" + rubric.id);
  };

  this.saveTransaction = function(transaction) {
    return $http.post("/transaction/save", transaction);
  };

  this.updateTransaction = function(transaction) {
    return $http.post("/transaction/update", transaction);
  };

  this.deleteTransaction = function(transaction) {
    return $http.post("/transaction/delete", transaction);
  };

  this.transfers = function(yearMonth) {
    return $http.get("/transfer/year/" + yearMonth.year + "/month/" + yearMonth.month);
  };

  // User
  this.users = function() {
    return $http.get("/user/get");
  };

  this.saveUser = function(transaction) {
    return $http.post("/user/save", transaction);
  };

  this.updateUser = function(transaction) {
    return $http.post("/user/update", transaction);
  };

  this.deleteUser = function(transaction) {
    return $http.post("/user/delete", transaction);
  }
});
