app.controller('doctorProfileInfoController', ['$scope','appDataService', function ($scope,appDataService) 
{

  $scope.bindDoctorInfo=function()
  {
    // //debugger
    $scope.DoctorId= $scope.$parent.SAASDoctorId;
    $scope.TimeZone= $scope.$parent.currentTimeZone;
    $scope.ImageUrl="";
    $scope.NationalityList=[];
    $scope.SpecialityList=[];
    $scope.MLanguageList=[];
    $scope.DoctorLanguagesList =[];
    $scope.Genders = [
    { genderid: 1, gendername: 'Male' },
    { genderid: 2, gendername: 'Female' },
    { genderid: 3, gendername: 'Other' }
    ];
    // Set a default value for the selected color
      $scope.selectedGender = $scope.Genders[0];
      

    _request={DoctorID:$scope.DoctorId,ZoneID:$scope.TimeZone};
    appDataService.getDoctorProfileInfoData($scope,_request,'bindDoctorProfileInfo');
    }


    $scope.bindDoctorProfileInfo=function(rdata)
    {

      // //debugger
      if(rdata.Status)
      {

      $scope.SpecialityList = rdata.Data.Specilaty;
      $scope.NationalityList=  rdata.Data.Nationality;
      $scope.CityList=rdata.Data.City;
      $scope.MLanguageList= rdata.Data.Language;
      $scope.DoctorLanguagesList = rdata.Data.DoctorLanguages;
       // //debugger;

      $scope.txtTitle=rdata.Data.DoctorDetails[0].Title; 
      $scope.lblSAASUniqueCode=rdata.Data.DoctorDetails[0].SAASUniqueCode;
      $scope.txtEmployeeFirstName=rdata.Data.DoctorDetails[0].DoctorFirstName;  
      $scope.txtEmployeeMiddleName=rdata.Data.DoctorDetails[0].DoctorMiddleName; 
      $scope.txtEmployeeLastName=rdata.Data.DoctorDetails[0].DoctorLastName;    

      $scope.txtDateofBirth=rdata.Data.DoctorDetails[0].DOB;
      $scope.DoctorDOB=rdata.Data.DoctorDetails[0].DOB;

      $scope.selectedGender.genderid = rdata.Data.DoctorDetails[0].Gender;

      $scope.cmbNationality=''+rdata.Data.DoctorDetails[0].NationalityId+'';

      $scope.cmbSpeciality=''+rdata.Data.DoctorDetails[0].SpecialityId+'';    

      $scope.txtQualification=rdata.Data.DoctorDetails[0].Qualification;

      $scope.txtPracticeStartDate=rdata.Data.DoctorDetails[0].PracticeStartDate;
      $scope.practiceStartDateSelected=rdata.Data.DoctorDetails[0].PracticeStartDate;

      $scope.txtAddress1=rdata.Data.DoctorDetails[0].Address;

      $scope.txtAddress2=rdata.Data.DoctorDetails[0].Address2;
      // //debugger;
      if(rdata.Data.DoctorDetails[0].City=="")
      {
      $scope.selectedCity={};
      }
      else{
      var filteredArray = $scope.CityList.filter(function(itm){
      return itm.CityId == rdata.Data.DoctorDetails[0].City;
      });
      $scope.selectedCity=filteredArray[0];    
      }

      $scope.StateId=rdata.Data.DoctorDetails[0].StateID;
      $scope.txtStateName=rdata.Data.DoctorDetails[0].StateName;

      $scope.CountryId=rdata.Data.DoctorDetails[0].CountryID;
      $scope.txtCountryName=rdata.Data.DoctorDetails[0].CountryName;

      $scope.txtPostalCode=rdata.Data.DoctorDetails[0].Pincode;

      $scope.txtBiography=rdata.Data.DoctorDetails[0].Biography;    

    }

  }
  
  $scope.AddLanguage=function()
  {    
    
    var filteredArray = $scope.MLanguageList.filter(function(itm){
    return itm.LangId == $scope.cmbLanguage;
    });

    var filteredArrayalredy = $scope.DoctorLanguagesList.filter(function(itm){
    return itm.LanguagesSpokenID == $scope.cmbLanguage;
    });


    if(filteredArrayalredy.length>0 && filteredArrayalredy[0].LanguagesSpokenID==$scope.cmbLanguage)
    {
      
      PopupAlert('info','Language Spoken already exists in the list');
    }
    else{     

      $scope.DoctorLanguagesList.push({
        ID: null, 
        DoctorID: $scope.DoctorId, 
        LanguagesSpokenID: $scope.cmbLanguage,
        Language:filteredArray[0].Language,
        });
    }
    $scope.cmbLanguage="";
    
  } 

  $scope.RemoveLanguage=function(LanguagesSpokenID)
  {    
    const index = $scope.DoctorLanguagesList.findIndex(x => x.LanguagesSpokenID == LanguagesSpokenID); 
    $scope.DoctorLanguagesList.splice(index, 1);
  }

  $scope.ManageDoctorDetails=function()
  {
    // //debugger
    $scope.Msg="";
    if($scope.txtTitle==null||$scope.txtTitle=="")
    {
      if($scope.Msg!="")
      {
        $scope.Msg+='<br> ';
      }
      $scope.Msg+='Please Fill Title.';
      
    }
     if($scope.txtEmployeeFirstName==null||$scope.txtEmployeeFirstName=="")
    {
      if($scope.Msg!="")
      {
        $scope.Msg+='<br> ';
      }
      $scope.Msg+='Please fill First Name.';
      
    }
     if($scope.txtEmployeeLastName==null||$scope.txtEmployeeLastName=="")
    {
      if($scope.Msg!="")
      {
        $scope.Msg+='<br> ';
      }
      $scope.Msg+='Please fill Last Name.';
     
    }
     if($scope.DoctorDOB==null||$scope.DoctorDOB=="")
    {
      if($scope.Msg!="")
      {
        $scope.Msg+='<br> ';
      }
      $scope.Msg+='Please Select Date Of Birth.';     
      
    }
     if($scope.selectedGender.genderid==null||$scope.selectedGender.genderid=="")
    {
      if($scope.Msg!="")
      {
        $scope.Msg+='<br> ';
      }
      $scope.Msg+='Please Select Gender.';
    }
     if($scope.cmbNationality==null||$scope.cmbNationality=="")
    {
      if($scope.Msg!="")
      {
        $scope.Msg+='<br> ';
      }
      $scope.Msg+='Please Select Nationality.';
      
    } if($scope.cmbSpeciality==null||$scope.cmbSpeciality=="")
    {
      if($scope.Msg!="")
      {
        $scope.Msg+='<br> ';
      }
      $scope.Msg+='Please Select Speciality.';
      
    }
     if($scope.txtQualification==null||$scope.txtQualification=="")
    {
      if($scope.Msg!="")
    {
      $scope.Msg+='<br> ';
    }
      $scope.Msg+='Please fill Qualification.';
      
    }
     if ( $scope.practiceStartDateSelected==null||$scope.practiceStartDateSelected=="")
    {
      if($scope.Msg!="")
    {
      $scope.Msg+='<br> ';
    }
      $scope.Msg+='Please Select Practice start date.';
      
    } if($scope.selectedCity.CityId==null||$scope.selectedCity.CityId=="")
    {
      if($scope.Msg!="")
      {
        $scope.Msg+='<br> ';
      }
      $scope.Msg+='Please Select City.';      
    }
    if($scope.Msg!="")
    {
      PopupAlert('info',$scope.Msg);
      return;
    }
    
    
    $scope.DoctorLanguagesListFinal =[];

        angular.forEach($scope.DoctorLanguagesList, function (item) { 
          $scope.DoctorLanguagesListFinal.push({
            ID: item.ID, 
            DoctorID: item.DoctorID, 
            LanguagesSpokenID: item.LanguagesSpokenID,
            Language:item.Language,
            }); 
      });
      if($scope.DoctorLanguagesListFinal.length==0)
      {
          $scope.DoctorLanguagesListFinal.push({
            ID: "", 
            DoctorID: "", 
            LanguagesSpokenID: "",
            Language:"",
          }); 
      }
      // //debugger
    let _request={DoctorID:$scope.DoctorId,ZoneID:$scope.TimeZone,ImageUrl:$scope.ImageUrl,Title:$scope.txtTitle,
      DoctorName:$scope.txtEmployeeFirstName,DoctorMiddleName:$scope.txtEmployeeMiddleName,DoctorLastName:$scope.txtEmployeeLastName,DOB:$scope.DoctorDOB,Gender:$scope.selectedGender.genderid,NationalityId:$scope.cmbNationality,
      SpecialityId:$scope.cmbSpeciality,Qualification:$scope.txtQualification,
      PracticeStartDate:$scope.practiceStartDateSelected,Address1:$scope.txtAddress1,Address2:$scope.txtAddress2,City:$scope.selectedCity.CityId,StateId:$scope.StateId,CountryId:$scope.CountryId,
      PostalCode:$scope.txtPostalCode,Biography:$scope.txtBiography,DoctorLanguagesList: $scope.DoctorLanguagesListFinal   };
      
      appDataService.PostDoctorDetails($scope,_request,'DoctorInfoHandler');
  }

  $scope.DoctorInfoHandler=function(result)
  {
    
    if(result.Status)
    {
      $scope.bindDoctorInfo();
      PopupAlert('succ','Saved successfully.');
    }
    else{
      PopupAlert('erro',response.Message);
        
    }

  }
  $scope.selectedCityObj=function(selectedItem)
  {
    // //debugger
    if(selectedItem!=undefined)
    {
      var filteredArray = $scope.CityList.filter(function(itm){
        return itm.CityId == selectedItem.originalObject.CityId;
        });
        $scope.selectedCity=filteredArray[0];   

      $scope.StateId=selectedItem.originalObject.StateId;
      $scope.txtStateName=selectedItem.originalObject.StateName;
      $scope.CountryId=selectedItem.originalObject.CountryId;
      $scope.txtCountryName=selectedItem.originalObject.CountryName;

    }
    else
    { $scope.selectedCity={};
      $scope.StateId=0;
      $scope.txtStateName="";
      $scope.CountryId=0;
      $scope.txtCountryName="";

    }

  }


  $scope.bindDoctorInfo();

  $scope.dobChanged=function(date,attrs, modelCtrl){
    $scope.DoctorDOB=formatDate_MMddYYYY(date);
    $scope.$apply();
  }

  $scope.date2Changed=function(date,attrs, modelCtrl){
    $scope.practiceStartDateSelected=formatDate_MMddYYYY(date);
    $scope.$apply();
  }

}]);