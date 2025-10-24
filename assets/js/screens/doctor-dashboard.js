app.controller('doctordashboardController', ['$rootScope','$scope','$location','appDataService','getSaasLocalStorage', function ($rootScope,$scope,$location,appDataService,getSaasLocalStorage) {
 
    $scope.loadDoctorDashboardData=function(saasUser)
    {
      
      let _request={saasuserid:saasUser.saasuser.saasuserid,standardtimezone:saasUser.currentappstandardtimezone};
      appDataService.getDoctorDashboardData($scope,_request,'bindDoctorDashboard');

    }
    $scope.bindDoctorDashboard=function(response)
    {
      if(response.Status){
        let userDetail=response.Data.DoctorDetails[0];
        $scope.menu=response.Data.WebMenu;
        $scope.saasuserid=userDetail.saasUserId;
        $scope.saasmemberid=userDetail.saasMemberId;
        $scope.username=userDetail.DoctorName;
        $scope.useravtar=userDetail.UserAvtar;
        $scope.AppointmentCount=userDetail.AppointmentCount;
        $scope.TotalPatient=userDetail.TotalPatient;
        $scope.TodayPatient=userDetail.TodayPatient;
        $scope.SAASDoctorCode=userDetail.SAASDoctorCode;
        $scope.SAASDoctorId=userDetail.SAASDoctorId;
        $scope.Education=userDetail.Education;
        $scope.ProfileStatus=userDetail.ProfileStatus;
        $scope.currentdate=new Date();
        $scope.currentTimeZone=$scope.saasUser.currentappstandardtimezone;
        $scope.isDashboardloading=false;
        }
        else
        {
          PopupAlert('erro','Not Able To Load Dashboard!');
        }

    }
    $scope.onloadscreen=function()
    {  
      $location.search({});
      if(getSaasLocalStorage.loadDoctorDashboard())
      {
        $scope.renderCode='DASH';
        $scope.tabCode='docprofile';
        $scope.isDashboardloading=true;
        $scope.isDashboardContentloading=false;
        $scope.isProfileFound=false;
        $scope.saasUser=getSaasLocalStorage.getLocalParams();
        $scope.loadDoctorDashboardData($scope.saasUser);

      }
      else
      {
        $location.path('/Login');

      }
    }
    $scope.handleView=function(event,code,title)
    {
    
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
          if(code=="DASH")
          {    
              angular.element(function () {
                  loadview();
              });
          }
      }
      
    }
    $scope.loadTab=function(code)
    {

      let defaultTab='docprofile';
        switch(code)
        {
          case 'PROFILE':{ defaultTab='docprofile';break;}
          case 'PROFESSIONAL':{defaultTab='docprofessionalinfo';break;}
          case 'CLINIC':{defaultTab='docclinic';break;}
          case 'TIME':{defaultTab='doctime';break;}
          default:{defaultTab='docprofile';break;}
        }

        $scope.tabCode=defaultTab;
    }
    $scope.onloadscreen();
    
    
    
    angular.element(function () {
        loadview();
      });


    }]);