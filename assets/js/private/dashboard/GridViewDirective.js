

    app.directive('gridView', [ '$compile', function ($compile) {
        return {
            restrict: 'E',
            scope: {
                filters: '=',
                fields: '=',
                listaname: '@',
                adicionar: '@',
                view: '@',
                strupdate: '@',
                pagesize: '=',
                add: '@',
                edit: '@',
                delete: '@',
                  autopage: '@'

            }, link: function ($scope, $element, attrs) {
                var HtmlFormBody = "";

                HtmlFormBody += "<div class='container' ng-init='init()'><div class='row'><div class='col-md-4'>&nbsp;</div></div><div class='row'   ng-                                            show='exibir(strupdate)'><div class='col-md-4'><a href='{{adicionar}}' ng-show='exibirAdd()' class='btn btn-labeled btn-primary'>Add New</a></div>                                        </div><div class='row'><div class='col-md-4'>&nbsp;</div></div>";

                HtmlFormBody += "<div class='row'><div class='table-responsive'><table class='table table-bordered table-hover'><thead class='thead-carrefour'><tr>";
                HtmlFormBody += "<th style='width: 30px;'><input type='checkbox' value='true' data-bind='checked: selectAll' /></th><th ng-repeat='field in fields' class='text-center' id='Sistema.Id' style='cursor:pointer'>{{field.value}}</th><th  ng-show='exibir(strupdate)'>Ações</th></tr></thead>";
                HtmlFormBody += "<tbody><tr ng-repeat='datum in data' ng-click='ViewItem(datum)' style='cursor:pointer'><td><input type='checkbox' /></td><td ng-repeat='field in fields' >";
                HtmlFormBody += "<span ng-repeat='(key, value) in datum ' ng-show='(key==field.name)'>{{ verifica(value,field.sub, field.type)}}</span></td><td class='col-lg-3 col-md-4 col-sm-5 text-center'  ng-show='exibir(strupdate)'><a href='#/{{view}}/{{datum.id}}' class='btn btn-primary btn-sm'><i class='fa fa-pencil' aria-hidden='true'></i></a>";
                HtmlFormBody += "<button type='button' class='btn btn-default btn-sm' ng-click='delete(datum.id)' aria-label='Left Align'><i class='fa fa-trash' aria-hidden='true'></i></button></td></tr></tbody>";
                HtmlFormBody += "<tfoot><tr><td colspan='6' class='row'><div><ul class='pagination'><li><a href='#'>«</a></li><li ng-repeat='page in TotalPages' ng-class=&quot;{'active': page == ActualPage }&quot;><a href='' ng-click='Pagina(page)'>{{page}}</a></li><li><a href='#'>»</a></li></ul>";
                HtmlFormBody += "</div></td></tr></tfoot></table></div></div></div>";
                console.log(HtmlFormBody);

                $element.replaceWith($compile(HtmlFormBody)($scope));

            },
            controller: function ($scope, $element, $http) {
                $scope.data = ([]);
                $scope.me = window.SAILS_LOCALS.me;
                $scope.ActualPage = 1;
                $scope.skip = 0;
                $scope.TotalItens = 0;
                $scope.TotalPages = ([]);
                $scope.exibir = function(value){

                    if($scope.strupdate == "false")
                        return false;

                    return true;
                }
                $scope.exibirAdd = function(){

                    if($scope.add == "false")
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
                  
                     $http.get("/"+ $scope.listaname + "/count" ).then(function (results) {

                        $scope.TotalItens = results.data.count;
                        var range = [];
                        var total = ($scope.TotalItens / $scope.pagesize);
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

                    var complemento = "";
                    if($scope.listaname.indexOf("?") < 0)    
                         complemento +=   "?";
                    else
                        complemento +=   "&";

                    $http.get("/"+ $scope.listaname + '' + complemento +"skip="+  $scope.skip  +"&limit="+ $scope.pagesize ).then(function(results) {
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
                datasource: '=',
                listaname: '@',
                strupdate: '@',
                redirecionar: '@',  
                label: '@'


            }, link: function ($scope, $element, attrs) {
                var HtmlFormBody = "<form ng-submit='submitTimesheetForm()' id='sign-up-form' class='form-signin' name='timesheet'><div class='row' ng-init='init()' ><div class='col-md-12'><h2 class='form-signin-heading'>Create new " + $scope.label + "</h2><div class='row'><div class='col-sm-10 '>";
                console.log($scope.strupdate);
                if ($scope.strupdate == 'false')
                    HtmlFormBody += "";
                else
                    HtmlFormBody += "";

                for (var key in $scope.fields) {
                    console.log($scope.fields[key].type);
                         switch ($scope.fields[key].type) {
                                 
                            case 'table-add-remove':
                                 
                                 //'tableadd': { 'model': 'usuarios' , 'text': 'name', 'valuesource': 'id' }
                                  if($scope.fields[key].tableadd)
                                  {
                                  HtmlFormBody += "<div class='form-group'>";
                                    HtmlFormBody += "<label for='" + $scope.fields[key].name + "'>" + $scope.fields[key].value + "</label>";
                                    HtmlFormBody += "<select  id='" + $scope.fields[key].name + "'  class='form-control emailReminder width-169 ng-pristine ng-invalid ng-invalid-required ng-touched' ng-model='combodata." + $scope.fields[key].name + "' ng-options='x as x." + $scope.fields[key].tableadd.text + " for x in " + $scope.fields[key].tableadd.model + "' value=''></select>";
                                    HtmlFormBody += "</select>";
                                            HtmlFormBody += "<td class='col-lg-2 col-md-3 col-sm-4 text-center'>";
                                    HtmlFormBody += "<button type='button' class='mb-sm btn btn-labeled btn-primary' ng-click='Associate(combodata." + $scope.fields[key].name + ",&#39;" + $scope.fields[key].name  + "&#39;,&#39;" + $scope.fields[key].name  + "&#39; ,&#39;" + $scope.fields[key].tableadd.apiadd  + "&#39;, &#39;add&#39;)' aria-label='Left Align'>";
                                    HtmlFormBody += " Add <i class='fa fa-plus'></i>";
                                    HtmlFormBody += "</button>";
                                    HtmlFormBody += "</td>";
                                    HtmlFormBody += "</div>";
                                  
                                  }
                               
                                      
                                    HtmlFormBody += "<table class='table table-bordered table-hover'>";
                                    HtmlFormBody += "<thead class='thead-sennit'>";
                                    HtmlFormBody += "<tr>";
                                    HtmlFormBody += "<th class='col-lg-1 col-md-3 col-sm-3 text-center'>"+$scope.fields[key].name +"</th>";
                                    HtmlFormBody += "<th class='col-lg-2 col-md-3 col-sm-4 text-center'>Actions</th>";
                                    HtmlFormBody += "</tr>";
                                    HtmlFormBody += "</thead>";
                                    HtmlFormBody += "<tbody>";
                                    HtmlFormBody += "<tr data-ng-repeat='datum in data." + $scope.fields[key].name + "' class='ng-scope'>";
                                    HtmlFormBody += "<td class='col-lg-1 col-md-2 col-sm-3 ng-binding'>";
                                    HtmlFormBody += "{{datum." + $scope.fields[key].text + " }}";
                                    HtmlFormBody += "</td>";
                                    HtmlFormBody += "<td class='col-lg-2 col-md-3 col-sm-4 text-center'>";
                                    HtmlFormBody += "<button type='button' class='mb-sm btn btn-danger' ng-click='Associate(datum, &#39;" + $scope.fields[key].name + "&#39;,&#39;" + $scope.fields[key].tableadd.valuesource  + "&#39; ,&#39;" + $scope.fields[key].tableadd.apidelete  + "&#39;, &#39;delete&#39;)' aria-label='Left Align'>";
                                    HtmlFormBody += " <i class='fa fa-trash' aria-hidden='true'></i>";
                                    HtmlFormBody += "</button>";
                                    HtmlFormBody += "</td>";
                                    HtmlFormBody += "</tr>";
                                    HtmlFormBody += "</tbody>";
                                    HtmlFormBody += "</table>";
                                 
                                 
                                 break;
                            case 'listbox-multiple':
                                
                                    HtmlFormBody += "<div class='form-group'>";
                                    HtmlFormBody += "<label for='" + $scope.fields[key].name + "'>" + $scope.fields[key].value + "</label>";
                                    HtmlFormBody += "<select multiple id='" + $scope.fields[key].name + "' required ng-multiple='true' class='form-control emailReminder width-169 ng-pristine ng-invalid ng-invalid-required ng-touched' ng-model='data." + $scope.fields[key].name + "' ng-options='x as x." + $scope.fields[key].text + " for x in " + $scope.fields[key].model + "' value=''></select>";
                                    HtmlFormBody += "</select>";
                                    HtmlFormBody += "</div>";
                                break;
                            case 'checkbox':
                                HtmlFormBody += "<div class='form-group'><div class='checkbox'><label for='" + $scope.fields[key].name + "'><input  ng-model='data." + $scope.fields[key].name + "' type='checkbox' value=''>" + $scope.fields[key].value + "</label></div></div>";
                                break;
                            default:
                                HtmlFormBody += "<div class='form-group'><label for='" + $scope.fields[key].name + "'>" + $scope.fields[key].value + "</label><input type='text'  class='form-control'  ng-model='data." + $scope.fields[key].name + "'></input></div>";
                                break;
                         }           



                }






                if ($scope.strupdate == 'false'){
                    HtmlFormBody +=  "<button type='button' class='btn btn-default' ng-click='add()'><span ng-show='!timesheetForm.loading'>Create " + $scope.label + "</span>";
             HtmlFormBody += "<span class='overlord-loading-spinner fa fa-spinner' ng-show='signupForm.loading' ></span>";
             HtmlFormBody +="<span ng-show='timesheetForm.loading'>Preparing your new project...</span></button>";
                }
                else{
                    HtmlFormBody += "<button type='button' class='btn btn-default' ng-click='update()'>Update " + $scope.label + "</button><span ng-show='!timesheetForm.loading'></span>";
                    HtmlFormBody += "<span class='overlord-loading-spinner fa fa-spinner' ng-show='signupForm.loading' ></span>";
                    HtmlFormBody += "<span ng-show='timesheetForm.loading'>Preparing your new project...</span></button>";
                }

                HtmlFormBody += "</div></div></div></div> <input type='hidden' name='_csrf' value='<%= _csrf %>' /></form>";


                $element.replaceWith($compile(HtmlFormBody)($scope));

            },
            controller: function ($scope, $element, $http, $location, $routeParams, $parse) {
                $scope.me = window.SAILS_LOCALS.me;
                $scope.combodata = ([]);
                $scope.timesheetForm = {
                  loading: false
                   }


                $scope.data = ([]);
                $scope.url = ([]);

                $scope.init = function () {
                        for (var key in $scope.datasource) {
                        $http.get('/' + $scope.datasource[key].url)
                           .then(function onSuccess(sailsResponse){
                                var model = $parse($scope.datasource[key].name);
                                model.assign($scope, angular.fromJson(sailsResponse.data));
                                $scope.$apply();
                          });
                        }
                    if ($scope.strupdate == 'true') {
                         $http.get('/'+$scope.listaname+'/' + $routeParams.id)
                           .then(function onSuccess(sailsResponse){
                            $scope.data  =angular.fromJson(sailsResponse.data);
                            console.log($scope.data);
                          })
                    }
               
                };
                    
                $scope.Associate = function (value, model,id, api, type) {
                  
                    var idAssossiate = "id";
                    var dataAssossiate = '{ "'+ id + '": "' + value[idAssossiate]+ '" , "id": "'+ $routeParams.id + '"}';     
                    console.log(model);
                    $http.post('/' + api , dataAssossiate)
                        .then(function (project) {
                            if(type == "add")
                                $scope.data[model].push(value);
                            else
                                $scope.data[model].splice ($scope.getResourceIndex($scope.data[model], value),1);
                    });
                };
                
                
                $scope.getResourceIndex = function(resources, resource) {
                    var index = -1;
                    for (var i = 0; i < resources.length; i++) {
                        if (resources[i].id == resource.id) {
                            index = i;
                        }
                    }
                    return index;
                }

                $scope.add = function () {
                    // Set the loading state (i.e. show loading spinner)
                    $scope.timesheetForm.loading = true;

                    var query;
                    for (var key in $scope.data) {

                        console.log(  );
                        console.log($scope.data[key]);
                        if (query){
                            if(Array.isArray($scope.data[key]))
                            {
                                 var loopVerify;
                            for (var keyModel in $scope.data[key]) {
                                console.log($scope.data[key]);
                             if(loopVerify){
                                  loopVerify = "passou";
                                
                                 query += ', "'+ $scope.data[key][keyModel].id  + '"';
                                         
                             }else{
                                 loopVerify = "passou";
                                 query += ',"' + key + '": [ "'+ $scope.data[key][keyModel].id + '"';
                                  
                                 
                             }

                            }
                              query +=  "]";
                            }else{
                            query += "," + key + "="+ $scope.data[key];
                            }

                        }
                        else{
                        if(Array.isArray($scope.data[key]))
                            {
                                 var loopVerify;
                            for (var keyModel in $scope.data[key]) {
                                console.log($scope.data[key]);
                             if(loopVerify){
                                  loopVerify = "passou";
                            
                                  query += ',  "'+ $scope.data[key][keyModel].id + '"';       
                             }else{
                                 loopVerify = "passou";
                          
                                  query = '{"' + key + '": [ "'+ $scope.data[key][keyModel].id + '"';
                                 
                             }

                            }
                              query +=  "]";
                            }else{
                            query = '{ "' + key + '": "'+ $scope.data[key] + '"';
                            }
                        }
                            
                    }

                        query += "}";
                   
                     query = JSON.parse(query);
                    
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
                        if (query){
                            if(!Array.isArray($scope.data[key]))
                                query += "&" + key + "="+ $scope.data[key];
                        }
                        else{
                            if(!Array.isArray($scope.data[key]))
                                query = "" + key + "="+ $scope.data[key];
                        }
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