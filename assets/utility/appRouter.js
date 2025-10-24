
app.config(function($routeProvider,$locationProvider) {
    //$urlRouterProvider.otherwise("/Home");
    //$urlMatcherFactoryProvider.caseInsensitive(true);
    $routeProvider
    .when("/", {
      templateUrl : "application/Home/home.html"
    })
    .when("/home",{templateUrl:"application/Home/home.html"})
    .when("/specialty",{templateUrl:"application/Provider/specialtylist.html"})
    .when("/provider-list",{templateUrl:"application/Provider/providerlist.html"})
    .when("/provider/:doctorName",{templateUrl:"application/Provider/providerprofile.html"})
    .when("/book-appointment/:doctorName",{templateUrl:"application/Provider/bookappointment.html"})
    .when("/book-appointment-checkout",{templateUrl:"application/Provider/bookappointment-checkout.html"})
    .when("/registration", {templateUrl : "application/User/registration.html"})
    .when("/login", {templateUrl : "application/User/login.html"})
    .when("/logout", {templateUrl : "application/User/logout.html"})
    .when("/privacy-policy", {templateUrl : "application/OtherScreens/privacypolicy.html"})
    .when("/delete-account", {templateUrl : "application/OtherScreens/deactivateuser.html"})
    .when("/term-condition", {templateUrl : "application/OtherScreens/termandcondition.html"})
    .when("/forgot-password", {templateUrl : "application/User/forgotpassword.html"})
    .when("/patient-registration", {templateUrl : "application/Patient/patientRegistration.html"})
    .when("/patient", {templateUrl : "application/Patient/patientDashboard.html"})
    .when("/doctor-registration", {templateUrl : "application/Doctor/doctorRegistration.html"})
    .when("/doctor", {templateUrl : "application/Doctor/dashboardDashboard.html"})
    .otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
  });
// app.config(function($routeProvider,$locationProvider) {
//     $routeProvider
//     .when("/", {
//       templateUrl : "application/Home/home.html"
//     })
//     .when("/Home",{templateUrl:"application/Home/home.html",controller:"homeController"})
//     .when("/Registration", {templateUrl : "application/User/registration.html",controller:"registrationColtroller"})
//     .when("/Login", {templateUrl : "application/User/login.html",controller:"loginController"})
//     .when("/Search", {templateUrl : "application/Search/search.html",controller:"searchController"})
//     $locationProvider.html5Mode(true);
//   });

  //https://www.youtube.com/watch?v=XsRugDQaGOo
  // Check the Above URL for rewrite Role on .web config