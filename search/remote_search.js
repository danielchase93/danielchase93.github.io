$('#query').keyup(function() {
    var value = $('#query').val();
    var rExp = new RegExp(value, "i");

    $.getJSON("//autocomplete.wunderground.com/aq?query=" + value + "&cb=?", function(data) {
        console.log(data);

        var output = '<ol>';
        $.each(data.RESULTS, function(key, val) {
            if (val.name.search(rExp) != -1) {
                output += '<li>';
                output += '<a href="#"' + 'onclick="getData('+ val.lat + ',' + val.lon +')"' + 'title="See results for' + val.name +'">' + val.name + '</a>';
                output += '</li>';
            }
        });

        output += '</ol>';
        $("#searchResults").html(output);
    });
});





function getData(lat, lon){
    $.ajax({
        url : "https://api.wunderground.com/api/c12cbe7add4cc97b/geolookup/conditions/forecast/q/"+lat+","+lon+".json",
        dataType:"jsonp",
        success: function(data){
            console.log(data);


            $("#cityDisplay").html(data.location.city + ", " +  data.location.state);

            $(".currentTemp").html(Math.round(data.current_observation.temp_f) + "&deg" + "F");

            $("#summary").html(data.current_observation.weather);

            $("#high").html("High: " +  data.forecast.simpleforecast.forecastday["0"].high.fahrenheit + "&deg" + "F");

            $("#low").html("Low: " +  data.forecast.simpleforecast.forecastday["0"].low.fahrenheit + "&deg" + "F");

            $("#feels").html("Feels Like: " + Math.round(data.current_observation.feelslike_f) + "&deg" + "F");

            $("#long").html("Longitude: " + lon);
            $("#lat").html("Latitude: " + lat);






            $("#cover").fadeOut(250);
        }
    });

}





