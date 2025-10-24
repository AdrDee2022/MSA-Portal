app.controller('doctorProfileLeaveOffHolidayController', ['$scope','appDataService', function ($scope,appDataService) {
    //debugger
    $scope.bindDoctorLeaveOffHoliday=function()
    {
        $scope.issaved=false;
        $scope.isLeaveOff=false;
        $scope.DoctorLeaveOffHoursID=0;
        $scope.DoctorId= $scope.$parent.SAASDoctorId;
        $scope.TimeZone= $scope.$parent.currentTimeZone;
        $scope.ClinicId= 0;        
        $scope.StatusList = [
            { Id: 1, Name: 'Active' },
            { Id: 2, Name: 'In-Active' }
            ];            
        $scope.UserId=$scope.saasUser.saasuser.saasuserid;       
        _request={DoctorID:$scope.DoctorId,TimeZone:$scope.TimeZone,ClinicId:$scope.ClinicId};
        appDataService.getDoctorProfileLeaveOffHolidayData($scope,_request,'bindDoctorLeaveOffHolidayDetails');
    }
    $scope.bindDoctorLeaveOffHolidayDetails=function(rdata)
    {
        //debugger
        if(rdata.Status)
        {   
            $scope.txtDoctorLName= rdata.Data.Doctor[0]["DoctorName"];
            $scope.DoctorClinicList=rdata.Data.ClinicDeatils;  
            $scope.DoctorLeaveDetailsList=rdata.Data.DoctorLeaveDetails;          
            $scope.TypeOfLeaveList=rdata.Data.TypeOfLeave;
            $scope.selectedLeaveType = $scope.TypeOfLeaveList[0];
            $scope.cmbDoctorLStatus=''+1+'';
            
        }
    
    }
    $scope.getDoctorType=function()
    {
        //debugger
        if(($scope.selectedLeaveType.Code).trim()=='OfH')
        {
            $scope.isLeaveOff=true;
            $scope.txtLeaveFromTime='';
            $scope.txtLeaveToTime='';
        }
        else{
            $scope.isLeaveOff=false;
            $scope.txtLeaveFromTime='';
            $scope.txtLeaveToTime='';
        }
    }

    $scope.getDoctorClinic=function()
    {      $scope.issaved=false;
        _request={DoctorID:$scope.DoctorId,TimeZone:$scope.TimeZone,ClinicId:$scope.cmbDoctorLClinic};
       appDataService.getDoctorProfileLeaveOffHolidayData($scope,_request,'bindDoctorLeave');
    }

    $scope.bindDoctorLeave=function(rdata)
    {
        //debugger
        if(rdata.Status)
        {   
            $scope.DoctorLeaveDetailsList=rdata.Data.DoctorLeaveDetails;
           
        }
        else{
            PopupAlert('erro',rdata.Message);
        }
    
    }
    $scope.bindDoctorLeave1=function(rdata)
    {
        //debugger
        if(rdata.Status)
        {   
            $scope.DoctorLeaveDetailsList=rdata.Data;
            PopupAlert('succ',rdata.Message);
        }
        else{
            PopupAlert('erro',rdata.Message);
        }
    
    }

    $scope.ManageDoctorLeave=function()
    {        
        //debugger
        let FlagNo=0;
        let FormTimes='';
        let ToTimes='';

        if($scope.DoctorLeaveOffHoursID>0)
        {
            FlagNo=1;
        }
        if(($scope.selectedLeaveType.Code).trim()=='OfH')
        {
            FormTimes=$scope.txtLeaveFromTime.toLocaleTimeString();
            ToTimes=$scope.txtLeaveToTime.toLocaleTimeString();
        }

        _request={DoctorID:$scope.DoctorId,
            FlagNo:FlagNo,
            ID:$scope.DoctorLeaveOffHoursID,
            ClinicId:$scope.cmbDoctorLClinic,
            TypeOfLeave:$scope.selectedLeaveType.Code,
            FromDate:$scope.mdlLFomDate.toLocaleDateString(),
            ToDate:$scope.mdlLToDate.toLocaleDateString(),
            FromTime:FormTimes,
            ToTime:ToTimes,
            Remark:$scope.txtDoctorRemark,
            Status:$scope.cmbDoctorLStatus,
            UserID:$scope.UserId,
            TimeZoneID:$scope.TimeZone};
        appDataService.PostDoctorProfileDoctorLeaveData($scope,_request,'bindDoctorLeave1');
    
    }

    $scope.checkTime=function()
    {       
        if($scope.txtLeaveFromTime!="" && $scope.txtLeaveToTime!="")
        {
            if($scope.txtLeaveFromTime>$scope.txtLeaveToTime) 
            {
                $scope.txtLeaveToTime="";
                PopupAlert('warn','From Time Cannot be greater then To Date!');
            }
        }
                
    }



    $scope.Editleave=function(ID)
    {
        //debugger
        var filteredArray = $scope.DoctorLeaveDetailsList.filter(function(itm){
        return itm.DoctorLeaveOffHoursID == ID;
        });
        var filteredArrayType = $scope.TypeOfLeaveList.filter(function(itm){
            return itm.Code == filteredArray[0].TypeofLeave;
        });

        if((filteredArray[0].TypeofLeave).trim()=='OfH')
        {
            $scope.isLeaveOff=true;
        }
        else{
            $scope.isLeaveOff=false;
        }
       
        $scope.DoctorLeaveOffHoursID=filteredArray[0].DoctorLeaveOffHoursID;
        $scope.cmbDoctorLClinic=''+filteredArray[0].ClinicId+'';
        $scope.selectedLeaveType=filteredArrayType[0];        
        $scope.mdlLFomDate=filteredArray[0].FromDate;
        $scope.txtLeaveFomDate=filteredArray[0].FromDateStr;
        $scope.txtLeaveToDate=filteredArray[0].ToDateStr;
        $scope.mdlLToDate=filteredArray[0].ToDate;
        $scope.txtLeaveFromTime=filteredArray[0].FromTime;
        $scope.txtLeaveToTime=filteredArray[0].ToTime;
        $scope.txtDoctorRemark=filteredArray[0].Remark;
        $scope.cmbDoctorLStatus=''+filteredArray[0].Status+'';
    }

    $scope.DeleteLeave=function(ID)
    {
        _request={DoctorID:$scope.DoctorId,
            FlagNo:2,
            ID:ID,
            ClinicId:0,
            TypeOfLeave:'',
            FromDate:'',
            ToDate:'',
            FromTime:'',
            ToTime:'',
            Remark:'',
            Status:'',
            UserID:$scope.UserId,
            TimeZoneID:$scope.TimeZone};
        appDataService.PostDoctorProfileDoctorLeaveData($scope,_request,'bindDoctorLeave1');
    }


    $scope.bindDoctorLeaveOffHoliday();
    
    $scope.futuredate1changed=function(date,attrs, modelCtrl)
    {
      //debugger
       $scope.mdlLFomDate=date;

       if($scope.mdlLFomDate!=null && $scope.mdlLToDate!=null)
       {
           if(date>$scope.mdlLToDate){
               PopupAlert('warn','From Date Cannot be greater the To Date!');
           }
       }
   }
    
   $scope.futuredate2changedtwo=function(date,attrs, modelCtrl)
   {
       //debugger
       if(date>$scope.mdlLFomDate)
       {
           $scope.mdlLToDate=date;
       }
       else
       { 
           PopupAlert('warn','From Date Cannot be greater the To Date!');
       }
   }
}]);