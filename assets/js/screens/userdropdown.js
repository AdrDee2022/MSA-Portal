app.controller('userdropdownController', ['$rootScope','$scope','$location','$window','getSaasLocalStorage','appDataService', function ($rootScope,$scope,$location,$window,getSaasLocalStorage,appDataService) {

    
    

    $scope.SetParams=function(param)
    {
        if(param.IsUserDefined)
        {
           
        
        $scope.isuserloggedin=param.isuserloggedin;
        $scope.username=param.saasuser.username;
        $scope.usertype=param.saasuser.usertype;
        $scope.dashboard=(param.saasuser.usertype=="DOCTOR"?'doctor':'patient')
        $scope.useravtar=param.saasuser.useravtar;
        $scope.appversion=param.currentappversion;
        $scope.localtimezone=param.currentlocaltimezone;
        $scope.standardtimezone=param.currentappstandardtimezone;
        $scope.appENV=param.environment;
        $('.nav-item.dropdown.has-arrow.logged-item').show();
     
        let check=$location.path();
        if(($scope.dashboard=='patient')&&($scope.isuserloggedin)){
            if((check=='/logout')||(check=='/registration')||(check=='/login')||(check=='/patient-registration')||(check=='/doctor-registration'))
               { $location.path('/patient');}
                }
        if(($scope.dashboard=='doctor')&&($scope.isuserloggedin)){

            if((check=='/logout')||(check=='/registration')||(check=='/login')||(check=='/patient-registration')||(check=='/doctor-registration'))
               {

                    $location.path('/doctor');
               }
            }

    
        }
    }
    $scope.Loadinitials=function()
    {
       
        
        $scope.localParams = getSaasLocalStorage.getLocalParams(); 
        let localtimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        let standardtimezone=new Date().toTimeString().split("(")[1].toString().replace(")", "");
   
        
        
        if($scope.localParams.length==0)
        {
            
            $scope.Loaduser(localtimezone,standardtimezone);           
        }
        else
        {
            
         
            $scope.Loaduserprofile($scope.localParams,localtimezone,standardtimezone);
            
           

        } 

    }
    $scope.Loaduser=function(localtimezone,standardtimezone)
    { 

        let _queryparams={saasmemberid:0,timezone:standardtimezone,versionnumber:1.0,platform:'WEB'}
        appDataService.getAppDetails(_queryparams,$scope,localtimezone,0);

    }
    $scope.acceptAppDetails=function(response,param,acccode)
    {
        ////debugger;
        if(response.Status){
            
        if(acccode==0)
        {
         let User={username:'User',usertype:'USER',useravtar:'assets/img/user/user-avtar2.png',saasuserid:0,saasmemberid:0,gender:'',mobile:'0',email:'',ssn:'',clientmemberid:0,clientpatientid:0,currentyearid:0,financialyearid:0};
         let params={IsUserDefined:true,saasuser:User,isforcelogout:false,isuserloggedin:false,userlastlogin:new Date(),currentappversion:response.Data.AppVersionDetails[0].WebVersionNumber,currentappversionnumber:response.Data.AppVersionDetails[0].WebVersionBuildNumber,lastappversionchecked:new Date(),currentlocaltimezone:param,currentappstandardtimezone:response.Data.TimeZone[0].SQLServerZone,lastapptimezoneupdated:new Date()}
         getSaasLocalStorage.updateLocalParams(params); 
         $scope.SetParams(params);
        }
        if(acccode==1)
        {     //Version Check and Auto Refresh should be implement here Also Force Logout Can be checked here
             if(response.Data.AppVersion[0].IsUpdateRequired)
             {
             PopupAlert('info','New version <b>'+response.Data.AppVersionDetails[0].WebVersionNumber+'</b> is available and web app is updating now');
             $scope.localParams.environment=response.Data.AppVersionDetails[0].Environment;
             $scope.localParams.currentappversion=response.Data.AppVersionDetails[0].WebVersionNumber;$scope.localParams.currentappversionnumber=response.Data.AppVersionDetails[0].WebVersionBuildNumber;
             $scope.localParams.lastappversionchecked=new Date();$scope.localParams.currentlocaltimezone=param;$scope.localParams.currentappstandardtimezone=response.Data.TimeZone[0].SQLServerZone;$scope.localParams.lastapptimezoneupdated=new Date();
             getSaasLocalStorage.updateLocalParams($scope.localParams);
             const _reload=setTimeout(function(){clearTimeout(_reload);$window.location.reload(true);}, 4000);
             
             }
             else{
                $scope.localParams.environment=response.Data.UserAppVersionDetails[0].Environment;
            $scope.localParams.currentappversion=response.Data.UserAppVersionDetails[0].WebVersionNumber;$scope.localParams.currentappversionnumber=response.Data.UserAppVersionDetails[0].WebVersionBuildNumber;
            $scope.localParams.lastappversionchecked=new Date();$scope.localParams.currentlocaltimezone=param;$scope.localParams.currentappstandardtimezone=response.Data.TimeZone[0].SQLServerZone;$scope.localParams.lastapptimezoneupdated=new Date();
            getSaasLocalStorage.updateLocalParams($scope.localParams);
             
        }       
    
            $scope.SetParams($scope.localParams);
           
        }
        }
    }
    $scope.Loaduserprofile=function(params,localtimezone,standardtimezone)
    {

       
        let _queryparams={saasmemberid:params.saasuser.saasmemberid,timezone:standardtimezone,versionnumber:params.currentappversionnumber,platform:'WEB'}
        appDataService.getAppDetails(_queryparams,$scope,localtimezone,1);
        


    }
    $scope.Loadinitials();
    $scope.Logoutuser=function()
    {     
      ////debugger
        if(($scope.localParams!=undefined)&&($scope.localParams.length>0)){
        $scope.isuserloggedin=$scope.localParams.isuserloggedin=false;
        $scope.username=$scope.localParams.saasuser.username="User";
        $scope.usertype= $scope.localParams.saasuser.usertype="USER";
        $scope.useravtar=$scope.localParams.saasuser.useravtar="assets/img/user/user-avtar2.png";$scope.localParams.saasuser.saasuserid=0;$scope.localParams.saasuser.saasmemberid=0,$scope.localParams.saasuser.clientmemberid=0,$scope.localParams.saasuser.clientpatientid=0;$scope.localParams.saasuser.gender='';$scope.localParams.saasuser.mobile='';$scope.localParams.saasuser.email='';$scope.localParams.saasuser.ssn='';$scope.localParams.saasuser.currentyearid=0;$scope.localParams.saasuser.financialyearid=0;
        getSaasLocalStorage.updateLocalParams($scope.localParams); 
        $location.path('/logout');
        }
        else
        {
            
            let localtimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            let standardtimezone=new Date().toTimeString().split("(")[1].toString().replace(")", "");
            $scope.Loaduser(localtimezone,standardtimezone); 
            $location.path('/logout');
            //getSaasLocalStorage.updateLocalParams($scope.localParams); 
            // let _queryparams={saasmemberid:0,timezone:standardtimezone,versionnumber:1.0,platform:'WEB'}
            // appDataService.getAppDetails(_queryparams,$scope,localtimezone,0);
        }
       
    }
    $rootScope.$on('loginUser', function(event, params) {
        $scope.SetParams(params);
      });
      $rootScope.$on('LogoutUser', function(event) {
        
           
          $scope.isuserloggedin=$scope.localParams.isuserloggedin=false;
          $scope.username=$scope.localParams.saasuser.username="User";
          $scope.usertype= $scope.localParams.saasuser.usertype="USER";
          $scope.useravtar=$scope.localParams.saasuser.useravtar="assets/img/user/user-avtar2.png";$scope.localParams.saasuser.saasuserid=0;$scope.localParams.saasuser.saasmemberid=0,$scope.localParams.saasuser.clientmemberid=0,$scope.localParams.saasuser.clientpatientid=0;$scope.localParams.saasuser.gender='';$scope.localParams.saasuser.mobile='';$scope.localParams.saasuser.email='';$scope.localParams.saasuser.ssn='';$scope.localParams.saasuser.currentyearid=0;$scope.localParams.saasuser.financialyearid=0;
          getSaasLocalStorage.updateLocalParams($scope.localParams); 
          $location.search({});
          $location.path('/logout');
      });
  



}]);