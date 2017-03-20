// Current Location Scripts
$(function () {

  var status = $('#status');

  (function getGeoLocation() {
    status.text('Getting Location...');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;

        // Call the getData function, send the lat and long
        getData(lat, long);

      });
    } else {
      status.text("Your browser doesn't support Geolocation or it is not enabled!");
    }

  })();

  // Get the data from the wunderground API
  function getData(lat, long){
    $.ajax({
        url : "http://api.wunderground.com/api/44fc0cb7ca03b5d3/geolookup/q/"+lat+","+long+".json",
        dataType:"jsonp",
        success: function(data){

            $("#cityDisplay").html(data.location.city + ", " +  data.location.state);

            var currentTemp = $("#currentTemp");
            currentTemp.html(Math.round(data.current_observation.temp_f) + "\xB0");






            console.log(data);



      $("#cover").fadeOut(250);
    }
           });

  }

  // A function for changing a string to TitleCase
  function toTitleCase(str){
    return str.replace(/\w+/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }
});
