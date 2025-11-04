app.controller('providerprofileController',['$scope','$location','$routeParams','appDataService','getSaasLocalStorage', function ($scope,$location,$routeParams,appDataService,getSaasLocalStorage) {


    $scope.pageInt=function()
    {

      $scope.isLoading=true;
      let doctorName = $routeParams.doctorName;
      $scope.doctorName=doctorName;
      $scope.isDoctorFound=false;
      $scope.saasUser=getSaasLocalStorage.getLocalParams();
      
    
      if($scope.doctorName!='0'){
        debugger;
          let _request = { doctorname: $scope.doctorName.trim().replaceAll('-', ' ').replaceAll('--','-'), zoneid: $scope.saasUser.currentappstandardtimezone };
          //debugger;
        appDataService.getDoctorProfileScreenData($scope,_request,'bindScreenData');
      }
      else
      {$scope.isLoading=false;}

    }
    $scope.bindScreenData=function(response)
    {
      
      if(response.Status)
      {
        
        $scope.doctor=response.Data.Basic[0];
        $scope.lsteducation=response.Data.Educations;
        $scope.lstlanguage=response.Data.Languages;
        $scope.lstassociation=response.Data.Associations;
        $scope.lstexperience=response.Data.Experiences;
        $scope.lstpublication=response.Data.Publications;
        $scope.lstaward=response.Data.Awards;
        $scope.lstcertificate=response.Data.Certifications;
        $scope.lstprofessional=response.Data.Professionals;
        $scope.lstservice=response.Data.Services;
        $scope.lstexpertise=response.Data.Expertises;
        $scope.lstlocation=response.Data.Locations;
        $scope.lstLocationTiming=response.Data.LocationsTimings;
        $scope.isDoctorFound=true;
        
      }
      $scope.isLoading=false;
      angular.element(function () {
        loadview();
      });
    }
    $scope.goforbookAppointment=function(param)
    {
      $location.path('Book-Appointment').search({ provider: param.replaceAll(' ', '-') });
    }
    $scope.pageInt();

  
  }]);