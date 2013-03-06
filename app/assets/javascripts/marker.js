function initMarker(map) {
  //////////////////////
  // MARKER
  //////////////////////

  var boxStyle = "left: 0;" +
    "top: 0;" +
    "z-index: -2;" +
    "color: #FFFFFF;" +
    "float: left;" +
    "margin-top: 10px;" +
    "padding: 10px;" +
    "width: 260px;" +
    "border: 1px solid #313436;" +
    "text-shadow: 0px 0px 3px #000;" +
    "-moz-border-radius: 5px;" +
    "-webkit-border-radius: 5px;" +
    "border-radius: 5px;" +
    "-moz-box-shadow: 0px 1px 2px #000;" +
    "-webkit-box-shadow: 0px 1px 2px #000;" +
    "box-shadow: 0px 1px 2px #000;" +
    "background-color: #313436;" +
    "background-image: -webkit-linear-gradient(top, #313436, #222526);" +
    "background-image: -moz-linear-gradient(top, #313436, #222526);" +
    "background-image: -ms-linear-gradient(top, #313436, #222526);" +
    "background-image: -o-linear-gradient(top, #313436, #222526);" +
    "background-image: linear-gradient(top, #313436, #222526);"

    function setBoxOptions(boxText) {
      var boxOptions = {
        content: boxText,
        disableAutoPan: false,
        maxWidth: 0,
        pixelOffset: new google.maps.Size(-140, 0),
        zIndex: null,
        boxStyle: {
          //background: "url('tipbox.gif') no-repeat"
          opacity: 0.9,
          width: "280px"
        },
        closeBoxMargin: "2px 2px 2px 2px",
        closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif",
        infoBoxClearance: new google.maps.Size(1, 1),
        isHidden: false,
        pane: "floatPane",
        enableEventPropagation: true
      }
      return boxOptions
    }


    // styles of different zoom levels
  var styles = [
    [{
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
    }]
  ]

  // marker of lowest layer
  var markerImage = new google.maps.MarkerImage(
    "assets/markermaxhell.png",
  new google.maps.Size(31, 36))

  var markers = []

  $(".marker").each(function() {
    //var infowindowSingle = new google.maps.InfoWindow()
    var latLng = new google.maps.LatLng($(this).data("lat"), $(this).data("lng"))
    var marker = new google.maps.Marker({
      position: latLng,
      icon: markerImage,
      name: $(this).data("name"),
      description: $(this).data("description")
    })

    var boxText = document.createElement("div");

    boxText.style.cssText = boxStyle

    var boxOptions = setBoxOptions(boxText)

    boxText.innerHTML = $(this).data("name") + "<br><br>" + $(this).data("description")

    var ib = new InfoBox(boxOptions)

    makeInfoBoxEvent(map, ib, marker)

    markers.push(marker)

  })

    function makeInfoBoxEvent(map, ib, marker) {
      google.maps.event.addListener(marker, 'click', function() {
        ib.open(map, marker)
      })
    }


    //////////////////////
    // MARKERCLUSTERER
    //////////////////////

  var markerCluster = new MarkerClusterer(map, markers, {
    //maxZoom: 15,
    gridSize: 80,
    styles: styles[0],
    zoomOnClick: false
  })

  //console.log(markerCluster.getMarkers())


  var boxTextCluster = document.createElement("div");

  boxTextCluster.style.cssText = boxStyle

  var boxOptionsCluster = setBoxOptions(boxTextCluster)

  var infoBoxCluster = new InfoBox(boxOptionsCluster);

  google.maps.event.addListener(markerCluster, 'clusterclick', function(ev) {
    //console.log(ev.getMarkers()[i].name)
    var boxHTML = ""
    var latLngCluster = ev.getCenter()
    var markerCluster = new google.maps.Marker({
      position: latLngCluster,
      icon: markerImage
    })
    for (var i = 0; i < ev.getSize(); i++) {
      console.log(ev.getMarkers()[i])
      boxHTML += "<a href='#' class='cluster-marker' data-id=" + i + " + data-lat=" + ev.getMarkers()[i].position.ib + " data-lng=" + ev.getMarkers()[i].position.jb + ">" + ev.getMarkers()[i].name + "</a><br>"

    }
    boxTextCluster.innerHTML = boxHTML
    infoBoxCluster.open(map, markerCluster)

    var markersInfoBox = ev.getMarkers()
    
    google.maps.event.addListener(infoBoxCluster, 'domready', function(ev) {
      //console.log(infoBoxCluster)
      $(".cluster-marker").click(function() {
        var clusterItemPos = new google.maps.LatLng($(this).data("lat"), $(this).data("lng"))
        infoBoxCluster.close(map, markerCluster)
        //console.log(parseInt($(this).data("id")))

        var boxText2 = document.createElement("div");

        boxText2.style.cssText = boxStyle

        var boxOptions2 = setBoxOptions(boxText2)

        boxText2.innerHTML = markersInfoBox[parseInt($(this).data("id"))].name + "<br><br>" + markersInfoBox[parseInt($(this).data("id"))].description

        ib2 = new InfoBox(boxOptions2)

        //makeInfoBoxEvent(map, ib2, markersInfoBox[parseInt($(this).data("id"))])
        ib2.open(map, markersInfoBox[parseInt($(this).data("id"))])
        map.panTo(clusterItemPos)
        map.setZoom(17)
      })
    })
  })
}