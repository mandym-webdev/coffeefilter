function initialize(search, lat, lon) {
  
  var input = /** @type {HTMLInputElement} */(
      document.getElementById('pac-input'));
  
  var autocomplete = new google.maps.places.Autocomplete(input);
  
  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      return;
    }
    var lat = place.geometry.location.k;
    var lon = place.geometry.location.B;
    console.log(place)
    codeSearch(lat,lon);
  });

}

function codeSearch(lat, lon){
  console.log("search")
  console.log(lat, lon);

  var api = 'https://api.foursquare.com/v2/venues/explore?ll='+lat+','+lon+'&section=coffee&client_id=5NOGRN3BSR33DC0CKXTUUQ32OKJRYIQNIBNY5VMWOOJZZEEE&client_secret=TA3ETGDXOMORKDUIRAXVPV1NEV4Q4DXTSDZMFLPA0CLT5WGE&v=20141019';
  console.log(api);

  $.ajax({
    url: api,
    dataType: "json",
      success: function(data) {
        venueList = data['response']['groups'][0]['items'];
        console.log(venueList);
        

        for (var i = 0; i < 10; i++) {
          showName = venueList[i]['venue']['name'];
          showAddress = venueList[i]['venue']['location']['address'];
          showWeb = venueList[i]['venue']['url'];
          showRating = venueList[i]['venue']['rating'];
          console.log(showRating);
          $("#names").append('<span><a href="'+showWeb+'">'+showName+'</a></span><br><span>'+showAddress+'</span><br><span>Rating: '+showRating+'/10</span><br><br>')
          }
        $("#names").prepend('<h2>Get your fix here:</h2>')
        $("#names").append('<a href="https://foursquare.com">Powered by Foursquare</a><br><img src="https://maps.gstatic.com/mapfiles/api-3/images/powered-by-google-on-non-white2.png">')
      }
    
  });
}