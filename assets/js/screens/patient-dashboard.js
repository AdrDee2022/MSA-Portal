app.controller('patientdashboardController', ['$rootScope','$scope', "$location", 'getSaasLocalStorage','appDataService', function ($rootScope,$scope, $location, getSaasLocalStorage,appDataService) {
    $scope.loadPatientDashboardData=function(saasUser)
    {
      
      let _request={saasuserid:saasUser.saasuser.saasuserid,standardtimezone:saasUser.currentappstandardtimezone};
      appDataService.getUserDashboardData($scope,_request,'bindUserDashboard');

    }
    $scope.bindUserDashboard=function(response)
    {
      
      if(response.Status){
      $scope.menu=response.Data.WebMenu;
      $scope.saasuserid = response.Data.UserDetail[0].saasUserId;
      $scope.uservitals = response.Data.UserVitalDetails[0];
      $scope.saasmemberid=response.Data.UserDetail[0].saasMemberId;
      $scope.username=response.Data.UserDetail[0].PatientName;
      $scope.useravter=response.Data.UserDetail[0].UserAvtar;
      $scope.userage=response.Data.UserDetail[0].dob+', '+response.Data.UserDetail[0].AgeInYears;
      $scope.useraddress=response.Data.UserDetail[0].CityName+', '+response.Data.UserDetail[0].StateName+', '+response.Data.UserDetail[0].CountryName; 
      $scope.renderCode='DASH';
        $('nav.dashboard-menu>ul>li:nth-child(1)').addClass('active');
      $scope.isDashboardloading=false;
      angular.element(function () {
        loadview();
      });

     
      }
      else
      {
        PopupAlert('erro','Not Able To Load Dashboard!');
      }
      
    }

    $scope.onloadscreen=function()
    {  
      $location.search({});
      if(getSaasLocalStorage.loadPatientDashboard())
      {
        $scope.renderCode='DASH';
        $scope.isDashboardloading=true;
        $scope.saasUser=getSaasLocalStorage.getLocalParams();
        $scope.zoneid=$scope.saasUser.currentappstandardtimezone;
        $scope.loadPatientDashboardData($scope.saasUser);

      }
      else
      {
        $location.path('/Login');

      }
    }
    $scope.onloadscreen();

    $scope.handleView=function(event,code,title)
    {
        if (code == 'DASH' || code == 'APPO' || code == 'LABR' || code == 'INVO' || code == 'PROF' || code == "LGOT") {
      if(code=="LGOT")
      {
        $rootScope.$emit('LogoutUser');
        return;
       
      }
      else{
       
          $scope.renderCode=code;
          $scope.renderTitle=title;
          $('nav.dashboard-menu>ul>li').removeClass('active');
          let ctrl=angular.element(event.target);ctrl.parent().parent().addClass('active');ctrl.parent().addClass('active');
        

      }
    }
    else
    {$('#btnOpenPopUp').click();}
      
    }
        
}]);