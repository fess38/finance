angular.module('app.restApi', []);

angular.module('app.restApi').service('RestApi', function($http) {
	this.users = function() {
		return $http.get("/users").then(function(response) {
			return response.data;
		});
	}

	this.rubrics = function() {
		return $http.get("/rubrics").then(function(response) {
			return response.data;
		});
	}

	this.incomeRubrics = function() {
		return $http.get("/rubrics/income").then(function(response) {
			return response.data;
		});
	}

	this.expenseRubrics = function() {
		return $http.get("/rubrics/expense").then(function(response) {
			return response.data;
		});
	}

	this.masterAccount = function() {
		return $http.get("/accounts/master").then(function(response) {
			return response.data;
		});
	}

	this.outerAccount = function() {
		return $http.get("/accounts/outer").then(function(response) {
			return response.data;
		});
	}

	this.findYearMonthTransactions = function(year, month) {
		return $http.get("/transactions?year=" + year + "&month=" + month);
	}

	this.findCellTransactions = function(rubric, year, month, day) {
	  var query = "/transactions?rubric-id=" + rubric.id + "&year=" + year + "&month=" + month
	  + "&day=" + day;
		return $http.get(query);
	}
	
	this.saveTransaction = function(transaction) {
    return $http.post("/transactions/add", transaction);
  }
	
	this.updateTransaction = function(transaction) {
    return $http.post("/transactions/update", transaction);
  }
	
	this.deleteTransaction = function(transaction) {
    return $http.post("/transactions/delete", transaction);
  }
});
