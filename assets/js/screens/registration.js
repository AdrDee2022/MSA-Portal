app.controller('registrationController', ['$route','$scope', "$location", 'getSaasLocalStorage','$routeParams', function ($route,$scope, $location, getSaasLocalStorage,$routeParams) {
 
  angular.element(function () {
    loadview();
  });
  $scope.onloadscreen=function()
  {    
    getSaasLocalStorage.loadRegistrationScreen($scope);
  }
  $scope.screenloader=function(auth)
  {
    
    if(!auth.load){
      
      $location.path(auth.route).search('return', null);;
       
       }
       
  }
  $scope.onloadscreen();
}]);