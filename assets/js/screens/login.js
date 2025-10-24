
app.controller('LoginController', ['$rootScope','$scope','$location','getSaasLocalStorage','appDataService', function ($rootScope,$scope,$location, getSaasLocalStorage,appDataService) {

    $scope.clearForm=function()
    {
      $scope.CountryDialcode='';
      $scope.loginPhoneNumber='';
      $scope.loginPassword = '';
      $scope.loginusername = '';
      $scope.loginDoctorPassword = '';
      $scope.isdataloaded = false;
      $scope.ckhisdoctor = false;

    }
    $scope.onloadscreen=function()
    { 
      if($location.search().return)
         {
            $scope.returnUrl=$location.search().return.trim();
         }
            else
         {
            $scope.returnUrl="";
         }

      
    }
    $scope.screenloader=function(auth)
    {
      
      if(auth.load){
         $scope.clearForm();
         }
         else
         {
           $location.path(auth.route);
         }
    }
    $scope.onloadscreen();
   $scope.tooglePasswordView=function()
   {
      if ($('.toggle-password').length > 0) {
       

            $(this).toggleClass("feather-eye");
            var input = $("#txtPassword");
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
   $scope.loginUser=function()
   {
      
      $scope.isProcessing=true;
      let credientials={dialcode:$scope.CountryDialcode,username:$scope.loginPhoneNumber,password:$scope.loginPassword}
      appDataService.checkUserCredientials(credientials,$scope);
     
     

   }
   $scope.loginDoctor = function () {

       $scope.isProcessing = true;
       let credientials = { dialcode: null, username: $scope.loginusername, password: $scope.loginDoctorPassword }
       appDataService.checkDoctorUserCredientials(credientials, $scope);



   }
   $scope.authenticateUser=function(response)
   {
      
      if(response.Status){
      let result=response.Data[0];
      let localParams = getSaasLocalStorage.getLocalParams(); let User=localParams.saasuser;
      User.username=result.PatientName;
      User.usertype=result.UTYPE;
      User.useravtar=result.UserAvtar;
      User.saasuserid=result.PatientUserID;
      User.saasmemberid=result.MemberID;;
      User.gender=result.GenderName;
      User.mobile=result.MobileNo;
      User.email=result.EmailId;
      User.ssn=result.SSN;
      User.clientmemberid=0;
      User.clientpatientid=0;
      User.currentyearid=result.CurrentYearID;
      User.financialyearid=result.FinancialYearID;
      localParams.IsUserDefined=true;localParams.saasuser=User;localParams.isuserloggedin=true;localParams.userlastlogin=new Date();
      getSaasLocalStorage.updateLocalParams(localParams); 
      $rootScope.$emit('loginUser', localParams);
      $scope.isProcessing=false;
       if(result.UTYPE=="PATIENT")
       {
          if($scope.returnUrl){
               if($scope.returnUrl=="checkout")
               {
                 
                  $location.path('/book-appointment-checkout').search('return', null);
               }
               else
               {$location.path('/patient');}
            }
            else
            {$location.path('/patient');}
            
      }
      else {
         if(result.UTYPE=="DOCTOR")
         {
            $location.path('/doctor');
         }


      }
   }

      else
      {
         PopupAlert('erro',response.Message);
         $scope.isProcessing=false;
      }
   

   }
   $scope.countrySelected=function(code)
   {
       
      
      $scope.CountryDialcode=code;
   
   }

	
   angular.element(function () {
      loadview();
    });
  }]);