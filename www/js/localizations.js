var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        //this.onDeviceReady();// remove esta linha antes de publicar e desconmentar a de cima
    },
    onDeviceReady: function() {



      $.getJSON('http://oca-admin.herokuapp.com/clients/index.json', function(data){

        locations = data;


      })
      .done(function(){

        console.log('Parabéns. A requisição foi feita com sucesso.')

        var image2 = "img/eu.png";
        var image = "img/icone.png";
        var image_distribuidor = "img/distribuidor.png";
        var image_revendedor = "img/revendedor.png";
        var marker, i;

        navigator.geolocation.getCurrentPosition(
          function(posicao) {
              var pos = new google.maps.LatLng(posicao.coords.latitude, posicao.coords.longitude);
              my_lat = posicao.coords.latitude;
              my_long = posicao.coords.longitude;
              console.log(my_lat);
              console.log(my_long);

              $('.loading').addClass('hide');
              var map = new google.maps.Map(document.getElementById('map-canvas'), {
                zoom: 14,
                center: new google.maps.LatLng(my_lat, my_long),
                scrollwheel: true,
                scaleControl: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP
              });

              marker2 = new google.maps.Marker({
                position: new google.maps.LatLng(my_lat,my_long),
                icon: image2,
                map: map,
                zIndex: Math.round(my_lat * -100000) << 5
              });

              google.maps.event.addListener(marker2, "click", (function( marker2, i ) {
                return function(){
                  infowindow.setContent("<div class='box-map-voce'>" + "Este é você" + "</div>");
                  infowindow.open(map, marker2);
                }
              })(marker2, i));

              var infowindow = new google.maps.InfoWindow({
                  size: new google.maps.Size(150, 50)
              });

              google.maps.event.addListener(map, 'click', function() {
                infowindow.close();
              });


              for (i = 0; i < locations.length; i++) {

                if (locations[i]['category_id'] == '1') {
                  current_image = image_distribuidor
                } else {
                  current_image = image_revendedor
                };
                console.log(current_image);

                marker = new google.maps.Marker({
                  position: new google.maps.LatLng(locations[i]['lat'], locations[i]['long']),
                  icon: current_image,
                  map: map,
                  zIndex: Math.round(locations[i][0] * -100000) << 5
                });

                //marker.setAnimation(google.maps.Animation.BOUNCE);

                google.maps.event.addListener(marker, "click", (function( marker, i ) {
                  return function(){
                    infowindow.setContent("<div class='box-map'><div class='name'>" + locations[i]['title'] + "</div><div class='site'>" + locations[i]['phone1'] + "<br />" + locations[i]['address'] + "</div>" + "</div>");
                    infowindow.open(map, marker);
                  }
                })(marker, i));

              }

          },// getCurrentPosition
          function error(err) {
            console.warn('ERROR(' + err.code + '): ' + err.message);
          },
          {maximumAge: 0, timeout: 10000, enableHighAccuracy:true}

        );
      })
      .fail(function(){
        console.log('Desculpe. Algo saiu errado. Verifique sua conexão com a internet.')
      })


    }
};
