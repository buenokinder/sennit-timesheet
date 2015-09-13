var app = angular.module('DashboardModule', [
    	'ngRoute',
    	'ngResource',
    	'ui.bootstrap'
    ]);

app.controller('DashboardController', [ function(){

}]);

app.controller('TimeSheetController', ['$scope','$http', function($scope,$http){

    $scope.timesheets = [];
    
    $scope.delete = function(timesheet){
        $http.delete('/timesheet/' + timesheet.id )
            .then(function (timesheet) {
                 $scope.timesheets = [];
        });
    };
  

 
  
    $scope.changeDate = function(date){
        var theDate = Date.parse(date); 
        
                var str = window.JSON.stringify({data:{equals: new Date(date)}});
        
        
console.log(str);
        $http.get('/timesheet?where=' + str)
		.then(function onSuccess(sailsResponse){
			$scope.timesheets  =angular.fromJson(sailsResponse.data);
            console.log($scope.timesheets);
		})
		.catch(function onError(sailsResponse){

		// Handle known error type(s).
		// If using sails-disk adpater -- Handle Duplicate Key
		var emailAddressAlreadyInUse = sailsResponse.status == 409;
       });
    };

    
}]);

app.controller('TimeSheetNewController', ['$scope','$http', function($scope,$http){
    
  $scope.hora = [];
  $scope.data = [];

    // set-up loading state
	$scope.timesheetForm = {
		loading: false
	}

	$scope.submitTimesheetForm = function(){

		// Set the loading state (i.e. show loading spinner)
		$scope.timesheetForm.loading = true;

		// Submit request to Sails.
		$http.post('/timesheet', {
			data: $scope.data,
			quantityTime: $scope.hora,
			owner: window.SAILS_LOCALS.me.id,
			project: $scope.project
		})
		.then(function onSuccess(sailsResponse){
			window.location = '/';
		})
		.catch(function onError(sailsResponse){

		

		})
		.finally(function eitherWay(){
			$scope.timesheetForm.loading = false;
		})
	};

    
  $scope.options = {
    horas: [0.5,1,1.5, 2, 2.5, 3, 3.5 , 4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12.5,13,13.5,14,14.5,15,15.5,16],
  };
     $scope.projects = [];
     $scope.project = [];
    $scope.getProjects = function(){
    $http.get('/projects')
		.then(function onSuccess(sailsResponse){
			$scope.projects  =angular.fromJson(sailsResponse.data);
            console.log($scope.projects);
		})
		.catch(function onError(sailsResponse){

		// Handle known error type(s).
		// If using sails-disk adpater -- Handle Duplicate Key
		var emailAddressAlreadyInUse = sailsResponse.status == 409;
       });
    };
    
    
$scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
  };

    $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };
    
      $scope.open = function($event) {
    $scope.status.opened = true;
  };
    
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[2];
    
    $scope.status = {
    opened: false
  };
    
}]);

app.controller('TimeSheetEditController', ['$scope','$http','$routeParams', function($scope,$http,$routeParams){
    
  $scope.hora = [];
  $scope.data = [];

    // set-up loading state
	$scope.timesheetForm = {
		loading: false
	}

    
    
    
	$scope.submitTimesheetForm = function(){

		// Set the loading state (i.e. show loading spinner)
		$scope.timesheetForm.loading = true;

		// Submit request to Sails.
		$http.put('/timesheet/' + $routeParams.id + '?data='+ $scope.timesheet.data+ '&quantityTime='+ $scope.timesheet.quantityTime + '&owner=' + window.SAILS_LOCALS.me.id + '&project='+ $scope.timesheet.project.id)
		.then(function onSuccess(sailsResponse){
			window.location = '/';
		})
		.catch(function onError(sailsResponse){

		

		})
		.finally(function eitherWay(){
			$scope.timesheetForm.loading = false;
		})
	};

    
  $scope.options = {
    horas: [0.5,1,1.5, 2, 2.5, 3, 3.5 , 4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12.5,13,13.5,14,14.5,15,15.5,16],
  };
    
      $scope.timesheet = [];
     $scope.projects = [];
     $scope.project = [];
    $scope.getProjects = function(){
    $http.get('/projects')
		.then(function onSuccess(sailsResponse){
			$scope.projects  =angular.fromJson(sailsResponse.data);
            console.log($scope.projects);
		})
		.catch(function onError(sailsResponse){

		// Handle known error type(s).
		// If using sails-disk adpater -- Handle Duplicate Key
		var emailAddressAlreadyInUse = sailsResponse.status == 409;
       });
        $http.get('/timesheet/' + $routeParams.id)
		.then(function onSuccess(sailsResponse){
			$scope.timesheet  =angular.fromJson(sailsResponse.data);
            console.log($scope.timesheet);
            
		})
		.catch(function onError(sailsResponse){

		// Handle known error type(s).
		// If using sails-disk adpater -- Handle Duplicate Key
		var emailAddressAlreadyInUse = sailsResponse.status == 409;
       });
    };
    
    
$scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
  };

    $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };
    
      $scope.open = function($event) {
    $scope.status.opened = true;
  };
    
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[2];
    
    $scope.status = {
    opened: false
  };
    
}]);

app.config(['$routeProvider',  function ($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: '/views/dashboard.html',
      controller : 'DashboardController'
    });

    $routeProvider.when('/timesheet', {
        templateUrl: '/views/timesheet/index.html',
        controller : 'TimeSheetController'
    }).when('/timesheet/new',{
        templateUrl: '/views/timesheet/new.html',
        controller : 'TimeSheetNewController'
    }).when('/timesheet/:id',{
        templateUrl: '/views/timesheet/edit.html',
        controller : 'TimeSheetEditController'
    });

    
    $routeProvider.when('/project', {
        templateUrl: '/views/project/index.html',
        controller : 'ProjectController'
    }).when('/project/new',{
        templateUrl: '/views/project/new.html',
        controller : 'ProjectNewController'
    }).when('/project/:id',{
        templateUrl: '/views/project/edit.html',
        controller : 'ProjectEditController'
    });
    
    
    $routeProvider.otherwise({
      redirectTo: '/'
    });

    //$locationProvider.html5Mode(true);

  }]);
