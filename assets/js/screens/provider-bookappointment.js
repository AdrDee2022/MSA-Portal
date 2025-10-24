app.controller('providerbookAppointmentController', ['$scope','$location','$routeParams','$timeout','appDataService','getSaasLocalStorage' ,  function ($scope,$location,$routeParams,$timeout,appDataService,getSaasLocalStorage) {
  


    $scope.bindScreenData=function(response)
    {
     
      if(response.Status)
      {
    
        $scope.doctor=response.Data.Basic[0];
        $scope.clients=response.Data.Clients;
        $scope.cmblocation=""+$scope.clients[0].HospitalId+"";
        $scope.locationName=$scope.clients[0].HospitalName;
        $scope.isDoctorFound = true;
        $scope.SpecialtyId = 0;
        $scope.VisitTypeId = 0;
        $scope.fetchSlots();
      }
      $scope.isLoading=false;


    }
    $scope.openCalender=function()
    {  
      $('#hdnAppointmentDate').datetimepicker('show');}
    $scope.cal_DateChanged=function(date){

      if(date.getDate()!=$scope.sDate.getDate())
      {
        
      $timeout(function(){$scope.sDate=date;$scope.fetchSlots();},10);
      }
      
      //$scope.$apply();
    }
    $scope.adjustdate=function(flag)
    {
      
      if(flag=='s'){
        let _date=new Date($scope.sDate);
        _date.setDate(_date.getDate() - 1);
        $scope.sDate=_date;
      }
      if(flag=='a'){
        let _date=new Date($scope.sDate);
        _date.setDate(_date.getDate() + 1);
        $scope.sDate=_date;
      }
      $scope.fetchSlots();

    }
     // For location Drop Down Change
    $scope.fetchSlots=function()
    { 
        var c = $scope.saasUser.currentappstandardtimezone;
            debugger;
      $scope.isSloatsFound=true;  
      $scope.isTimeSlotLoading=true;
      let _request={doctorid:$scope.doctor.DoctorId,date:formatDate_MMddYYYY($scope.sDate),locationid:$scope.cmblocation,zoneid:$scope.saasUser.currentappstandardtimezone};
      appDataService.getDoctorSlotsData($scope,_request,'bindSlots');
     

    }

         // For location TAB
         $scope.fetchSlotsTab=function(index)
         { 
          
          
          $scope.cmblocation=""+$scope.clients[index].HospitalId+"";
          $scope.locationName=$scope.clients[index].HospitalName;
           $scope.isSloatsFound=true;  
           $scope.isTimeSlotLoading=true;
           let _request={doctorid:$scope.doctor.DoctorId,date:formatDate_MMddYYYY($scope.sDate),locationid:$scope.cmblocation,zoneid:$scope.saasUser.currentappstandardtimezone};
           appDataService.getDoctorSlotsData($scope,_request,'bindSlots');
          
     
         }



    $scope.bindSlots=function(response)
    {
      
      if((response.Status))
      {
          ;
          $scope.SpecialtyId = response.Data.ScheduleFor[0].SpecialtyId;
          $scope.VisitTypeId = response.Data.ScheduleFor[0].VisitTypeId;
        $scope.IsMorningScheule=response.Data.IsMorningScheule;
        $scope.IsAfternoonScheule=response.Data.IsAfternoonScheule;
        $scope.IsEveningScheule=response.Data.IsEveningScheule;
        if((!$scope.IsMorningScheule) && (!$scope.IsAfternoonScheule) && (!$scope.IsEveningScheule))
        { $scope.isSloatsFound=false; }
        else
        {
           
          $scope.isSloatsFound=true; 
          $scope.morningTimeSloats=response.Data.MorningSchedule;
          $scope.afternoonTimeSloats=response.Data.AfternoonSchedule;
          $scope.eveningTimeSloats=response.Data.EveningSchedule;
          $scope.slotDurationinMinutes=response.Data.ScheduleFor[0].SlotDurationInMinute;
        }
      
      }
      else
      {
        $scope.isSloatsFound=false; 
      }
      $scope.isTimeSlotLoading=false;

    }
    $scope.selectSlot=function(e,slot,eslot,utcslot,Availablity)
    {   
      if(Availablity=='A'){
      $scope.selectedSlot=slot;
      $scope.selectedSlote=eslot;
      $scope.selectedSlotutc=utcslot;
      $scope.handleEvent(e);
      }
     
    }
    $scope.handleEvent=function(e)
    {
     
      angular.element(document.querySelector(".selected")).removeClass('selected');
      
      if (e.target.nodeName === 'SPAN') {
        angular.element(e.target).parent().addClass('selected');

      }
      else
      {
        angular.element(e.target).addClass('selected');
      }
     
      
      
    }
    $scope.goforBook=function()
    {

        _param = { doctorid: $scope.doctor.DoctorId, doctorname: $scope.doctor.DoctorName, doctorimage: $scope.doctor.DoctorImage, education: $scope.doctor.Education, ratings: $scope.doctor.Ratings, feedbacks: $scope.doctor.Feedbacks, specialty: $scope.doctor.Specialty, visittype: $scope.rdovisitType, slotspecialtyid: $scope.SpecialtyId, slotvisittypeid: $scope.VisitTypeId, fee: $scope.doctor.maxFee, locationid: $scope.cmblocation, locationname: $scope.locationName, date: formatDate_MMddYYYY($scope.sDate), time: $scope.selectedSlot, slotdurationinminutes: $scope.slotDurationinMinutes, slote: $scope.selectedSlote, slotutc: $scope.selectedSlotutc };
        ;
        getSaasLocalStorage._storeappointmentData(_param);
       $location.search({});
      $location.path('book-appointment-checkout');     
    }
    
    $scope.pageInt=function()
    {    

      $scope.doctorName=$routeParams.doctorName;
      $scope.isLoading=true;
      $scope.isDoctorFound=false;
      $scope.sDate=new Date();
      let _maxdate = new Date();_maxdate.setDate(_maxdate.getDate() + 15);
      let _mindate= new Date();
      $scope.rdovisitType="Clinic Visit";
      $scope.minDate=_mindate;$scope.maxDate=_maxdate;
      $scope.saasUser=getSaasLocalStorage.getLocalParams();
      getSaasLocalStorage._clearappointmentData();
      if($scope.doctorName!='0'){
        
  
          let _request={doctorname:$scope.doctorName.trim().replace('-', ' ').replaceAll('--','-')};
        
        appDataService.getBookAppointmentScreenData($scope,_request,'bindScreenData');
       
      }
      else
      {$scope.isLoading=false;}

    } 
    $scope.pageInt();

    angular.element(function () {
      loadview();
    });
  }]);