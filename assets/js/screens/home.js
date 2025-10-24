

app.controller('HomeController', ['$scope', '$location','AutocompleteList','appDataService','CryptoService','getSaasLocalStorage', function ($scope,$location,AutocompleteList,appDataService,CryptoService,getSaasLocalStorage) {





$scope.DoctorListcomplete=[];

$scope.getDoctorAutocomplete=function(){
// the service makes autocomplete
$scope.doctorlist_A = AutocompleteList.getautocomplete("...",$scope.doctorListArray);
$scope.doctorlist_A.then(function(data){
  $scope.doctorlist_A = data;
  $scope.listloaded=true;
});
}

$scope.doSomething = function(typedthings){
  //console.log("Do something like reload data with this: " + typedthings );
  //$scope.doctorlist_A = AutocompleteList.getautocomplete(typedthings,$scope.doctorListArray);
  //$scope.doctorlist_A.then(function(data){
    //$scope.doctorlist_A = data;
  //});
  
  
}
$scope.clearSelect=function()
{$scope.txtDoctorName="";}

$scope.doSomethingElse = function(suggestion){
  console.log("Suggestion selected: " + suggestion );
  $scope.txtDoctorName=suggestion;
  
}

$scope.pageInt=function()
{
 
  $scope.isLoadComplete=false;
  $scope.listloaded=false;
  $scope.isLoadSpecialtyDoctorComplete=false;
  $scope.isSpecialtyDoctorCombineDataAvailable=false;
 $scope.isCityFetching=false;
 $scope.isSpecialtyDoctorFetching=false;
  $scope.cmbSpecialty="All";$scope.cmbClinic="All";$scope.txtDoctorName=""; $scope.clinicList=[];$scope.combineDataList=[];$scope.cityList=[];$scope.specialtyList=[];
 
  $scope.isLoadComplete=true;
  $scope.isdataloaded=false;
  //appDataService.getHomeScreenSearchData($scope,'loadSearchData');
  //$scope.fetchCombineListWithDoctorListForSelectedCity(null);
  $scope.fetchCombineListWithDoctorListForSelectedCity_eHospital(null);
  
  
  angular.element(function () {
  
    loadview();
  
  });

  //// appDataService.getHomeScreenSearchDoctorClinicSpecialtyAutocomplete($scope,'loadSearchDatatype2');

 


}
$scope.loadSearchData=function(response)
{
  //$scope.clinicList=response.Data.clinicList;
  //$scope.specialtyList=response.Data.specialityList;
  //$scope.doctorListArray= response.Data2;
  //$scope.doctorList=response.Data.doctorList;
  //$scope.combineDataList=response.Data.combineSearchList;
  //$scope.getDoctorAutocomplete();
  //$scope.isLoadComplete=true;
 

  //angular.element(function () {
  
   // loadview();
  
  //});


}
//$scope.loadSearchDatatype2=function(response)
$scope.loadSearchDatatype2=function()
{
  $scope.isLoadComplete=true;
  angular.element(function () {
  
    loadview();
   
  
  });
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
$scope.setSearch_eHospital = function (flag, param) {


    switch (flag) {
        case 'all': {
            $location.path('provider-list');
            break;
        }
        case 'specialty': {
            //let _city = $scope.SelectedCityItem.description.ctName.trim().replaceAll(' ', '-').toLowerCase();
            //let _cityId = CryptoService.encrypt('ac' + ($scope.SelectedCityItem.description.ctID));
            let _city = 'all'; let _cityId = 0;
            $location.path('provider-list').search({ specialty: (param.trim().replaceAll(' ', '-').toLowerCase())});
            break;
        }
        case 'custom': {
            
            let _searchedobj = $scope.selectedSearchedItem;
            let _cityobj = $scope.SelectedCityItem;
            let _city = 'all'; let _cityId = 0;
            if ($scope.SelectedCityItem != null) {

                _city = $scope.SelectedCityItem.description.ctName.trim().replaceAll(' ', '-').toLowerCase();
                _cityId = CryptoService.encrypt('ac' + ($scope.SelectedCityItem.description.ctID));

            }
            var _requestObject = {};
            if ($scope.selectedSearchedItem != null) {
                switch ($scope.selectedSearchedItem.originalObject.TYPE.trim()) {



                    case 'Provider': {
                        let _doctor = $scope.selectedSearchedItem.originalObject.searchText.trim().replaceAll(' ', '-').toLowerCase();
                        if (_city == 'all')
                        { _requestObject = { provider: _doctor }; }
                        else
                        { _requestObject = { provider: _doctor }; }
                        break;

                    }
                    case 'Specialty': {

                        let _specialty = $scope.selectedSearchedItem.originalObject.searchText.trim().replaceAll(' ', '-').toLowerCase();
                        if (_city == 'all')
                        { _requestObject = { specialty: _specialty }; }
                        else
                        { _requestObject = { specialty: _specialty}; }
                        break;

                    }
                    case 'Clinic': {
                        let _clinic = $scope.selectedSearchedItem.originalObject.searchText.trim().replaceAll(' ', '-').toLowerCase();
                        if (_city == 'all')
                        { _requestObject = { clinic: "00" }; }
                        else
                        { _requestObject = { clinic: "00"}; }
                        break;

                    }

                    default: { break; }

                }

            }
            else {
                if (_city != 'all') {
                    _requestObject = { city: _city, areacode: _cityId };

                }
            }
            
            $location.path('provider-list').search(_requestObject);
            break;
        }
        default: { break; }

    }
}
$scope.populateCityList=function(code)
{


  if((code=='')&&(!$scope.isdataloaded))
    {
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

      $scope.isdataloaded=true;
  }
  if(code!=='')
    {
      getSaasLocalStorage._storeSelection('ccode',code); 
      getSaasLocalStorage._storeSelection('city',undefined);
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
        //$('#txtautoCity_value').val('');
        $("#txtautoCity_value").blur();
      
        
        $scope.isCityFetching=false;
    angular.element(function () {
      loadpartialview(0);
      });
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
      { 
        $scope.SelectedCityItem=null;
        $scope.specialtyList=[];
        $scope.doctorList=[];
        $scope.combineDataList=[];
        getSaasLocalStorage._storeSelection('city',undefined);
        angular.element(function () {
          loadpartialview(0);
          });
      }
    }

      

}
$scope.fetchCombineListWithDoctorListForSelectedCity=function(cityObj)
{
 
  $scope.isLoadSpecialtyDoctorComplete=false;
  $scope.isSpecialtyDoctorFetching=true;

  let _request={cityId:cityObj.originalObject.description==undefined?cityObj.originalObject.ctID:cityObj.originalObject.description.ctID}
 // let _request={cityId:533}
  appDataService.getHomeScreenSearchDataDoctorListAndCombineList($scope, _request, 'bindCombineListAndDoctorForSlectedCity');
 

}
$scope.fetchCombineListWithDoctorListForSelectedCity_eHospital = function (cityObj) {

    $scope.isLoadSpecialtyDoctorComplete = false;
    $scope.isSpecialtyDoctorFetching = true;
    $scope.selectedSearchedItem = null;
    //let _request = { cityId: cityObj.originalObject.description == undefined ? cityObj.originalObject.ctID : cityObj.originalObject.description.ctID }
     let _request={cityId:0}
     appDataService.getHomeScreenSearchDataDoctorListAndCombineList($scope, _request, 'bindCombineListAndDoctorForSlectedCity');
     

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

$scope.pageInt();
}]);