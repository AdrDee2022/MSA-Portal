//var dataService = angular.module('saas-app-DataService', []);  
app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.headers.common = { 
        'Merchant_key': 'ck_qam4587987fgjh',
        'MerchantName':'SAAS-Adroit',
        'Token':'Tghyu564',
        'Platform': 'WEB',
        'Source':'SAASAPP',
        'Content-Type':'application/json',
        'Version': '2.06'
      }
      
}]);
app.factory('appDataService', function ($http) { 
 let _Burl= _appBurl;
    return {  

          // 4001 Get Home Search Screen Data
            getHomeScreenSearchData: function ($scope,_method) { 
              const _request=_Burl+"V1.0/bookappointment/getpopularspecialtywithclinicwithdoctor?PatientUserID=0";
              $http({method:"GET", url:_request})
                .then(function(result)    
                  {     
                    $scope[_method](result.data);           
                },function(){console.log('CODE: 4001');});
            

          },
            // 4001-A Get Home Search Screen Data
            getHomeScreenSearchDataDoctorListAndCombineList: function ($scope,_param,_method) { 
              const _request=_Burl+"V1.0/search/getpopularspecialtywithclinicwithdoctorforselectedcity?PatientUserID=0&cityid="+_param.cityId;
              $http({method:"GET", url:_request})
                .then(function(result)    
                   {     
                     $scope[_method](result.data);           
                },function(){console.log('CODE: 4001-A');});
             
        
          },
          // 4001-B Get Home Search Screen Data Type 2
          getHomeScreenSearchDoctorClinicSpecialtyAutocomplete: function ($scope,_method) { 
            const _request=_Burl+"v1.0/search/searchdoctorspacialtyclinicautocomplete?searchedtext=00";
            $http({method:"GET", url:_request})
              .then(function(result)    
                 {     
                   $scope[_method](result.data);           
              },function(){console.log('CODE: 4001-B');});
           
      
        },
          // 4001-B  Get Available Doctor Cities against Country Dial Code 
          getAvailableDoctorCitylistFromDialCode: function ($scope,_queryparams,_method) { 
            const _request=_Burl+"V1.0/master/GetAvailableDoctorCityAgainstCoutryDialCode?dialcode="+_queryparams.dialcode;
            $http({method:"GET", url:_request})
            .then(function(result)    
              {     
                $scope[_method](result.data);           
            },function(){console.log('CODE: 4001-B');});
          },
          // 4002 Get Provider List Screen Data  
          getProviderLisDataData: function ($scope,_param,_method) { 
            const _request=_Burl+"V1.0/searchdoctor/listdoctorwithspecialty?doctor="+_param.doctor+"&specialty="+_param.specialty+"&clinicid="+_param.clinic+"&citycode="+_param.citycode;
         
            $http({method:"GET", url:_request})
              .then(function(result)    
                 {     
                   $scope[_method](result.data);           
              },function(){console.log('CODE: 4002');});
           
      
        },
      // 4003 Get Provider Profile Data
      getDoctorProfileScreenData: function ($scope,_param,_method) { 
        
        const _request=_Burl+"V1.0/searchdoctor/getdoctorprofileagaintdoctorname?DoctorName="+_param.doctorname+'&Zoneid='+_param.zoneid;
       
        $http({method:"GET", url:_request})
          .then(function(result)    
             {     
               $scope[_method](result.data);           
          },function(){console.log('CODE: 4003');});
       
  
    },
      // 4004 Get Provider Book Appointment Data
      getBookAppointmentScreenData: function ($scope,_param,_method) { 
        const _request=_Burl+"V1.0/searchdoctor/getdoctorprofilewithclientagaintdoctorname?DoctorName="+_param.doctorname;
       
        $http({method:"GET", url:_request})
          .then(function(result)    
             {     
               $scope[_method](result.data);           
          },function(){console.log('CODE: 4004');});
       
  
    },
      // 4005 Get Provider Slots
      getDoctorSlotsData: function ($scope,_param,_method) { 
        const _request=_Burl+"v1.0/searchdoctor/getdoctorschedule?DoctorId=" + _param.doctorid + "&Date=" + _param.date + "&ZoneID=" + _param.zoneid + '&LocationId='+_param.locationid;
       // //debugger;
        $http({method:"GET", url:_request})
          .then(function(result)    
             {     
               $scope[_method](result.data);           
          },function(){console.log('CODE: 4005');});
       
  
    },

            // 4006 Submit BOOK Appointment
    submitBookAppointment: function ($scope,_param,_method) { 
            const _request=_Burl+"v1.0/saasappointment/book";
            const _body = { AppointmentDate: _param.date, SlotTime: _param.time, SlotDuration: _param.slotdurationinminutes, SlotEndTime: _param.slotend, SlotUTCDateTime: _param.slotutc, PatientName: _param.username, MemberId: _param.saasmemberid, PatientUserID: _param.saasuserid, MobileNo: _param.mobile, EmailID: _param.email, SSN: _param.ssn, DoctorId: _param.doctorid, HospitalID: _param.hospitalid, IsVideoVisit: _param.isvideovisit, SlotSpecialtyId: _param.SlotSpecialtyId, SlotVisitTypeId: _param.SlotVisitTypeId, ZoneID: _param.zoneID, PayerId: _param.payerid, SAASHospitalID: _param.saashospitalid };
       
            $http({method:"POST", url:_request,data:_body})
           .then(function(result)    
           {     
             $scope[_method](result.data);           
        },function(){console.log('CODE: 4006');});
     

  },
    // 5001 Get Time Zone and Version Details
    getAppDetails: function (_queryparams,$scope,param,accode) { 
        const _request=_Burl+"V1.0/master/getserverdatetimewithzoneandversiondetails?MemberId="+_queryparams.saasmemberid+"&Platform="+_queryparams.platform+"&ZoneID="+_queryparams.timezone+"&BuildNumber="+_queryparams.versionnumber;
        $http({method:"GET", url:_request})
        .then(function(result)    
           {
           
             $scope.acceptAppDetails(result.data,param,accode);           
        },function(){console.log('CODE: 5001');});
       
 
    },
        // 5002 Check User Credientials
        checkUserCredientials: function (_queryparams,$scope) { 
            const _request=_Burl+"V1.0/patientuser/loginwithpassword";
            const _body={DialCode:_queryparams.dialcode,MobileNumber: _queryparams.username,Password: _queryparams.password,DeviceType: 'WEB',DeviceID: 'BROWSER',DeviceToken: 'browser123456'};
            $http({method:"POST", url:_request,data:_body})
            .then(function(result)    
               {
                
                $scope.authenticateUser(result.data);           
            },function(){console.log('CODE: 5002');});
            
            
     
        },
        // 5002-A Check Doctor User Credientials
        checkDoctorUserCredientials: function (_queryparams, $scope) {
            const _request = _Burl + "v1.0/doctoruser/loginwithpassword";
            const _body = { DialCode: _queryparams.dialcode, MobileNumber: _queryparams.username, Password: _queryparams.password, DeviceType: 'WEB', DeviceID: 'BROWSER', DeviceToken: 'browser123456' };
            $http({ method: "POST", url: _request, data: _body })
            .then(function (result) {

                $scope.authenticateUser(result.data);
            }, function () { console.log('CODE: 5002'); });



        },
            // 5003 Get Cities against Country Dial Code 
    getCitylistFromDialCode: function ($scope,_queryparams,_method) { 
        const _request=_Burl+"V1.0/master/GetCityAgainstCoutryDialCode?dialcode="+_queryparams.dialcode;
        $http({method:"GET", url:_request})
        .then(function(result)    
           {     
             $scope[_method](result.data);           
        },function(){console.log('CODE: 5003');});
       
 
    },
          // 5004 Verify Mobile Number With Country Code For Unique
    getCheckMobileforUnique: function ($scope,_queryparams,_method) { 
       const _request=_Burl+"V1.0/filter/getmobilenumberverified?dialcode="+_queryparams.dialcode+"&mobileno="+_queryparams.mobileno;
       $http({method:"GET", url:_request})
       .then(function(result)    
            {     
                
                
               $scope[_method](result.data);           
            },function(){console.log('CODE: 5004');});
                   
             
                },
              // 5005 Verify Email ID For Unique
    getCheckEmailforunique: function ($scope,_queryparams,_method) { 
        const _request=_Burl+"V1.0/filter/getemailidverified?emailid="+_queryparams.emailid;
        $http({method:"GET", url:_request})
        .then(function(result)    
           {     
             $scope[_method](result.data);           
        },function(){console.log('CODE: 5005');});
       
 
    },
            // 5006 Verify SSN/Celula Id ID For Unique
     getCheckSSNforunique: function ($scope,_queryparams,_method) { 
       const _request=_Burl+"V1.0/filter/getssnverified?ssn="+_queryparams.ssn;
        $http({method:"GET", url:_request})
         .then(function(result)    
           {     
             $scope[_method](result.data);           
           },function(){console.log('CODE: 5006');});
        },
        // 5007 Register User
        postRegisterUser: function ($scope,_queryparams,_method) { 
         
          const _body={FirstName: _queryparams.firstname,MiddleName:_queryparams.middlename,LastName:_queryparams.lastname,EmailID:_queryparams.emailid,MobileNumber:_queryparams.mobilenumber,DialCode:_queryparams.dialcode,Password:_queryparams.password,DateOfBirth:_queryparams.dateofbirth,Gender:_queryparams.genderid,CityId:_queryparams.cityid,CedulerId:_queryparams.ssn,UserType:_queryparams.usertype,DeviceType: 'WEB',DeviceID: 'BROWSER',DeviceToken: 'browser123456'};
          const _request=_Burl+"V1.0/user/userRegistration";
            $http({method:"POST", url:_request,data:_body})
            .then(function(result)    
              {     
                
                $scope[_method](result.data);           
              },function(){console.log('CODE: 5007');});
           },
         // 5008 Get User Dashboard Data
     getUserDashboardData: function ($scope,_queryparams,_method) { 
      const _request=_Burl+"V1.0/dashboard/Getdashboard?PatientUserID=" +_queryparams.saasuserid + "&BuildNumber=1.1&ZoneID=" + _queryparams.standardtimezone;
       $http({method:"GET", url:_request})
        .then(function(result)    
          {     
            $scope[_method](result.data);           
          },function(){console.log('CODE: 5008');});
       },
          // 5009 Get Member Details From Client Side
     getMemberDetailsFromClientSide: function ($scope,_queryparams,_method) { 
      const _request=_Burl+"V1.0/saas/getmemberdetailfromclientside?MemberID="+_queryparams.saasmemberid+"&HMerchantKey="+_queryparams.H_key;
      
       $http({method:"GET", url:_request})
        .then(function(result)    
          {     
            $scope[_method](result.data);           
          },function(){console.log('CODE: 5009');});
       },
          // 5010 Get Portal user Upcoming Appointment
     getPortalUserUpcomingAppointments: function ($scope,_queryparams,_method) { 
      const _request=_Burl+"V1.0/patient/GetUpcomingAppoinments?PortalUserId="+_queryparams.saasuserid+"&ZoneID="+_queryparams.zoneid;
      
       $http({method:"GET", url:_request})
        .then(function(result)    
          {     
            $scope[_method](result.data);           
          },function(){console.log('CODE: 5010');});
     },

        // 5010-A Get Portal User Lab Records
     getPortalUserLabRecords: function ($scope, _queryparams, _method) {
         const _request = _Burl + "V1.0/patient/GetPatientLabServices?PortalUserId=" + _queryparams.saasuserid + "&FromDate=" + _queryparams.fromdate + "&ToDate=" + _queryparams.todate + "&ZoneID=" + _queryparams.zoneid;

         $http({ method: "GET", url: _request })
          .then(function (result) {
              $scope[_method](result.data);
          }, function () { console.log('CODE: 5010'); });
     },
        // 5010-B Get Portal User Invoice Records
     getPortalUserInvoiceRecords: function ($scope, _queryparams, _method) {
         //const _request = _Burl + "V1.0/patient/GetPatientBills?PortalUserId=" + _queryparams.saasuserid + "&FromDate=" + _queryparams.fromdate + "&ToDate=" + _queryparams.todate + "&ZoneID=" + _queryparams.zoneid;
         const _request =  _Burl + "V1.0/patient/GetPatientBills?PatientUserID=" + _queryparams.saasuserid + "&FromDate=" + _queryparams.fromdate + "&ToDate=" + _queryparams.todate + "&ZoneID=" + _queryparams.zoneid;

         $http({ method: "GET", url: _request })
          .then(function (result) {
              $scope[_method](result.data);
          }, function () { console.log('CODE: 5010'); });
     },
           // 5011 Get Portal User Past Appointment
           getPortalUserPastAppointments: function ($scope,_queryparams,_method) { 
            const _request=_Burl+"V1.0/patient/GetPastAppoinments?PortalUserId="+_queryparams.saasuserid+"&FromDate="+_queryparams.fromdate+"&ToDate="+_queryparams.todate+"&ZoneID="+_queryparams.zoneid;
      
       $http({method:"GET", url:_request})
        .then(function(result)    
          {     
            $scope[_method](result.data);           
          },function(){console.log('CODE: 5011');});
       },

       // 5011-A Cancel Appointment
       putCancelAppointment: function ($scope,_queryparams,_method) { 
         
        
        const _request=_Burl+"v1.0/bookappointment/cancel?AppointmentId="+_queryparams.appid+"&SaasmemberId="+_queryparams.memberid;
          $http({method:"PUT", url:_request})
          .then(function(result)    
            {     
              
              $scope[_method](result.data);           
            },function(){console.log('CODE: 5011-A');});
         },



           // 5012 Get Portal User Profile
           getPatientUserProfile: function ($scope,_queryparams,_method) { 
            const _request=_Burl+"V1.0/patient/GetPatientProfile?PatientUserID="+_queryparams.saasuserid;
      
       $http({method:"GET", url:_request})
        .then(function(result)    
          {     
            $scope[_method](result.data);           
          },function(){console.log('CODE: 5012');});
       },
          // 5013 Verify Mobile Number With Country Code For Unique While Updating Profile
          getCheckMobileforUniqueProfile: function ($scope,_queryparams,_method) { 
            const _request=_Burl+"V1.0/filter/getmobilenumberverifiedprofile?dialcode="+_queryparams.dialcode+"&mobileno="+_queryparams.mobileno+"&userid="+_queryparams.userid;
            $http({method:"GET", url:_request})
            .then(function(result)    
                 {     
                     
                     
                    $scope[_method](result.data);           
                 },function(){console.log('CODE: 5013');});
                        
                  
                     },
          // 5014 Verify Email ID For Unique While Updating Profile
         getCheckEmailforuniqueProfile: function ($scope,_queryparams,_method) { 
             const _request=_Burl+"V1.0/filter/getemailidverifiedprofile?emailid="+_queryparams.emailid+"&userid="+_queryparams.userid;
             $http({method:"GET", url:_request})
             .then(function(result)    
                {     
                  $scope[_method](result.data);           
             },function(){console.log('CODE: 5014');});
            
      
         },
          // 5015 Verify SSN/Celula Id ID For Unique While Updating Profile
          getCheckSSNforuniqueProfile: function ($scope,_queryparams,_method) { 
            const _request=_Burl+"V1.0/filter/getssnverifiedprofile?ssn="+_queryparams.ssn+"&userid="+_queryparams.userid;
             $http({method:"GET", url:_request})
              .then(function(result)    
                {     
                  $scope[_method](result.data);           
                },function(){console.log('CODE: 5015');});
             },
           // 5016 Update Patient Profile
          updatePatientProfile: function ($scope,_queryparams,_method) { 
            const _body=_queryparams;
         
           
          const _request=_Burl+"V1.0/patient/UpdatePatientProfile";
            $http({method:"PUT", url:_request,data:_body})
            .then(function(result)    
              {     
                
                $scope[_method](result.data);           
              },function(){console.log('CODE: 5016');});
           },
           // 5017 Get Patient Medical Screen Data
           getPatientMedicalHistoryData: function ($scope,_queryparams,_method) { 
            const _request=_Burl+"V1.0/medicalhistory/getallmedicalhistorywholescreendata?userid="+_queryparams.saasuserid+"&memberid="+_queryparams.memberid+"&zoneid="+_queryparams.zoneid;
            ////debugger;
            $http({method:"GET", url:_request})
             .then(function(result)    
               {     
                 $scope[_method](result.data);           
               },function(){console.log('CODE: 5017');});
            },
          // 5018 Patient Medical History Add Treatment 
          addPatientMedicalHistoryTreatmentByDoctorData: function ($scope,_queryparams,_method) { 
            const _body={saasmemberid:_queryparams.saasmemberid,doctorname: _queryparams.DoctorName,specialty:_queryparams.Speciality,treatmentdate:_queryparams.TratmentDate};
          const _request=_Burl+"v1.0/medicalhistory/treatmentbydoctor";
            $http({method:"POST", url:_request,data:_body})
            .then(function(result)    
              {     
                
                $scope[_method](result.data);           
              },function(){console.log('CODE: 5018');});
            },
            // 5019 Patient Medical History Update Treatment 
            updatePatientMedicalHistoryTreatmentByDoctorData: function ($scope,_queryparams,_method) { 
              const _body={tid:_queryparams.rID,saasmemberid:_queryparams.saasmemberid,doctorname: _queryparams.DoctorName,specialty:_queryparams.Speciality,treatmentdate:_queryparams.TratmentDate};
          const _request=_Burl+"v1.0/medicalhistory/treatmentbydoctor";
            $http({method:"PUT", url:_request,data:_body})
            .then(function(result)    
              {     
                
                $scope[_method](result.data);           
              },function(){console.log('CODE: 5019');});
              },
              // 5020 Patient Medical History Add Medication 
                  addPatientMedicalHistoryMedicalRecordData: function ($scope,_queryparams,_method) { 
                    const _body={saasmemberid:_queryparams.saasmemberid,medicineId: _queryparams.MedicineId,dosage:_queryparams.Dosage,directionId:_queryparams.DirectionId,statusId:_queryparams.StatusId};
                  const _request=_Burl+"v1.0/medicalhistory/medication";
                    $http({method:"POST", url:_request,data:_body})
                    .then(function(result)    
                      {     
                        
                        $scope[_method](result.data);           
                      },function(){console.log('CODE: 5020');});
                    },
              // 5021 Patient Medical History Update Medication
                  updatePatientMedicalHistoryMedicalRecordData: function ($scope,_queryparams,_method) { 
                      const _body={patientmedicineId:_queryparams.rID,saasmemberid:_queryparams.saasmemberid,medicineId: _queryparams.MedicineId,dosage:_queryparams.Dosage,directionId:_queryparams.DirectionId,statusId:_queryparams.StatusId};
                  const _request=_Burl+"v1.0/medicalhistory/medication";
                    $http({method:"PUT", url:_request,data:_body})
                    .then(function(result)    
                      {     
                        
                        $scope[_method](result.data);           
                      },function(){console.log('CODE: 5021');});
                      },
              // 5022 Patient Medical History Update Medication Status Only
              updatePatientMedicalHistoryMedicalStatusOnlyRecordData: function ($scope,_queryparams,_method) { 
                const _body={patientmedicineId:_queryparams.rID,statusId:_queryparams.StatusId};
            const _request=_Burl+"v1.0/medicalhistory/medicationstatus";
              $http({method:"PUT", url:_request,data:_body})
              .then(function(result)    
                {     
                  
                  $scope[_method](result.data);           
                },function(){console.log('CODE: 5022');});
                },
                // 5023 Patient Medical History Add Allergy 
                addPatientMedicalHistoryAllergyRecordData: function ($scope,_queryparams,_method) { 
                  const _body={saasmemberid:_queryparams.saasmemberid,allergyid: _queryparams.AllergyId,allergytypeid:_queryparams.AllergyTypeId,allergyother:_queryparams.AllergyOther,reaction:_queryparams.Remarks,statusid:_queryparams.StatusId};
                const _request=_Burl+"v1.0/medicalhistory/allergy";
                  $http({method:"POST", url:_request,data:_body})
                  .then(function(result)    
                    {     
                      
                      $scope[_method](result.data);           
                    },function(){console.log('CODE: 5023');});
                  },
              // 5024 Patient Medical History Update Allergy Status Only
              updatePatientMedicalHistoryAllergyStatusOnlyRecordData: function ($scope,_queryparams,_method) { 
                const _body={patientallergyid:_queryparams.rID,statusid:_queryparams.StatusId};
            const _request=_Burl+"v1.0/medicalhistory/updateallergystatus";
              $http({method:"PUT", url:_request,data:_body})
              .then(function(result)    
                {     
                  
                  $scope[_method](result.data);           
                },function(){console.log('CODE: 5024');});
                },
              // 5025 Patient Medical History Manage Medical History
              managePatientMedicalHistoryRecordData: function ($scope,_queryparams,_method) { 
                const _body=_queryparams;
            const _request=_Burl+"v1.0/medicalhistory/medicalhistory";
            ////debugger;
              $http({method:"POST", url:_request,data:_body})
              .then(function(result)    
                {     
                  
                  $scope[_method](result.data);           
                },function(){console.log('CODE: 5025');});
                },
              // 5026 Patient Medical History GET Uploaded With Master List
              getPatientMedicalHistoryUploadedDocumentWithMaster: function ($scope,_queryparams,_method) { 
                const _body=_queryparams;
            const _request=_Burl+"V1.0/patient/getuploadeddocumentswithmaster?saasmemberid="+_queryparams.saasmemberid+"&documenttype=ALL&zoneid="+_queryparams.zoneid;
              $http({method:"GET", url:_request})
              .then(function(result)    
                {     
                  
                  $scope[_method](result.data);           
                },function(){console.log('CODE: 5026');});
                },
              // 5027 Patient Medical History UPLOAD Patient Document and Get Uploaded Document List

              


              uploadPatientMedicalHistoryUploadedPatientDocument: function ($scope,_queryparams,_method) { 
               
                //FormData, object of key/value pair for form fields and values
            const _fileFormData = new FormData();
            _fileFormData.append('DocumentFile', _queryparams._documentFile);
            _fileFormData.append('SaasMemberId', _queryparams.saasmemberid);
            _fileFormData.append('DocumentType', _queryparams.documenttype);
            _fileFormData.append('Remark', _queryparams.description);
            _fileFormData.append('CurrentDateTime',_queryparams.currentdatetime);
            _fileFormData.append('ZoneId', _queryparams.zoneid);
            const _request=_Burl+"V1.0/patient/addpatientdocuments";
              $http({method:"POST", url:_request,data:_fileFormData,transformRequest: angular.identity,headers: {'Content-Type': undefined}})
              .then(function(result)    
                {     
                  
                  $scope[_method](result.data);           
                },function(){console.log('CODE: 5027');});
                },
                
                // 5028 Patient Update Password

                updatePatientProfilePassword: function ($scope,_queryparams,_method) { 
                  const _body=_queryparams;
                const _request=_Burl+"v1.0/patientuser/ChangePassword";
                  $http({method:"POST", url:_request,data:_body})
                  .then(function(result)    
                    {     
                      
                      $scope[_method](result.data);           
                    },function(){console.log('CODE: 5028');});
                 },
       // 6001 Get Doctor Dashboard Data
       getDoctorDashboardData: function ($scope,_queryparams,_method) { 
        const _request=_Burl+"V1.0/doctor/Getdashboard?PatientUserID=" +_queryparams.saasuserid + "&BuildNumber=1.1&ZoneID=" + _queryparams.standardtimezone;
         $http({method:"GET", url:_request})
          .then(function(result)    
            {     
              $scope[_method](result.data);           
            },function(){console.log('CODE: 6001');});
         },
            // 6002 Get Doctor Appointment Data
            getDoctorDashboardAppointmentData: function ($scope,_queryparams,_method) { 
              const _request=_Burl+"V1.0/doctor/GetDoctorAppointment?DoctorID="+_queryparams.DoctorID+"&HospitalId="+_queryparams.HospitalId+"&ZoneID="+_queryparams.ZoneID+"&FromDate="+_queryparams.FromDate+"&ToDate="+_queryparams.ToDate;
              
              $http({method:"GET", url:_request})
                .then(function(result)    
                  {     
                    $scope[_method](result.data);           
                  },function(){console.log('CODE: 6002');});
               },
               
              // 6003 Get Doctor Profile Info Data
              getDoctorProfileInfoData: function ($scope,_queryparams,_method) { 
              const _request=_Burl+"V1.0/doctor/DoctorProfilerInfo?DoctorID="+_queryparams.DoctorID;
              $http({method:"GET", url:_request})
                .then(function(result)    
                  {     
                    $scope[_method](result.data);           
                  },function(){console.log('CODE: 6003');});
              },
             // 6004 Post Doctor Details
              PostDoctorDetails: function ($scope,_queryparams,_method) { 
                const _body={DoctorID:_queryparams.DoctorID,ZoneID:_queryparams.ZoneID,
                  ImageUrl:_queryparams.ImageUrl,Title:_queryparams.Title,
                  DoctorName:_queryparams.DoctorName,
                  DoctorMiddleName:_queryparams.DoctorMiddleName,
                  DoctorLastName:_queryparams.DoctorLastName,
                  DOB:_queryparams.DOB,
                  Gender:_queryparams.Gender,NationalityId:_queryparams.NationalityId,
                SpecialityId:_queryparams.SpecialityId,Qualification:_queryparams.Qualification,
                PracticeStartDate:_queryparams.PracticeStartDate,Address1:_queryparams.Address1,
                Address2:_queryparams.Address2,City:_queryparams.City,StateId:_queryparams.StateId,CountryId:_queryparams.CountryId,
                PostalCode:_queryparams.PostalCode,Biography:_queryparams.Biography,DoctorLanguagesList: _queryparams.DoctorLanguagesList};
                const _request=_Burl+"V1.0/Doctor/UpdateDoctorDetails";
                $http({method:"POST", url:_request,data:_body})
                .then(function(result)    
                { 
                $scope[_method](result.data);           
                },function(error){ console.log('CODE: 6004');});
              },
                  
              // 6005 Get Doctor Profile Professional Info Data
              getDoctorProfileProfessionalInfoDetails: function ($scope,_queryparams,_method) { 
                const _request=_Burl+"V1.0/doctor/DoctorProfileProfessionalInfo?DoctorID="+_queryparams.DoctorID;
                $http({method:"GET", url:_request})
                .then(function(result)    
                {     
                  $scope[_method](result.data);           
                },function(){console.log('CODE: 6005');});
              },

                  // 6006 Post Doctor Services
                  PostDoctorServices: function ($scope,_queryparams,_method) { 
                    
                    const _body={FlagNo:_queryparams.FlagNo,DoctorId:_queryparams.DoctorID,
                      ServiceID:_queryparams.ServicesID,DoctorServices:_queryparams.DoctorServices,
                      UserID:_queryparams.UserID};
                    const _request=_Burl+"V1.0/Doctor/ManageDoctorServices";
                    $http({method:"POST", url:_request,data:_body})
                    .then(function(result)    
                    { 
                    $scope[_method](result.data);           
                    },function(error){ console.log('CODE: 6004');});
                  },
                  
                    // 6007 Post Doctor Specialization
                    PostDoctorSpecialization: function ($scope,_queryparams,_method) { 
                    
                    const _body={FlagNo:_queryparams.FlagNo,DoctorId:_queryparams.DoctorID,
                      ExpertiseID:_queryparams.ExpertiseID,DoctorExpertise:_queryparams.DoctorExpertise,
                      UserID:_queryparams.UserID};
                    const _request=_Burl+"V1.0/Doctor/ManageDoctorSpecialization";
                    $http({method:"POST", url:_request,data:_body})
                    .then(function(result)    
                    { 
                    $scope[_method](result.data);           
                    },function(error){ console.log('CODE: 6007');});
                  }, 

                  // 6008 Post Doctor Education
                  PostDoctorEducation: function ($scope,_queryparams,_method) { 
                    
                    const _body={FlagNo:_queryparams.FlagNo,DoctorId:_queryparams.DoctorID,
                      EducationID:_queryparams.EducationID,DoctorEducation:_queryparams.DoctorEducation,
                     College:_queryparams.College,YearofCompletion:_queryparams.YearofCompletion, UserID:_queryparams.UserID};
                    const _request=_Burl+"V1.0/Doctor/ManageDoctorEducation";
                    $http({method:"POST", url:_request,data:_body})
                    .then(function(result)    
                    { 
                    $scope[_method](result.data);           
                    },function(error){ console.log('CODE: 6008');});
                  },        

                  // 6009 Post Doctor Awards
                  PostDoctorAwards: function ($scope,_queryparams,_method) { 
                    const _body={FlagNo:_queryparams.FlagNo,DoctorId:_queryparams.DoctorID,
                      AwardsID:_queryparams.AwardsID,Awards:_queryparams.Awards,
                      Years:_queryparams.Years, UserID:_queryparams.UserID};
                    const _request=_Burl+"V1.0/Doctor/ManageDoctorAwards";
                    $http({method:"POST", url:_request,data:_body})
                    .then(function(result)    
                    { 
                    $scope[_method](result.data);           
                    },function(error){ console.log('CODE: 6009');});
                  },    
                  
                   // 6010 Post Doctor Experience
                   PostDoctorExperience: function ($scope,_queryparams,_method) {
                    const _body={FlagNo:_queryparams.FlagNo,DoctorId:_queryparams.DoctorID,
                      ExperienceID:_queryparams.ExperienceID,HospitalName:_queryparams.HospitalName,
                      FromDate:_queryparams.FromDate, ToDate:_queryparams.ToDate, Designation:_queryparams.Designation, UserID:_queryparams.UserID};
                    const _request=_Burl+"V1.0/Doctor/ManageDoctorExperience";
                    $http({method:"POST", url:_request,data:_body})
                    .then(function(result)    
                    { 
                    $scope[_method](result.data);           
                    },function(error){ console.log('CODE: 6010');});
                  },  
                  
                   // 6011 Post Doctor Publication
                   PostDoctorPublication: function ($scope,_queryparams,_method) { 
                    const _body={FlagNo:_queryparams.FlagNo,DoctorId:_queryparams.DoctorID,
                      PublicationID:_queryparams.PublicationID,Publication:_queryparams.Publication,
                      Year:_queryparams.Year, UserID:_queryparams.UserID};
                    const _request=_Burl+"V1.0/Doctor/ManageDoctorPublications";
                    $http({method:"POST", url:_request,data:_body})
                    .then(function(result)    
                    { 
                    $scope[_method](result.data);           
                    },function(error){ console.log('CODE: 6011');});
                  }, 
                  
                  // 6012 Post Doctor Certification
                  PostDoctorCertification: function ($scope,_queryparams,_method) { 
                    const _body={FlagNo:_queryparams.FlagNo,DoctorId:_queryparams.DoctorID,
                      CertificateID:_queryparams.CertificateID,Certificate:_queryparams.Certificate,
                      Year:_queryparams.Year, UserID:_queryparams.UserID};
                    const _request=_Burl+"V1.0/Doctor/ManageDoctorCertificate";
                    $http({method:"POST", url:_request,data:_body})
                    .then(function(result)    
                    { 
                    $scope[_method](result.data);           
                    },function(error){ console.log('CODE: 6012');});
                  }, 


                  // 6013 Post Doctor Associations
                  PostDoctorAssociations: function ($scope,_queryparams,_method) { 
                    const _body={FlagNo:_queryparams.FlagNo,DoctorId:_queryparams.DoctorID,
                      AssociationID:_queryparams.AssociationID,Association:_queryparams.Association,
                      Year:_queryparams.Year, UserID:_queryparams.UserID};
                    const _request=_Burl+"V1.0/Doctor/ManageDoctorAssociations";
                    $http({method:"POST", url:_request,data:_body})
                    .then(function(result)    
                    { 
                    $scope[_method](result.data);           
                    },function(error){ console.log('CODE: 6013');});
                  }, 

                  // 6014 Post Doctor Professional
                  PostDoctorProfessional: function ($scope,_queryparams,_method) { 
                    
                    const _body={FlagNo:_queryparams.FlagNo,DoctorId:_queryparams.DoctorID,
                      ProfessionalID:_queryparams.ProfessionalID,Professional:_queryparams.Professional,
                      PracticeDetails:_queryparams.PracticeDetails, UserID:_queryparams.UserID};
                    const _request=_Burl+"V1.0/Doctor/ManageDoctorProfessional";
                    $http({method:"POST", url:_request,data:_body})
                    .then(function(result)    
                    { 
                    $scope[_method](result.data);           
                    },function(error){ console.log('CODE: 6014');});
                  }, 
                  
                  
                  // 6015 Get Doctor Profile Clinic Data                  
                    getDoctorProfileClinicData: function ($scope,_queryparams,_method) { 
                      const _request=_Burl+"V1.0/doctor/GetDoctorProfileClinic?DoctorID="+_queryparams.DoctorID;
                      $http({method:"GET", url:_request})
                      .then(function(result)    
                      {     
                        $scope[_method](result.data);           
                      },function(){console.log('CODE: 6015');});
                    },

                    // 6016 Post Doctor Professional
                    PostDoctorClinicData: function ($scope,_queryparams,_method) {                     
                    const _body={Flag:_queryparams.Flag,DoctorId:_queryparams.DoctorId,
                      ClinicId:_queryparams.ClinicId,ClinicName:_queryparams.ClinicName,
                      Clinicaddress:_queryparams.Clinicaddress,                      
                      ClinicLogo:_queryparams.ClinicLogo,
                      Pincode:_queryparams.Pincode,
                      CityId:_queryparams.CityId,
                      Description:_queryparams.Description,
                      Remark:_queryparams.Remark,
                      UserID:_queryparams.UserID};
                    const _request=_Burl+"V1.0/Doctor/UpdateDoctorClinicDetails";
                    $http({method:"POST", url:_request,data:_body})
                    .then(function(result)    
                    { 
                    $scope[_method](result.data);           
                    },function(error){ console.log('CODE: 6016');});
                  }, 


                  // 6017 Get Doctor Profile Doctor Time Data                  
                  getDoctorProfileDoctorTimeData: function ($scope,_queryparams,_method) { 
                    const _request=_Burl+"V1.0/doctor/GetDoctorProfileDoctorTiming?DoctorID="+_queryparams.DoctorID+"&TimeZoneId="+_queryparams.TimeZone+"&ClinicId="+_queryparams.ClinicId;
                    $http({method:"GET", url:_request})
                    .then(function(result)    
                    {     
                      $scope[_method](result.data);           
                    },function(){console.log('CODE: 6017');});
                  },

                  // 6018 Post Doctor Doctor Time Data
                  PostDoctorProfileDoctorTimeData: function ($scope,_queryparams,_method) { 
                                      
                    const _body={DoctorId:_queryparams.DoctorId,UserID:_queryparams.UserID,
                      SlotDuration:_queryparams.SlotDuration,DoctorTimeDetails:_queryparams.DoctorTimeDetails,
                      TimeZoneID:_queryparams.TimeZoneID,                      
                      ClinicId:_queryparams.ClinicId};
                    const _request=_Burl+"V1.0/Doctor/UpdateDoctorTimingDetails";
                    $http({method:"POST", url:_request,data:_body})
                    .then(function(result)    
                    { 
                    $scope[_method](result.data);           
                    },function(error){ console.log('CODE: 6018');});
                  }, 

                  // 6019 Get Doctor Profile Leave,Leave Off and Holiday Data                  
                  getDoctorProfileLeaveOffHolidayData: function ($scope,_queryparams,_method) { 
                    const _request=_Burl+"V1.0/doctor/GetDoctorLeaveOffDetails?DoctorID="+_queryparams.DoctorID+"&TimeZoneId="+_queryparams.TimeZone+"&ClinicId="+_queryparams.ClinicId;
                    $http({method:"GET", url:_request})
                    .then(function(result)    
                    {     
                      $scope[_method](result.data);           
                    },function(){console.log('CODE: 6019');});
                  },

                  
                  // 6020 Post Doctor Doctor Leave Data
                  PostDoctorProfileDoctorLeaveData: function ($scope,_queryparams,_method) { 
                                
                    const _body={FlagNo:_queryparams.FlagNo,
                      ID:_queryparams.ID,
                      DoctorID:_queryparams.DoctorID,
                      ClinicId:_queryparams.ClinicId,
                      TypeOfLeave:_queryparams.TypeOfLeave,                      
                      FromDate:_queryparams.FromDate,
                      ToDate:_queryparams.ToDate,
                      FromTime:_queryparams.FromTime,
                      ToTime:_queryparams.ToTime,
                      Remark:_queryparams.Remark,
                      Status:_queryparams.Status,
                      TimeZoneID:_queryparams.TimeZoneID
                    };
                    const _request=_Burl+"V1.0/Doctor/ManagaDoctorLeaveOffHours";
                    $http({method:"POST", url:_request,data:_body})
                    .then(function(result)    
                    { 
                    $scope[_method](result.data);           
                    },function(error){ console.log('CODE: 6020');});
                  }, 

////------------------- For Master Data-------------------------------------------------------------
                  // 9000 Get Nationality Data
                  GetNationality: function ($scope,_method) { 
                  
                  const _request=_Burl+"V1.0/master/GetNationality";
                  $http({method:"GET", url:_request})
                    .then(function(result)    
                      {     
                        $scope[_method](result.data);           
                      },function(error){console.log('CODE: 9000');});
                  },
                 
       
    }
});