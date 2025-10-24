app.controller('doctorProfileClinicController', ['$scope','appDataService', function ($scope,appDataService) {
  
    $scope.bindclinics=function()
    {
       $scope.DoctorId= $scope.$parent.SAASDoctorId;
       $scope.TimeZone= $scope.$parent.currentTimeZone;
       $scope.UserId=$scope.saasUser.saasuser.saasuserid;
       $scope.ClinicId=0
       _request={DoctorID:$scope.DoctorId};
       appDataService.getDoctorProfileClinicData($scope,_request,'bindDoctorClinicDetails');
    
    
    }
    $scope.bindDoctorClinicDetails=function(rdata)
    {
        if(rdata.Status)
        {
            
            $scope.ClinicList=rdata.Data.ClicnicDetails;
            $scope.CityList=rdata.Data.City;
        }
    
    }
    $scope.ManageClinics=function()
    {
        
        let Flags=0;

        if($scope.ClinicId !=0)
        {
            Flags=1;
        }
        if($scope.ClinicId =="")
        {
            $scope.ClinicId=0;
        }
        _request={DoctorId:$scope.DoctorId,
            Flag:Flags,
            ClinicId:$scope.ClinicId,
            ClinicName:$scope.txtClinicName,
            Clinicaddress:$scope.txtClinicAddress,
            ClinicLogo:'',
            Pincode:$scope.txtClinicPinCode,
            CityId:$scope.selectedClinicCity.CityId,
            Description:$scope.txtClinicDescription,
            Remark:'',
            UserID:$scope.UserId,};
        appDataService.PostDoctorClinicData($scope,_request,'bindClinicDetails');

        $scope.ClinicId=0;
        $scope.txtClinicName='';
        $scope.txtClinicAddress='';
        $scope.txtClinicPinCode='';
        $scope.selectedClinicCity='';  
        $scope.txtClinicDescription='';
    }

    $scope.EditClicnic=function(ClinicId)
    {
        $scope.ClinicId=ClinicId;
        var filteredArray = $scope.ClinicList.filter(function(itm){
            return itm.ClinicId == ClinicId;
        });

        var filteredArrayCity = $scope.CityList.filter(function(itm){
            return itm.CityId == filteredArray[0].Cityid;
        });
        $scope.selectedClinicCity=filteredArrayCity[0]; 
        $scope.txtClinicName=filteredArray[0].ClinicName;
        $scope.txtClinicAddress=filteredArray[0].Clinicaddress;
        $scope.txtClinicPinCode=filteredArray[0].Pincode;        
        $scope.txtClinicDescription=filteredArray[0].Description;
    }

    $scope.DeleteClicnic=function(ClinicId)
    {
        _request={
        DoctorId:$scope.DoctorId,
        Flag:2,
        ClinicId:ClinicId,
        ClinicName:'',
        Clinicaddress:'',
        ClinicLogo:'',
        Pincode:'',
        CityId:'',
        Description:'',
        Remark:'',
        UserID:$scope.UserId,};
        appDataService.PostDoctorClinicData($scope,_request,'bindClinicDetails');
    }

    $scope.bindClinicDetails=function(rdata)
    {
        if(rdata.Status)
        {
            $scope.ClinicList=rdata.Data;
        }
    
    }
    $scope.selectedClinicCityObj=function(selectedItem)
    {
      // //debugger
      if(selectedItem!=undefined)
      {
        var filteredArray = $scope.CityList.filter(function(itm){
          return itm.CityId == selectedItem.originalObject.CityId;
          });
          $scope.selectedClinicCity=filteredArray[0];    
      }
      else
      { 
        $scope.selectedClinicCity={};  
      }
  
    }

    $scope.bindclinics();
    
    }]);