function recebe_dados(){
  $.ajax({
    url: "http://oca-admin.herokuapp.com/clients/index.json",
    success: function(dados){
      //escreve_resultado(dados);
      posicao_atual(dados);
    },
    error: function(){
      console.log("erro");
    }
  })
};

function escreve_resultado( lojas, dados, my_lat, my_long ) {

   $(lojas).each(
     function(i){
       dados[i].distancia = get_distance( dados[i]['lat'], dados[i]['long'], my_lat, my_long );
       lojas[i] = "<div class='lista-cada row'>";
       lojas[i] += "  <div class='small-3 columns item-image'><img src='img/logomarca.png' class='banner-item'></div>";
       lojas[i] += "  <div class='small-9 columns'>";
       lojas[i] += "    <p><strong class='title'>" + dados[i].title + "</strong><br>";
       lojas[i] += "    <address>";
       lojas[i] += "      <strong>Distância: </strong>" + dados[i].distancia + "<br/> ";
       lojas[i] += "      <strong>Endereço: </strong>" + dados[i].address + "<br/> ";
       lojas[i] += "      <strong>Estado: </strong> " + dados[i].estado + " <br>";
       lojas[i] += "    </address>";
       lojas[i] += "  </div>";
       lojas[i] += "</div>";
     }
  
   );

  $("#lojas-loop").html(lojas);
};

function formata_lojas(dados, my_lat, my_long){

  var lojas = [];
  $(dados).each(function(i){
    lojas[i] = {};
    lojas[i].title = dados[i].title;
    lojas[i].distancia = parseFloat(get_distance_numb( dados[i]['lat'], dados[i]['long'], my_lat, my_long ));
    lojas[i].address = dados[i].address;
    lojas[i].estado = dados[i].estad;
  });

  lojas.sort(function( a,b ) {
    return a.distancia > b.distancia
  });
  // falta ordenar o array de lojas por distância
  return lojas;
};

function posicao_atual(dados){
  // falta inserir um loading durante a requisição
  navigator.geolocation.getCurrentPosition(
    function(posicao) {
      var my_lat = posicao.coords.latitude;
      var my_long = posicao.coords.longitude;
      var lojas = formata_lojas(dados, my_lat, my_long);
      escreve_resultado(lojas, dados, my_lat, my_long);
    },
    function(){
      console.log("Desculpe... ocorreu um erro ao verificar sua posição.")
    }
  )
};

$(function(){
  recebe_dados();
});
