//angular.module('sennit.modules-ui').
var app = angular.module('DashboardModule', [
    	'ngRoute',
    	'ngResource',
    	'ui.bootstrap']);


app.directive('gridView', [ '$compile', function ($compile) {
    return {
        restrict: 'E',
        scope: {
            fields: '=',
            listaname: '@',
            adicionar: '@',
            view: '@',
            strupdate: '@',
            pagesize: '='

        }, link: function ($scope, $element, attrs) {
            var HtmlFormBody = "<div class='container' ng-init='init()'><div class='row'><div class='col-md-4'>&nbsp;</div></div><div class='row'   ng-show='exibir(strupdate)'><div class='col-md-4'><a href='{{adicionar}}' class='btn btn-labeled btn-primary'>Add New</a></div></div><div class='row'><div class='col-md-4'>&nbsp;</div></div>";
            HtmlFormBody += "<div class='row'><div class='table-responsive'><table class='table table-bordered table-hover'><thead class='thead-carrefour'><tr>";
            HtmlFormBody += "<th style='width: 30px;'><input type='checkbox' value='true' data-bind='checked: selectAll' /></th><th ng-repeat='field in fields' class='text-center' id='Sistema.Id' style='cursor:pointer'>{{field.value}}</th><th  ng-show='exibir(strupdate)'>Ações</th></tr></thead>";
            HtmlFormBody += "<tbody><tr ng-repeat='datum in data' ng-click='ViewItem(datum)' style='cursor:pointer'><td><input type='checkbox' /></td><td ng-repeat='field in fields' ng-style=&quot;{ 'text-align': field.align}&quot;>";
            HtmlFormBody += "<span ng-repeat='(key, value) in datum ' ng-show='(key==field.name)'>{{ verifica(value,field.sub, field.type)}}</span></td><td class='col-lg-3 col-md-4 col-sm-5 text-center'  ng-show='exibir(strupdate)'><a href='#/{{view}}/{{datum.id}}' class='btn btn-primary btn-sm'><i class='fa fa-pencil' aria-hidden='true'></i></a>";
            HtmlFormBody += "<button type='button' class='btn btn-default btn-sm' ng-click='delete(datum.id)' aria-label='Left Align'><i class='fa fa-trash' aria-hidden='true'></i></button></td></tr></tbody>";
            HtmlFormBody += "<tfoot><tr><td colspan='6' class='row'><div><ul class='pagination'><li><a href='#'>«</a></li><li ng-repeat='page in TotalPages' ng-class=&quot;{'active': page == ActualPage }&quot;><a href='' ng-click='Pagina(page)'>{{page}}</a></li><li><a href='#'>»</a></li></ul>";
            HtmlFormBody += "</div></td></tr></tfoot></table></div></div></div>";
            console.log(HtmlFormBody);

            $element.replaceWith($compile(HtmlFormBody)($scope));

        },
        controller: function ($scope, $element, $http) {
            $scope.data = ([]);
            $scope.ActualPage = 1;
            $scope.skip = 0;
            $scope.TotalItens = 0;
            $scope.TotalPages = ([]);
            $scope.exibir = function(value){
              
                if($scope.strupdate == "false")
                    return false;
                
                return true;
            }
 $scope.verifica = function (valor, nome, type) {

    if(valor.hasOwnProperty(nome)) {
  
        for ( key in valor){
           
         if(key == nome)
             return valor[key];
        }
    }
     if(type == "date"){
     
        var data = new Date(valor);
         var ano = data.getFullYear();
           var mes = data.getMonth() + 1;
           var dia = data.getDay();
         var retorno = dia + "/" + mes + "/" + ano;
        return retorno;
     }
     return valor;
 }
            $scope.init = function () {


                $scope.refreshPage();
            };
            
                 $scope.refreshPage = function () {

                 $http.get("/"+ $scope.listaname +"/").then(function (results) {
                    $scope.TotalItens = results.data;
                    var range = [];
                    var total = ($scope.TotalItens.length / $scope.pagesize);
                    for (var i = 0; i < total; i++) {
                        range.push(i + 1);
                    }
                    $scope.TotalPages = range;
                });

                var query;
                for (var key in $scope.fields) {
                    if (query)
                        query += $scope.fields[key].name + ',';
                    else
                        query = $scope.fields[key].name + ',';
                }

                if ($scope.fields.length)
                    query = query.substring(0, query.length - 1);
            
                $http.get("/"+ $scope.listaname +"/?skip="+  $scope.skip  +"&limit="+ $scope.pagesize ).then(function(results) {
                    $scope.data = angular.fromJson(results.data);
                    console.log($scope.data );
                });
            

            }

            $scope.Pagina = function (page) {
                $scope.skip = ((page - 1) * $scope.pagesize);
                $scope.ActualPage = page;
                $scope.refreshPage();
            };

            

            $scope.delete = function (id) {
                $http.delete('/' + $scope.listaname +'/' + id )
                    .then(function (project) {
                    $scope.refreshPage();
                });
              
            };
        }

    }
}]).directive('formView', [ '$compile', function  ($compile) {
    return {
        restrict: 'E',
        scope: {
            fields: '=',
            listaname: '@',
            strupdate: '@',
            redirecionar: '@'

        }, link: function ($scope, $element, attrs) {
            var HtmlFormBody = "<form ng-submit='submitTimesheetForm()' id='sign-up-form' class='form-signin' name='timesheet'><div class='row' ng-init='init()' ><div class='col-md-12'><h2 class='form-signin-heading'>Create new " + $scope.listaname + "</h2><div class='row'><div class='col-sm-10 '>";
            console.log($scope.strupdate);
            if ($scope.strupdate == 'false')
                HtmlFormBody += "";
            else
                HtmlFormBody += "";

            for (var key in $scope.fields) {
                HtmlFormBody += "<div class='form-group'><label for='" + $scope.fields[key].name + "'>" + $scope.fields[key].value + "</label><input type='text'  class='form-control'  ng-model='data." + $scope.fields[key].name + "'></input></div>";
            }
            if ($scope.strupdate == 'false'){
                HtmlFormBody +=  "<button type='button' class='btn btn-default' ng-click='add()'><span ng-show='!timesheetForm.loading'>Create Project</span>";
         HtmlFormBody += "<span class='overlord-loading-spinner fa fa-spinner' ng-show='signupForm.loading' ></span>";
         HtmlFormBody +="<span ng-show='timesheetForm.loading'>Preparing your new project...</span></button>";
            }
            else{
                HtmlFormBody += "<button type='button' class='btn btn-default' ng-click='update()'>Update</button><span ng-show='!timesheetForm.loading'>Update " + $scope.listname + "</span>";
                HtmlFormBody += "<span class='overlord-loading-spinner fa fa-spinner' ng-show='signupForm.loading' ></span>";
                HtmlFormBody += "<span ng-show='timesheetForm.loading'>Preparing your new project...</span></button>";
            }

            HtmlFormBody += "</div></div></div></div> <input type='hidden' name='_csrf' value='<%= _csrf %>' /></form>";


            $element.replaceWith($compile(HtmlFormBody)($scope));

        },
        controller: function ($scope, $element, $http, $location, $routeParams) {
            $scope.me = window.SAILS_LOCALS.me;
            
            $scope.timesheetForm = {
		      loading: false
	           }

            
            $scope.data = ([]);
            $scope.url = ([]);

            $scope.init = function () {

                if ($scope.strupdate == 'true') {
                    
                     $http.get('/'+$scope.listaname+'/' + $routeParams.id)
		.then(function onSuccess(sailsResponse){
			$scope.data  =angular.fromJson(sailsResponse.data);
    
            
		})
                    //return sennitRestApi.getSharepointListById($scope.listaname, $routeParams.id, '').success(function (results) {
                    //    $scope.contaSelected = angular.fromJson(results.data.d);
                    //});
                }
            };

            $scope.add = function () {
                // Set the loading state (i.e. show loading spinner)
		$scope.timesheetForm.loading = true;

		// Submit request to Sails.
                var query;
                for (var key in $scope.data) {
                    if (query)
                        query += "," + key + "="+ $scope.data[key];
                    else
                        query = '{ "' + key + '": "'+ $scope.data[key] + '"';
                }
              
                    query += "}";
                console.log( query);
                 query = JSON.parse(query);
                console.log( query);
		$http.post('/'+ $scope.listaname ,  query)
		.then(function onSuccess(sailsResponse){
			window.location = '/#/'+ $scope.redirecionar;
		})
		.catch(function onError(sailsResponse){

		

		})
		.finally(function eitherWay(){
			$scope.timesheetForm.loading = false;
		})
            };

            $scope.update = function () {
              //  sennitRestApi.updateSharepointListItem($scope.data.ID, $scope.listaname, $scope.data).success(function (data) {


               // });
                
                // Set the loading state (i.e. show loading spinner)
		      $scope.timesheetForm.loading = true;

 
                var query;
                for (var key in $scope.data) {
                    if (query)
                        query += "&" + key + "="+ $scope.data[key];
                    else
                        query = "" + key + "="+ $scope.data[key];
                }
                
		          $http.put('/'+ $scope.listaname +'/' + $routeParams.id + '?'+ query)
		              .then(function onSuccess(sailsResponse){
                          window.location = '/#/' +  $scope.redirecionar ;
		          })
		          .catch(function onError(sailsResponse){

		

		          })
		              .finally(function eitherWay(){
                    $scope.timesheetForm.loading = false;
		          })
            };
        }

    }
}]);
app.controller('editProfilePageController', ['$location', '$routeParams', '$scope', '$http',  function($location, $routeParams, $scope, $http) {

  // Just a hack so we can type `SCOPE` in the Chrome inspector.
  SCOPE = $scope;

  $scope.me = window.SAILS_LOCALS.me;

  /////////////////////////////////////////////////////////////////////////////////
  // When HTML is rendered... (i.e. when the page loads)
  /////////////////////////////////////////////////////////////////////////////////

  // Set up initial objects
  // (kind of like our schema for the page)
  $scope.editProfile = {
    properties: {},
    errorMsg: '',
    error: false,
    saving: false,
    loading: false,
    changePassword: {}
  };

  // $scope.editProfile.loading = true;

  // // console.log('The id is: ', $routeParams.id);
  // var theRoute = '/user/profile/' + $routeParams.id;

  // // Submit GET request to Sails.
  // $http.get(theRoute)
  //   .then(function onSuccess(sailsResponse) {
  //     // console.log(sailsResponse.data.id);
  //     // window.location = '#/profile/' + sailsResponse.data.id;
  //     // console.log('The response is: ', sailsResponse);
  //     $scope.editProfile.properties.gravatarURL = sailsResponse.data.gravatarURL;
  //     $scope.editProfile.properties.email = sailsResponse.data.email;
  //     $scope.editProfile.properties.username = sailsResponse.data.username;
  //     $scope.editProfile.properties.admin = sailsResponse.data.admin;
  //     $scope.editProfile.properties.banned = sailsResponse.data.banned;
  //     $scope.editProfile.properties.id = sailsResponse.data.id;

  //     $scope.editProfile.loading = false;
  //   })
  //   .catch(function onError(sailsResponse) {
  //     console.log(sailsResponse);

  //     // set error state
  //     $scope.editProfile.error = true;

  //     // If 404 not found display message
  //     if (sailsResponse.status === 404) {
  //       $scope.editProfile.errorMsg = 'The user profile you were searching for does not exist.';

  //     } else {

  //       // Otherwise, display generic error if the error is unrecognized.
  //       $scope.editProfile.errorMsg = 'An unexpected error occurred: ' + (sailsResponse.data || sailsResponse.status);
  //     }

  //   })
  //   .finally(function eitherWay() {
  //     $scope.editProfile.loading = false;
  //   });

  $scope.updateProfile = function() {

    var theRoute = 'user/updateProfile/' + $scope.me.id;

    // Submit PUT request to Sails.
    $http.put(theRoute, {
        gravatarURL: $scope.me.gravatarURL
        // gravatarURL: $scope.editProfile.properties.gravatarURL
      })
      .then(function onSuccess(sailsResponse) {

        // Notice that the sailsResponse is an array and not a single object
        // The .update() model method returns an array and not a single record.
        window.location = '#/profile';

        $scope.editProfile.loading = false;
      })
      .catch(function onError(sailsResponse) {
        // console.log(sailsResponse);
        // Otherwise, display generic error if the error is unrecognized.
        $scope.editProfile.errorMsg = 'An unexpected error occurred: ' + (sailsResponse.data || sailsResponse.status);

      })
      .finally(function eitherWay() {
        $scope.editProfile.loading = false;
      });
  };

  $scope.restore = function() {

    // Submit PUT request to Restore GravatarURL.
    $http.put('/user/restoreGravatarURL', {
        email: $scope.me.email
      })
      .then(function onSuccess(sailsResponse) {

        // Restore the current gravatarURL
        $scope.me.gravatarURL = sailsResponse.data;

        $scope.editProfile.loading = false;
      })
      .catch(function onError(sailsResponse) {
        // console.log(sailsResponse);
        // Otherwise, display generic error if the error is unrecognized.
        $scope.editProfile.errorMsg = 'An unexpected error occurred: ' + (sailsResponse.data || sailsResponse.status);

      })
      .finally(function eitherWay() {
        $scope.editProfile.loading = false;
      });
  };

  $scope.changeMyPassword = function() {

    // console.log('the change userprofile is: ', $scope.userProfile);

    $http.put('user/changePassword', {
        id: $scope.me.id,
        password: $scope.editProfile.properties.password
      })
      .then(function onSuccess(sailsResponse) {

        // console.log('sailsResponse: ', sailsResponse);
        // $scope.userProfile.properties.gravatarURL = sailsResponse.data.gravatarURL;
        // window.location = '#/profile/' + $scope.editProfile.properties.id;
        window.location='#/profile';
        // toastr.success('Password Updated!');

        $scope.editProfile.loading = false;
      })
      .catch(function onError(sailsResponse) {
        // console.log('sailsresponse: ', sailsResponse)
        // Otherwise, display generic error if the error is unrecognized.
        $scope.editProfile.changePassword.errorMsg = 'An unexpected error occurred: ' + (sailsResponse.data || sailsResponse.status);

      })
      .finally(function eitherWay() {
        $scope.editProfile.loading = false;
      });

  };

}]);

app.controller('profilePageController', ['$location', '$routeParams', '$scope', '$http', function($location, $routeParams, $scope, $http){

  // Just a hack so we can type `SCOPE` in the Chrome inspector.
  SCOPE=$scope;

  $scope.me = window.SAILS_LOCALS.me;

  /////////////////////////////////////////////////////////////////////////////////
  // When HTML is rendered... (i.e. when the page loads)
  /////////////////////////////////////////////////////////////////////////////////

  // Set up initial objects
  // (kind of like our schema for the page)
  $scope.userProfile = {
    properties: {},
    errorMsg: '',
    saving: false,
    loading: false,
    noProfile: false
  };

  $scope.userProfile.loading = true;

  // Build up route
  // var theRoute = '/user/profile/' +  $routeParams.id;

  // // Submit GET request to /user/profile/:id
  // $http.get(theRoute)
  // .then(function onSuccess(sailsResponse){
  //   // console.log('sailsResponse.data.deleted: ', sailsResponse.data.deleted);
  //   // console.log('sailsResponse: ', sailsResponse);

  //   // If deleted profile remove interface and show message.
  //   if (sailsResponse.data.deleted === true) {
  //     $scope.userProfile.errorMsg = 'No profile found.';
  //     return $scope.userProfile.noProfile = true;
  //   }
  //   // console.log(sailsResponse.data.id);
  //   // window.location = '#/profile/' + sailsResponse.data.id;
  //   // console.log('The response is: ', sailsResponse);
  //   $scope.userProfile.properties.email = sailsResponse.data.email;
  //   $scope.userProfile.properties.username = sailsResponse.data.username;
  //   $scope.userProfile.properties.admin = sailsResponse.data.admin;
  //   $scope.userProfile.properties.banned = sailsResponse.data.banned;
  //   $scope.userProfile.properties.gravatarURL = sailsResponse.data.gravatarURL;
  //   $scope.userProfile.properties.id = sailsResponse.data.id;

  //   $scope.userProfile.loading = false;
  // })
  // .catch(function onError(sailsResponse){
  //   // console.log(sailsResponse);

  //   // If no profile found remove interface and show error message.    
  //   if(sailsResponse.status === 404) {
  //     $scope.userProfile.noProfile = true;
  //     $scope.userProfile.errorMsg = 'No profile found.';
  //     return;
  //   }

  //   // Handle all other errors
  //   $scope.userProfile.errorMsg = 'An unexpected error occurred: '+(sailsResponse.data||sailsResponse.status);

  // })
  // .finally(function eitherWay(){
  //   $scope.userProfile.loading = false;
  // });

  $scope.removeProfile = function() {

    // console.log('the change userprofile is: ', $scope.userProfile);

    // var theRoute = '/user/removeProfile/' + $scope.userProfile.properties.id;
    var theRoute = '/user/removeProfile/' + $scope.me.id;
    $http.put(theRoute, {
        deleted: true
      })
      .then(function onSuccess(sailsResponse) {

        // console.log('sailsResponse: ', sailsResponse);
          // $scope.userProfile.properties.gravatarURL = sailsResponse.data.gravatarURL;
          window.location = '/signup';
          // 
          // toastr.success('Password Updated!');

        $scope.userProfile.loading = false;
      })
      .catch(function onError(sailsResponse) {
        // console.log('sailsresponse: ', sailsResponse)
        // Otherwise, display generic error if the error is unrecognized.
        $scope.userProfile.errorMsg = 'An unexpected error occurred: ' + (sailsResponse.data || sailsResponse.status);

      })
      .finally(function eitherWay() {
        $scope.loading = false;
      });
  };

  $scope.deleteProfile = function() {

    var theRoute = 'user/delete/' + $routeParams.id;

    $http.delete(theRoute)
    .then(function onSuccess(deletedProfile){
      window.location = '#/signup';
    })
    .catch(function onError(err){
      $scope.userProfile.errorMsg = 'An unexpected error occurred: ' + err;
    });
  };

}]);
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

    $routeProvider.when('/timesheetdashboard', {
        templateUrl: '/views/timesheet/dashboard.html'
    });
    $routeProvider.when('/project', {
        templateUrl: '/views/project/index.html'
      
    }).when('/project/new',{
        templateUrl: '/views/project/new.html'
    }).when('/project/:id',{
        templateUrl: '/views/project/edit.html'
    });
    
		$routeProvider.when("/asset", {
			controller: "ativosController",
			templateUrl: "/views/ativo/grid.html"
		}).when("/asset/new", {
			controller: "ativosController",
			templateUrl: "/views/ativo/form.html"
		}).when("/asset/:id", {
			controller: "ativosUpdateController",
			templateUrl: "/views/ativo/form-edit.html"
		});

		$routeProvider.when("/type", {
		
			templateUrl: "/views/tipo/grid.html"
		}).when("/type/new", {
			
			templateUrl: "/views/tipo/form.html"
		}).when("/type/:id", {
			
		  templateUrl: "/views/tipo/form-edit.html"
		});
    
    	$routeProvider.when("/profile", {
			controller: "profilePageController",
			templateUrl: "/views/profile/index.html"
		}).when("/profile/edit", {
			controller: "editProfilePageController",
		  templateUrl: "/views/profile/edit.html"
		});
    
    $routeProvider.otherwise({
      redirectTo: '/'
    });

    //$locationProvider.html5Mode(true);

  }]);
