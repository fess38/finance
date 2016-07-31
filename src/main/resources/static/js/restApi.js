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

	this.transactions = function(year, month) {
		return $http.get("/transactions?year=" + year + "&month=" + month).then(function(response) {
			return response.data;
		});
	}

	this.transactionsForCell = function(year, month, day, rubric) {
		return $http.get("/transactions?year=" + year + "&month=" + month + "&day=" + day
				+ "&rubric-id=" + rubric.id).then(function(response) {
			return response.data;
		});
	}
});
