// coor() 
// get position and dispatch event has_position
function coor(){

  var cordenadas = navigator.geolocation.getCurrentPosition(
    function(posicao) {


      var pos = new google.maps.LatLng(posicao.coords.latitude, posicao.coords.longitude);


      my_lat = posicao.coords.latitude;
      my_long = posicao.coords.longitude;

      //hide_loading();
      // var event = new Event('has_position');
      // document.dispatchEvent(event);
      $(document).trigger("has_position");
    },
    function(err){
      //console.warn('ERROR(' + err.code + '): ' + err.message);
      alert('Não podemos receber sua localização. Verifique sua conexão ou se o seu GPS está ativado e tente novamente.')
    },
    { maximumAge: 3000, timeout: 15000, enableHighAccuracy: true }
  )
};

//coor();
