app.controller('doctordashboardappointmentController', ['$scope','appDataService', function ($scope,appDataService) {
  
$scope.bindAppointments=function()
{
   $scope.DoctorId= $scope.$parent.SAASDoctorId;$scope.TimeZone= $scope.$parent.currentTimeZone;let toDate=new Date();toDate.setDate(toDate.getDate() + 15);
  
   _request={DoctorID:$scope.DoctorId,HospitalId:0,ZoneID:$scope.TimeZone,FromDate:formatDate_MMddYYYY(new Date()),ToDate:formatDate_MMddYYYY(toDate)};
   appDataService.getDoctorDashboardAppointmentData($scope,_request,'bindDoctorAppointments');


}
$scope.bindDoctorAppointments=function(rdata)
{
    if(rdata.Status)
    {
        $scope.todaysAppointments=rdata.Data.TodaysAppointment;
        $scope.upcomingAppointments=rdata.Data.Upcoming15daysAppointment;
    }

}
$scope.bindAppointments();

}]);