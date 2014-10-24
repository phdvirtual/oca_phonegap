function get_distance(fromLat, fromLong, toLat, toLong) {
  var latLngA = new google.maps.LatLng(fromLat, fromLong);
  var latLngB = new google.maps.LatLng(toLat, toLong);
  var distance = google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB) / 1000;
  return (distance.toFixed(2) + " km");
};
function get_distance_numb(fromLat, fromLong, toLat, toLong) {
  var latLngA = new google.maps.LatLng(fromLat, fromLong);
  var latLngB = new google.maps.LatLng(toLat, toLong);
  var distance = google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB) / 1000;
  return (distance.toFixed(2));
};
