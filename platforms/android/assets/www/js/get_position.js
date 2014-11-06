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
    function(){
      console.log("se eu aparecer é porque apresentei um erro...");
    },
    { maximumAge: 3000, timeout: 3000, enableHighAccuracy: true }
  )
};

coor();
