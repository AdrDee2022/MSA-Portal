app.controller('patientdashboardlapreportController', ['$rootScope','$scope', "$location", 'appDataService', function ($rootScope,$scope, $location, appDataService) {

    $scope.date1Changed = function (date, attrs, modelCtrl) {
        $scope.fromDate = date;

    }
    $scope.date2Changed = function (date, attrs, modelCtrl) {
        $scope.toDate = date;
    }
    $scope.controllerInit = function ()
    {
        $scope.fromDate = new Date();
        $scope.toDate = new Date();
        $scope.mdlFromDate = formatDate_MMddYYYY(new Date());
        $scope.mdlToDate = formatDate_MMddYYYY(new Date());
        $scope.getlabrecords();
    }
    $scope.getlabrecords = function ()
    {
        $scope.isLabReportsloading = true;
        $scope.saasuserid = $scope.$parent.saasuserid;
        $scope.saasmemberid = $scope.$parent.saasmemberid;

        let _request = { saasuserid: $scope.saasuserid, zoneid: $scope.zoneid, fromdate: formatDate_MMddYYYY($scope.fromDate), todate: formatDate_MMddYYYY($scope.toDate) };
        appDataService.getPortalUserLabRecords($scope, _request, 'bindlabrecords');
    }
    $scope.bindlabrecords = function (response)
    {
        //debugger;
        if (response.Status)
        { $scope.LabReportList = response.Data.Tests; } else { $scope.LabReportList = []; }

        $scope.isLabReportsloading = false;
    }
    $scope.controllerInit();
}]);