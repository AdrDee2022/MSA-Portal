app.directive('datepicker1', function () {
    return {
        restrict: 'A',
       // require: 'ngModel',
         link: function (scope, element, attrs, ngModelCtrl) {
                $(element).datepicker({
                   
                    changeMonth: true,
                    changeYear: true,
                    dateFormat: "dd/mm/yy",
                    defaultDate: new Date(),
                    maxDate: new Date(),
                    minDate: '-100y',
                    showOtherMonths: false,
                    selectOtherMonths: false,
                    onSelect:function(date){scope.dobChange(date)}
                    // onSelect: function (date) {
                    //     scope.date = date;
                         //scope.$apply();
                    //     scope.dobChange(date);
                    // }
                });
            }    
        };
    });
    app.directive('onlyNumeric', function () {

        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, element, attrs, modelCtrl) {
                modelCtrl.$parsers.push(function (inputValue) {
                    if (inputValue == undefined) return '';
                    var transformedInput = inputValue.replace(/[^0-9]/g, '');
                    if (transformedInput !== inputValue) {
                        modelCtrl.$setViewValue(transformedInput);
                        modelCtrl.$render();
                    }
                    return transformedInput;
                });
            }
        };
    });
//Regex to allow only Alphabets Numbers Dash Underscore and Space
    app.directive('onlyAplhanumeric', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$parsers.push(function (inputValue) {
                    if (inputValue === undefined) return '';
    
                    // Allow only alphanumeric characters
                    var transformedInput = inputValue.replace(/[^a-zA-Z0-9]*$/g, '');
    
                    // Capitalize the first character
                    transformedInput = transformedInput.charAt(0).toUpperCase() + transformedInput.slice(1);
    
                    ngModel.$setViewValue(transformedInput);
                    ngModel.$render();
    
                    return transformedInput;
                });
            }
        };
    });
    app.directive('onlyPhonenumberic', function () {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, element, attrs, modelCtrl) {
                modelCtrl.$parsers.push(function (inputValue) {
                   
                    if (inputValue == undefined) return '';
                    if (inputValue.trim() == "") return '';
                    var transformedInput = inputValue;
                    
                    var transformedInput = inputValue.replace(/[^0-9/+]/g, '');
                    if (transformedInput !== inputValue) {
                        //modelCtrl.$setViewValue(transformedInput);
                        //modelCtrl.$render();
                    }
                    
                    if(transformedInput.indexOf("+") == -1)
                    {transformedInput="+"+transformedInput;
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                    }
                    else
                    { 
                       let _symbolOccurance= (transformedInput.match(/\+/g) || []).length;
                       if(_symbolOccurance>1)
                       {
                        transformedInput="+"+transformedInput.replace(/\+/g, '');
                        modelCtrl.$setViewValue(transformedInput);
                        modelCtrl.$render();   
                       }
                    }
                    
                    return transformedInput;
                });
            }
        };
    });
    app.directive('datepicker', function () {
        return {
            restrict: 'A',
            require: '?ngModel',
             link: function (scope, element, attrs, modelCtrl) {
                    $(element).datetimepicker({
                        
                        format: 'MM/DD/YYYY',
                        icons: {
                            up: "fas fa-chevron-up",
                            down: "fas fa-chevron-down",
                            next: 'fas fa-chevron-right',
                            previous: 'fas fa-chevron-left'
                        },
                        minDate: '1923-01-01',          // Set your minimum date
                        maxDate: new Date()
                    }).on('dp.change', function(e){scope.dobChanged(e.date._d,attrs, modelCtrl); });
                    $(element).keydown(function(e) {
                        e.preventDefault();
                        return false;
                     });

                    
                }    
            };
        });
        app.directive('datepickerone', function () {
            return {
                restrict: 'A',
                require: '?ngModel',
                 link: function (scope, element, attrs, modelCtrl) {
                        $(element).datetimepicker({
                            
                            format: 'MM/DD/YYYY',
                            icons: {
                                up: "fas fa-chevron-up",
                                down: "fas fa-chevron-down",
                                next: 'fas fa-chevron-right',
                                previous: 'fas fa-chevron-left'
                            },
                            minDate: '1923-01-01',          // Set your minimum date
                            maxDate: new Date()
                        }).on('dp.change', function(e){scope.date1Changed(e.date._d,attrs, modelCtrl); });
                        $(element).keydown(function(e) {
                            e.preventDefault();
                            return false;
                         });
    
                        
                    }    
                };
            });
    app.directive('datepickertwo', function () {
            return {
                restrict: 'A',
                require: '?ngModel',
                 link: function (scope, element, attrs, modelCtrl) {
                        $(element).datetimepicker({
                            
                            format: 'MM/DD/YYYY',
                            icons: {
                                up: "fas fa-chevron-up",
                                down: "fas fa-chevron-down",
                                next: 'fas fa-chevron-right',
                                previous: 'fas fa-chevron-left'
                            },
                            minDate: '1923-01-01',          // Set your minimum date
                            maxDate: new Date()
                        }).on('dp.change', function(e){scope.date2Changed(e.date._d,attrs, modelCtrl); });
                        $(element).keydown(function(e) {
                            e.preventDefault();
                            return false;
                         });
    
                        
                    }    
                };
            });
    app.directive('datepickerappointment', function () {
            return {
                restrict: 'A',
                require: '?ngModel',
                 link: function (scope, element, attrs, modelCtrl) {
                    let maxdate = new Date();maxdate.setDate(maxdate.getDate() + 15);
                    let mindate= new Date();mindate.setHours(0, 0, 0, 0);

                    //var mindate = new Date();mindate.setDate(mindate.getDate() - 1);.setHours(0, 0, 0, 0);
                        $(element).datetimepicker({
                            
                            format: 'MM/DD/YYYY',
                            icons: {
                                up: "fas fa-chevron-up",
                                down: "fas fa-chevron-down",
                                next: 'fas fa-chevron-right',
                                previous: 'fas fa-chevron-left'
                            },
                            minDate: mindate,          // Set your minimum date
                            maxDate: maxdate
                        }).on('dp.change', function(e){scope.cal_DateChanged(e.date._d); });
                        
                    }    
                };
            });

            app.directive('datepickerfuture', function () {
                return {
                    restrict: 'A',
                    require: '?ngModel',
                     link: function (scope, element, attrs, modelCtrl) {
                        let maxdate = new Date();maxdate.setDate(maxdate.getFullYear()  + 1);
                        let mindate= new Date();mindate.setHours(0, 0, 0, 0);
    
                        //var mindate = new Date();mindate.setDate(mindate.getDate() - 1);.setHours(0, 0, 0, 0);
                            $(element).datetimepicker({
                                
                                format: 'MM/DD/YYYY',
                                icons: {
                                    up: "fas fa-chevron-up",
                                    down: "fas fa-chevron-down",
                                    next: 'fas fa-chevron-right',
                                    previous: 'fas fa-chevron-left'
                                },
                                minDate: mindate,          // Set your minimum date
                                maxDate: maxdate
                            }).on('dp.change', function(e){scope.futuredate1changed(e.date._d); });
                            
                        }    
                    };
                });

                app.directive('datepickerfuturetwo', function () {
                    return {
                        restrict: 'A',
                        require: '?ngModel',
                         link: function (scope, element, attrs, modelCtrl) {
                            let maxdate = new Date();maxdate.setDate(maxdate.getFullYear()  + 1);
                            let mindate= new Date();mindate.setHours(0, 0, 0, 0);
        
                            //var mindate = new Date();mindate.setDate(mindate.getDate() - 1);.setHours(0, 0, 0, 0);
                                $(element).datetimepicker({
                                    
                                    format: 'MM/DD/YYYY',
                                    icons: {
                                        up: "fas fa-chevron-up",
                                        down: "fas fa-chevron-down",
                                        next: 'fas fa-chevron-right',
                                        previous: 'fas fa-chevron-left'
                                    },
                                    minDate: mindate,          // Set your minimum date
                                    maxDate: maxdate
                                }).on('dp.change', function(e){scope.futuredate2changedtwo(e.date._d); });
                                
                            }    
                        };
                    });

        app.directive("compareTo", function () {
            return {
                require: "ngModel",
                scope:
                {
                    txtconfirmPassword: "=compareTo"
                },
                link: function (scope, element, attributes, modelVal) {
                    modelVal.$validators.compareTo = function (val) {
                        return val == scope.txtconfirmPassword;
                    };
                    scope.$watch("txtconfirmPassword", function () {
                        modelVal.$validate();
                    });
                }
            };
        });
//This directive can be used to used by putting attribut  ng-match="password" on confirm password field where ng-model=password is mentioned on password field.
// To show on form use : 
// <!-- Display error message if passwords do not match -->
// <div ng-show="passwordForm.confirmPassword.$error.ngMatch">
//   Passwords do not match.
// </div>
        app.directive('ngMatch', ['$parse', function ($parse) {
            return {
              restrict: 'A',
              require: '?ngModel',
              link: function (scope, elem, attrs, ctrl) {
                if (!ctrl) return;
      
                if (!attrs.ngMatch) return;
      
                var firstPassword = $parse(attrs.ngMatch);
      
                var validator = function (value) {
                  var temp = firstPassword(scope),
                    v = value === temp;
                  ctrl.$setValidity('ngMatch', v);
                  return value;
                };
      
                ctrl.$parsers.unshift(validator);
                ctrl.$formatters.push(validator);
                attrs.$observe('ngMatch', function () {
                  validator(ctrl.$viewValue);
                });
              }
            };
          }]);
        app.directive('onlyEmail', function () {
            return {
              restrict: 'A',
              require: 'ngModel',
              link: function (scope, element, attrs, ngModelCtrl) {
              
                ngModelCtrl.$validators.emailPattern = function (modelValue, viewValue) {
                  if (ngModelCtrl.$isEmpty(modelValue)) {
                    // consider empty models to be valid
                    return true;
                  }
      
                  // Use a simple regex pattern for email validation
                  var pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                  return pattern.test(viewValue);
                };
              }
            };
        });

/// To Upload File with size less than 5MB and Formats should be .jpeg, .jpg, .png, .pdf or .doc
app.directive('fileModel', ['$parse', function ($parse) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    var model = $parse(attrs.fileModel);
                    var modelSetter = model.assign;

                    element.bind('change', function(){
                        scope.$apply(function(){
                            var file = element[0].files[0];
                            modelSetter(scope, file);
                            scope.fileSizeError = (file.size > 5 * 1024 * 1024); // 5MB in bytes
                            // Check file size
                                var maxSize = 5 * 1024 * 1024; // 5MB in bytes
                                scope.fileSizeError = (file.size > maxSize);

                                // Check file type
                                var acceptedTypes = ['image/jpeg', 'image/jpg', 'application/pdf', 'application/msword','application/vnd.ms-office','application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/png'];
                                scope.fileTypeError = (acceptedTypes.indexOf(file.type) === -1);
                        });
                    });
                }
            };
        }]);




        