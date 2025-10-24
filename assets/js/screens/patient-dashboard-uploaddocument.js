app.controller('patientdashboarduploaddocumentController', ['$scope','$http','$timeout','$sce', 'appDataService', function ($scope,$http,$timeout,$sce,appDataService) {


    $scope.loadUploadDocumentScreenData=function()
    {
        $scope.isUploadDocumentScreenLoading=true;
        $scope.isUploadDocumentUploading=false;
        $scope._filedocument = null;
        $scope.fileSizeError = false;
        $scope.fileTypeError=false;
        $scope.mdlddldocumentTypeFilter='';
        $scope.saasmemberid=$scope.$parent.saasmemberid;
        $scope.zoneid=$scope.$parent.zoneid;
        let _request={saasmemberid:$scope.saasmemberid,zoneid:$scope.zoneid};
        appDataService.getPatientMedicalHistoryUploadedDocumentWithMaster($scope,_request,'bindUploadDocumentScreenData'); 
    }
    $scope.bindUploadDocumentScreenData=function(response)
    {

       

        if(response.Status){
            
             response.Data.DocumentType.splice(0, 1);
            $scope.documentTypes=response.Data.DocumentType;
            $scope.patientDocuments=response.Data.PatientDocuments;
            $scope.isUploadDocumentScreenLoading=false;


        }
        else
        {
            PopupAlert('erro','Unable to upload document screen!!');


        }

        


    }

    $scope.submitUploadDocument=function()
    {

        
        $scope.isUploadDocumentUploading=true;
        let _fileUploadRequest={_documentFile:$scope._mfiledocument,documenttype:$scope.mdlddldocumentType,description:$scope.txtDescription,saasmemberid:$scope.saasmemberid,currentdatetime:formateDateTimeInMMDDYYYYHHmmss(new Date()),zoneid:$scope.zoneid};
        appDataService.uploadPatientMedicalHistoryUploadedPatientDocument($scope,_fileUploadRequest,'uploadFileResponse');
        

    }
    $scope.uploadFileResponse=function(response)
    {
        
        if(response.Status){
            $('#btnClosePopUP').click();
            $scope.patientDocuments=response.Data;
            $scope._mfiledocument = null;$('#_fdocument').val('');
            $scope.fileSizeError = false;
            $scope.fileTypeError=false;
            $scope.mdlddldocumentType='';
            $scope.txtDescription='';
            PopupAlert('succ',$scope.mdlddldocumentType+' File Uploaded Successfully !!');

        }
        else
        {
            PopupAlert('erro','Unable to upload file!!');

        }
        $scope.isUploadDocumentUploading=false;

    }
    $scope.viewDocument=function(type,url)
    {
       
        ////debugger;
        $scope.isPreviewLoading=true;
        let _frameUrl=url;

        $scope.currentDocumentData="";

        type=type.toUpperCase();
        let _dhtml='';
        if((type=='.JPG') ||(type=='.JPEG') || (type=='.PNG') )
            {
                _dhtml+='<img  src="'+_frameUrl+'" alt="Document Image">';

            }
            if((type=='.PDF'))
            {
                _dhtml+='<iframe src="'+_frameUrl+'" width="100%"   style="height: 580px;" marginheight="0" frameborder="0" title="Document Preview"></iframe>';

            }
            if((type=='.DOC') ||(type=='.DOCX'))
            {
                _dhtml+='<iframe src="https://view.officeapps.live.com/op/embed.aspx?src='+_frameUrl+'" width="100%"   style="height: 560px;" marginheight="0" frameborder="0" title="Document Preview"></iframe>';

            }
            if((type=='.XLS') ||(type=='.XLSX'))
            {
                _dhtml+='<iframe src="https://view.officeapps.live.com/op/embed.aspx?src='+_frameUrl+'" width="100%"   style="height: 560px;" marginheight="0" frameborder="0" title="Document Preview"></iframe>';

            }
       


        // Create a 1-second delay using setTimeout
        $timeout(function () {$scope.isPreviewLoading=false;}, 1000);  
        //$scope.currentDocumentUrl = $sce.trustAsResourceUrl(_frameUrl);
        $scope.currentDocumentData  =  $sce.trustAsHtml(_dhtml);
        $('#btnViewDocument')[0].click();

    }
    $scope.downloadDocument=function(_docType,_docName,_filePath)
    {
        
        //alert('_docType: '+_docType+' & _docName: '+_docName+' & _filePath: '+_filePath);
        var config = {
            headers: {
                'Content-Type': 'application/octet-stream' // Override the Content-Type header
            }};
        $http.get($sce.trustAsResourceUrl(_filePath),config, { responseType: 'arraybuffer' }).then(function(response) {
            let blob = new Blob([response.data], { type: response.headers('Content-Type') });
            let url = window.URL.createObjectURL(blob);

            // Create a temporary anchor element
            let anchor = document.createElement('a');
            anchor.style.display = 'none';
            anchor.href = url;
            anchor.download = _docType+"_"+_docName;
            //anchor.download = _filePath.split('/').pop(); // Set filename

            // Trigger click event to download
            document.body.appendChild(anchor);
            anchor.click();

            // Cleanup
            window.URL.revokeObjectURL(url);
            document.body.removeChild(anchor);
        });
        
    }
    $scope.loadUploadDocumentScreenData();
}]);