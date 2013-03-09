$(document).ready(function() {

    var markers = []
    var cityVal = "Wien"
    var kindVal = "startup"

    var mapOptions = {
        zoom: 7,
        center: new google.maps.LatLng(47.1959, 13.25),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL
        }
    }

    var map = new google.maps.Map($('#map_canvas')[0], mapOptions)

    var markerCluster = new MarkerClusterer(map, {
        //maxZoom: 15,
        gridSize: 80
        //styles: styles[0],
        //zoomOnClick: false
    })

    ///////////
    // INFOBOX
    ///////////
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

    var boxText = document.createElement("div");
    boxText.style.cssText = boxStyle
    var boxOptions = setBoxOptions(boxText)
    var infoBox = new InfoBox(boxOptions);



    $('.dropdown-toggle').dropdown()

    // prevents dropdown checkbox clicks to close dropdown menu
    $('.dropdown-menu input, .dropdown-menu label, #map_canvas').click(function(e) {
        e.stopPropagation()
    })



    initPolygons(map)
    fillMarkerArray()
    addMarkerToCluster()

    ////////////////////
    // Search for players by name
    ////////////////////
    $("#search-field").bind("keyup", function() {
        var name = $(this).val()
        var url = '/searchPlayer/name=' + name
        console.log(name)

        $.ajax({
            url: url,
            dataType: "text"

        }).done(function(data) {
            $("#search-result").html(data)
            $(".marker-list").click(function() {
                //console.log(findMarkerIndexByName($(this).data("name")))
                var latLng = new google.maps.LatLng($(this).data("lat"), $(this).data("lng"))

                boxText.innerHTML = $(this).data("name") + "<br><br>" + $(this).data("description")
                infoBox.setOptions(setBoxOptions(boxText))

                infoBox.open(map, markers[findMarkerIndexByName($(this).data("name"))])
                map.panTo(latLng)
                map.setZoom(17)
            })
        })
    })

    ///////////////////////////
    // FOR COMBINED KEY VALUE PAIRS "GRAZ AND WIEN" MAYBE PARAMS HASH?
    // Fill DOM with Marker kind
    ///////////////////////////
    $('.replace-city').click(function() {
        infoBox.close()
        $('.replace-city').css("background-color", "white")
        $(this).css("background-color", "blue")
        cityVal = $(this).attr("value")
        replaceMarker()
    })
    $('.replace-kind').click(function() {
        infoBox.close()
        $('.replace-kind').css("background-color", "white")
        $(this).css("background-color", "blue")
        kindVal = $(this).attr("value")
        replaceMarker()
    })

    function findMarkerIndexByName(name) {
        var returnIndex = -1
        for (var i = 0; i < markers.length; i++) {
            //console.log("markername: " + markers[i].name + ", paraname: " + name)
            if (markers[i].name == name) {
                returnIndex = i
            }
        }
        return returnIndex
    }

    function replaceMarker() {
        var url = '/placeMarker/kind=' + kindVal + "/city=" + cityVal
        console.log(kindVal + ", " + cityVal)

        $.ajax({
            url: url,
            dataType: "text"

        }).done(function(data) {
            $("#marker-container").html(data)
            fillMarkerArray()
            addMarkerToCluster()
        })
    }

    function fillMarkerArray() {;
        // marker of lowest layer
        var markerImage = new google.maps.MarkerImage("assets/markermaxhell.png", new google.maps.Size(31, 36))

        markers.length = 0

        $(".marker").each(function() {


            var latLng = new google.maps.LatLng($(this).data("lat"), $(this).data("lng"))
            var marker = new google.maps.Marker({
                position: latLng,
                icon: markerImage,
                name: $(this).data("name"),
                description: $(this).data("description")
            })

            google.maps.event.addListener(marker, 'click', function() {
                boxText.innerHTML = marker.name + "<br><br>" + marker.description
                infoBox.setOptions(setBoxOptions(boxText))
                infoBox.open(map, marker)
            })
            markers.push(marker)
        })
    }

    function addMarkerToCluster() {
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

        markerCluster.setStyles(styles[0])
        markerCluster.setZoomOnClick(false)

        markerCluster.clearMarkers()
        markerCluster.addMarkers(markers)

        google.maps.event.addListener(markerCluster, 'clusterclick', function(ev) {

            var boxHTML = ""

            for (var i = 0; i < ev.getSize(); i++) {
                //console.log(ev.getMarkers()[i])
                boxHTML += "<a href='#' class='cluster-marker' data-id=" + i + " + data-lat=" + ev.getMarkers()[i].position.ib + " data-lng=" + ev.getMarkers()[i].position.jb + ">" + ev.getMarkers()[i].name + "</a><br>"

            }
            // console.log(boxHTML)
            // console.log(boxText)
            boxText.innerHTML = boxHTML
            infoBox.setOptions(setBoxOptions(boxText))
            infoBox.open(map, ev.getMarkers()[0])

            var markersInCluster = ev.getMarkers()

            google.maps.event.addListener(infoBox, 'domready', function(ev) {

                $(".cluster-marker").click(function() {
                    var clusterItemPos = new google.maps.LatLng($(this).data("lat"), $(this).data("lng"))

                    boxText.innerHTML = markersInCluster[parseInt($(this).data("id"))].name + "<br><br>" + markersInCluster[parseInt($(this).data("id"))].description
                    infoBox.setOptions(setBoxOptions(boxText))
                    infoBox.open(map, markersInCluster[parseInt($(this).data("id"))])

                    map.panTo(clusterItemPos)
                    map.setZoom(17)
                })
            })
        })
    }
})