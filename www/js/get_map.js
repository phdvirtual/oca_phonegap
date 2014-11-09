function mapa(locations) {
    var image2 = "img/eu.png";
    var image = "img/icone.png";
    var image_distribuidor = "img/distribuidor.png";
    var image_lanchar = "img/tigela.png";
    var image_conveniencia = "img/conveniencias.png";
    var marker, i;

    var options = {
      zoom: 14,
      center: new google.maps.LatLng(my_lat, my_long),
      scrollwheel: true,
      scaleControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById('map-canvas'), options);

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
      } else if (locations[i]['category_id'] == '2') {
        current_image = image_lanchar
      } else {
        current_image = image_conveniencia
      };

      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i]['lat'], locations[i]['long']),
        icon: current_image,
        map: map,
        zIndex: Math.round(locations[i][0] * -100000) << 5
      });

      locations[i]['distance'] = get_distance( locations[i]['lat'], locations[i]['long'], my_lat, my_long );

      google.maps.event.addListener(marker, "click", ( function( marker, i ) {
        return function(){
          infowindow.setContent("<div class='box-map'><div class='name'>" + locations[i]['title'] + "</div><div class='site'><span class='distancia'>" + locations[i]['distance'] + "</span>" + "</div>" + "</div>");
          infowindow.open(map, marker);
        }
      })(marker, i));
    }

    $(document).trigger("has_mapa");

}
