
var AppOca = angular.module("AppOca", ['ngRoute']);

AppOca.config(function($routeProvider, $locationProvider)
{
 
   $routeProvider
   // para a rota '/', carregaremos o template home.html e o controller 'HomeCtrl'
   .when('/', {
      templateUrl : 'app/views/mapa.html',
      controller     : 'MapaCtrl',
   })
   .when('/lanchar', {
      templateUrl : 'app/views/lanchar.html',
      controller     : 'LancharCtrl',
   })
   .when('/conveniencia', {
      templateUrl : 'app/views/conveniencia.html',
      controller     : 'ConvenienciaCtrl',
   })
   .when('/distribuidor', {
      templateUrl : 'app/views/distribuidor.html',
      controller     : 'DistribuidorCtrl',
   })
   .otherwise ({ redirectTo: '/' });

   // remove o # da url
   $locationProvider.html5Mode(true);
});

// AppOca.service('sharedProperties', function () {
//   var has_data = false;
//
//   return {
//       getData: function () {
//           return has_data;
//       },
//       setProperty: function(value) {
//           property = value;
//       }
//   };
// });
