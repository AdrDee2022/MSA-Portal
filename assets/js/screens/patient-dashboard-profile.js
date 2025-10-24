
app.controller('patientdashboardprofileController', ['$scope','appDataService', function ($scope,appDataService) {


    $scope.loadProfileData=function()
    {
        $scope.isProfileLoading=true;
        $scope.isProcessing=false;
        $scope.isMobileChecking=false;
        $scope.isMobileChecked=false;
        $scope.isMobileValid=false;
        $scope.isEmailChecking=false;
        $scope.isEmailChecked=false;
        $scope.isEmailValid=false;
        $scope.isSSNChecking=false;
        $scope.isSSNChecked=false;
        $scope.isSSNValid=true;
        $scope.saasuserid=$scope.$parent.saasuserid;
        $scope.saasmemberid=$scope.$parent.saasmemberid;
        let _request={saasuserid:$scope.saasuserid};
        appDataService.getPatientUserProfile($scope,_request,'bindprofile');   
    }
    $scope.bindprofile=function(response)
    {
       if(response.Status)
       {
        
        $scope.userdetails=response.Data.userdetails[0];
        $scope.genderlist=response.Data.genderlist;
        $scope.citylist=response.Data.cityStateCountrylist;
        $scope.linklist=response.Data.links;
        let index = $scope.genderlist.findIndex(gender => gender.GenderId === $scope.userdetails.GenderId);
        $scope.selectedGender=$scope.genderlist[index];


        $scope.isProfileLoading=false;
       }
    }
    $scope.selectedCityObj=function(objSelected)
{
  if(objSelected!=undefined)
  {
  if(objSelected.originalObject.CityName!=undefined){
    
  $scope.SelectedCityItem=objSelected;
  $scope.userdetails.StateName= $scope.SelectedCityItem.originalObject.StateName;
  $scope.userdetails.CountryName= $scope.SelectedCityItem.originalObject.CountryName;
  $scope.userdetails.cityId= $scope.SelectedCityItem.originalObject.CityId;
  $scope.userdetails.stateId=$scope.SelectedCityItem.originalObject.StateId;
  $scope.userdetails.countryId=$scope.SelectedCityItem.originalObject.CountryId;
 
  }
  else
  {$scope.SelectedCityItem=null;
    $scope.SelectedCityItem=null;
    $scope.userdetails.StateName='';
    $scope.userdetails.CountryName='';
    $scope.userdetails.cityId=0;
    $scope.userdetails.stateId=0;
    $scope.userdetails.countryId=0;
}
}
else
  {
    $scope.SelectedCityItem=null;
    $scope.userdetails.StateName='';
    $scope.userdetails.CountryName='';
    $scope.userdetails.cityId=0;
    $scope.userdetails.stateId=0;
    $scope.userdetails.countryId=0;
  }
  

}
    $scope.dobChanged=function(date,attrs, modelCtrl){
  
        let DOB= dateDifferenceFromCurrentDate(date);
         $scope.userdetails.DateOfBirth=DOB.dateMMDDYYYY;
         //$scope.regDOBinWords='Age is '+(DOB.YY)+(DOB.YY>1?' years':' year')+' '+DOB.MM+(DOB.MM>1?' months':' month')+' '+DOB.DD+(DOB.DD>1?' days':' day');
  
        //  $scope.regDOB_Y = D.YY;
        //  $scope.regDOB_M = D.MM;
        //  $scope.regDOB_D = D.DD;
         $scope.$apply();
         
     }
    $scope.loadProfileData();
    $scope.checkMobileNumber=function()
    {
     if(($scope.frmPatientProfile.phone.$valid)&&($scope.frmPatientProfile.phone.$dirty) )
     {
       $scope.isMobileChecking=true;
       let _request={dialcode:$scope.userdetails.DialCode,mobileno:$scope.userdetails.MobileNo,userid:$scope.userdetails.PatientUserID};
       appDataService.getCheckMobileforUniqueProfile($scope,_request,'validateMobile');
     }
 
 
    }
 
    $scope.checkEmailAddress=function()
    {
      //debugger;
     if(($scope.frmPatientProfile.emailid.$valid)&&($scope.frmPatientProfile.emailid.$dirty))
     {
       $scope.isEmailChecking=true;
       let _request={emailid:$scope.userdetails.EmailId,userid:$scope.userdetails.PatientUserID};
       appDataService.getCheckEmailforuniqueProfile($scope,_request,'validateEmail');
     }
    
 
    }
 
    $scope.checkSSN=function()
    {
      
 
     if(($scope.frmPatientProfile.celulaid.$valid)&&($scope.frmPatientProfile.celulaid.$dirty))
     {
       $scope.isSSNChecking=true;
       let _request={ssn:$scope.userdetails.SSN,userid:$scope.userdetails.PatientUserID};
       appDataService.getCheckSSNforuniqueProfile($scope,_request,'validateSSN');
     }
    
 
    }

    $scope.handleSSNChange=function()
    {
 
     if($scope.userdetails.SSN!=undefined ){
     $scope.isSSNValid=($scope.userdetails.SSN.trim()==''?true:false);
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
    $scope.UpdatePatientProfile=function()
    {
        $scope.isProcessing = true;
    
      let req=$scope.userdetails;req.GenderId=$scope.selectedGender.GenderId;
      let _requestObj={Address1:req.Add1,Address2:req.Add2,BloodGroup:req.BloodGroup,DateOfBirth:req.DateOfBirth,DialCode:req.DialCode,EmailId:req.EmailId,FirstName:req.FirstName,LastName:req.Lastname,MiddleName:req.MiddleName,GenderId:req.GenderId,MobileNumber:req.MobileNo,SSN:req.SSN,ZipCode:req.ZipCode,CityId:req.cityId,StateId:req.stateId,CountryId:req.countryId,PatientUserId:req.PatientUserID}
     
      appDataService.updatePatientProfile($scope,_requestObj,'UpdatePatientProfileRequestHandler');
    }
    $scope.UpdatePatientProfileRequestHandler=function(response)
    {
      if(response.Status)
      {
        PopupAlert('succ','Profile Updated <b>Successfully</b>');

      }
      else
      {
        PopupAlert('erro','Unable to Update Profile');

      }
      $scope.isProcessing=false;
      

    }





}]);