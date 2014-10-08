AppOca.controller('MapaCtrl', function($scope, $http, $location) {

  $scope.activetab = $location.path();
  $scope.loading = true;

  $http({
    method: "GET",
    url: "http://oca-admin.herokuapp.com/clients/index.json"
  })
  .success(function( data, status, headers, config ){

    //
    // coor() recebe as coordenadas e dispara um evento has_position quando conclui.
    // mapa() monta o mapa passando os dados vindos do $http acima.
    //

    coor();

    document.addEventListener("has_position", function(){
      mapa(data);
      has_data = true;
    });

    document.addEventListener("has_mapa", function(){
      $scope.$apply(function ($scope) {
        $scope.loading = false;
      });
    })

  })
  .error(function(){
    console.log("Desculpe. Aconteceu algum erro na requisição.")
  })
});

// <h2 class="main-title">Próximos de mim</h2>
