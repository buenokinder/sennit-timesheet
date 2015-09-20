

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
    
    
    $routeProvider.when("/helpdesk", {
			controller: "helpdeskDashboardController",
			templateUrl: "/views/helpdesk/dashboard.html"
		}).when("/helpdesk/new", {
			controller: "helpdeskController",
		  templateUrl: "/views/helpdesk/new.html"
		});
    
    
        $routeProvider.when("/typehelpdesk", {
			templateUrl: "/views/typehelpdesk/index.html"
		}).when("/typehelpdesk/new", {
			templateUrl: "/views/typehelpdesk/new.html"
		}).when("/typehelpdesk/:id", {		
		  templateUrl: "/views/typehelpdesk/edit.html"
		});
        
        $routeProvider.when("/user", {
			templateUrl: "/views/user/index.html"
		}).when("/user/:id", {		
		  templateUrl: "/views/user/edit.html"
		});
    
    
    $routeProvider.otherwise({
      redirectTo: '/'
    });

    //$locationProvider.html5Mode(true);

  }]);
