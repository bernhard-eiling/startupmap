var map;

$(document).ready(function() {

    $('.dropdown-toggle').dropdown()

    // prevents dropdown checkbox clicks to close dropdown menu
    $('.dropdown-menu input, .dropdown-menu label, #map_canvas').click(function(e) {
        e.stopPropagation()
    })

    // fancybox
    $(".fancybox").fancybox()

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

    map = new google.maps.Map(document.getElementById('map_canvas'),  mapOptions)

    polyAustria = new google.maps.Polygon({
        paths: [everythingElse, cooAustria],
        strokeColor: "#000000",
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: "#000000",
        fillOpacity: 0.35
    })
    polyBurgenland = new google.maps.Polygon({
        paths: [everythingElse, cooBurgenland],
        strokeColor: "#000000",
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: "#000000",
        fillOpacity: 0.35
    })
    polyKaernten = new google.maps.Polygon({
        paths: [everythingElse, cooKaernten],
        strokeColor: "#000000",
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: "#000000",
        fillOpacity: 0.35
    })
    polyNiederoesterreich = new google.maps.Polygon({
        paths: [everythingElse, cooNiederoesterreich],
        strokeColor: "#000000",
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: "#000000",
        fillOpacity: 0.35
    })
    polyOberoesterreich = new google.maps.Polygon({
        paths: [everythingElse, cooOberoesterreich],
        strokeColor: "#000000",
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: "#000000",
        fillOpacity: 0.35
    })
    polySalzburg = new google.maps.Polygon({
        paths: [everythingElse, cooSalzburg],
        strokeColor: "#000000",
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: "#000000",
        fillOpacity: 0.35       
    })
    polySteiermark = new google.maps.Polygon({
        paths: [everythingElse, cooSteiermark],
        strokeColor: "#000000",
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: "#000000",
        fillOpacity: 0.35
    })
    polyTirol = new google.maps.Polygon({
        paths: [everythingElse, cooTirol],
        strokeColor: "#000000",
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: "#000000",
        fillOpacity: 0.35
    })
    polyVorarlberg = new google.maps.Polygon({
        paths: [everythingElse, cooVorarlberg],
        strokeColor: "#000000",
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: "#000000",
        fillOpacity: 0.35
    })
    polyWien = new google.maps.Polygon({
        paths: [everythingElse, cooWien],
        strokeColor: "#000000",
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: "#000000",
        fillOpacity: 0.35
    })
    polyWienNeg = new google.maps.Polygon({
        paths: cooWien,
        strokeColor: "#000000",
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: "#000000",
        fillOpacity: 0.35
    })
    var centerAustria = new google.maps.LatLng(48.070738,13.458252)
    var centerSteiermark = new google.maps.LatLng(47.289476,14.867249)
    var centerKaernten = new google.maps.LatLng(46.8662,13.900452)
    var centerSalzburg = new google.maps.LatLng(47.589679,13.053131)
    var centerTirol = new google.maps.LatLng(47.206882,11.576843)
    var centerBurgenland = new google.maps.LatLng(47.615792,16.504211)
    var centerNiederoesterreich = new google.maps.LatLng(48.19612,15.913696)
    var centerOberoesterreich = new google.maps.LatLng(48.177808,13.947144)
    var centerVorarlberg = new google.maps.LatLng(47.214345,9.920654)
    var centerWien = new google.maps.LatLng(48.205548,16.377869)

    map.setCenter(centerAustria)
    polyAustria.setMap(map)

/*
    $.getScript("<%= asset_path('markers.js') %>", function(data, textStatus, jqxhr) {
        console.log(data); //data returned
        console.log(textStatus); //success
        console.log(jqxhr.status); //200
        console.log('Load was performed.');
    });
    */

    //////////////////////
    // MARKERCLUSTERER
    //////////////////////

    // styles of different zoom levels
    var styles = [[{
        url: 'assets/markerhell.png',
        height: 48,
        width: 41,
        anchor: [20, 0],
        textColor: '#000000',
        textSize: 15,
        fontWeight: "normal"
      }, {
        url: 'assets/marker.png',
        height: 60,
        width: 51,
        anchor: [25, 0],
        textColor: '#000000',
        textSize: 15,
        fontWeight: "normal"
      }, {
        url: 'assets/marker.png',
        height: 60,
        width: 51,
        anchor: [25, 0],
        textColor: '#000000',
        textSize: 15,
        fontWeight: "normal"
    }]]

    // marker of lowest lalyer
    var markerImage = new google.maps.MarkerImage(
        "assets/markermaxhell.png",
        new google.maps.Size(31, 36)
    )
    
    var markers = []

    $(".marker").each(function() {
        //var infowindowSingle = new google.maps.InfoWindow()
        var latLng = new google.maps.LatLng($(this).data("lat"), $(this).data("lng"))
        var marker = new google.maps.Marker({
            position: latLng,
            icon: markerImage,
            title: $(this).data("name")
        })

        var boxText = document.createElement("div");

        boxText.style.cssText = "border: 1px solid black; margin-top: 8px; background: yellow; padding: 5px;";
        boxText.innerHTML = $(this).data("name")
                
        var myOptions = {
                 content: boxText
                ,disableAutoPan: false
                ,maxWidth: 0
                ,pixelOffset: new google.maps.Size(-140, 0)
                ,zIndex: null
                ,boxStyle: { 
                  background: "url('tipbox.gif') no-repeat"
                  ,opacity: 0.75
                  ,width: "280px"
                 }
                ,closeBoxMargin: "10px 2px 2px 2px"
                ,closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif"
                ,infoBoxClearance: new google.maps.Size(1, 1)
                ,isHidden: false
                ,pane: "floatPane"
                ,enableEventPropagation: false
        };
        var ib = new InfoBox(myOptions);

        makeInfoBoxEvent(map, ib, marker)

        markers.push(marker)

    })

    function makeInfoBoxEvent(map, ib, marker) {
        google.maps.event.addListener(marker, 'click', function() {
            ib.open(map, marker)
        })
    }
    
    var markerCluster = new MarkerClusterer(map, markers, {
        //maxZoom: 15,
        gridSize: 80,
        styles: styles[0],
        zoomOnClick: false
    })

    var infowindowMulti = new google.maps.InfoWindow()
    
    google.maps.event.addListener(markerCluster, 'clusterclick', function(mCluster) {
        makeInfoWindowEvent(map, infowindowMulti, "testinfo", mCluster.getMarkers(1))
        console.log(mCluster.getMarkers())
        
        infowindowMulti.setContent("your info")
        myLatlng = new google.maps.LatLng(mCluster.getCenter().ya, mCluster.getCenter().za)
        infowindowMulti.setPosition(myLatlng)
        infowindowMulti.open(map)
        
    })
    

///////////////////////    



    
    // ROUTINE

    $("#alle").click(function() {
        map.panTo(centerAustria)
        polyAustria.setMap(map)
        polyBurgenland.setMap(null)
        polyKaernten.setMap(null)
        polyNiederoesterreich.setMap(null)
        polyOberoesterreich.setMap(null)
        polySalzburg.setMap(null)
        polySteiermark.setMap(null)
        polyTirol.setMap(null)
        polyVorarlberg.setMap(null)
        polyWien.setMap(null)
        polyWienNeg.setMap(null)
        map.setZoom(7)
    })
    $("#burgenland").click(function() {
        map.panTo(centerBurgenland)
        polyAustria.setMap(null)
        polyBurgenland.setMap(map)
        polyKaernten.setMap(null)
        polyNiederoesterreich.setMap(null)
        polyOberoesterreich.setMap(null)
        polySalzburg.setMap(null)
        polySteiermark.setMap(null)
        polyTirol.setMap(null)
        polyVorarlberg.setMap(null)
        polyWien.setMap(null)
        polyWienNeg.setMap(null)
        map.setZoom(9)
    })
    $("#kaernten").click(function() {
        map.panTo(centerKaernten)
        polyAustria.setMap(null)
        polyBurgenland.setMap(null)
        polyKaernten.setMap(map)
        polyNiederoesterreich.setMap(null)
        polyOberoesterreich.setMap(null)
        polySalzburg.setMap(null)
        polySteiermark.setMap(null)
        polyTirol.setMap(null)
        polyVorarlberg.setMap(null)
        polyWien.setMap(null)
        polyWienNeg.setMap(null)
        map.setZoom(9)
    })
    $("#niederoesterreich").click(function() {
        map.panTo(centerNiederoesterreich)
        polyAustria.setMap(null)
        polyBurgenland.setMap(null)
        polyKaernten.setMap(null)
        polyNiederoesterreich.setMap(map)
        polyOberoesterreich.setMap(null)
        polySalzburg.setMap(null)
        polySteiermark.setMap(null)
        polyTirol.setMap(null)
        polyVorarlberg.setMap(null)
        polyWien.setMap(null)
        polyWienNeg.setMap(map)
        map.setZoom(9)
    })
    $("#oberoesterreich").click(function() {
        map.panTo(centerOberoesterreich)
        polyAustria.setMap(null)
        polyBurgenland.setMap(null)
        polyKaernten.setMap(null)
        polyNiederoesterreich.setMap(null)
        polyOberoesterreich.setMap(map)
        polySalzburg.setMap(null)
        polySteiermark.setMap(null)
        polyTirol.setMap(null)
        polyVorarlberg.setMap(null)
        polyWien.setMap(null)
        polyWienNeg.setMap(null)
        map.setZoom(9)
    })
    $("#salzburg").click(function() {
        map.panTo(centerSalzburg)
        polyAustria.setMap(null)
        polyBurgenland.setMap(null)
        polyKaernten.setMap(null)
        polyNiederoesterreich.setMap(null)
        polyOberoesterreich.setMap(null)
        polySalzburg.setMap(map)
        polySteiermark.setMap(null)
        polyTirol.setMap(null)
        polyVorarlberg.setMap(null)
        polyWien.setMap(null)
        polyWienNeg.setMap(null)
        map.setZoom(9)
    })
    $("#steiermark").click(function() {
        map.panTo(centerSteiermark)
        polyAustria.setMap(null)
        polyBurgenland.setMap(null)
        polyKaernten.setMap(null)
        polyNiederoesterreich.setMap(null)
        polyOberoesterreich.setMap(null)
        polySalzburg.setMap(null)
        polySteiermark.setMap(map)
        polyTirol.setMap(null)
        polyVorarlberg.setMap(null)
        polyWien.setMap(null)
        polyWienNeg.setMap(null)
        map.setZoom(9)
    })
    $("#tirol").click(function() {
        map.panTo(centerTirol)
        polyAustria.setMap(null)
        polyBurgenland.setMap(null)
        polyKaernten.setMap(null)
        polyNiederoesterreich.setMap(null)
        polyOberoesterreich.setMap(null)
        polySalzburg.setMap(null)
        polySteiermark.setMap(null)
        polyTirol.setMap(map)
        polyVorarlberg.setMap(null)
        polyWien.setMap(null)
        polyWienNeg.setMap(null)
        map.setZoom(9)
    })
    $("#vorarlberg").click(function() {
        map.panTo(centerVorarlberg)
        polyAustria.setMap(null)
        polyBurgenland.setMap(null)
        polyKaernten.setMap(null)
        polyNiederoesterreich.setMap(null)
        polyOberoesterreich.setMap(null)
        polySalzburg.setMap(null)
        polySteiermark.setMap(null)
        polyTirol.setMap(null)
        polyVorarlberg.setMap(map)
        polyWien.setMap(null)
        polyWienNeg.setMap(null)
        map.setZoom(9)
    })
    $("#wien").click(function() {
        map.panTo(centerWien)
        polyAustria.setMap(null)
        polyBurgenland.setMap(null)
        polyKaernten.setMap(null)
        polyNiederoesterreich.setMap(null)
        polyOberoesterreich.setMap(null)
        polySalzburg.setMap(null)
        polySteiermark.setMap(null)
        polyTirol.setMap(null)
        polyVorarlberg.setMap(null)
        polyWien.setMap(map)
        polyWienNeg.setMap(null)
        map.setZoom(12)
    })


})