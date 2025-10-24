
app.factory('dataFactoryservice', function($http, $q, $timeout){
  let dataFactoryservice = new Object();

  dataFactoryservice.getService1 = function(Param1,Param2) {
    let listData = $q.defer();
    return listData.promise
  },
  dataFactoryservice.getService2 = function(Param1,Param2) {
    let listData = $q.defer();
    return listData.promise
  }

  return dataFactoryservice;
});
