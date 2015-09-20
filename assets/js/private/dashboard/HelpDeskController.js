
app.controller('helpdeskDashboardController', ['$location', '$routeParams', '$scope', '$http',  'FileUploader', function($location, $routeParams, $scope, $http,FileUploader){
    
        
}]);
app.controller('helpdeskController', ['$location', '$routeParams', '$scope', '$http',  'FileUploader', function($location, $routeParams, $scope, $http,FileUploader){
    $scope.typehelpdesk = [];
    $scope.priority= [];
    $scope.description= [];
    $scope.images = [];
    $scope.typehelpdesks = [];
    
    $scope.init = function(){
        $http.get('/typehelpdesk')
		.then(function onSuccess(sailsResponse){
			$scope.typehelpdesks  =angular.fromJson(sailsResponse.data);
		})
		.catch(function onError(sailsResponse){
        });     
    };
    
    $scope.submitHelpDesk = function(description, typehelpdesk,priority){

		
		// Submit request to Sails.
		$http.post('/helpdesk', {
			priority: priority,
            description: description,
			owner: window.SAILS_LOCALS.me.id,
			type: typehelpdesk
		})
		.then(function onSuccess(sailsResponse){
			console.log(sailsResponse);
            //window.location = '/#/helpdesk';
		})
		.catch(function onError(sailsResponse){

		

		})
		.finally(function eitherWay(){
		
		})
	};
        var uploader = $scope.uploader = new FileUploader({
            url: 'file/upload'
        });
    
         uploader.onSuccessItem = function(fileItem, response, status, headers) {
             $scope.images.push(fileItem);
             console.log($scope.images);
        };
    

     $scope.options = {
    priorities: ['high','medium','light'],
  };
    

    
}]);