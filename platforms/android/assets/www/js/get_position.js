// coor() 
// get position and dispatch event has_position
var coor = function(){

  var cordenadas = navigator.geolocation.getCurrentPosition(
    function(posicao) {

      var pos = new google.maps.LatLng(posicao.coords.latitude, posicao.coords.longitude);

      my_lat = posicao.coords.latitude;
      my_long = posicao.coords.longitude;

      //hide_loading();
      var event = new Event('has_position');
      document.dispatchEvent(event);
    },
    function(){
      console.log("Error.");
    }
  )
};
