
app.controller('providerbookAppointmentcheckoutController', ['$scope','$location','$timeout','appDataService','getSaasLocalStorage' ,  function ($scope,$location,$timeout,appDataService,getSaasLocalStorage) {


$scope.bookAppointment=function()
{
    
    $scope.isProcessing=true;
 
    _request = { date: $scope.date, time: $scope.time, slotdurationinminutes: $scope.slotdurationinminutes, slotend: $scope.slotend, slotutc: $scope.slotutc, username: $scope.saasUser.saasuser.username, saasmemberid: $scope.saasUser.saasuser.saasmemberid, saasuserid: $scope.saasUser.saasuser.saasuserid, mobile: $scope.saasUser.saasuser.mobile, email: $scope.saasUser.saasuser.email, ssn: $scope.saasUser.saasuser.ssn, doctorid: $scope.doctorid, hospitalid: 0, isvideovisit: false, SlotSpecialtyId: $scope.SpecialtyId, SlotVisitTypeId: $scope.VisitTypeId, zoneID: $scope.saasUser.currentappstandardtimezone, payerid: 16682, saashospitalid: $scope.locationid };
    ;
    appDataService.submitBookAppointment($scope, _request, 'handleAppointmentRequest');
    
}
$scope.handleAppointmentRequest=function(response)
{
    
    if(response.Status)
    {
        $scope.isAppointment=true;
        $scope.AppointmentNumber=response.Message;

    }
    else
    {
        $scope.isAppointment=false;

    }
    $scope.reqComplete=true;
    $scope.isProcessing=false;

}
$scope.pageInt=function()
{

    if(getSaasLocalStorage._validateappointmentRequest()){
        $scope.saasUser=getSaasLocalStorage.getLocalParams();
    if($scope.saasUser.isuserloggedin ) {
    let appointment=getSaasLocalStorage._getappointmentData();//instead of get check first without removing !
    $scope.isrequest=false;
    if(appointment){


    $scope.doctorname=appointment.doctorname;
    $scope.doctorid=appointment.doctorid;   
    $scope.doctorimage=appointment.doctorimage;   
    $scope.date=appointment.date;  
    $scope.date_s=new Date(appointment.date);
    $scope.education=appointment.education; 
    $scope.fee=appointment.fee;   
    $scope.feedbacks=appointment.feedbacks;   
    $scope.locationid=appointment.locationid;   
    $scope.locationname=appointment.locationname;   
    $scope.ratings=appointment.ratings;   
    $scope.specialty=appointment.specialty; 
    $scope.slotdurationinminutes=appointment.slotdurationinminutes; 
    $scope.slotend=appointment.slote; 
    $scope.slotutc=appointment.slotutc; 
    $scope.time=appointment.time;   
    $scope.visittype = appointment.visittype;
    $scope.SpecialtyId = appointment.slotspecialtyid;
    $scope.VisitTypeId = appointment.slotvisittypeid;

            $scope.reqComplete=false;
            $scope.isProcessing=false;
            $scope.isrequest=true;
            angular.element(function () {
                loadview();
              });

      

    }
    else
    {   $location.search({});
        $location.path('/');
        
    }
}                 
else
    {$location.path('login').search({ return:'checkout' });}
}
else
{
    $location.search({});
    $location.path('/');
}
}
$scope.pageInt();


}]);