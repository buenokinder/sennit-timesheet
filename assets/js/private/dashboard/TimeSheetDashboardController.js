

app.controller('TimeSheetDashboardController',['$scope','$http', function($scope,$http){
  	$scope.me =  window.SAILS_LOCALS.me;
  	$scope.timesheets = [];
	$scope.projects = [];
	$scope.project = [];
	$scope.dataInicial;
	$scope.dataFinal ;

  	$scope.init = function(){
		$scope.getProjects();
  	};

  	$scope.getProjects = function(){
    	$http.get('/projects')
			.then(function onSuccess(sailsResponse){
				$scope.projects  =angular.fromJson(sailsResponse.data);
           
			})
			.catch(function onError(sailsResponse){
				var emailAddressAlreadyInUse = sailsResponse.status == 409;
       		});
    };

    $scope.buscar = function(){

			
			   query = window.JSON.stringify({"data":{"<": new Date($scope.dataFinal) ,">":  new Date($scope.dataInicial)  },"project":  $scope.project.id });
    		$http.get('timesheet?where=' + query)
			.then(function onSuccess(sailsResponse){
				$scope.timesheets  =angular.fromJson(sailsResponse.data);
           
			})
			.catch(function onError(sailsResponse){
				var emailAddressAlreadyInUse = sailsResponse.status == 409;
       		});
	};
}]);