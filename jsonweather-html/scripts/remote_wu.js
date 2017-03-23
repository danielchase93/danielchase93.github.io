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
        url : "https://api.wunderground.com/api/c12cbe7add4cc97b/geolookup/conditions/q/"+lat+","+long+".json",
        dataType:"jsonp",
        success: function(data){
            console.log(data);


            $("#cityDisplay").html(data.location.city + ", " +  data.location.state);

            $("#currentTemp").html(Math.round(data.current_observation.temp_f) + "&deg" + "F");

            $("#summary").html(data.current_observation.weather);

            $("#add1").html("Wind: " + data.current_observation.wind_mph + "mph");

            $("#add2").html("Humidity: " + data.current_observation.relative_humidity);

            $("#add3").html("Feels Like: " + Math.round(data.current_observation.feelslike_f) + "&deg" + "F");






      $("#cover").fadeOut(250);
    }
           });

  }

  // A function for changing a string to TitleCase
  function toTitleCase(str){
    return str.replace(/\w+/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }
});
