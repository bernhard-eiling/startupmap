var map;

$(document).ready(function() {

    $('.dropdown-toggle').dropdown()

    // prevents dropdown checkbox clicks to close dropdown menu
    $('.dropdown-menu input, .dropdown-menu label, #map_canvas').click(function(e) {
        e.stopPropagation()
    })

    var mapOptions = {
        zoom: 7,
        center: new google.maps.LatLng(47.1959, 13.1959),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL
        }
    }

    map = new google.maps.Map($('#map_canvas')[0], mapOptions)

    initPolygons(map)
    initMarker(map)

})