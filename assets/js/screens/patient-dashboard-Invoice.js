app.controller('patientdashboardinvoiceController', ['$rootScope','$scope', "$location", 'appDataService', function ($rootScope,$scope, $location, appDataService) {

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
        $scope.getinvoicerecords();
    }
    $scope.getinvoicerecords = function ()
    {
        $scope.isInvoiceloading = true;
        $scope.saasuserid = $scope.$parent.saasuserid;
        $scope.saasmemberid = $scope.$parent.saasmemberid;

        let _request = { saasuserid: $scope.saasuserid, zoneid: $scope.zoneid, fromdate: formatDate_MMddYYYY($scope.fromDate), todate: formatDate_MMddYYYY($scope.toDate) };
        appDataService.getPortalUserInvoiceRecords($scope, _request, 'bindinvoicerecords');
    }
    $scope.bindinvoicerecords = function (response)
    {
        ////debugger;
        if (response.Status)
        { $scope.InvoiceList = response.Data; } else { $scope.InvoiceList = []; }

        $scope.isInvoiceloading = false;
    }
    $scope.controllerInit();
}]);