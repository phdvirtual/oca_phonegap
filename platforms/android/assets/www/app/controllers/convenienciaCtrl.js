AppOca.controller('ConvenienciaCtrl', function($scope, $http, $location) {
    $scope.activetab = $location.path();
    $scope.loading = true;

    $scope.lojas = [];

    $http({
      method: "GET",
      url: "http://oca-admin.herokuapp.com/categories/3.json"
    })
    .success(function( data, status, headers, config ){
      $scope.lojas = data;

      document.addEventListener("has_position", function(){
        has_data = true;
        format_data($scope);
      });

      coor();
      $scope.loading = false;

    });

});

// <h2 class="main-title">Próximos de mim</h2>

function format_data($scope){
    $scope.$apply(function(){
      $scope.lojas.map(function(loja){
        loja.distance = get_distance(loja.lat, loja.long, my_lat, my_long);
      });
      sortLojas($scope.lojas);
    });
};
