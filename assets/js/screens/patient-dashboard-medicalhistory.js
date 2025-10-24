app.controller('patientdashboardmedicalhistoryController', ['$scope','$filter', 'appDataService', function ($scope,$filter,appDataService) {
    $scope.loadMedicalHistory=function()
    {
        $scope.ismedicalHistoryloading=true;
        $scope.ismedicalHistorySubmitting=false;
        $scope.saasuserid=$scope.$parent.saasuserid;$scope.saasmemberid=$scope.$parent.saasmemberid;$scope.zoneid=$scope.$parent.zoneid;
        let _request={saasuserid:$scope.saasuserid,memberid:$scope.saasmemberid,zoneid:$scope.zoneid};
        appDataService.getPatientMedicalHistoryData($scope,_request,'bindMedicalHistoryScreen');
    }
    $scope.bindMedicalHistoryScreen=function(response)
    {

        if(response.Status){
         $scope.WholeScreenData=response.Data;
         $scope.mhdataBasicContent=$scope.WholeScreenData.Content[0];
         $scope.Gender=$scope.mhdataBasicContent.Gender;
         $scope.Age=$scope.mhdataBasicContent.Age;
         $scope.isMedication=$scope.mhdataBasicContent.IsMedication;
         $scope.isAllergy=$scope.mhdataBasicContent.IsAllergy;
         $scope.mhdataHeightWeight=$scope.WholeScreenData.HeightWeight.length==1?$scope.WholeScreenData.HeightWeight[0]:null;
         $scope.gynBirthControlMethod=null;
        
         if(!$scope.mhdataBasicContent.IsMedicalHistoryData)
         {
            $scope.mhdatamedicalHistory=null;
            $scope.isTabacco=false;
            $scope.isAlcohol=false;
            $scope.isExercise=false;
            $scope.isCovid=false;
            $scope.isTraveledOverseas=false;
            $scope.isWantToQuitTobaco=false;
            $scope.mdlddlTypeOfExercise='';
            $scope.mdlddlTimeExercise='';
            $scope.mdlddlOftenDrinkAlcohol='';
            $scope.mdlddlTobacoYears='';
            $scope.mdlddlTobacoOften='';
            //$scope.LastVisitDate='';
            //$scope.LastVisitOther='';
         }
         else
         {
            $scope.mhdatamedicalHistory=$scope.WholeScreenData.MedicalHistory[0];
            $scope.isTabacco=$scope.mhdatamedicalHistory.IsTobacco;
            $scope.isAlcohol=$scope.mhdatamedicalHistory.DrinkAlcohol;
            $scope.isExercise=$scope.mhdatamedicalHistory.IsExcercise;
            $scope.isCovid=$scope.mhdatamedicalHistory.IsCovid;
            $scope.isTraveledOverseas=$scope.mhdatamedicalHistory.isTraveledOverseas;
            $scope.isWantToQuitTobaco=$scope.mhdatamedicalHistory.QuitTobacco;
            $scope.mdlddlTypeOfExercise=$scope.mhdatamedicalHistory.ExcerciseTypeId;
            $scope.mdlddlTimeExercise=$scope.mhdatamedicalHistory.ExcerciseFrequencyId;
            $scope.mdlddlOftenDrinkAlcohol=$scope.mhdatamedicalHistory.AlcoholUseID;
            $scope.mdlddlTobacoYears=$scope.mhdatamedicalHistory.TobaccoYearsID;
            $scope.mdlddlTobacoOften=$scope.mhdatamedicalHistory.TobacooUseID;
            //$scope.mhdatamedicalHistory.LastVisitDateFormat;
            //$scope.mhdatamedicalHistory.LastVisitOther;
            

         }

         $scope.ismedicalHistoryloading=false;
    
        
        }
        else
        {
            PopupAlert('erro','medical history Cannot be pulled!');
        }
        $scope.clearMedicationForm();
        $scope.clearAllergyForm();
        $scope.resetTreatMentByDoctor();
    }
    $scope.clearMedicationForm=function()
    {
        $scope.selectedMedicineId=undefined;
        $scope.mdlMedicationDirection=undefined;
        $scope.mdlMedicationDosage=undefined;
        $scope.mdlMedicationStatus=undefined;
        $scope.isAddingMedication=false;
        $scope.msgAddMedication='';
        $scope.hdnMedicalRecordRowID=0;
        ////debugger;
       // 
       $scope.$broadcast('angucomplete-alt:clearInput');
       ////$('#txtautoMedicine_value').val('');
    }
    $scope.onMedicineSelect=function(objSelected)
    {
        
        if(objSelected!=undefined)
            {
            if(objSelected.originalObject.MedicineName!=undefined){
                $scope.selectedMedicineId=objSelected.originalObject.MedicineId;
            }
            else
            {$scope.selectedMedicineId=0;}
            }
            else
            {$scope.selectedMedicineId=0;}
    }
    $scope.addMedication=function()
    {
        
        if((($scope.selectedMedicineId!=undefined) && ($scope.selectedMedicineId!=0)) && (($scope.mdlMedicationDirection!=undefined) && ($scope.mdlMedicationDirection!='')) && (($scope.mdlMedicationDosage!=undefined) && ($scope.mdlMedicationDosage!=''))&& (($scope.mdlMedicationStatus!=undefined) && ($scope.mdlMedicationStatus!='')) )
                {
                    $scope.msgAddMedication='';
                    $scope.isAddingMedication=true;
                    let _newMedicalRecord={rID:$scope.hdnMedicalRecordRowID,saasmemberid:$scope.saasmemberid,MedicineId:$scope.selectedMedicineId,Dosage:$scope.mdlMedicationDosage,DirectionId:$scope.mdlMedicationDirection,StatusId:$scope.mdlMedicationStatus}
                    if(!$scope.isMedicalRecordSelectedToUpdate)
                    {
                    appDataService.addPatientMedicalHistoryMedicalRecordData($scope,_newMedicalRecord,'bindUpdatedMedicalRecord');
                    }
                    if($scope.isMedicalRecordSelectedToUpdate)
                    {
                    appDataService.updatePatientMedicalHistoryMedicalRecordData($scope,_newMedicalRecord,'bindUpdatedMedicalRecord');
                    }
                }
        else
                {
                    $scope.msgAddMedication='Enter Valid Values';

                }
    }
    $scope.bindUpdatedMedicalRecord=function(response)
    {
        if(response.Status)
        {
            $scope.WholeScreenData.Medication=response.Data;
            $scope.clearMedicationForm();
            PopupAlert('succ','Medical Record Updated Successfully!!');
          

        }
        else
        {
            PopupAlert('erro','Unable to update medical record!!');

        }

    }
    $scope.updateMedicationStatus=function(patientMedicationId,statusId)
    {

        ////debugger;
        let _updateMedicalRecord={rID:patientMedicationId,StatusId:statusId}
        appDataService.updatePatientMedicalHistoryMedicalStatusOnlyRecordData($scope,_updateMedicalRecord,'updatedMedicataionstatusResponse');

    }
    $scope.updatedMedicataionstatusResponse=function(response)
    {
        if(response.Status)
        {
            
            
            PopupAlert('succ','Medical Status Updated Successfully!!');

        }
        else
        {
            PopupAlert('erro','Unable to update medical record!!');

        }
    }
    $scope.clearAllergyForm=function()
    {
        $scope.selectedAllergyId=undefined;
        $scope.mdltxtAllergyReaction=undefined;
        $scope.mdlddlAllergyType=undefined;
        $scope.mdlddlAllergyStatus=undefined;
        $scope.mdltxtAllergyReactionOther='';
        $scope.msgAddAllergy='';
        $scope.isAddingAllergy=false;
        $scope.AllergyMasterList=[{AllergyId: 0, AllergyName: 'Select Allergy Type First', AllergyTypeId: 0}];
        $scope.$broadcast('angucomplete-alt:clearInput');

    }
    $scope.changeAllergyType=function(allergyTypeId)
    {
        
        if(allergyTypeId!="")
        {
            $scope.AllergyMasterList=$filter('filter')($scope.WholeScreenData.AllergyMaster ,{AllergyTypeId:parseInt(allergyTypeId)},true);

        }
        else
        { 
            $scope.AllergyMasterList=[{AllergyId: 0, AllergyName: 'Select Allergy Type First', AllergyTypeId: 0}];

        }
    }
    $scope.onAllergySelect=function(objSelected)
    {
        ////debugger
        if(objSelected!=undefined)
            {
            if(objSelected.originalObject.AllergyName!=undefined){
                $scope.selectedAllergyId=objSelected.originalObject.AllergyId;
            }
            else
            {$scope.selectedAllergyId=0;}
            }
            else
            {$scope.selectedAllergyId=0;}
    }
    $scope.addAllergy=function()
    {
       //debugger;
        if(((($scope.selectedAllergyId!=undefined) && ($scope.selectedAllergyId!=0))||(($scope.mdlddlAllergyType==12)&&($scope.mdltxtAllergyReactionOther!=''))) && ((($scope.mdlddlAllergyType!=undefined) && ($scope.mdlddlAllergyType!=''))) && (($scope.mdltxtAllergyReaction!=undefined) && ($scope.mdltxtAllergyReaction!=''))&& (($scope.mdlddlAllergyStatus!=undefined) && ($scope.mdlddlAllergyStatus!='')) )
            {
                $scope.msgAddAllergy='';
                $scope.isAddingAllergy=true;
                let _newAllergyRecord={saasmemberid:$scope.saasmemberid,AllergyId:$scope.selectedAllergyId!=0?$scope.selectedAllergyId:null,AllergyTypeId:$scope.mdlddlAllergyType,AllergyOther:$scope.mdltxtAllergyReactionOther,Remarks:$scope.mdltxtAllergyReaction,StatusId:$scope.mdlddlAllergyStatus}
                ////debugger;
                appDataService.addPatientMedicalHistoryAllergyRecordData($scope,_newAllergyRecord,'bindAllergyRecords');
                
            }
        else
            {
                $scope.msgAddAllergy='Enter Valid Values';

            }

    }
    $scope.bindAllergyRecords=function(response)
    {
        if(response.Status)
        {
            $scope.WholeScreenData.Allergy=response.Data;
            $scope.clearAllergyForm();
            PopupAlert('succ','Allergy Record Updated Successfully!!');

        }
        else
        {
            PopupAlert('erro','Unable to update allergy record!!');

        }

    }
    $scope.updateAllergyStatus=function(patientAllergyId,statusId)
    {

       // //debugger;
        let _updateMedicalRecord={rID:patientAllergyId,StatusId:statusId}
        appDataService.updatePatientMedicalHistoryAllergyStatusOnlyRecordData($scope,_updateMedicalRecord,'updatedAllergystatusResponse');

    }
    $scope.updatedAllergystatusResponse=function(response)
    {
        if(response.Status)
        {
            
            
            PopupAlert('succ','Allergy Status Updated Successfully!!');

        }
        else
        {
            PopupAlert('erro','Unable to update allergy record!!');

        }
    }
    $scope.manageTreatMentByDoctor=function()
    {
        
        
        
        
        if(($scope.txtTreatmentByDoctorDoctorName)&&($scope.txtTreatmentByDoctorSpecialty)&&($scope.treatmentByDoctorDate))
        {
            $scope.isAddingTreatmentByDoctor=true;
                $scope.msgTreatmentByDoctor='';
            //let _newTreatmentRecord={rID:'temp'+($scope.WholeScreenData.TreatmentByDoctor.length+1),DoctorName:$scope.txtTreatmentByDoctorDoctorName,Speciality:$scope.txtTreatmentByDoctorSpecialty,TratmentDate:$scope.treatmentByDoctorDate,IsFilled:1}
            //$scope.WholeScreenData.TreatmentByDoctor.push(_newTreatmentRecord);
            let _newTreatmentRecord={rID:$scope.hdnTreatByDoctorRowID,saasmemberid:$scope.saasmemberid,DoctorName:$scope.txtTreatmentByDoctorDoctorName,Speciality:$scope.txtTreatmentByDoctorSpecialty,TratmentDate:$scope.treatmentByDoctorDate}
            if(!$scope.isSelectedTreatmentByDoctorToUpdate)
            {
            appDataService.addPatientMedicalHistoryTreatmentByDoctorData($scope,_newTreatmentRecord,'bindUpdatedTreatmentByDoctor');
            }
            if($scope.isSelectedTreatmentByDoctorToUpdate)
            {
            appDataService.updatePatientMedicalHistoryTreatmentByDoctorData($scope,_newTreatmentRecord,'bindUpdatedTreatmentByDoctor');
            }
        
        }
        else{$scope.msgTreatmentByDoctor='Enter Valid Values';}
    }

    $scope.bindUpdatedTreatmentByDoctor=function(response)
    {
        ////debugger;
        if(response.Status)
        {
            $scope.WholeScreenData.TreatmentByDoctor=response.Data;
            $scope.resetTreatMentByDoctor();
            PopupAlert('succ','Treatment Record Updated Successfully!!');

        }
        else
        {
            PopupAlert('erro','Unable to update treatment record!!');

        }
        
    }
    $scope.selectTreatMentByDoctor=function(rid,doctorname,specialty,treatmentdate)
    {   ////debugger;
        $scope.txtTreatmentByDoctorDoctorName=doctorname;$scope.hdnTreatByDoctorRowID=rid,$scope.txtTreatmentByDoctorSpecialty=specialty;$scope.treatmentByDoctorDate=treatmentdate;$('#txtTreatmentByDoctorAppointmentDate').val(formatDate_ddMMYYYYfromString(treatmentdate));
        $scope.isSelectedTreatmentByDoctorToUpdate=true;
    }
    $scope.resetTreatMentByDoctor=function()
    {
        
        $scope.isAddingTreatmentByDoctor=false;
        $scope.isSelectedTreatmentByDoctorToUpdate=false;
        $scope.txtTreatmentByDoctorDoctorName=undefined;$scope.hdnTreatByDoctorRowID=0;$scope.txtTreatmentByDoctorSpecialty=undefined;$scope.treatmentByDoctorDate=undefined;$('#txtTreatmentByDoctorAppointmentDate').val('');
    }
    $scope.customCheckChilds = function(row) {
        return row.SelectionCount > 0;
    };
    $scope.submitMedicalhistoryForm=function()
    {
 

        $scope.ismedicalHistorySubmitting=true;
        if($scope.gynBirthControlMethod!==null)
            {
                $scope.WholeScreenData.GynecologicalDiseases[4].GynecologicalValueFORMAT=$scope.gynBirthControlMethod;
            }
        let _familyProblemList=$filter('filter')($scope.WholeScreenData.FamilyHistory ,{IsSelected:true},true);
        let _listPastMedicalhistoryData=[];
        // angular.forEach(obj, function(value, key) {
        //     console.log(key + ': ' + value);
        //   });
        let _medicalHistoryHeader=[];
        $scope.WholeScreenData.PastMedicalHistoryMasterData.forEach(function(_mrow){

            // if(_mrow.SelectionCount>0)
            // {
            _medicalHistoryHeader.push(_mrow);
            // }

            

        });
       
        _medicalHistoryHeader.forEach(function(row)
        {
            
            
            let _medicalHistoryDetailsList=$filter('filter')($scope.WholeScreenData.PastMedicalHistory ,{MedicalDiseasesID:row.MedicalDiseasesID},true);
            let _medicalHistoryDetailsListSelected=$filter('filter')(_medicalHistoryDetailsList ,{IsChecked:true},true);
            let _detailIds="";
            _medicalHistoryDetailsListSelected.forEach(function(_drow)
            {
                _detailIds=(_detailIds==""?(_drow.DetailId):(_detailIds+','+_drow.DetailId));
            });
            _listPastMedicalhistoryData.push({MedicalDiseasesID:row.MedicalDiseasesID,DetailIds:_detailIds,DiseaseOtherDetail:row.MedicalDiseaseOther});
            
            
           

        });
        ////debugger;
        ////debugger;
        let _newNedicalHistoryObject={
            saasmemberid:$scope.saasmemberid,
            HeightInFeet:$scope.mhdataHeightWeight.HeightInFeet,
            HeightInInch:$scope.mhdataHeightWeight.HeightInInch,
            Weight:$scope.mhdataHeightWeight.Weight,
            IsUseTobacoo:$scope.isTabacco,
            OftenUseTobacoo:$scope.mdlddlTobacoOften==''?null:$scope.mdlddlTobacoOften,
            YearsOfTobacooUse:$scope.mdlddlTobacoYears==''?null:$scope.mdlddlTobacoYears,
            WantToQuitTobacoo:$scope.isWantToQuitTobaco,
            IsDrinkAlcohol:$scope.isAlcohol,
            OftenDrinkAlcohol:$scope.mdlddlOftenDrinkAlcohol==''?null:$scope.mdlddlOftenDrinkAlcohol,
            IsExcercise:$scope.isExercise,
            ExcerciseTypeId:$scope.mdlddlTypeOfExercise==''?null:$scope.mdlddlTypeOfExercise,
            ExcerciseFrequencyId:$scope.mdlddlTimeExercise==''?null:$scope.mdlddlTimeExercise,
            HadCovid:$scope.isCovid,
            CovidInfection:$scope.mhdatamedicalHistory!=null?$scope.mhdatamedicalHistory.CovidInfection:null,
            IsPastTravelled:$scope.isTraveledOverseas,
            LastDoctorVisit:$scope.mhdatamedicalHistory!=null?$scope.mhdatamedicalHistory.LastVisitDate:null,
            other:$scope.mhdatamedicalHistory!=null?$scope.mhdatamedicalHistory.LastVisitOther:null,
            listPastMedicalHistoryData:_listPastMedicalhistoryData.length>0?_listPastMedicalhistoryData:null,
            listGynecologicalDiseasesData:$scope.WholeScreenData.GynecologicalDiseases,
            listFamilyProblem:_familyProblemList
        }
        
        
       // console.log(_newNedicalHistoryObject);
        ////debugger;
        appDataService.managePatientMedicalHistoryRecordData($scope,_newNedicalHistoryObject,'responseMedicalHistoryResponse');
        //
        
    }
    $scope.responseMedicalHistoryResponse=function(response)
    {
        

        if(response.Status)
        {
            PopupAlert('succ','Medical Record Updated Successfully!!');
        }
        else
        {
            PopupAlert('erro','Unable to update medical record!!');
        }
        $scope.ismedicalHistorySubmitting=false;

    }
    $scope.dobChanged=function(date,attrs, modelCtrl)
    {
        $scope.mhdatamedicalHistory.LastVisitDate= formatDate_MMddYYYY(date);
       
    } 
    $scope.date1Changed=function(date,attrs, modelCtrl)
    {
        
        $scope.gynBirthControlMethod= formatDate_MMddYYYY(date);
       
    } 
    $scope.date2Changed=function(date,attrs, modelCtrl)
    {
       
        $scope.treatmentByDoctorDate=formatDate_MMddYYYY(date);
     

    }
    $scope.loadMedicalHistory();
    
}]);