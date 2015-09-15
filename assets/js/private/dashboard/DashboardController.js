var app = angular.module('DashboardModule', [
    	'ngRoute',
    	'ngResource',
    	'ui.bootstrap'
    ]);

app.controller('DashboardController', [ '$scope', function($scope){
 

  $scope.isAdmin =  window.SAILS_LOCALS.me.isAdmin;
}]);

//TimeSheet Controllers

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
        
                var str = window.JSON.stringify({data:{equals: new Date(date)},"owner":{"equals": window.SAILS_LOCALS.me.id }});
        
        
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
    $scope.description = [];
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
			project: $scope.project,
            description: $scope.description
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
		$http.put('/timesheet/' + $routeParams.id + '?data='+ $scope.timesheet.data+ '&description=' +   $scope.timesheet.description+ '&quantityTime='+ $scope.timesheet.quantityTime + '&owner=' + window.SAILS_LOCALS.me.id + '&project='+ $scope.timesheet.project.id)
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

//End TimeSheet Controllers

//Project Controllers

app.controller('ProjectController', ['$scope','$http', function($scope,$http){

    $scope.projects = [];
    
    $scope.delete = function(project){
        $http.delete('/project/' + project.id )
            .then(function (project) {
              $scope.getProjects();   
        });
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

    
}]);

app.controller('ProjectNewController', ['$scope','$http', function($scope,$http){
    
  $scope.name = [];
 
    // set-up loading state
	$scope.timesheetForm = {
		loading: false
	}

	$scope.submitTimesheetForm = function(){

		// Set the loading state (i.e. show loading spinner)
		$scope.timesheetForm.loading = true;

		// Submit request to Sails.
		$http.post('/projects', {
			name: $scope.name
		})
		.then(function onSuccess(sailsResponse){
			window.location = '/#/project';
		})
		.catch(function onError(sailsResponse){

		

		})
		.finally(function eitherWay(){
			$scope.timesheetForm.loading = false;
		})
	};

 
     $scope.project = [];
  
    

}]);

app.controller('ProjectEditController', ['$scope','$http','$routeParams', function($scope,$http,$routeParams){
 

    // set-up loading state
	$scope.timesheetForm = {
		loading: false
	}

    
    
    
	$scope.submitTimesheetForm = function(){

		// Set the loading state (i.e. show loading spinner)
		$scope.timesheetForm.loading = true;

		// Submit request to Sails.
		$http.put('/projects/' + $routeParams.id + '?name='+ $scope.project.name)
		.then(function onSuccess(sailsResponse){
			window.location = '/#/project';
		})
		.catch(function onError(sailsResponse){

		

		})
		.finally(function eitherWay(){
			$scope.timesheetForm.loading = false;
		})
	};


     $scope.project = [];
    $scope.getProjects = function(){
    $http.get('/projects/' + $routeParams.id)
		.then(function onSuccess(sailsResponse){
			$scope.project  =angular.fromJson(sailsResponse.data);
            console.log($scope.project);
		})
		.catch(function onError(sailsResponse){

		// Handle known error type(s).
		// If using sails-disk adpater -- Handle Duplicate Key
		var emailAddressAlreadyInUse = sailsResponse.status == 409;
       });
        
    };
    
    
    
}]);

app.controller('tiposController', ['$scope', '$http', function($scope, $http){

  $scope.tipos = [];
  $scope.tipo = [];

  $scope.init = function(){
    $http.get("tipoativo").then(function(results) {
      $scope.tipos = angular.fromJson(results.data);
        console.log($scope.tipos);
    });
  
  };
  // set-up loading state
	$scope.timesheetForm = {
		loading: false
	}

  $scope.gravarTipos = function() {
      console.log('teste');
      // Set the loading state (i.e. show loading spinner)
		$scope.timesheetForm.loading = true;

		// Submit request to Sails.
		$http.post('/tipoativo', {
			name: $scope.tipo.name
		})
		.then(function onSuccess(sailsResponse){
			window.location = '/#/type';
		})
		.catch(function onError(sailsResponse){

		

		})
		.finally(function eitherWay(){
			$scope.timesheetForm.loading = false;
		})
   
  };

    
  $scope.delete = function(id){
       $http.delete('/tipoativo/' + id )
            .then(function (project) {
              $scope.init();   
        });
      
  };
}]);

app.controller('tiposUpdateController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
 
  $scope.tipo = [];
  
 
  
  $scope.update = function() {
      
      // Submit request to Sails.
		$http.put('/tipoativo/' + $routeParams.id + '?name='+ $scope.tipo.name)
		.then(function onSuccess(sailsResponse){
			window.location = '/#/type';
		})
		.catch(function onError(sailsResponse){

		

		})
		.finally(function eitherWay(){
			$scope.timesheetForm.loading = false;
		})
  
  };
  
  $http.get("/tipoativo/" + $routeParams.id).then(function(results) {
    $scope.tipo = angular.fromJson(results.data);
  });
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
    
    
    $routeProvider.when("/asset", {
		controller: "ativosController",
		templateUrl: "/views/ativo/grid.html"
	}).when("/asset/novo", {
		controller: "ativosController",
		templateUrl: "/views/ativo/form.html"
	}).when("/asset/:id", {
		controller: "ativosUpdateController",
		templateUrl: "/views/ativo/form-edit.html"
	});

	$routeProvider.when("/type", {
		controller: "tiposController",
		templateUrl: "/views/tipo/grid.html"
	}).when("/type/new", {
		controller: "tiposController",
		templateUrl: "/views/tipo/form.html"
	}).when("/type/:id", {
		controller: "tiposUpdateController",
    templateUrl: "/views/tipo/form-edit.html"
  });
    
    $routeProvider.otherwise({
      redirectTo: '/'
    });

    //$locationProvider.html5Mode(true);

  }]);
