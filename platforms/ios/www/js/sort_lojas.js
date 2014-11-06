function sortLojas(lojas) {
  var lojas = lojas;
  lojas.sort(function( a,b ) {

    distance_a = parseFloat(a.distance.split(" ")[0])
    distance_b = parseFloat(b.distance.split(" ")[0])

    if (distance_a > distance_b) {
      return 1;
    } else if (distance_a < distance_b) {
      return -1;
    } else {
      return 0;
    };
  });
};
