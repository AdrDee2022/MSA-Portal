app.controller('doctorProfileDoctorTimeController', ['$scope','$filter','appDataService', function ($scope,$filter,appDataService) {
  
    $scope.bindDoctorTime=function()
    {
        $scope.issaved=false;
        $scope.isclinic=false;
        $scope.DoctorId= $scope.$parent.SAASDoctorId;
        $scope.TimeZone= $scope.$parent.currentTimeZone;
        $scope.ClinicId= 0;
        $scope.DoctorTimingListFinal=[];
        $scope.UserId=$scope.saasUser.saasuser.saasuserid;       
        _request={DoctorID:$scope.DoctorId,TimeZone:$scope.TimeZone,ClinicId:$scope.ClinicId};
        appDataService.getDoctorProfileDoctorTimeData($scope,_request,'bindDoctorTimeDetails');
    }
    $scope.bindDoctorTimeDetails=function(rdata)
    {
        if(rdata.Status)
        {
            
            $scope.txtDoctorName=rdata.Data.DoctorTiming[0]["DoctorName"];
            
            $scope.SlotDuationList=rdata.Data.SlotDuation;
            $scope.DoctorClinicList=rdata.Data.ClinicDeatils;
        }
    
    }

    $scope.getDoctorClinic=function()
    {    
        //debugger
        if ($scope.cmbDoctorClinic !== null && $scope.cmbDoctorClinic !== '' && $scope.cmbDoctorClinic !== undefined && $scope.cmbDoctorClinic !== 'undefined') {
           $scope.issaved=false;
            _request={DoctorID:$scope.DoctorId,TimeZone:$scope.TimeZone,ClinicId:$scope.cmbDoctorClinic};
            appDataService.getDoctorProfileDoctorTimeData($scope,_request,'bindDoctorTimings');
        }
        else{
            $scope.cmbSlot='';            
            $scope.txtSundayFirstShiftFrom ='';
            $scope.txtSundayFirstShiftTo = '';            
            $scope.txtSundaySecondShiftFrom ='';            
            $scope.txtSundaySecondShiftTo ='';            
            $scope.txtMondayFirstShiftFrom ='';            
            $scope.txtMondayFirstShiftTo ='';            
            $scope.txtMondaySecondShiftFrom ='';            
            $scope.txtMondaySecondShiftTo ='';            
            $scope.txtTuesdayFirstShiftFrom ='';            
            $scope.txtTuesdayFirstShiftTo ='';            
            $scope.txtTuesdaySecondShiftFrom ='';            
            $scope.txtTuesdaySecondShiftTo ='';            
            $scope.txtWednesdayFirstShiftFrom ='';            
            $scope.txtWednesdayFirstShiftTo ='';            
            $scope.txtWednesdaySecondShiftFrom ='';            
            $scope.txtWednesdaySecondShiftTo ='';            
            $scope.txtThursdayFirstShiftFrom ='';            
            $scope.txtThursdayFirstShiftTo ='';            
            $scope.txtThursdaySecondShiftFrom ='';            
            $scope.txtThursdaySecondShiftTo ='';            
            $scope.txtFridayFirstShiftFrom ='';            
            $scope.txtFridayFirstShiftTo ='';            
            $scope.txtFridaySecondShiftFrom ='';            
            $scope.txtFridaySecondShiftTo ='';            
            $scope.txtSaturdayFirstShiftFrom ='';            
            $scope.txtSaturdayFirstShiftTo ='';            
            $scope.txtSaturdaySecondShiftFrom ='';            
            $scope.txtSaturdaySecondShiftTo ='';            
        }
    }

    $scope.bindDoctorTimings=function(rdata)
    {
        // //debugger
        if(rdata.Status)
        {   
            $scope.isclinic=true;
            if(rdata.Data.DoctorTiming[0]["SlotDuration"]=="0")
            {
                $scope.cmbSlot='';
            }else{
                $scope.cmbSlot=''+rdata.Data.DoctorTiming[0]["SlotDuration"]+'';
            }
            if (rdata.Data.DoctorTiming[0]["FirstShiftFrom"] !== null && rdata.Data.DoctorTiming[0]["FirstShiftFrom"] !== '') 
            {
                $scope.txtSundayFirstShiftFrom =(new Date(rdata.Data.DoctorTiming[0]["FirstShiftFrom"]));
            }
            else{
                $scope.txtSundayFirstShiftFrom ='';
            }
            if (rdata.Data.DoctorTiming[0]["FirstShiftTo"] !== null && rdata.Data.DoctorTiming[0]["FirstShiftTo"] !== '') 
            {
                $scope.txtSundayFirstShiftTo = new Date(rdata.Data.DoctorTiming[0]["FirstShiftTo"]);
            }
            else{
                $scope.txtSundayFirstShiftTo = '';
            }
            if (rdata.Data.DoctorTiming[0]["SecondShiftFrom"] !== null && rdata.Data.DoctorTiming[0]["SecondShiftFrom"] !== '') 
            {
                $scope.txtSundaySecondShiftFrom = new Date(rdata.Data.DoctorTiming[0]["SecondShiftFrom"]);
            }
            else{
                $scope.txtSundaySecondShiftFrom ='';
            }
            if (rdata.Data.DoctorTiming[0]["SecondShiftTo"] !== null && rdata.Data.DoctorTiming[0]["SecondShiftTo"] !== '') 
            {
             $scope.txtSundaySecondShiftTo = new Date(rdata.Data.DoctorTiming[0]["SecondShiftTo"]);
            }
            else{
                $scope.txtSundaySecondShiftTo ='';
            }


            if (rdata.Data.DoctorTiming[1]["FirstShiftFrom"] !== null && rdata.Data.DoctorTiming[1]["FirstShiftFrom"] !== '') 
            {
                $scope.txtMondayFirstShiftFrom = new Date(rdata.Data.DoctorTiming[1]["FirstShiftFrom"]);
            }else{
                $scope.txtMondayFirstShiftFrom ='';
            }
            if (rdata.Data.DoctorTiming[1]["FirstShiftTo"] !== null && rdata.Data.DoctorTiming[1]["FirstShiftTo"] !== '') 
            {
                $scope.txtMondayFirstShiftTo = new Date(rdata.Data.DoctorTiming[1]["FirstShiftTo"]);
            }else{
                $scope.txtMondayFirstShiftTo ='';
            }
            if (rdata.Data.DoctorTiming[1]["SecondShiftFrom"] !== null && rdata.Data.DoctorTiming[1]["SecondShiftFrom"] !== '') 
            {
                $scope.txtMondaySecondShiftFrom = new Date(rdata.Data.DoctorTiming[1]["SecondShiftFrom"]);
            }else{
                $scope.txtMondaySecondShiftFrom ='';
            }
            if (rdata.Data.DoctorTiming[1]["SecondShiftTo"] !== null && rdata.Data.DoctorTiming[1]["SecondShiftTo"] !== '') 
            {
                $scope.txtMondaySecondShiftTo = new Date(rdata.Data.DoctorTiming[1]["SecondShiftTo"]);
            }else{
                $scope.txtMondaySecondShiftTo ='';
            }


            if (rdata.Data.DoctorTiming[2]["FirstShiftFrom"] !== null && rdata.Data.DoctorTiming[2]["FirstShiftFrom"] !== '') 
            {
                $scope.txtTuesdayFirstShiftFrom = new Date(rdata.Data.DoctorTiming[2]["FirstShiftFrom"]);
            }else{
                $scope.txtTuesdayFirstShiftFrom ='';
            }
            if (rdata.Data.DoctorTiming[2]["FirstShiftTo"] !== null && rdata.Data.DoctorTiming[2]["FirstShiftTo"] !== '') 
            {
                $scope.txtTuesdayFirstShiftTo = new Date(rdata.Data.DoctorTiming[2]["FirstShiftTo"]);
            }else{
                $scope.txtTuesdayFirstShiftTo ='';
            }
            if (rdata.Data.DoctorTiming[2]["SecondShiftFrom"] !== null && rdata.Data.DoctorTiming[2]["SecondShiftFrom"] !== '') 
            {
                $scope.txtTuesdaySecondShiftFrom = new Date(rdata.Data.DoctorTiming[2]["SecondShiftFrom"]);
            }else{
                $scope.txtTuesdaySecondShiftFrom ='';
            }
            if (rdata.Data.DoctorTiming[2]["SecondShiftTo"] !== null && rdata.Data.DoctorTiming[2]["SecondShiftTo"] !== '') 
            {
                $scope.txtTuesdaySecondShiftTo = new Date(rdata.Data.DoctorTiming[2]["SecondShiftTo"]);
            }else{
                $scope.txtTuesdaySecondShiftTo ='';
            }

            if (rdata.Data.DoctorTiming[3]["FirstShiftFrom"] !== null && rdata.Data.DoctorTiming[3]["FirstShiftFrom"] !== '') 
            {
                $scope.txtWednesdayFirstShiftFrom = new Date(rdata.Data.DoctorTiming[3]["FirstShiftFrom"]);
            }else{
                $scope.txtWednesdayFirstShiftFrom ='';
            }
            if (rdata.Data.DoctorTiming[3]["FirstShiftTo"] !== null && rdata.Data.DoctorTiming[3]["FirstShiftTo"] !== '') 
            {
                $scope.txtWednesdayFirstShiftTo = new Date(rdata.Data.DoctorTiming[3]["FirstShiftTo"]);
            }else{
                $scope.txtWednesdayFirstShiftTo ='';
            }
            if (rdata.Data.DoctorTiming[3]["SecondShiftFrom"] !== null && rdata.Data.DoctorTiming[3]["SecondShiftFrom"] !== '') 
            {            
                $scope.txtWednesdaySecondShiftFrom = new Date(rdata.Data.DoctorTiming[3]["SecondShiftFrom"]);
            }else{
                $scope.txtWednesdaySecondShiftFrom ='';
            }
            if (rdata.Data.DoctorTiming[3]["SecondShiftTo"] !== null && rdata.Data.DoctorTiming[3]["SecondShiftTo"] !== '') 
            {
                $scope.txtWednesdaySecondShiftTo =new Date(rdata.Data.DoctorTiming[3]["SecondShiftTo"]);
            }else{
                $scope.txtWednesdaySecondShiftTo ='';
            }



            if (rdata.Data.DoctorTiming[4]["FirstShiftFrom"] !== null && rdata.Data.DoctorTiming[4]["FirstShiftFrom"] !== '') 
            {
                $scope.txtThursdayFirstShiftFrom =new Date(rdata.Data.DoctorTiming[4]["FirstShiftFrom"]);
            }else{
                $scope.txtThursdayFirstShiftFrom ='';
            }
            if (rdata.Data.DoctorTiming[4]["FirstShiftTo"] !== null && rdata.Data.DoctorTiming[4]["FirstShiftTo"] !== '') 
            {
                $scope.txtThursdayFirstShiftTo = new Date(rdata.Data.DoctorTiming[4]["FirstShiftTo"]);
            }else{
                $scope.txtThursdayFirstShiftTo ='';
            }
            if (rdata.Data.DoctorTiming[4]["SecondShiftFrom"] !== null && rdata.Data.DoctorTiming[4]["SecondShiftFrom"] !== '') 
            { 
                $scope.txtThursdaySecondShiftFrom =new Date(rdata.Data.DoctorTiming[4]["SecondShiftFrom"]);
            }else{
                $scope.txtThursdaySecondShiftFrom ='';
            }
            if (rdata.Data.DoctorTiming[4]["SecondShiftTo"] !== null && rdata.Data.DoctorTiming[4]["SecondShiftTo"] !== '') 
            {
                $scope.txtThursdaySecondShiftTo =new Date(rdata.Data.DoctorTiming[4]["SecondShiftTo"]);
            }else{
                $scope.txtThursdaySecondShiftTo ='';
            }


            if (rdata.Data.DoctorTiming[5]["FirstShiftFrom"] !== null && rdata.Data.DoctorTiming[5]["FirstShiftFrom"] !== '') 
            {
                $scope.txtFridayFirstShiftFrom = new Date(rdata.Data.DoctorTiming[5]["FirstShiftFrom"]);
            }else{
                $scope.txtFridayFirstShiftFrom ='';
            }
            if (rdata.Data.DoctorTiming[5]["FirstShiftTo"] !== null && rdata.Data.DoctorTiming[5]["FirstShiftTo"] !== '') 
            {
                $scope.txtFridayFirstShiftTo =new Date(rdata.Data.DoctorTiming[5]["FirstShiftTo"]);
            }else{
                $scope.txtFridayFirstShiftTo ='';
            }
            if (rdata.Data.DoctorTiming[5]["SecondShiftFrom"] !== null && rdata.Data.DoctorTiming[5]["SecondShiftFrom"] !== '') 
            { 
                $scope.txtFridaySecondShiftFrom = new Date(rdata.Data.DoctorTiming[5]["SecondShiftFrom"]);
            }else{
                $scope.txtFridaySecondShiftFrom ='';
            }
            if (rdata.Data.DoctorTiming[5]["SecondShiftTo"] !== null && rdata.Data.DoctorTiming[5]["SecondShiftTo"] !== '') 
            {
                $scope.txtFridaySecondShiftTo = new Date(rdata.Data.DoctorTiming[5]["SecondShiftTo"]);
            }else{
                $scope.txtFridaySecondShiftTo ='';
            }


            if (rdata.Data.DoctorTiming[6]["FirstShiftFrom"] !== null && rdata.Data.DoctorTiming[6]["FirstShiftFrom"] !== '') 
            {
                $scope.txtSaturdayFirstShiftFrom =new Date(rdata.Data.DoctorTiming[6]["FirstShiftFrom"]);
            }else{
                $scope.txtSaturdayFirstShiftFrom ='';
            }
            if (rdata.Data.DoctorTiming[6]["FirstShiftTo"] !== null && rdata.Data.DoctorTiming[6]["FirstShiftTo"] !== '') 
            {
                $scope.txtSaturdayFirstShiftTo =new Date(rdata.Data.DoctorTiming[6]["FirstShiftTo"]);
            }else{
                $scope.txtSaturdayFirstShiftTo ='';
            }
            if (rdata.Data.DoctorTiming[6]["SecondShiftFrom"] !== null && rdata.Data.DoctorTiming[6]["SecondShiftFrom"] !== '') 
            {
                $scope.txtSaturdaySecondShiftFrom =new Date(rdata.Data.DoctorTiming[6]["SecondShiftFrom"]);
            }else{
                $scope.txtSaturdaySecondShiftFrom ='';
            }
            if (rdata.Data.DoctorTiming[6]["SecondShiftTo"] !== null && rdata.Data.DoctorTiming[6]["SecondShiftTo"] !== '') 
            {
                $scope.txtSaturdaySecondShiftTo = new Date(rdata.Data.DoctorTiming[6]["SecondShiftTo"]);
            }else{
                $scope.txtSaturdaySecondShiftTo ='';
            }
        }
        else{
            PopupAlert('erro',rdata.Message);
        }
    
    }

    $scope.bindDoctorTimingsForSave=function(rdata)
    {
        // //debugger
        if(rdata.Status)
        {   
            $scope.isclinic=true;

            if(rdata.Data[0]["SlotDuration"]=="0")
            {
                $scope.cmbSlot='';
            }else{
                $scope.cmbSlot=''+rdata.Data[0]["SlotDuration"]+'';

            }


            $scope.txtSundayFirstShiftFrom =rdata.Data[0]["FirstShiftFrom"]==''?null:(new Date(rdata.Data[0]["FirstShiftFrom"]));
             $scope.txtSundayFirstShiftTo = rdata.Data[0]["FirstShiftTo"]==''?null:new Date(rdata.Data[0]["FirstShiftTo"]);
             $scope.txtSundaySecondShiftFrom = rdata.Data[0]["SecondShiftFrom"]==''?null:new Date(rdata.Data[0]["SecondShiftFrom"]);
             $scope.txtSundaySecondShiftTo = rdata.Data[0]["SecondShiftTo"]==''?null:new Date(rdata.Data[0]["SecondShiftTo"]);
            
            $scope.txtMondayFirstShiftFrom = rdata.Data[1]["FirstShiftFrom"]==''?null:new Date(rdata.Data[1]["FirstShiftFrom"]);
            $scope.txtMondayFirstShiftTo =  rdata.Data[1]["FirstShiftTo"]==''?null:new Date(rdata.Data[1]["FirstShiftTo"]);
            $scope.txtMondaySecondShiftFrom = rdata.Data[1]["SecondShiftFrom"]==''?null: new Date(rdata.Data[1]["SecondShiftFrom"]);
            $scope.txtMondaySecondShiftTo = rdata.Data[1]["SecondShiftTo"]==''?null: new Date(rdata.Data[1]["SecondShiftTo"]);
            
           $scope.txtTuesdayFirstShiftFrom = rdata.Data[2]["FirstShiftFrom"]==''?null:new Date(rdata.Data[2]["FirstShiftFrom"]);
           $scope.txtTuesdayFirstShiftTo = rdata.Data[2]["FirstShiftTo"]==''?null:new Date(rdata.Data[2]["FirstShiftTo"]);
           $scope.txtTuesdaySecondShiftFrom = rdata.Data[2]["SecondShiftFrom"]==''?null:new Date(rdata.Data[2]["SecondShiftFrom"]);
           $scope.txtTuesdaySecondShiftTo = rdata.Data[2]["SecondShiftTo"]==''?null:new Date(rdata.Data[2]["SecondShiftTo"]);
            
            $scope.txtWednesdayFirstShiftFrom = rdata.Data[3]["FirstShiftFrom"]==''?null:new Date(rdata.Data[3]["FirstShiftFrom"]);
            $scope.txtWednesdayFirstShiftTo = rdata.Data[3]["FirstShiftTo"]==''?null:new Date(rdata.Data[3]["FirstShiftTo"]);
            $scope.txtWednesdaySecondShiftFrom = rdata.Data[3]["SecondShiftFrom"]==''?null:new Date(rdata.Data[3]["SecondShiftFrom"]);
            $scope.txtWednesdaySecondShiftTo = rdata.Data[3]["SecondShiftTo"]==''?null:new Date(rdata.Data[3]["SecondShiftTo"]);
            
            $scope.txtThursdayFirstShiftFrom =rdata.Data[4]["FirstShiftFrom"]==''?null: new Date(rdata.Data[4]["FirstShiftFrom"]);
            $scope.txtThursdayFirstShiftTo =rdata.Data[4]["FirstShiftTo"]==''?null: new Date(rdata.Data[4]["FirstShiftTo"]);
            $scope.txtThursdaySecondShiftFrom =rdata.Data[4]["SecondShiftFrom"]==''?null: new Date(rdata.Data[4]["SecondShiftFrom"]);
            $scope.txtThursdaySecondShiftTo =rdata.Data[4]["SecondShiftTo"]==''?null: new Date(rdata.Data[4]["SecondShiftTo"]);
            
            $scope.txtFridayFirstShiftFrom =rdata.Data[5]["FirstShiftFrom"]==''?null: new Date(rdata.Data[5]["FirstShiftFrom"]);
            $scope.txtFridayFirstShiftTo =rdata.Data[5]["FirstShiftTo"]==''?null: new Date(rdata.Data[5]["FirstShiftTo"]);
            $scope.txtFridaySecondShiftFrom =rdata.Data[5]["SecondShiftFrom"]==''?null: new Date(rdata.Data[5]["SecondShiftFrom"]);
            $scope.txtFridaySecondShiftTo =rdata.Data[5]["SecondShiftTo"]==''?null: new Date(rdata.Data[5]["SecondShiftTo"]);
            
            
            $scope.txtSaturdayFirstShiftFrom =rdata.Data[6]["FirstShiftFrom"]==''?null: new Date(rdata.Data[6]["FirstShiftFrom"]);
            $scope.txtSaturdayFirstShiftTo =rdata.Data[6]["FirstShiftTo"]==''?null: new Date(rdata.Data[6]["FirstShiftTo"]);
            $scope.txtSaturdaySecondShiftFrom = rdata.Data[6]["SecondShiftFrom"]==''?null:new Date(rdata.Data[6]["SecondShiftFrom"]);
            $scope.txtSaturdaySecondShiftTo = rdata.Data[6]["SecondShiftTo"]==''?null:new Date(rdata.Data[6]["SecondShiftTo"]);
            if($scope.issaved)
            {
                PopupAlert('succ',rdata.Message);
            }
        }
        else{
            PopupAlert('erro',rdata.Message);
        }
    
    }

    
    $scope.manageDoctorTimings=function()
    {
       //debugger
        $scope.Msg='';
        if ($scope.cmbDoctorClinic == null || $scope.cmbDoctorClinic == '' || $scope.cmbDoctorClinic == undefined || $scope.cmbDoctorClinic == 'undefined') {
            $scope.Msg+='Please Select Clinic Name.';  
        }
        if($scope.cmbSlot == null || $scope.cmbSlot == '' || $scope.cmbSlot == undefined || $scope.cmbSlot == 'undefined') {
            if($scope.Msg!="")
            {
                $scope.Msg+='<br> ';
            }
            $scope.Msg+='Please Select Time Slot.';  
        }
        if($scope.Msg!="")
        {
            PopupAlert('info',$scope.Msg);
            return;
        }
        $scope.issaved=true;
        $scope.DoctorTimingListFinal=[];
        //debugger

        $scope.DoctorTimingListFinal.push({
        DoctorId: $scope.DoctorId, 
        Days: "Sunday",           
        FromSlot1: $filter('date')($scope.txtSundayFirstShiftFrom, 'shortTime')==null?null:$filter('date')($scope.txtSundayFirstShiftFrom, 'shortTime'),
        ToSlot1: $filter('date')($scope.txtSundayFirstShiftTo, 'shortTime')==null?null:$filter('date')($scope.txtSundayFirstShiftTo, 'shortTime'),
        FromSlot2: $filter('date')($scope.txtSundaySecondShiftFrom, 'shortTime')==null?null:$filter('date')($scope.txtSundaySecondShiftFrom, 'shortTime'),
        ToSlot2: $filter('date')($scope.txtSundaySecondShiftTo, 'shortTime')==null?null:$filter('date')($scope.txtSundaySecondShiftTo, 'shortTime'),
        }); 

        $scope.DoctorTimingListFinal.push({
        DoctorId: $scope.DoctorId, 
        Days: "Monday",
        FromSlot1: $filter('date')($scope.txtMondayFirstShiftFrom, 'shortTime')==null?null:$filter('date')($scope.txtMondayFirstShiftFrom, 'shortTime'),
        ToSlot1: $filter('date')($scope.txtMondayFirstShiftTo, 'shortTime')==null?null:$filter('date')($scope.txtMondayFirstShiftTo, 'shortTime'),
        FromSlot2: $filter('date')($scope.txtMondaySecondShiftFrom, 'shortTime')==null?null:$filter('date')($scope.txtMondaySecondShiftFrom, 'shortTime'),
        ToSlot2: $filter('date')($scope.txtMondaySecondShiftTo, 'shortTime')==null?null:$filter('date')($scope.txtMondaySecondShiftTo, 'shortTime'),
        }); 

        $scope.DoctorTimingListFinal.push({
        DoctorId: $scope.DoctorId, 
        Days: "Tuesday",
        FromSlot1: $filter('date')($scope.txtTuesdayFirstShiftFrom, 'shortTime')==null?null:$filter('date')($scope.txtTuesdayFirstShiftFrom, 'shortTime'),
        ToSlot1: $filter('date')($scope.txtTuesdayFirstShiftTo, 'shortTime')==null?null:$filter('date')($scope.txtTuesdayFirstShiftTo, 'shortTime') ,
        FromSlot2: $filter('date')($scope.txtTuesdaySecondShiftFrom, 'shortTime')==null?null:$filter('date')($scope.txtTuesdaySecondShiftFrom, 'shortTime'),
        ToSlot2: $filter('date')($scope.txtTuesdaySecondShiftTo, 'shortTime')==null?null:$filter('date')($scope.txtTuesdaySecondShiftTo, 'shortTime'),
        }); 

        $scope.DoctorTimingListFinal.push({
        DoctorId: $scope.DoctorId, 
        Days: "Wednesday",
        FromSlot1: $filter('date')($scope.txtWednesdayFirstShiftFrom, 'shortTime')==null?null: $filter('date')($scope.txtWednesdayFirstShiftFrom, 'shortTime') ,
        ToSlot1: $filter('date')($scope.txtWednesdayFirstShiftTo, 'shortTime')==null?null: $filter('date')($scope.txtWednesdayFirstShiftTo, 'shortTime') ,
        FromSlot2: $filter('date')($scope.txtWednesdaySecondShiftFrom, 'shortTime')==null?null:$filter('date')($scope.txtWednesdaySecondShiftFrom, 'shortTime'),
        ToSlot2:  $filter('date')($scope.txtWednesdaySecondShiftTo, 'shortTime')==null?null:$filter('date')($scope.txtWednesdaySecondShiftTo, 'shortTime'),
        }); 

        $scope.DoctorTimingListFinal.push({
        DoctorId: $scope.DoctorId, 
        Days: "Thursday",
        FromSlot1: $filter('date')($scope.txtThursdayFirstShiftFrom, 'shortTime')==null?null: $filter('date')($scope.txtThursdayFirstShiftFrom, 'shortTime') ,
        ToSlot1: $filter('date')($scope.txtThursdayFirstShiftTo, 'shortTime')==null?null: $filter('date')($scope.txtThursdayFirstShiftTo, 'shortTime')  ,
        FromSlot2: $filter('date')($scope.txtThursdaySecondShiftFrom, 'shortTime')==null?null:$filter('date')($scope.txtThursdaySecondShiftFrom, 'shortTime') ,
        ToSlot2:  $filter('date')($scope.txtThursdaySecondShiftTo, 'shortTime')==null?null:$filter('date')($scope.txtThursdaySecondShiftTo, 'shortTime'),
        });

        $scope.DoctorTimingListFinal.push({
        DoctorId: $scope.DoctorId, 
        Days: "Friday",
        FromSlot1: $filter('date')($scope.txtFridayFirstShiftFrom, 'shortTime')==null?null:$filter('date')($scope.txtFridayFirstShiftFrom, 'shortTime') ,
        ToSlot1: $filter('date')($scope.txtFridayFirstShiftTo, 'shortTime')==null?null:$filter('date')($scope.txtFridayFirstShiftTo, 'shortTime'),
        FromSlot2:$filter('date')($scope.txtFridaySecondShiftFrom, 'shortTime')==null?null:$filter('date')($scope.txtFridaySecondShiftFrom, 'shortTime'),
        ToSlot2: $filter('date')($scope.txtFridaySecondShiftTo, 'shortTime')==null?null:$filter('date')($scope.txtFridaySecondShiftTo, 'shortTime'),
        });

        $scope.DoctorTimingListFinal.push({
        DoctorId: $scope.DoctorId, 
        Days: "Saturday",
        FromSlot1: $filter('date')($scope.txtSaturdayFirstShiftFrom, 'shortTime')==null?null:$filter('date')($scope.txtSaturdayFirstShiftFrom, 'shortTime') ,
        ToSlot1: $filter('date')($scope.txtSaturdayFirstShiftTo, 'shortTime')==null?null:$filter('date')($scope.txtSaturdayFirstShiftTo, 'shortTime'),
        FromSlot2:$filter('date')($scope.txtSaturdaySecondShiftFrom, 'shortTime')==null?null:$filter('date')($scope.txtSaturdaySecondShiftFrom, 'shortTime'),
        ToSlot2: $filter('date')($scope.txtSaturdaySecondShiftTo, 'shortTime')==null?null:$filter('date')($scope.txtSaturdaySecondShiftTo, 'shortTime'),
        });      


        _request={DoctorId:$scope.DoctorId,UserID:$scope.UserId,SlotDuration:$scope.cmbSlot,TimeZoneID:$scope.TimeZone,ClinicId:$scope.cmbDoctorClinic,DoctorTimeDetails:$scope.DoctorTimingListFinal};
        appDataService.PostDoctorProfileDoctorTimeData($scope,_request,'bindDoctorTimingsForSave');
        
    }

    $scope.checkTime=function(flag,CallBy)
    {
        // //debugger
        if(flag==1)
        {
            if(CallBy=='Sun')
            { 
                var currentDate = new Date();
                var FfromDate =null;
                var FtoDate =null;
                var SfromDate =null;
                if($scope.txtSundayFirstShiftFrom!==null && $scope.txtSundayFirstShiftFrom!=='')
                {
                    FfromDate = new Date($filter('date')(currentDate, 'mediumDate') +' '+ $filter('date')($scope.txtSundayFirstShiftFrom, 'shortTime'));
                }
                if($scope.txtSundayFirstShiftTo!==null && $scope.txtSundayFirstShiftTo!=='')
                {
                    FtoDate = new Date($filter('date')(currentDate, 'mediumDate') +' '+ $filter('date')($scope.txtSundayFirstShiftTo, 'shortTime'));               
                }               
                if($scope.txtSundaySecondShiftFrom!==null && $scope.txtSundaySecondShiftFrom!=='')
                {
                    FtoDate = new Date($filter('date')(currentDate, 'mediumDate') +' '+ $filter('date')($scope.txtSundaySecondShiftFrom, 'shortTime'));
                }
                if(FfromDate.getTime() !="" && FtoDate.getTime()!="")
                {
                    if(FfromDate.getTime() >=FtoDate.getTime()) 
                    {
                        $scope.txtSundayFirstShiftTo="";
                        PopupAlert('warn','From Time Cannot be greater then and Equal to To Time!');
                    }
                }
                
                if(SfromDate.getTime()!="" && FtoDate.getTime()!="")
                {
                    if(SfromDate.getTime()<=FtoDate.getTime()) 
                    { 
                        $scope.txtSundaySecondShiftFrom="";
                        PopupAlert('warn','Second shift From Time Cannot be less then and Equal to First Shift!');
                    }
                }
            }
            if(CallBy=='Mon')
            {
                var currentDate = new Date();
                var FfromDate =null;
                var FtoDate =null;
                var SfromDate =null;
                if($scope.txtMondayFirstShiftFrom!==null && $scope.txtMondayFirstShiftFrom!=='')
                {
                    FfromDate = new Date($filter('date')(currentDate, 'mediumDate') +' '+ $filter('date')($scope.txtMondayFirstShiftFrom, 'shortTime'));
                }
                if($scope.txtMondayFirstShiftTo!==null && $scope.txtMondayFirstShiftTo!=='')
                {
                    FtoDate = new Date($filter('date')(currentDate, 'mediumDate') +' '+ $filter('date')($scope.txtMondayFirstShiftTo, 'shortTime'));               
                }               
                if($scope.txtMondaySecondShiftFrom!==null && $scope.txtMondaySecondShiftFrom!=='')
                {
                    SfromDate = new Date($filter('date')(currentDate, 'mediumDate') +' '+ $filter('date')($scope.txtMondaySecondShiftFrom, 'shortTime'));
                }
                if(FfromDate.getTime() !="" && FtoDate.getTime()!="")
                {
                    if(FfromDate.getTime() >=FtoDate.getTime()) 
                    {
                        $scope.txtSundayFirstShiftTo="";
                        PopupAlert('warn','From Time Cannot be greater then and Equal to To Time!');
                    }
                }
                
                if(SfromDate.getTime()!="" && FtoDate.getTime()!="")
                {
                    if(SfromDate.getTime()<=FtoDate.getTime()) 
                    { 
                        $scope.txtSundaySecondShiftFrom="";
                        PopupAlert('warn','Second shift From Time Cannot be less then and Equal to First Shift!');
                    }
                }
            }
            if(CallBy=='tue')
            {
                var currentDate = new Date();
                var FfromDate =null;
                var FtoDate =null;
                var SfromDate =null;
                if($scope.txtTuesdayFirstShiftFrom!==null && $scope.txtTuesdayFirstShiftFrom!=='')
                {
                    FfromDate = new Date($filter('date')(currentDate, 'mediumDate') +' '+ $filter('date')($scope.txtTuesdayFirstShiftFrom, 'shortTime'));
                }
                if($scope.txtTuesdayFirstShiftTo!==null && $scope.txtTuesdayFirstShiftTo!=='')
                {
                    FtoDate = new Date($filter('date')(currentDate, 'mediumDate') +' '+ $filter('date')($scope.txtTuesdayFirstShiftTo, 'shortTime'));               
                }               
                if($scope.txtTuesdaySecondShiftFrom!==null && $scope.txtTuesdaySecondShiftFrom!=='')
                {
                    SfromDate = new Date($filter('date')(currentDate, 'mediumDate') +' '+ $filter('date')($scope.txtTuesdaySecondShiftFrom, 'shortTime'));
                }
                if(FfromDate.getTime() !="" && FtoDate.getTime()!="")
                {
                    if(FfromDate.getTime() >=FtoDate.getTime()) 
                    {
                        $scope.txtSundayFirstShiftTo="";
                        PopupAlert('warn','From Time Cannot be greater then and Equal to To Time!');
                    }
                }
                
                if(SfromDate.getTime()!="" && FtoDate.getTime()!="")
                {
                    if(SfromDate.getTime()<=FtoDate.getTime()) 
                    { 
                        $scope.txtSundaySecondShiftFrom="";
                        PopupAlert('warn','Second shift From Time Cannot be less then and Equal to First Shift!');
                    }
                }
            }
            if(CallBy=='Wed')
            { 
                var currentDate = new Date();
                var FfromDate =null;
                var FtoDate =null;
                var SfromDate =null;
                if($scope.txtWednesdayFirstShiftFrom!==null && $scope.txtWednesdayFirstShiftFrom!=='')
                {
                    FfromDate = new Date($filter('date')(currentDate, 'mediumDate') +' '+ $filter('date')($scope.txtWednesdayFirstShiftFrom, 'shortTime'));
                }
                if($scope.txtWednesdayFirstShiftTo!==null && $scope.txtWednesdayFirstShiftTo!=='')
                {
                    FtoDate = new Date($filter('date')(currentDate, 'mediumDate') +' '+ $filter('date')($scope.txtWednesdayFirstShiftTo, 'shortTime'));               
                }               
                if($scope.txtWednesdaySecondShiftFrom!==null && $scope.txtWednesdaySecondShiftFrom!=='')
                {
                    SfromDate = new Date($filter('date')(currentDate, 'mediumDate') +' '+ $filter('date')($scope.txtWednesdaySecondShiftFrom, 'shortTime'));
                }
                if(FfromDate.getTime() !="" && FtoDate.getTime()!="")
                {
                    if(FfromDate.getTime() >=FtoDate.getTime()) 
                    {
                        $scope.txtSundayFirstShiftTo="";
                        PopupAlert('warn','From Time Cannot be greater then and Equal to To Time!');
                    }
                }
                
                if(SfromDate.getTime()!="" && FtoDate.getTime()!="")
                {
                    if(SfromDate.getTime()<=FtoDate.getTime()) 
                    { 
                        $scope.txtSundaySecondShiftFrom="";
                        PopupAlert('warn','Second shift From Time Cannot be less then and Equal to First Shift!');
                    }
                }

            }
            if(CallBy=='tus')
            {
                var currentDate = new Date();
                var FfromDate =null;
                var FtoDate =null;
                var SfromDate =null;
                if($scope.txtThursdayFirstShiftFrom!==null && $scope.txtThursdayFirstShiftFrom!=='')
                {
                    FfromDate = new Date($filter('date')(currentDate, 'mediumDate') +' '+ $filter('date')($scope.txtThursdayFirstShiftFrom, 'shortTime'));
                }
                if($scope.txtThursdayFirstShiftTo!==null && $scope.txtThursdayFirstShiftTo!=='')
                {
                    FtoDate = new Date($filter('date')(currentDate, 'mediumDate') +' '+ $filter('date')($scope.txtThursdayFirstShiftTo, 'shortTime'));               
                }               
                if($scope.txtThursdaySecondShiftFrom!==null && $scope.txtThursdaySecondShiftFrom!=='')
                {
                    SfromDate = new Date($filter('date')(currentDate, 'mediumDate') +' '+ $filter('date')($scope.txtThursdaySecondShiftFrom, 'shortTime'));
                }
                if(FfromDate.getTime() !="" && FtoDate.getTime()!="")
                {
                    if(FfromDate.getTime() >=FtoDate.getTime()) 
                    {
                        $scope.txtSundayFirstShiftTo="";
                        PopupAlert('warn','From Time Cannot be greater then and Equal to To Time!');
                    }
                }                
                if(SfromDate.getTime()!="" && FtoDate.getTime()!="")
                {
                    if(SfromDate.getTime()<=FtoDate.getTime()) 
                    { 
                        $scope.txtSundaySecondShiftFrom="";
                        PopupAlert('warn','Second shift From Time Cannot be less then and Equal to First Shift!');
                    }
                }                
            }
            if(CallBy=='Fri')
            {
                var currentDate = new Date();
                var FfromDate =null;
                var FtoDate =null;
                var SfromDate =null;
                if($scope.txtFridayFirstShiftFrom!==null && $scope.txtFridayFirstShiftFrom!=='')
                {
                    FfromDate = new Date($filter('date')(currentDate, 'mediumDate') +' '+ $filter('date')($scope.txtFridayFirstShiftFrom, 'shortTime'));
                }
                if($scope.txtFridayFirstShiftTo!==null && $scope.txtFridayFirstShiftTo!=='')
                {
                    FtoDate = new Date($filter('date')(currentDate, 'mediumDate') +' '+ $filter('date')($scope.txtFridayFirstShiftTo, 'shortTime'));               
                }               
                if($scope.txtFridaySecondShiftFrom!==null && $scope.txtFridaySecondShiftFrom!=='')
                {
                    SfromDate = new Date($filter('date')(currentDate, 'mediumDate') +' '+ $filter('date')($scope.txtFridaySecondShiftFrom, 'shortTime'));
                }
                if(FfromDate.getTime() !="" && FtoDate.getTime()!="")
                {
                    if(FfromDate.getTime() >=FtoDate.getTime()) 
                    {
                        $scope.txtSundayFirstShiftTo="";
                        PopupAlert('warn','From Time Cannot be greater then and Equal to To Time!');
                    }
                }                
                if(SfromDate.getTime()!="" && FtoDate.getTime()!="")
                {
                    if(SfromDate.getTime()<=FtoDate.getTime()) 
                    { 
                        $scope.txtSundaySecondShiftFrom="";
                        PopupAlert('warn','Second shift From Time Cannot be less then and Equal to First Shift!');
                    }
                }
                
            }
            if(CallBy=='Sat')
            {
                var currentDate = new Date();
                var FfromDate =null;
                var FtoDate =null;
                var SfromDate =null;
                if($scope.txtSaturdayFirstShiftFrom!==null && $scope.txtSaturdayFirstShiftFrom!=='')
                {
                    FfromDate = new Date($filter('date')(currentDate, 'mediumDate') +' '+ $filter('date')($scope.txtSaturdayFirstShiftFrom, 'shortTime'));
                }
                if($scope.txtSaturdayFirstShiftTo!==null && $scope.txtSaturdayFirstShiftTo!=='')
                {
                    FtoDate = new Date($filter('date')(currentDate, 'mediumDate') +' '+ $filter('date')($scope.txtSaturdayFirstShiftTo, 'shortTime'));               
                }               
                if($scope.txtSaturdaySecondShiftFrom!==null && $scope.txtSaturdaySecondShiftFrom!=='')
                {
                    SfromDate = new Date($filter('date')(currentDate, 'mediumDate') +' '+ $filter('date')($scope.txtSaturdaySecondShiftFrom, 'shortTime'));
                }
                if(FfromDate.getTime() !="" && FtoDate.getTime()!="")
                {
                    if(FfromDate.getTime() >=FtoDate.getTime()) 
                    {
                        $scope.txtSundayFirstShiftTo="";
                        PopupAlert('warn','From Time Cannot be greater then and Equal to To Time!');
                    }
                }                
                if(SfromDate.getTime()!="" && FtoDate.getTime()!="")
                {
                    if(SfromDate.getTime()<=FtoDate.getTime()) 
                    { 
                        $scope.txtSundaySecondShiftFrom="";
                        PopupAlert('warn','Second shift From Time Cannot be less then and Equal to First Shift!');
                    }
                }
                
            }
        }
        if(flag==2)
        {
            if(CallBy=='Sun')
            {
                var currentDate = new Date();  
                var SfromDate=null;
                var SToDate =null;
                var FtoDate =null;
                if($scope.txtSundaySecondShiftFrom!==null && $scope.txtSundaySecondShiftFrom!=='')  
                {        
                     SfromDate = new Date($filter('date')(currentDate, 'mediumDate') +' '+$filter('date')($scope.txtSundaySecondShiftFrom, 'shortTime'));
                }
                if($scope.txtSundaySecondShiftTo!==null && $scope.txtSundaySecondShiftTo!=='')  
                { 
                     SToDate = new Date($filter('date')(currentDate, 'mediumDate') +' '+$filter('date')($scope.txtSundaySecondShiftTo, 'shortTime'));
                }                
                if($scope.txtSundayFirstShiftTo!==null && $scope.txtSundayFirstShiftTo!=='')
                {
                     FtoDate = new Date($filter('date')(currentDate, 'mediumDate') +' '+$filter('date')($scope.txtSundayFirstShiftTo, 'shortTime'));
                }
                if(SfromDate.getTime() !="" && SToDate.getTime() !="")
                {
                    if(SfromDate.getTime() >=SToDate.getTime()) 
                    {
                        $scope.txtSundaySecondShiftTo="";
                        PopupAlert('warn','From Time Cannot be greater then and Equal to To Time!');
                    }
                }
                if(SfromDate.getTime() !="" && FtoDate.getTime() !="")
                {
                    if(SfromDate.getTime() <=FtoDate.getTime()) 
                    {
                        $scope.txtSundaySecondShiftFrom="";
                        PopupAlert('warn','Second shift From Time Cannot be less then and Equal to First Shift!');
                    }
                }
            }
            if(CallBy=='Mon')
            {
                var currentDate = new Date();  
                var SfromDate=null;
                var SToDate =null;
                var FtoDate =null;
                if($scope.txtMondaySecondShiftFrom!==null && $scope.txtMondaySecondShiftFrom!=='')  
                {        
                     SfromDate = new Date($filter('date')(currentDate, 'mediumDate') +' '+$filter('date')($scope.txtMondaySecondShiftFrom, 'shortTime'));
                }
                if($scope.txtMondaySecondShiftTo!==null && $scope.txtMondaySecondShiftTo!=='')  
                { 
                     SToDate = new Date($filter('date')(currentDate, 'mediumDate') +' '+$filter('date')($scope.txtMondaySecondShiftTo, 'shortTime'));
                }                
                if($scope.txtMondayFirstShiftTo!==null && $scope.txtMondayFirstShiftTo!=='')
                {
                     FtoDate = new Date($filter('date')(currentDate, 'mediumDate') +' '+$filter('date')($scope.txtMondayFirstShiftTo, 'shortTime'));
                }
                if(SfromDate.getTime() !="" && SToDate.getTime() !="")
                {
                    if(SfromDate.getTime() >=SToDate.getTime()) 
                    {
                        $scope.txtSundaySecondShiftTo="";
                        PopupAlert('warn','From Time Cannot be greater then and Equal to To Time!');
                    }
                }
                if(SfromDate.getTime() !="" && FtoDate.getTime() !="")
                {
                    if(SfromDate.getTime() <=FtoDate.getTime()) 
                    {
                        $scope.txtSundaySecondShiftFrom="";
                        PopupAlert('warn','Second shift From Time Cannot be less then and Equal to First Shift!');
                    }
                }              

            }
            if(CallBy=='tue')
            {
                var currentDate = new Date();  
                var SfromDate=null;
                var SToDate =null;
                var FtoDate =null;
                if($scope.txtTuesdaySecondShiftFrom!==null && $scope.txtTuesdaySecondShiftFrom!=='')  
                {        
                     SfromDate = new Date($filter('date')(currentDate, 'mediumDate') +' '+$filter('date')($scope.txtTuesdaySecondShiftFrom, 'shortTime'));
                }
                if($scope.txtTuesdaySecondShiftTo!==null && $scope.txtTuesdaySecondShiftTo!=='')  
                { 
                     SToDate = new Date($filter('date')(currentDate, 'mediumDate') +' '+$filter('date')($scope.txtTuesdaySecondShiftTo, 'shortTime'));
                }                
                if($scope.txtTuesdayFirstShiftTo!==null && $scope.txtTuesdayFirstShiftTo!=='')
                {
                     FtoDate = new Date($filter('date')(currentDate, 'mediumDate') +' '+$filter('date')($scope.txtTuesdayFirstShiftTo, 'shortTime'));
                }
                if(SfromDate.getTime() !="" && SToDate.getTime() !="")
                {
                    if(SfromDate.getTime() >=SToDate.getTime()) 
                    {
                        $scope.txtSundaySecondShiftTo="";
                        PopupAlert('warn','From Time Cannot be greater then and Equal to To Time!');
                    }
                }
                if(SfromDate.getTime() !="" && FtoDate.getTime() !="")
                {
                    if(SfromDate.getTime() <=FtoDate.getTime()) 
                    {
                        $scope.txtSundaySecondShiftFrom="";
                        PopupAlert('warn','Second shift From Time Cannot be less then and Equal to First Shift!');
                    }
                }
            }
            if(CallBy=='Wed')
            {
                var currentDate = new Date();  
                var SfromDate=null;
                var SToDate =null;
                var FtoDate =null;
                if($scope.txtWednesdaySecondShiftFrom!==null && $scope.txtWednesdaySecondShiftFrom!=='')  
                {        
                     SfromDate = new Date($filter('date')(currentDate, 'mediumDate') +' '+$filter('date')($scope.txtWednesdaySecondShiftFrom, 'shortTime'));
                }
                if($scope.txtWednesdaySecondShiftTo!==null && $scope.txtWednesdaySecondShiftTo!=='')  
                { 
                     SToDate = new Date($filter('date')(currentDate, 'mediumDate') +' '+$filter('date')($scope.txtWednesdaySecondShiftTo, 'shortTime'));
                }                
                if($scope.txtWednesdayFirstShiftTo!==null && $scope.txtWednesdayFirstShiftTo!=='')
                {
                     FtoDate = new Date($filter('date')(currentDate, 'mediumDate') +' '+$filter('date')($scope.txtWednesdayFirstShiftTo, 'shortTime'));
                }
                if(SfromDate.getTime() !="" && SToDate.getTime() !="")
                {
                    if(SfromDate.getTime() >=SToDate.getTime()) 
                    {
                        $scope.txtSundaySecondShiftTo="";
                        PopupAlert('warn','From Time Cannot be greater then and Equal to To Time!');
                    }
                }
                if(SfromDate.getTime() !="" && FtoDate.getTime() !="")
                {
                    if(SfromDate.getTime() <=FtoDate.getTime()) 
                    {
                        $scope.txtSundaySecondShiftFrom="";
                        PopupAlert('warn','Second shift From Time Cannot be less then and Equal to First Shift!');
                    }
                }                
            }
            if(CallBy=='tus')
            {
                var currentDate = new Date();  
                var SfromDate=null;
                var SToDate =null;
                var FtoDate =null;
                if($scope.txtThursdaySecondShiftFrom!==null && $scope.txtThursdaySecondShiftFrom!=='')  
                {        
                     SfromDate = new Date($filter('date')(currentDate, 'mediumDate') +' '+$filter('date')($scope.txtThursdaySecondShiftFrom, 'shortTime'));
                }
                if($scope.txtThursdaySecondShiftTo!==null && $scope.txtThursdaySecondShiftTo!=='')  
                { 
                     SToDate = new Date($filter('date')(currentDate, 'mediumDate') +' '+$filter('date')($scope.txtThursdaySecondShiftTo, 'shortTime'));
                }                
                if($scope.txtThursdayFirstShiftTo!==null && $scope.txtThursdayFirstShiftTo!=='')
                {
                     FtoDate = new Date($filter('date')(currentDate, 'mediumDate') +' '+$filter('date')($scope.txtThursdayFirstShiftTo, 'shortTime'));
                }
                if(SfromDate.getTime() !="" && SToDate.getTime() !="")
                {
                    if(SfromDate.getTime() >=SToDate.getTime()) 
                    {
                        $scope.txtSundaySecondShiftTo="";
                        PopupAlert('warn','From Time Cannot be greater then and Equal to To Time!');
                    }
                }
                if(SfromDate.getTime() !="" && FtoDate.getTime() !="")
                {
                    if(SfromDate.getTime() <=FtoDate.getTime()) 
                    {
                        $scope.txtSundaySecondShiftFrom="";
                        PopupAlert('warn','Second shift From Time Cannot be less then and Equal to First Shift!');
                    }
                }                
            }
            if(CallBy=='Fri')
            {
                var currentDate = new Date();  
                var SfromDate=null;
                var SToDate =null;
                var FtoDate =null;
                if($scope.txtFridaySecondShiftFrom!==null && $scope.txtFridaySecondShiftFrom!=='')  
                {        
                     SfromDate = new Date($filter('date')(currentDate, 'mediumDate') +' '+$filter('date')($scope.txtFridaySecondShiftFrom, 'shortTime'));
                }
                if($scope.txtFridaySecondShiftTo!==null && $scope.txtFridaySecondShiftTo!=='')  
                { 
                     SToDate = new Date($filter('date')(currentDate, 'mediumDate') +' '+$filter('date')($scope.txtFridaySecondShiftTo, 'shortTime'));
                }                
                if($scope.txtFridayFirstShiftTo!==null && $scope.txtFridayFirstShiftTo!=='')
                {
                     FtoDate = new Date($filter('date')(currentDate, 'mediumDate') +' '+$filter('date')($scope.txtFridayFirstShiftTo, 'shortTime'));
                }
                if(SfromDate.getTime() !="" && SToDate.getTime() !="")
                {
                    if(SfromDate.getTime() >=SToDate.getTime()) 
                    {
                        $scope.txtSundaySecondShiftTo="";
                        PopupAlert('warn','From Time Cannot be greater then and Equal to To Time!');
                    }
                }
                if(SfromDate.getTime() !="" && FtoDate.getTime() !="")
                {
                    if(SfromDate.getTime() <=FtoDate.getTime()) 
                    {
                        $scope.txtSundaySecondShiftFrom="";
                        PopupAlert('warn','Second shift From Time Cannot be less then and Equal to First Shift!');
                    }
                }
            }
            if(CallBy=='Sat')
            {
                var currentDate = new Date();  
                var SfromDate=null;
                var SToDate =null;
                var FtoDate =null;
                if($scope.txtSaturdaySecondShiftFrom!==null && $scope.txtSaturdaySecondShiftFrom!=='')  
                {        
                     SfromDate = new Date($filter('date')(currentDate, 'mediumDate') +' '+$filter('date')($scope.txtSaturdaySecondShiftFrom, 'shortTime'));
                }
                if($scope.txtSaturdaySecondShiftTo!==null && $scope.txtSaturdaySecondShiftTo!=='')  
                { 
                     SToDate = new Date($filter('date')(currentDate, 'mediumDate') +' '+$filter('date')($scope.txtSaturdaySecondShiftTo, 'shortTime'));
                }                
                if($scope.txtSaturdayFirstShiftTo!==null && $scope.txtSaturdayFirstShiftTo!=='')
                {
                     FtoDate = new Date($filter('date')(currentDate, 'mediumDate') +' '+$filter('date')($scope.txtSaturdayFirstShiftTo, 'shortTime'));
                }
                if(SfromDate.getTime() !="" && SToDate.getTime() !="")
                {
                    if(SfromDate.getTime() >=SToDate.getTime()) 
                    {
                        $scope.txtSundaySecondShiftTo="";
                        PopupAlert('warn','From Time Cannot be greater then and Equal to To Time!');
                    }
                }
                if(SfromDate.getTime() !="" && FtoDate.getTime() !="")
                {
                    if(SfromDate.getTime() <=FtoDate.getTime()) 
                    {
                        $scope.txtSundaySecondShiftFrom="";
                        PopupAlert('warn','Second shift From Time Cannot be less then and Equal to First Shift!');
                    }
                }
            }
        }
    }
    $scope.bindDoctorTime();
    
    }]);