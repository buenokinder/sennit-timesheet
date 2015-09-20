


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
  
  
    $scope.init = function(){
        
        
        var data = new Date();
        var mesAtual = data.getMonth()+1;

        var anoAtual = data.getFullYear();
        
        var data = anoAtual + '/' + mesAtual + '/1';
        console.log(data);
            var dataInicioMes = new Date(data);
           
           
        
                var str = window.JSON.stringify({data: { "<": new Date(), ">": new Date(dataInicioMes)},"owner": window.SAILS_LOCALS.me.id });
        
        
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
    }
 
  
    $scope.changeDate = function(date){
        var theDate = Date.parse(date); 
        
                var str = window.JSON.stringify({data: new Date(date),"owner": window.SAILS_LOCALS.me.id });
        
        
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
			window.location = '/#/timesheet';
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
			window.location = '/#/timesheet';
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




app.controller('ativosController', ['$scope', '$http', function($scope, $http){
  $scope.ativo = [];
  $scope.tipo = [];
  $scope.ativos = [];
     $scope.price = [];
  $scope.tipos = [];
 $scope.users = [];
    $scope.user = [];
	$scope.timesheetForm = {
		loading: false
	}

  $scope.init = function(){
    $http.get("ativo").then(function(results) {
      $scope.ativos = angular.fromJson(results.data);
    });

      
          $http.get("user").then(function(results) {
      $scope.users = angular.fromJson(results.data);
    });

      
    $http.get("tipoativo").then(function(results) {
      $scope.tipos = angular.fromJson(results.data);
    });
  };

  $scope.gravarAtivos = function(){
    console.log($scope.ativos);
      // Set the loading state (i.e. show loading spinner)
		$scope.timesheetForm.loading = true;

		// Submit request to Sails.
		$http.post('/ativo', {
			name: $scope.ativo.name,
			serialNumber: $scope.ativo.serialNumber,
			assetNumber: $scope.ativo.assetNumber,
			model: $scope.ativo.model,
			size: $scope.ativo.size,
			description: $scope.ativo.description,
			type: $scope.tipo.id,
            price: $scope.price,
            user: $scope.user
		})
		.then(function onSuccess(sailsResponse){
			window.location = '/#/asset';
		})
		.catch(function onError(sailsResponse){

		

		})
		.finally(function eitherWay(){
			$scope.timesheetForm.loading = false;
		})
   
  };
  

}]);


app.controller('ativosUpdateController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
  $scope.ativo = [];
  $scope.tipo = [];
  $scope.tipos = [];
	$scope.timesheetForm = {
		loading: false
	}

  $scope.update = function() {
      // Submit request to Sails.
		$http.put('/ativo/' + $routeParams.id + '?name='+ $scope.ativo.name + '&serialNumber=' + $scope.ativo.serialNumber + '&assetNumber=' + $scope.ativo.assetNumber + '&model=' + $scope.ativo.model + '&size=' + $scope.ativo.size + '&description=' + $scope.ativo.description + '&type=' + $scope.ativo.type.id+ '&price=' + $scope.ativo.price)
		.then(function onSuccess(sailsResponse){
			window.location = '/#/asset';
		})
		.catch(function onError(sailsResponse){

		

		})
		.finally(function eitherWay(){
			$scope.timesheetForm.loading = false;
		})
  };

  $http.get("/ativo/" + $routeParams.id).then(function(results) {
    $scope.ativo = angular.fromJson(results.data);
  });
  $http.get("tipoativo").then(function(results) {
    $scope.tipos = angular.fromJson(results.data);
  });
}]);
