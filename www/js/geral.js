var map;
var infowindow;
var lat;
var lon;

document.getElementById('map-canvas').innerHTML = 'carregando...';

function initialize() {
  navigator.geolocation.getCurrentPosition(function(position) {

    lat = position.coords.latitude;
    lon = position.coords.longitude;

    var pyrmont = new google.maps.LatLng(lat, lon);
    console.log(lat + " " + lon);

    map = new google.maps.Map(document.getElementById('map-canvas'), {
      center: pyrmont,
      zoom: 15
    });

    var request = {
      location: pyrmont,
      radius: 40000,
      keyword: ['escola']
    };

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
  });
};

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
};

var image = "./res/icon/android/icon-36-ldpi.png";
var markerImage = new google.maps.MarkerImage(
 image,
 new google.maps.Size(49, 46)
);

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: markerImage
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

google.maps.event.addDomListener(window, 'load', initialize);


// Get Data from server
$.getJSON('http://localhost/phdvirtual/vemprobairro-admin',
  function(data) {
    dados = data;
    console.log(dados)
    //$('#lojas-int ul')
  }
)
