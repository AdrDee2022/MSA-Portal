app.controller('deactivateaccountController', ['$route','$scope', "$location","$timeout", 'getSaasLocalStorage','$routeParams', function ($route,$scope, $location,$timeout, getSaasLocalStorage,$routeParams) {
 

    $scope.onloadscreen=function()
    {    

        $scope.isProcessing=false;
        $scope.lblMessage='';
     
    }
    $scope.deactivateAccountRequest=function()
    {
        $scope.isProcessing=true;
        $scope.lblMessage='';
        $timeout(function() {$scope.submitRequest()} , 2000);
    }
    $scope.onloadscreen();
    $scope.submitRequest=function()
    {
        $scope.isProcessing=false;$scope.lblMessage='Request Submitted Successfully, We will get in touch with you shortly!!';

    }

  }]);