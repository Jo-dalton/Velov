function initMap() {
  var lyon = {
    lat: 45.764043,
    lng: 4.835658999999964
  };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: lyon
  });
  var marker = new google.maps.Marker({
    position: lyon,
    map: map
  });
}
  //Imports des données JSON depuis JCDecaux

  var script = document.createElement('script');
  script.src = "https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=c5348d9cb3db966894f387c82026ce02bc098b3d"
  document.getElementsByTagName('head')[0].appendChild(script);



window.eqfeed_callback = function (results) {
  for (var i = 0; i < results.features.length; i++) {
    var coords = results.features[i].geometry.coordinates;
    var latLng = new google.maps.LatLng(coords[1], coords[0]);
    var marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
  }
};