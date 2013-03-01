$(document).ready(function() {

    $("#new_player").submit( function(ev) {

        ev.preventDefault();

        geocoder = new google.maps.Geocoder();
        var street = $("#player_street").val()
        var postalcode = $("#player_postalcode").val()
        var city = $("#player_city").val()
        var address = street + ", " + postalcode + ", " + city
        var lat
        var lng
        
        geocoder.geocode( { 'address': address}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            lat = results[0].geometry.location.hb
            lng = results[0].geometry.location.ib
            $("#player_lat:hidden").val(lat)
            $("#player_lng:hidden").val(lng)

            $("#new_player").unbind('submit').submit()

          } else {
            alert("Dein Player konnte nicht eingetragen werden, bitte probiere es noch einmal.")
            return false
          }
        })
    })
    
})