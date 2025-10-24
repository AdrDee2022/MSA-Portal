
app.controller('providerlistController',['$scope','$location','$filter','$timeout','appDataService','CryptoService','getSaasLocalStorage', function ($scope,$location,$filter,$timeout,appDataService,CryptoService,getSaasLocalStorage ) {


  $scope.toggleView=function(flag)
  {
    
    if(flag=='grid')
    {$scope.isgridview=true;}
    if(flag=='list')
    {$scope.isgridview=false;}
  }
  $scope.getDoctorList=function()
  {
      //debugger;
      $scope.selectedSearchedItem=null;
    _request={doctor:$scope.doctor,specialty:$scope.specialty,clinic:$scope.clinic,city:$scope.city,citycode:$scope.cityId};
   
    appDataService.getProviderLisDataData($scope,_request,'bindDoctorList');

  }
  $scope.bindDoctorList=function(response)
  {
  
    if(response.Status)
    {
      
      $scope.providersList=response.Data.doctors;
      $scope.providersListFiltered=response.Data.doctors;
      $scope.specialties=response.Data.specialty;
      $scope.Message=response.Data.doctors.length+' '+((response.Data.doctors.length)>1?' providers':' provider')+' found!';
      $scope.isFound=true;
      //debugger;

    }
    else
    {
      $scope.isFound=false;
      $scope.Message="No provider find for the searched criteria!";
    }
    $scope.isLoading=false;
  }
  $scope.filterList=function()
  {

    $scope.isLoading=true;

    // Wait for the digest cycle to complete
    $timeout(function () {
            //$scope.providersListFiltered=$scope.providersList;
            $scope.filteringList=[];
      


      // Find checkboxes with the custom attribute "custom-attribute"
      let checkboxes = document.querySelectorAll('input[type="checkbox"][action-type="filter"]');let _ginitial=0;let _spinitials=0;let _gender=0;let _experience=0;let _visittype=0;let _rating=0;
      let Genderwise;let GenderwiseList=[];
      let Specialtywise;let SpecialtywiseList=[];
      let Experiencewise;let ExperiencewiseList=[];
      let VisittypeWise;let VisittypeWiseList=[];
      let RatingWise;let RatingWiseList=[];
      // Log information about each found checkbox
       checkboxes.forEach(function (checkbox) {
       
        if(checkbox.checked){
          _ginitial=_ginitial+1;
        let _type=checkbox.getAttribute('filter-type')
        let _value=checkbox.value;
        if(_type=="GENDER")
         { 
          _gender=_gender+1;
          Genderwise=$filter('filter')($scope.providersList ,{Gender:_value},true);
          if(Genderwise)
          {
            if(Genderwise.length>0)
            {
              Genderwise.forEach(function(row){GenderwiseList.push(row);});
            }
          }
          
          
          //records.forEach(function(row){$scope.filteringList.push(row);});       
         }
              $scope.filteringList=[];
              //if(GenderwiseList.length>0)
              if(_gender>0)
              {GenderwiseList.forEach(function(row){$scope.filteringList.push(row);});}
              else
              {$scope.filteringList=$scope.providersList;}


         if(_type=="SPECIALTY")
         { 
          
          _spinitials=_spinitials+1;
          let _specialtyId=parseInt(_value);
          Specialtywise=$filter('filter')($scope.filteringList ,{SpecialtyID:_specialtyId},true);   
          if(Specialtywise)   
          {
            if(Specialtywise.length>0)
            {
              Specialtywise.forEach(function(row){SpecialtywiseList.push(row);});
            }
          }       
         }
         if(_spinitials>0)
         {
          $scope.filteringList=SpecialtywiseList;
          //SpecialtywiseList.forEach(function(row){$scope.filteringList.push(row);});
         }
         if(_type=="EXPERIENCE")
         { 
          _experience=_experience+1;
          Experiencewise=$filter('filter')($scope.filteringList ,{ExperienceFilter:_value},true);   
          if(Experiencewise)   
          {
            if(Experiencewise.length>0)
            {
              Experiencewise.forEach(function(row){ExperiencewiseList.push(row);});
            }
          }       
         }
         if(_experience>0)
         {
          $scope.filteringList=ExperiencewiseList;
          
         }
         if(_type=="VISITTYPE")
         { 
          _visittype=_visittype+1;
          VisittypeWise=$filter('filter')($scope.filteringList ,{VisitType:_value},true);   
          if(VisittypeWise)   
          {
            if(VisittypeWise.length>0)
            {
              VisittypeWise.forEach(function(row){VisittypeWiseList.push(row);});
            }
          }       
         }
         if(_visittype>0)
         {
          $scope.filteringList=VisittypeWiseList;
          
         }
         if(_type=="RATINGS")
         { 
          
          _rating=_rating+1;
          let _ratingValue=parseInt(_value);
          RatingWise=$filter('filter')($scope.filteringList ,{Ratings:_ratingValue},true);   
          if(RatingWise)   
          {
            if(RatingWise.length>0)
            {
              RatingWise.forEach(function(row){RatingWiseList.push(row);});
            }
          }       
         }
         if(_rating>0)
         {
          $scope.filteringList=RatingWiseList;
          
         }
        }
        if(_ginitial==0){$scope.providersListFiltered=$scope.providersList;}
        else
        {
          $scope.providersListFiltered=$scope.filteringList;
        }
        $scope.isLoading=false;
      });
  




    if($scope.providersListFiltered.length>0)
    {
      $scope.isFound=true;
      $scope.Message=$scope.providersListFiltered.length+' '+(($scope.providersListFiltered.length)>1?' providers':' provider')+' found!';
    }
    else
    {
      $scope.isFound=false;
      $scope.Message="No provider find for the searched criteria!";
    }
  });
  }
  $scope.pageInt=function()
  {
      //debugger;
  //  $scope.reflag=$location.search().r;
  //  if($scope.reflag){
    $scope.specialty=$location.search().specialty?$location.search().specialty:'0';$scope.specialty=($scope.specialty.trim()=="all"?'0':$scope.specialty.trim().replaceAll('-',' '));
    $scope.doctor=$location.search().provider?$location.search().provider:'0';$scope.doctor=($scope.doctor.trim()=="all"?'0':$scope.doctor.trim().replaceAll('-',' '));
    $scope.clinic=$location.search().clinic?$location.search().clinic:'0';$scope.clinic=($scope.clinic.trim()=="all"?'0':$scope.clinic.trim().replaceAll('-',' '));
    $scope.city=$location.search().city?$location.search().city:'0';$scope.city=($scope.city.trim()=="all"?'0':$scope.city.trim().replaceAll('-',' '));
    let areacode=$location.search().areacode?$location.search().areacode:'0';
      //$scope.cityId=(CryptoService.decrypt(areacode)).substring(2);
    $scope.cityId=0;
    $scope.isLoading=true;
    $scope.isgridview=false;
    $scope.isdataloaded=false;
    $scope.fetchCombineListWithDoctorListForSelectedCity_ehospital();

    $scope.getDoctorList();
  //  }
  //  else
  //  {

  //   // Call the function with desired parameters
  // const paramsToUpdate = {
  //   r: true
    
  // };
  //   angular.element(function () {
  //     loadview();
  //   });

  //   updateUrlParamsAndReload(paramsToUpdate);
  //  }

    angular.element(function () {
      loadview();
    });
  }
  // Function to update the URL parameters and reload the route
  function updateUrlParamsAndReload(params) {
    // Iterate over the params object and set/update each parameter
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        $location.search(key, params[key]);
      }
    }
    
    // Reload the route to reflect changes
    $route.reload();
  }
  $scope.populateCityList=function(code)
{
  if((code=='')&&(!$scope.isdataloaded))
    {
      //debugger;
      let ccode=getSaasLocalStorage._getSelection('ccode');
      if(ccode!=null)
        {
          let _request={dialcode:ccode}
          $scope.CountryCode=ccode;
          appDataService.getAvailableDoctorCitylistFromDialCode($scope,_request,'bindCities');
          $scope.isdataloaded=true;
        }
        else
        {
           $scope.isdataloaded=true;
        }
        
    if($scope.doctor!='0')
      {
        $('#txtautoDoctorClinicSpecialty_value').val('Dr. '+$filter('capitalize')($scope.doctor));

      }
      if($scope.specialty!='0')
        {
          $('#txtautoDoctorClinicSpecialty_value').val($filter('capitalize')($scope.specialty));
  
        }
            if($scope.clinic!='0')
            {
              $('#txtautoDoctorClinicSpecialty_value').val($filter('capitalize')($scope.clinic));

            }

    }
  else
  {
    if(code!=='')
      {
        
          $scope.isCityFetching=true;
          $scope.isLoadSpecialtyDoctorComplete=false;
          $scope.specialtyList=[];
          $scope.doctorList=[];
          $scope.combineDataList=[];
          $scope.$broadcast('angucomplete-alt:clearInput', 'txtautoCity');
          let _request={dialcode:code}
          $scope.CountryCode=code;
          appDataService.getAvailableDoctorCitylistFromDialCode($scope,_request,'bindCities');

      }
      $('#txtautoDoctorClinicSpecialty_value').val('');
      getSaasLocalStorage._storeSelection('ccode',code); 
      getSaasLocalStorage._storeSelection('city',undefined);

      $scope.isdataloaded=true;
  }

}
$scope.bindCities=function(response)
{
  
  if(response.Status)
    {

   
      
      $scope.cityList=response.Data;
      let _cityobj=getSaasLocalStorage._getSelection('city');
      if(_cityobj!=null){

      $('#txtautoCity_value').val(_cityobj.description.ctName);
      $scope.SelectedCityItem=_cityobj;

      $scope.fetchCombineListWithDoctorListForSelectedCity($scope.SelectedCityItem);
      }
    }
    else{
      $scope.cityList=[];
    }
        $scope.isCityFetching=false;

    }
    $scope.selectedCityObj=function(objSelected)
    {
      if(objSelected!=undefined)
      {
      if(objSelected.originalObject.ctName!=undefined){
      $scope.SelectedCityItem=objSelected;
      $scope.fetchCombineListWithDoctorListForSelectedCity($scope.SelectedCityItem);
      getSaasLocalStorage._storeSelection('city',objSelected);

      }
      else
      {$scope.SelectedCityItem=null;

        $scope.combineDataList=[];
        getSaasLocalStorage._storeSelection('city',undefined);

      }
    }
    else
      {
        $scope.SelectedCityItem=null;

        $scope.combineDataList=[];

      }
      

}
$scope.selectedSearchedObj =function(objSelected){


  if(objSelected!=undefined){
  if(objSelected.originalObject.searchText!=undefined){
      $scope.selectedSearchedItem=objSelected;

    }
    else
    {$scope.selectedSearchedItem=null;

    }
  }
  else
  {$scope.selectedSearchedItem=null;
  
  }
};
$scope.fetchCombineListWithDoctorListForSelectedCity=function(cityObj)
{
 
  $scope.isLoadSpecialtyDoctorComplete=false;
  $scope.isSpecialtyDoctorFetching=true;

  let _request={cityId:cityObj.originalObject.description==undefined?cityObj.originalObject.ctID:cityObj.originalObject.description.ctID}
 // let _request={cityId:533}
  appDataService.getHomeScreenSearchDataDoctorListAndCombineList($scope,_request,'bindCombineListAndDoctorForSlectedCity');

}
$scope.bindCombineListAndDoctorForSlectedCity=function(response)
{

 

  if(response.Status)
  {
    $scope.combineDataList=response.Data.combineSearchList;
    $scope.specialtyList=response.Data.specialityList;
    $scope.doctorList=response.Data.doctorList;
    $scope.isSpecialtyDoctorCombineDataAvailable=true;
    $scope.isLoadSpecialtyDoctorComplete=true;
    $scope.isSpecialtyDoctorFetching=false;
    

    


    angular.element(function () {
    loadpartialview(1);
    });
  }
  else
  {
    PopupAlert('warn','No Doctor, Specialty And Clinic Available for <b>'+($scope.SelectedCityItem.originalObject.description==undefined?$scope.SelectedCityItem.originalObject.ctName:$scope.SelectedCityItem.originalObject.description.ctName)+'</b>');
    $scope.isSpecialtyDoctorCombineDataAvailable=false;
    $scope.isLoadSpecialtyDoctorComplete=true;
    $scope.isSpecialtyDoctorFetching=false;
  }
 

}
$scope.fetchCombineListWithDoctorListForSelectedCity_ehospital=function(cityObj)
{
 
    $scope.isLoadSpecialtyDoctorComplete=false;
    $scope.isSpecialtyDoctorFetching=true;

    //let _request={cityId:cityObj.originalObject.description==undefined?cityObj.originalObject.ctID:cityObj.originalObject.description.ctID}
     let _request={cityId:0}
    appDataService.getHomeScreenSearchDataDoctorListAndCombineList($scope,_request,'bindCombineListAndDoctorForSlectedCity');

}
$scope.setSearch=function(flag,param)
{

    
        switch (flag) {
          case 'all':{
            $location.path('provider-list');
            break;
        }
          case 'specialty':{
            let _city=$scope.SelectedCityItem.description.ctName.trim().replaceAll(' ', '-').toLowerCase();
            let _cityId=CryptoService.encrypt('ac'+($scope.SelectedCityItem.description.ctID));
            $location.path('provider-list').search({ specialty: (param.trim().replaceAll(' ', '-').toLowerCase()),city:_city,areacode:_cityId});
              break;
          }
          case 'custom':{
            let _searchedobj=$scope.selectedSearchedItem;
            let _cityobj=$scope.SelectedCityItem; 
              let _city='all';let _cityId=0;
            if($scope.SelectedCityItem!=null)
            {
             
              _city=$scope.SelectedCityItem.description.ctName.trim().replaceAll(' ', '-').toLowerCase();
              _cityId=CryptoService.encrypt('ac'+($scope.SelectedCityItem.description.ctID));
          
            }
            var _requestObject={};
            if($scope.selectedSearchedItem!=null)
            {
              switch($scope.selectedSearchedItem.originalObject.TYPE.trim())
              {



                case 'Provider': {
                 let _doctor=$scope.selectedSearchedItem.originalObject.searchText.trim().replaceAll(' ', '-').toLowerCase();
                  if(_city=='all')
                  {_requestObject={provider:_doctor};}
                  else
                  {_requestObject={provider:_doctor,city:_city,areacode:_cityId};}
                  break;

                }
                case 'Specialty': {
                  
                  let _specialty=$scope.selectedSearchedItem.originalObject.searchText.trim().replaceAll(' ', '-').toLowerCase();
                  if(_city=='all')
                  {_requestObject={specialty:_specialty};}
                  else
                  {_requestObject={specialty:_specialty,city:_city,areacode:_cityId};}
                  break;

                }
                case 'Clinic': {
                  let _clinic=$scope.selectedSearchedItem.originalObject.searchText.trim().replaceAll(' ', '-').toLowerCase();
                  if(_city=='all')
                  {_requestObject={clinic:_clinic};}
                  else
                  {_requestObject={clinic:_clinic,city:_city,areacode:_cityId};}
                  break;

                }

                default:{break;}

              }

            }
            else
            {
              if(_city!='all')
                  {
                    _requestObject={city:_city,areacode:_cityId};

                  }                  
            }
           
            $location.path('provider-list').search(_requestObject);
              break;
          }
          default:{break;}

       }
}
$scope.setSearch_eHospital=function(flag,param)
{

    $scope.specialty='0';
    $scope.isLoading=true;
    switch (flag) {
        case 'all':{
            $location.path('provider-list');
            break;
        }
        case 'specialty':{
            let _city=$scope.SelectedCityItem.description.ctName.trim().replaceAll(' ', '-').toLowerCase();
            let _cityId=CryptoService.encrypt('ac'+($scope.SelectedCityItem.description.ctID));
            $location.path('provider-list').search({ specialty: (param.trim().replaceAll(' ', '-').toLowerCase()),city:_city,areacode:_cityId});
            break;
        }
        case 'custom':{
            let _searchedobj=$scope.selectedSearchedItem;
            let _city='all';let _cityId=0;
            var _requestObject={};
            if($scope.selectedSearchedItem!=null)
            {
                switch($scope.selectedSearchedItem.originalObject.TYPE.trim())
                {



                    case 'Provider': {
                        let _doctor=$scope.selectedSearchedItem.originalObject.searchText.trim().replaceAll(' ', ' ').toLowerCase();
                        $scope.doctor=_doctor;$scope.specialty='0';$scope.clinic=0;$scope.city="all";$scope.cityId=0;
                        break;

                    }
                    case 'Specialty': {
                  
                        let _specialty=$scope.selectedSearchedItem.originalObject.searchText.trim().replaceAll(' ', ' ').toLowerCase();
                        $scope.doctor="0";$scope.specialty=_specialty;$scope.clinic=0;$scope.city="all";$scope.cityId=0;
                        break;

                    }
                    case 'Clinic': {
                        let _clinic=$scope.selectedSearchedItem.originalObject.searchText.trim().replaceAll(' ', ' ').toLowerCase();
                        $scope.doctor="0";$scope.specialty='0';$scope.clinic=0;$scope.city="all";$scope.cityId=0;
                        break;

                    }

                    default:{break;}

                }

            }
            else
            {
                if(_city!='all')
                {
                    _requestObject={city:_city,areacode:_cityId};

                }                  
            }
           
            $scope.getDoctorList();
            break;
        }
        default:{break;}

    }
}


$scope.pageInt();
   


}]);