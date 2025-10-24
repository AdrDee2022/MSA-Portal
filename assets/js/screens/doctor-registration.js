app.controller('doctorregistrationController', ['$rootScope','$scope','$location','appDataService','getSaasLocalStorage', function ($rootScope,$scope,$location,appDataService,getSaasLocalStorage) {
    $scope.clearForm=function()
    {
        $scope.isProcessing=false;
        $scope.isRegistrationScreen=true;
        $scope.isMobileChecking=false;
        $scope.isMobileChecked=false;
        $scope.isMobileValid=false;
        $scope.isEmailChecking=false;
        $scope.isEmailChecked=false;
        $scope.isEmailValid=false;
        $scope.Genders = [
            { genderid: 1, gendername: 'Male' },
            { genderid: 2, gendername: 'Female' },
            { genderid: 3, gendername: 'Other' }
              ];
                 // Set a default value for the selected color
                 $scope.selectedGender = $scope.Genders[0];
    }
    $scope.onloadscreen=function()
    {    
      getSaasLocalStorage.loadRegistrationScreen($scope);
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
    $scope.tooglePasswordView=function(flag)
    {
       if ($('.toggle-password').length > 0) {
        
 
             $(this).toggleClass("feather-eye");
             if(flag==1)
             {var input = $("#txtPassword");}
             if(flag==2)
             {var input = $("#txtconfirmPassword");}
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
    $scope.countrySelected=function(code)
    {
        $scope.CountryDialcode=code;
        
 
    }
    $scope.checkMobileNumber=function()
    {
     if($scope.frmdoctorregistration.phone.$valid)
     {
       $scope.isMobileChecking=true;
       let _request={dialcode:$scope.CountryCode,mobileno:$scope.txtPhoneNumber};
       appDataService.getCheckMobileforUnique($scope,_request,'validateMobile');
     }
 
 
    }
 
    $scope.checkEmailAddress=function()
    {
     if($scope.frmdoctorregistration.emailid.$valid)
     {
       $scope.isEmailChecking=true;
       let _request={emailid:$scope.txtEmailid};
       appDataService.getCheckEmailforunique($scope,_request,'validateEmail');
     }
    
 
    }
    $scope.validateMobile=function(response)
    {
 
     if (response.Status) {
       $scope.isMobileValid=true;
       
       
   }
   else {
         $scope.isMobileValid=false;
        }
     $scope.isMobileChecking=false;
     $scope.isMobileChecked=true;
    
 
 
    }
    $scope.validateEmail=function(response)
    {
 
     if (response.Status) {
       $scope.isEmailValid=true;
       
       
   }
   else {
         $scope.isEmailValid=false;
        }
 
     $scope.isEmailChecked=true;
     $scope.isEmailChecking=false;
     
 
    }
    $scope.registrationScreen=function()
    {
        $scope.isRegistrationScreen=true;

    }
    $scope.verificationScreen=function(flag)
    {
        $scope.isProcessing=true;
        /// request to sent otp should be implemented here, for now we are implementing demo response
        __response={Status:true,emailotp:123456,phoneotp:123456};
        $scope.setVerificationScreen(__response);
        

    }
    $scope.setVerificationScreen=function(response)
    {
          if(response.Status){
            $scope.isRegistrationScreen=false; $scope.vphontotp=response.phoneotp;  $scope.vemailotp=response.emailotp;$('#alwForword').click();
          }
          else
          {
            PopupAlert('info','Not able to proceed your request at this time, please try after some time!');
          }

        $scope.isProcessing=false;
    }
    $scope.registerDoctorUser=function()
    {
        if(($scope.phoneotp==$scope.vphontotp) && ($scope.emailotp==$scope.vemailotp))
        {
            $scope.isProcessing=true;
            let _request={firstname:$scope.txtfirstname,middlename:$scope.txtmiddlename,lastname:$scope.txtlastname,genderid:$scope.selectedGender.genderid,dateofbirth:formatDate_MMddYYYY(new Date()),dialcode:$scope.CountryDialcode,mobilenumber:$scope.txtPhoneNumber,emailid:$scope.txtEmailid,cityid:null,ssn:('DOCTOR'+(generateUniqueId())),password:$scope.txtPassword,usertype:'D'};
            
            appDataService.postRegisterUser($scope,_request,'registerUserHandler');


        }
        else
        {
            PopupAlert('erro','Verification codes mismatch!');
        }
        

    }
    $scope.registerUserHandler=function(response)
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
            $location.path('/Doctor');
            }
            else
            {
               PopupAlert('erro',response.Message);
               $scope.isProcessing=false;
            }
    }
    $scope.onloadscreen();
    
    

    angular.element(function () {
        loadview();
      });


    }]);