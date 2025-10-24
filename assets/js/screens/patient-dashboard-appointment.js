app.controller('patientdashboardappointmentController', ['$scope',  'appDataService', function ($scope, appDataService) {


 
    $scope.loadUpcomingAppointments=function()
    {
        $scope.saasuserid=$scope.$parent.saasuserid;
        $scope.saasmemberid=$scope.$parent.saasmemberid;
        $scope.zoneid=$scope.$parent.zoneid;
        $scope.isAppointmentloading=true;
        $scope.selectedAppointmentId=0;
        $scope.isAppointmentSelected=false;
        $scope.upcomingAppointmentList=[];
        let _request={saasuserid:$scope.saasuserid,zoneid:$scope.zoneid};
        appDataService.getPortalUserUpcomingAppointments($scope,_request,'bindUpcomingAppointment');
    }
    $scope.bindUpcomingAppointment=function(response)
    {
        
        if(response.Status)
        {$scope.upcomingAppointmentList=response.Data;}

        $scope.isAppointmentloading=false;
    }
    $scope.loadPastAppointments=function()
    {
      
        
        $scope.isAppointmentloading=true;
        
        $scope.pastAppointmentList=[];
        $scope.fromDate=new Date();
        $scope.toDate=new Date();
        $scope.mdlFromDate=formatDate_MMddYYYY(new Date());
        $scope.mdlToDate=formatDate_MMddYYYY(new Date());
        let _request={saasuserid:$scope.saasuserid,fromdate:formatDate_MMddYYYY($scope.fromDate),todate:formatDate_MMddYYYY($scope.toDate),zoneid:$scope.zoneid};
        appDataService.getPortalUserPastAppointments($scope,_request,'bindPastAppointment');
    }
    $scope.bindPastAppointment=function(response)
    {

        if(response.Status)
        {
           
        $scope.pastAppointmentList=response.Data;}
        $scope.isPastAppointmentFetching=false;
        $scope.isAppointmentloading=false;
   
    }
    $scope.fetchPastAppointment=function()
    {
       
        if($scope.fromDate<=$scope.toDate)
        {
            $scope.pastAppointmentList=[];
        $scope.isPastAppointmentFetching=true;
        let _request={saasuserid:$scope.saasuserid,fromdate:formatDate_MMddYYYY($scope.fromDate),todate:formatDate_MMddYYYY($scope.toDate),zoneid:$scope.zoneid};
        //debugger;
        appDataService.getPortalUserPastAppointments($scope,_request,'bindPastAppointment');
        }
        else
        {
         
            PopupAlert('warn','From Date Cannot be greater the To Date!');
        }

    }
    $scope.date1Changed=function(date,attrs, modelCtrl)
    {
        $scope.fromDate=date;

    }
    $scope.date2Changed=function(date,attrs, modelCtrl)
    {
        $scope.toDate=date;
    }
    $scope.selectAppointmentforCancellation=function(appointmentId)
    {
        $scope.selectedAppointmentId=0;
        $scope.selectedAppointmentId=appointmentId;
        


    }
    $scope.cancelAppointment=function()
    {
        if(!$scope.isAppointmentSelected)
        {
        
        $scope.isAppointmentSelected=true;

        
        let _request={appid:$scope.selectedAppointmentId,memberid:$scope.saasmemberid};
        appDataService.putCancelAppointment($scope,_request,'cancelAppointmentResponse');
        }
        

    }
    $scope.cancelAppointmentResponse=function(response)
    {

        

        if(response.Status)
        {
            

           // Loop through the array
            angular.forEach($scope.upcomingAppointmentList, function(appointment) {
                    // Check if the appointmentId matches 3
                        if (appointment.AppointmentId === $scope.selectedAppointmentId) {
                        // Update the property
                        appointment.AppointMentStatusId = 1500;
                        appointment.AppointMentStatus = 'Cancelled';
                        $scope.selectedAppointmentId=0;
                        $scope.isAppointmentSelected=false;
                    }
                });
            PopupAlert('succ','Appointment Cancelled <b>Successfully</b>');
        }
        else
        {
            $scope.selectedAppointmentId=0;
            $scope.isAppointmentSelected=false;
            PopupAlert('erro',response.Message);


        }

    }
    $scope.loadUpcomingAppointments();


}]);