    
// CREATE POLYGONS
function initPolygons(map) {

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

        
// SETTING POLYGONS
/*
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
    */
}