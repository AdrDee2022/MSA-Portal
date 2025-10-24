//var storageService = angular.module('saas-app-storageService', []);  

app.factory('getSaasLocalStorage', function () {                  
        
        return {  
           
            updateLocalParams: function (params) {  
                
                if (window.localStorage && params) {  
                    
                    //Local Storage to add Data  
                    localStorage.removeItem("SAAS-Local-Params");
                    localStorage.setItem("SAAS-Local-Params", angular.toJson(params));  
                }  
                
                 
            },  
            getLocalParams: function () {  
                let paramList = {};  
                //Get data from Local Storage  
                paramList = angular.fromJson(localStorage.getItem("SAAS-Local-Params"));                         
                return paramList ? paramList : [];  
            },  
            loadLoginScreen: function (scope) {  
                let paramList = {};  
                let authResponse;
                //Get data from Local Storage  
                paramList = angular.fromJson(localStorage.getItem("SAAS-Local-Params")); 
                if(paramList.isuserloggedin){
                    if(paramList.saasuser.usertype=='PATIENT'){authResponse={load:false,route:'/patient'}}
                    if(paramList.saasuser.usertype=='DOCTOR'){authResponse={load:false,route:'/doctor'}}
                }
                else{
                    authResponse={load:true,route:''}

                }                        
                scope.screenloader(authResponse);  
            },  
            loadRegistrationScreen: function (scope) {  
                let paramList = {};  
                let authResponse;
                //Get data from Local Storage  
                paramList = angular.fromJson(localStorage.getItem("SAAS-Local-Params")); 
                if(paramList.isuserloggedin){
                    if(paramList.saasuser.usertype=='PATIENT'){authResponse={load:false,route:'/patient'}}
                    if(paramList.saasuser.usertype=='DOCTOR'){authResponse={load:false,route:'/doctor'}}
                }
                else{
                    authResponse={load:true,route:''}

                }                        
                scope.screenloader(authResponse);   
            },  
            loadPatientDashboard: function () {  
                let paramList = {};  
                //Get data from Local Storage  
                paramList = angular.fromJson(localStorage.getItem("SAAS-Local-Params")); 
                if((paramList.isuserloggedin) && (paramList.saasuser.usertype=='PATIENT')){return true}                       
                else {return false;}
            }, 
            loadDoctorDashboard: function () {  
                let paramList = {};  
                //Get data from Local Storage  
                paramList = angular.fromJson(localStorage.getItem("SAAS-Local-Params"));  
                if((paramList.isuserloggedin) && (paramList.saasuser.usertype=='DOCTOR')){return true}                       
                else {return false;}
            },
            _storeappointmentData:function(object)
            {
                localStorage.removeItem("SAAS-Local-Appointment");
                localStorage.setItem("SAAS-Local-Appointment", JSON.stringify(object));
            },

            _validateappointmentRequest:function()
            {
               
                
                if((localStorage.getItem("SAAS-Local-Appointment"))){

                 let paramList = angular.fromJson(localStorage.getItem("SAAS-Local-Params"));  
                if((paramList.saasuser.usertype!='DOCTOR')){ return true;}                       
                     else {PopupAlert('warn','Please login as Patient user to book <b>Appointment</b>'); return false;}
                   }
                else{
                return false;}
            },
            _getappointmentData:function()
            {
                let _data=JSON.parse(localStorage.getItem("SAAS-Local-Appointment"));
                localStorage.removeItem("SAAS-Local-Appointment");
                return  _data;
            },
            _clearappointmentData:function()
            {localStorage.removeItem("SAAS-Local-Appointment");},
            _storeData:function(key,object)
            {
                localStorage.removeItem(key);
                localStorage.setItem(key, JSON.stringify(object));
            },
            _getData:function(key)
            {
                let _data=JSON.parse(localStorage.getItem(key));
                localStorage.removeItem(key);
                return  _data;
            },
            _clearData:function(key)
            {localStorage.removeItem(key);},
            _storeSelection:function(keyname,keyobject)
            {

                ////debugger;
               
                localStorage.removeItem(keyname);
               
                localStorage.setItem(keyname, JSON.stringify(keyobject));

                
            },
            _getSelection:function(keyname)
            {
                //debugger;
                let _data=localStorage.getItem(keyname);
                if(_data!='undefined' && _data!=null)
               {return  JSON.parse(localStorage.getItem(keyname));}
                else
                {return null;}

                
            }
            

        };  
    
    });  


// storageService.factory('getLocalStorage', function () {                  
//     var employeeList = {};  
//     return {  
//         list: employeeList,  
//         updateEmployees: function (EmployeesArr) {  
//             if (window.localStorage && EmployeesArr) {  
//                 //Local Storage to add Data  
//                 localStorage.setItem("employees", angular.toJson(EmployeesArr));  
//             }  
//             employeeList = EmployeesArr;  
             
//         },  
//         getEmployees: function () {  
//             //Get data from Local Storage  
//             employeeList = angular.fromJson(localStorage.getItem("employees"));                         
//             return employeeList ? employeeList : [];  
//         }  
//     };  

// });  