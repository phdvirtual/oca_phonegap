/*** Sequencia 
 *  mostra loading
 *  recebe os dados brutos
 *  recebe a posição atual
 *  formata o objeto lojas
 *  escreve o resultado
 *  calcula a distancia entre você e os lugares
 *  remove o loading 
 *  e mostra os dados na tela
 * **/
showLoading();

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

function formata_lojas(dados, my_lat, my_long){

  var lojas = [];
  $(dados).each(function(i){
    lojas[i] = {};
    lojas[i].title = dados[i].title;
    lojas[i].distancia = parseFloat(get_distance_numb( dados[i]['lat'], dados[i]['long'], my_lat, my_long ));
    lojas[i].address = dados[i].address;
    lojas[i].estado = dados[i].estado;
  });

  sortLojas(lojas); // Ordena as lojas pela distância
  // falta ordenar o array de lojas por distância
  return lojas;
};

function sortLojas(lojas) {
  var lojas = lojas;
  lojas.sort(function( a,b ) {
    if (a.distancia > b.distancia) {
      return 1;
    } else if (a.distancia < b.distancia) {
      return -1;
    } else {
      return 0;
    };
  });
};

function escreve_resultado( lojas, dados, my_lat, my_long ) {

  var lojas = lojas;
  var listaLojas = [];

   $(lojas).each(
     function(i){
       listaLojas[i] = {};
       listaLojas[i].distancia = get_distance( lojas[i]['lat'], lojas[i]['long'], my_lat, my_long );
       listaLojas[i] = "<div class='lista-cada row'>";
       lista//lojas[i] += "  <div class='small-3 columns item-image'><img src='img/logomarca.png' class='banner-item'></div>";
       listaLojas[i] += "  <div class='small-12 columns'>";
       listaLojas[i] += "    <p><strong class='title'>" + lojas[i].title + "</strong>";
       listaLojas[i] += "    <address>";
       listaLojas[i] += "      <p><strong>Distância: </strong>" + lojas[i].distancia + " km</p>";
       listaLojas[i] += "      <p><strong>Endereço: </strong>" + lojas[i].address + " </p>";
       listaLojas[i] += "      <p><strong>Estado: </strong> " + lojas[i].estado + " </p>";
       listaLojas[i] += "    </address>";
       listaLojas[i] += "  </div>";
       listaLojas[i] += "</div>";
     }
  
   );

  $("#lojas-loop").html(listaLojas);
  hideLoading();
};


function showLoading(){
  $('.loading').removeClass('hide');
};
function hideLoading(){
  $('.loading').addClass('hide');
}


$(function(){
  recebe_dados();
});
