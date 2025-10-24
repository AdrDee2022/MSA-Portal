app.controller('DoctorProfileProfessionalInfoController', ['$scope','appDataService', function ($scope,appDataService) 
{
    
    $scope.bindProfessionalInfoDetails=function()
    {
        
        $scope.EduID=0;
        $scope.AwardsID=0;
        $scope.ExperienceID=0;
        $scope.CertificateID=0;
        $scope.AssociationID=0;
        $scope.ProfessionalID=0;
        $scope.DoctorId= $scope.$parent.SAASDoctorId;
        $scope.TimeZone= $scope.$parent.currentTimeZone;
        $scope.UserId=$scope.saasUser.saasuser.saasuserid;

        _request={DoctorID:$scope.DoctorId};
        appDataService.getDoctorProfileProfessionalInfoDetails($scope,_request,'BindDoctorProfileProfessionalInfoDetails');
    }
    $scope.BindDoctorProfileProfessionalInfoDetails=function(rdata)
    {
        if(rdata.Status)
        {
            
            $scope.DoctorServiceslist=rdata.Data.DoctorServices;
            $scope.DoctorSpecializationlist=rdata.Data.DoctorSpecialization;
            $scope.DoctorEducationlist=rdata.Data.DoctorEducation;
            $scope.DoctoAwardslist=rdata.Data.DoctoAwards;
            $scope.DoctorExperiencelist=rdata.Data.DoctorExperience;
            $scope.DoctorProfessionallist=rdata.Data.DoctorProfessional;
            $scope.DoctorPublicationslist=rdata.Data.DoctorPublications;
            $scope.DoctorCertificationslist=rdata.Data.DoctorCertifications;
            $scope.DoctorAsssosiationslist=rdata.Data.DoctorAsssosiations;
            

        }
    
    }
    // Start DoctorServices
    $scope.DeleteDoctorService=function(ServiceID)
    {        
        _request={FlagNo:1,DoctorID:$scope.DoctorId,ServicesID:ServiceID,DoctorServices:"",UserID:$scope.UserId};
       appDataService.PostDoctorServices($scope,_request,'BindDoctorServices');
       $scope.txtServices="";
    }
    $scope.AddDoctrService=function()
    {   
        
        if($scope.txtServices == "" || $scope.txtServices == undefined)
        {
            PopupAlert('warn','Please Enter Services!');
        }
        else{
            _request={FlagNo:0,DoctorID:$scope.DoctorId,ServicesID:0,DoctorServices:$scope.txtServices,UserID:$scope.UserId};
            appDataService.PostDoctorServices($scope,_request,'BindDoctorServices');
            $scope.txtServices='';
        }
    }

    $scope.BindDoctorServices=function(rdata)
    {
        
        if(rdata.Status)
        {
            $scope.DoctorServiceslist=rdata.Data;
        }
    }
    // End DoctorServices

    // Start Specialization
    $scope.DeleteSpecialization=function(ExpertiseIDs)
    {        
        
        _request={FlagNo:1,DoctorID:$scope.DoctorId,ExpertiseID:ExpertiseIDs,DoctorExpertise:"",UserID:$scope.UserId};
        appDataService.PostDoctorSpecialization($scope,_request,'BindSpecialization');
        $scope.txtSpecialization="";
    }

    $scope.AddSpecialization=function()
    {   
        if($scope.txtSpecialization == "" || $scope.txtSpecialization == undefined)
        {
            PopupAlert('warn','Please Enter Specialization!');
        }
        else{   
            _request={FlagNo:0,DoctorID:$scope.DoctorId,ExpertiseID:0,DoctorExpertise:$scope.txtSpecialization,UserID:$scope.UserId};
            appDataService.PostDoctorSpecialization($scope,_request,'BindSpecialization');
            $scope.txtSpecialization="";
        }
    }

    $scope.BindSpecialization=function(rdata)
    {
        
        if(rdata.Status)
        {
            $scope.DoctorSpecializationlist=rdata.Data;
        }
    }
    // End Specialization

    // Start Education
    $scope.DeleteEducation=function(EduID)
    {        
        
        _request={FlagNo:2,DoctorID:$scope.DoctorId,EducationID:EduID,DoctorEducation:"",College:"",YearofCompletion:"",UserID:$scope.UserId};
        appDataService.PostDoctorEducation($scope,_request,'BindEducation');
        $scope.txtSpecialization="";
    }

    $scope.EditEducation=function(EduID,EduName,College,Years)
    {        
        
        $scope.EduID=EduID;
        $scope.txtDegree=EduName;
        $scope.txtCollege=College;
        $scope.txtYearofCompletion=Years;
    }

    $scope.AddEducation=function()
    {   
        if($scope.txtDegree == "" || $scope.txtDegree == undefined)
        {
            PopupAlert('warn','Please Enter Degree!');
        }
        else{        
            let FlagNo=0;

            if($scope.EduID =="")
            {
                $scope.EduID=0;
            }
            if($scope.EduID!=0)
            {
                FlagNo=1;
            }       

            _request={FlagNo:FlagNo,DoctorID:$scope.DoctorId,EducationID:$scope.EduID,DoctorEducation:$scope.txtDegree,College:$scope.txtCollege,YearofCompletion:$scope.txtYearofCompletion,UserID:$scope.UserId};
            appDataService.PostDoctorEducation($scope,_request,'BindEducation');
        
            $scope.EduID=0;
            $scope.txtDegree="";
            $scope.txtCollege="";
            $scope.txtYearofCompletion="";
        }
    }

    $scope.BindEducation=function(rdata)
    {
        
        if(rdata.Status)
        {
            $scope.DoctorEducationlist=rdata.Data;
        }
    }
    // End Education

    // Start Awards
    $scope.DeleteAwards=function(AwardsID)
    {        
        
        _request={FlagNo:2,DoctorID:$scope.DoctorId,AwardsID:AwardsID,Awards:"",Years:"",UserID:$scope.UserId};
        appDataService.PostDoctorAwards($scope,_request,'BindAwards');
        $scope.txtSpecialization="";
    }

    $scope.EditAwards=function(AwardsID,Awards,Years)
    {        
        
        $scope.AwardsID=AwardsID;
        $scope.txtAwards=Awards;
        $scope.txtAwardsYear=Years;
    }

    $scope.AddAward=function()
    {   
        if($scope.txtAwards == "" || $scope.txtAwards == undefined)
        {
            PopupAlert('warn','Please Enter Awards!');
        }
        else{       
            let FlagNo=0;

            if($scope.AwardsID =="")
            {
                $scope.AwardsID=0;
            }
            if($scope.AwardsID!=0)
            {
                FlagNo=1;
            }       

            _request={FlagNo:FlagNo,DoctorID:$scope.DoctorId,AwardsID:$scope.AwardsID,Awards:$scope.txtAwards,Years:$scope.txtAwardsYear,UserID:$scope.UserId};
            appDataService.PostDoctorAwards($scope,_request,'BindAwards');

            $scope.AwardsID=0;
            $scope.txtAwards="";
            $scope.txtAwardsYear="";
        }
    }

    $scope.BindAwards=function(rdata)
    {
    
        if(rdata.Status)
        {
            $scope.DoctoAwardslist=rdata.Data;
        }
    }
    // End Awards

    // Start Experience 
    $scope.DeleteExperience=function(ExperienceID)
    {        
        
        _request={FlagNo:2,DoctorID:$scope.DoctorId,ExperienceID:ExperienceID,HospitalName:"",FromDate:"",ToDate:"",Designation:"",UserID:$scope.UserId};
        appDataService.PostDoctorExperience($scope,_request,'BindExperience');
        
    }

    $scope.EditExperience=function(ExperienceID,HospitalName,FomDate,ToDate,Designation)
    {        
        
        $scope.ExperienceID=ExperienceID;
        $scope.txtHospitalName=HospitalName;
        $scope.txtFomDate=FomDate;
        $scope.txtToDate=ToDate;
        $scope.txtDesignation=Designation;
    }

    $scope.AddExperience=function()
    {   
        if($scope.txtHospitalName == "" || $scope.txtHospitalName == undefined)
        {
            PopupAlert('warn','Please Enter Hospital Name!');
        }
        else{ 
            let FlagNo=0;

            if($scope.ExperienceID =="")
            {
                $scope.ExperienceID=0;
            }
            if($scope.ExperienceID!=0)
            {
                FlagNo=1;
            }       

            _request={FlagNo:FlagNo,DoctorID:$scope.DoctorId,ExperienceID:$scope.ExperienceID,HospitalName:$scope.txtHospitalName,FromDate:$scope.mdlFomDate,ToDate:$scope.mdlToDate,Designation:$scope.txtDesignation,UserID:$scope.UserId};
            appDataService.PostDoctorExperience($scope,_request,'BindExperience');

            $scope.ExperienceID=0;
            $scope.txtHospitalName="";
            $scope.txtFomDate="";
            $scope.txtToDate="";
            $scope.txtDesignation="";
        }
    }

    $scope.BindExperience=function(rdata)
    {
    
        if(rdata.Status)
        {
            $scope.DoctorExperiencelist=rdata.Data;
        }
    }

    $scope.date1Changed=function(date,attrs, modelCtrl)
    {   
        $scope.mdlFomDate=date;
    }
    $scope.date2Changed=function(date,attrs, modelCtrl)
    {
        if(date>=$scope.mdlFomDate){
        $scope.mdlToDate=date;
        }
        else
        { PopupAlert('warn','From Date Cannot be greater the To Date!');}
    }
    // End Experience 

    // Start Publications 
     $scope.DeletePublication=function(PublicationID)
     {   
                      
         _request={FlagNo:2,DoctorID:$scope.DoctorId,PublicationID:PublicationID,Publication:"",Year:"",UserID:$scope.UserId};
         appDataService.PostDoctorPublication($scope,_request,'BindPublication');
         
     }
 
     $scope.EditPublication=function(PublicationID,Publication,year)
     {        
         
         $scope.PublicationID=PublicationID;
         $scope.txtPublications=Publication;
         $scope.txtPubYear=year;
     }
 
     $scope.AddPublication=function()
     {   
        if($scope.txtPublications == "" || $scope.txtPublications == undefined)
        {
            PopupAlert('warn','Please Enter Publications!');
        }
        else{  
            let FlagNo=0;
    
            if($scope.PublicationID =="")
            {
                $scope.PublicationID=0;
            }
            if($scope.PublicationID!=0)
            {
                FlagNo=1;
            }       
    
            _request={FlagNo:FlagNo,DoctorID:$scope.DoctorId,PublicationID:$scope.PublicationID,Publication:$scope.txtPublications,Year:$scope.txtPubYear,UserID:$scope.UserId};
            appDataService.PostDoctorPublication($scope,_request,'BindPublication');
    
            $scope.PublicationID=0;
            $scope.txtPublications="";
            $scope.txtPubYear="";
        }
     }
 
     $scope.BindPublication=function(rdata)
     {
     
         if(rdata.Status)
         {
             $scope.DoctorPublicationslist=rdata.Data;
         }
     } 
     // End Publications 

     // Start Certifications 
     $scope.DeleteCertification=function(CertificationID)
     {   
                      
        _request={FlagNo:2,DoctorID:$scope.DoctorId,CertificateID:CertificationID,Certificate:"",Year:"",UserID:$scope.UserId};
        appDataService.PostDoctorCertification($scope,_request,'BindCertification');       
     }
 
     $scope.EditCertification=function(CertificateID,Certifications,year)
     {        
         
         $scope.CertificateID=CertificateID;
         $scope.txtCertifications=Certifications;
         $scope.txtCerYear=year;
     }
 
     $scope.AddCertification=function()
     {   
        if($scope.txtCertifications == "" || $scope.txtCertifications == undefined)
        {
            PopupAlert('warn','Please Enter Certifications!');
        }
        else{  
            let FlagNo=0;
    
            if($scope.CertificateID =="")
            {
                $scope.CertificateID=0;
            }
            if($scope.CertificateID!=0)
            {
                FlagNo=1;
            }       
    
            _request={FlagNo:FlagNo,DoctorID:$scope.DoctorId,CertificateID:$scope.CertificateID,Certificate:$scope.txtCertifications,Year:$scope.txtCerYear,UserID:$scope.UserId};
            appDataService.PostDoctorCertification($scope,_request,'BindCertification');
    
            $scope.CertificateID=0;
            $scope.txtCertifications="";
            $scope.txtCerYear="";
        }
     }
 
     $scope.BindCertification=function(rdata)
     {     
         if(rdata.Status)
         {
             $scope.DoctorCertificationslist=rdata.Data;
         }
     } 
     // End Certifications 



     // Start Asssosiations 
     $scope.DeleteAsssosiations=function(AssociationID)
     {   
                      
        _request={FlagNo:2,DoctorID:$scope.DoctorId,AssociationID:AssociationID,Association:'',Year:'',UserID:$scope.UserId};
            appDataService.PostDoctorAssociations($scope,_request,'BindAsssosiations');
         
     }
 
     $scope.EditAsssosiations=function(AssociationID,Association,year)
     {        
         
         $scope.AssociationID=AssociationID;
         $scope.txtAsssosiations=Association;
         $scope.txtAssYear=year;
     }
 
     $scope.AddAsssosiations=function()
     {   
        if($scope.txtAsssosiations == "" || $scope.txtAsssosiations == undefined)
        {
            PopupAlert('warn','Please Enter Asssosiations!');
        }
        else{  
            let FlagNo=0;
    
            if($scope.AssociationID =="")
            {
                $scope.AssociationID=0;
            }
            if($scope.AssociationID!=0)
            {
                FlagNo=1;
            }       
    
            _request={FlagNo:FlagNo,DoctorID:$scope.DoctorId,AssociationID:$scope.AssociationID,Association:$scope.txtAsssosiations,Year:$scope.txtAssYear,UserID:$scope.UserId};
            appDataService.PostDoctorAssociations($scope,_request,'BindAsssosiations');
    
            $scope.AssociationID=0;
            $scope.txtAsssosiations="";
            $scope.txtAssYear="";
        }
     }
 
     $scope.BindAsssosiations=function(rdata)
     {     
         if(rdata.Status)
         {
             $scope.DoctorAsssosiationslist=rdata.Data;
         }
     } 
     // End Asssosiations 

    // Start Professional 
    $scope.DeleteProfessional=function(ProfessionalID)
    {   
                      
        _request={FlagNo:2,DoctorID:$scope.DoctorId,ProfessionalID:ProfessionalID,Professional:'',PracticeDetails:'',UserID:$scope.UserId};
            appDataService.PostDoctorProfessional($scope,_request,'BindProfessional');
        
    }

    $scope.EditProfessional=function(ProfessionalID,Professional,PracticeDetails)
    {        
        
        $scope.ProfessionalID=ProfessionalID;
        $scope.txtProfessional=Professional;
        $scope.txtPracticeDetails=PracticeDetails;
    }

    $scope.AddProfessional=function()
    {   
        if($scope.txtProfessional == "" || $scope.txtProfessional == undefined)
        {
            PopupAlert('warn','Please Enter Professional!');
        }
        else{  
            let FlagNo=0;
    
            if($scope.ProfessionalID =="")
            {
                $scope.ProfessionalID=0;
            }
            if($scope.ProfessionalID!=0)
            {
                FlagNo=1;
            }       
    
            _request={FlagNo:FlagNo,DoctorID:$scope.DoctorId,ProfessionalID:$scope.ProfessionalID,Professional:$scope.txtProfessional,PracticeDetails:$scope.txtPracticeDetails,UserID:$scope.UserId};
            appDataService.PostDoctorProfessional($scope,_request,'BindProfessional');
    
            $scope.ProfessionalID=0;
            $scope.txtProfessional='';
            $scope.txtPracticeDetails='';
        }
    }

    $scope.BindProfessional=function(rdata)
    {     
        if(rdata.Status)
        {
            $scope.DoctorProfessionallist=rdata.Data;
        }
    } 
    // End Professional 



    $scope.bindProfessionalInfoDetails();

}]);