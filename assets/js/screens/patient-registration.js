app.controller('patientregistrationController', ['$rootScope','$scope','$location','appDataService','getSaasLocalStorage', function ($rootScope,$scope,$location,appDataService,getSaasLocalStorage) {

    $scope.clearForm=function()
    {
    $scope.isProcessing=false;
    $scope.isCityFetching=false;
    $scope.isMobileChecking=false;
    $scope.isMobileChecked=false;
    $scope.isMobileValid=false;
    $scope.isEmailChecking=false;
    $scope.isEmailChecked=false;
    $scope.isEmailValid=false;
    $scope.isSSNChecking=false;
    $scope.isSSNChecked=false;
    $scope.isSSNValid=true;
    $scope.CountryCode='';
    $scope.cmbCity='';
    $scope.cityList=[];
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
    $scope.onloadscreen();
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


    $scope.dobChanged=function(date,attrs, modelCtrl){
      
      let DOB= dateDifferenceFromCurrentDate(date);
       $scope.regDOB=DOB.dateMMDDYYYY;
       $scope.regDOBinWords='Age is '+(DOB.YY)+(DOB.YY>1?' years':' year')+' '+DOB.MM+(DOB.MM>1?' months':' month')+' '+DOB.DD+(DOB.DD>1?' days':' day');

      //  $scope.regDOB_Y = D.YY;
      //  $scope.regDOB_M = D.MM;
      //  $scope.regDOB_D = D.DD;
       $scope.$apply();
       
   }



   $scope.populateCityList=function(code)
   {
      
    if(code!==''){
      $scope.isCityFetching=true;
      let _request={dialcode:code}
      $scope.CountryCode=code;
      appDataService.getCitylistFromDialCode($scope,_request,'bindCities');
    }
    

   }
   $scope.bindCities=function(response)
   {
       $scope.cmbCity = "";
    if(response.Status)
    {
      $scope.cityList=response.Data;
    }
    else{
      $scope.cityList=[];
    }
    $scope.isCityFetching=false;
   }
   $scope.checkMobileNumber=function()
   {
    if($scope.frmPatientRegistration.phone.$valid)
    {
      $scope.isMobileChecking=true;
      let _request={dialcode:$scope.CountryCode,mobileno:$scope.txtPhoneNumber};
      appDataService.getCheckMobileforUnique($scope,_request,'validateMobile');
    }


   }

   $scope.checkEmailAddress=function()
   {
    if($scope.frmPatientRegistration.emailid.$valid)
    {
      $scope.isEmailChecking=true;
      let _request={emailid:$scope.txtEmailid};
      appDataService.getCheckEmailforunique($scope,_request,'validateEmail');
    }
   

   }

   $scope.checkSSN=function()
   {

    if($scope.frmPatientRegistration.celulaid.$valid)
    {
     
      if($scope.txtcelulaid!=undefined && $scope.txtcelulaid.trim()!='')
        {this.isSSNChecked=false;
          if($scope.txtcelulaid.trim()!='')
          { $scope.isSSNChecking=true;
            let _request={ssn:$scope.txtcelulaid.trim()};
            appDataService.getCheckSSNforunique($scope,_request,'validateSSN');
        }
      }
     
    }
    else
    {
      if($scope.txtcelulaid==undefined && $scope.txtcelulaid=='')
        {
          $scope.isSSNValid=true;
          $scope.isSSNChecking=true;
        }
        else  
        {
          $scope.isSSNValid=false;

        }
    }
    

   }
   $scope.handleSSNChange=function()
   {

    if($scope.txtcelulaid!=undefined ){
    $scope.isSSNValid=($scope.txtcelulaid.trim()==''?true:false);
    }
    else
    {
      $scope.isSSNValid=true;
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
   $scope.validateSSN=function(response)
   {

    if (response.Status) {

     
      $scope.isSSNValid=true;
      
      
  }
  else {
        $scope.isSSNValid=false;
       }
    $scope.isSSNChecked=true;
    $scope.isSSNChecking=false;
    
   }
   $scope.registerUser=function()
   {
    
    $scope.isProcessing=true;
    
    let _request={firstname:$scope.txtfirstName,middlename:$scope.txtmiddleName,lastname:$scope.txtlastName,genderid:$scope.selectedGender.genderid,dateofbirth:$scope.regDOB,dialcode:$scope.CountryCode,mobilenumber:$scope.txtPhoneNumber,emailid:$scope.txtEmailid,cityid:$scope.cmbCity,ssn:$scope.txtcelulaid,password:$scope.txtPassword,usertype:'P'};
    appDataService.postRegisterUser($scope,_request,'registerUserHandler');
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
      PopupAlert('succ','<b>Registration Successfull!!</b>');
      $rootScope.$emit('loginUser', localParams);
      $scope.isProcessing=false;

      if($location.search().return)
            {
               if($location.search().return.trim()=="checkout")
               {
                 
                  $location.path('/book-appointment-checkout').search('return', null);
               }
               else
               {$location.path('/patient');}
            }
         else
            {
               $location.path('/patient');

            }
      }
      else
      {
         PopupAlert('erro',response.Message);
         $scope.isProcessing=false;
      }


      
   }

   angular.element(function () {
    loadview();
  });


  }]);


