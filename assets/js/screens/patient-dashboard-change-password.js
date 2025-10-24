app.controller('patientdashboardpasswordController', ['$rootScope','$scope', "$location", 'appDataService', function ($rootScope,$scope, $location, appDataService) {


    $scope.loadScreen=function()
    {
    $scope.isProcessing=false;
    
    }
    $scope.tooglePasswordView=function(flag)
    {
       if ($('.toggle-password').length > 0) {

            
        
           
             if(flag==0)
             {var input = $("#txtOldPassword");
                $('#spnOld').toggleClass("feather-eye");
            }
             if(flag==1)
             {var input = $("#txtPassword"); $('#spnNew').toggleClass("feather-eye");}
             if(flag==2)
             {var input = $("#txtconfirmPassword"); $('#spnCon').toggleClass("feather-eye");}
             if (input.attr("type") == "password") {
               input.attr("type", "text");
               //$scope.$apply();
                //$scope.$applyAsync();
             } else {
                input.attr("type", "password");
                //$scope.$apply();
                //$scope.$applyAsync();
             }
         
       }
 
    }
    $scope.UpdatePatientPassword=function()
    {
        $scope.isProcessing=true;
        let req=$scope.password;
        let _requestObj={CurrentPassword:req.oldpassword,NewPassword:req.newpassword,DeviceID:'WEB',DeviceToken:'WEB',DeviceType:'WEB',PatientUserId:$scope.$parent.saasuserid}
       
        appDataService.updatePatientProfilePassword($scope,_requestObj,'UpdatePasswordRequestHandler');
      }
      $scope.UpdatePasswordRequestHandler=function(response)
      {
       
        if(response.Status)
        {
          PopupAlert('succ','Password Updated <b>Successfully</b>');
          $scope.password = {}; // Clear the form data
          $scope.frmPatientChangePassword.$setUntouched();
          $scope.frmPatientChangePassword.$setPristine();
  
        }
        else
        {
            if(response.Message='In-Correct Password')
            {
                PopupAlert('info','Incorrect Old Password');
            }
            else{
                PopupAlert('erro','Unable to Update Password');
            }
  
        }
        $scope.isProcessing=false;
        
  
      }
    $scope.loadScreen();

   
}]);