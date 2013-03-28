$(document).ready(function() {

/*
* @markers  holds an array of markers
* @cityVals holds an array of filter settings for citys
* @kindVals holds an array of filter settings for kinds
*
* kinds are types of players, eg. "startup", "incubator"
*/
    var markers = []
    var cityVals = []
    var kindVals = []

/*
* @mapOptions   holds the options for the map object
*/
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

/*
* @markerCluster    holds the markerCluster Object, its required that there is always only one instance of this class
*/
    var markerCluster = new MarkerClusterer(map, {
        //maxZoom: 15,
        gridSize: 80
        //styles: styles[0],
        //zoomOnClick: false
    })

    ///////////
    // INFOBOX
    ///////////

    /*
    * @boxStyle     holds css propertys for the Infobox in a string
    */
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

        // @return  returns options for the InfoBox
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


    initPolygons(map)
    fillMarkerArray()
    replaceMarker()
    addMarkerToCluster()

    ////////////////////
    // Search for players by name
    ////////////////////
    $("#search-field").bind("keyup", function() {
        var name = $(this).val()
        var url = '/searchPlayer/name=' + name // produces search URL

        $.ajax({
            url: url,
            dataType: "text"

        }).done(function(data) {
            $("#search-result").html(data)  // adds searched markers data to the list of searchresults
            $(".marker-list").click(function() {
                var latLng = new google.maps.LatLng($(this).data("lat"), $(this).data("lng"))

                var data = '<div class="marker" data-name="' + $(this).data("name") + '" data-description="' + $(this).data("description") + '" data-lat="' + $(this).data("lat") + '" data-lng="' + $(this).data("lng") + '"></div>'
        
                // adds searched marker to the DOM for later injection to the Markercluster
                $("#marker-container").append(data) // ERROR: produces multiple idetical marker
                fillMarkerArray()
                addMarkerToCluster()

                // creates marker to set position of infoBox on the map
                var searchMarker = new google.maps.Marker({
                    position: latLng
                })

                // produces infoBox for each marker of search results
                boxText.innerHTML = $(this).data("name") + "<br><br>" + $(this).data("description")
                infoBox.setOptions(setBoxOptions(boxText))

                infoBox.open(map, searchMarker)
                //console.log(markers[findMarkerIndexByName($(this).data("name"))])
                map.panTo(latLng)
                map.setZoom(17)
            })
        })
    })

    ///////////////////////////
    // Filter Marker
    ///////////////////////////

    // adds or removes properties of the marker filter
    $('.replace-city').click(function() {
        // if the clicked value is present in the cityVals array remove it and replace markers
        if (cityVals.indexOf($(this).attr('value')) != -1) {
            $(this).css("background-color", "white")
            var index = cityVals.indexOf($(this).attr('value'))
            cityVals.splice(index, 1)
            replaceMarker()
        // if the clicked value is not present in the cityVals array add it to the array and replace markers
        } else {
            infoBox.close()
            $(this).css("background-color", "rgb(200, 200, 200)")
            cityVals.push($(this).attr("value"))
            replaceMarker()
        }
    })
    $('.replace-kind').click(function() {
        if (kindVals.indexOf($(this).attr('value')) != -1) {
            $(this).css("background-color", "white")
            var index = kindVals.indexOf($(this).attr('value'))
            kindVals.splice(index, 1)
            replaceMarker()

        } else {
            infoBox.close()
            $(this).css("background-color", "rgb(200, 200, 200)")
            kindVals.push($(this).attr("value"))
            replaceMarker()
        }
    })

    function findMarkerIndexByName(name) {
        var returnIndex = -1
        for (var i = 0; i < markers.length; i++) {
            if (markers[i].name == name) {
                returnIndex = i
            }
        }
        return returnIndex
    }

    function replaceMarker() {

        // contains filter URLs
        var cityUrl = ""
        var kindUrl = ""

        // produces city filter URL
        for (var i = 0; i < cityVals.length; i++) {
            cityUrl += 'city[]=' + cityVals[i] + '&'
        }

        // produces kind filter URL
        for (var i = 0; i < kindVals.length; i++) {
            kindUrl += 'kind[]=' + kindVals[i] + '&'
        }

        // adds filter URLs to single filter URL
        var url = '/placeMarker?' + cityUrl + kindUrl
        url = url.slice(0, -1);

        $.ajax({
            url: url,
            dataType: "text"
        }).done(function(data) {
            $("#marker-container").html(data)   // adds marker data to DOM
            fillMarkerArray()
            addMarkerToCluster()
        })
    }

    function fillMarkerArray() {;
        
        var markerImage = new google.maps.MarkerImage("assets/markermaxhell.png", new google.maps.Size(31, 36)) // marker image of lowest layer

        markers.length = 0  // resets markers array 

        $(".marker").each(function() {

            var latLng = new google.maps.LatLng($(this).data("lat"), $(this).data("lng"))   // creates LatLng Object for markers
            // creates markers to be displayed on the map
            var marker = new google.maps.Marker({
                position: latLng,
                icon: markerImage,
                name: $(this).data("name"),
                description: $(this).data("description")
            })

            // adds click event listener for each marker to open infoBox
            google.maps.event.addListener(marker, 'click', function() {
                boxText.innerHTML = marker.name + "<br><br>" + marker.description
                infoBox.setOptions(setBoxOptions(boxText))
                infoBox.open(map, marker)
                map.setZoom(17)
            })
            // pushes markers to marker array
            markers.push(marker)
        })
    }

    function addMarkerToCluster() {
        // styles for the markers add different cluster densities
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

        markerCluster.clearMarkers()    // resets markerCluster
        markerCluster.addMarkers(markers)   // adds markers from marker array to markerCluster

        // adds click event listener to markerCluster to open infoBox displaying players to click
        google.maps.event.addListener(markerCluster, 'clusterclick', function(ev) {

            var boxHTML = ""

            // produces inner html of infoBox holding links to single markers on the map
            for (var i = 0; i < ev.getSize(); i++) {
                boxHTML += "<a href='#' class='cluster-marker' data-id=" + i + " + data-lat=" + ev.getMarkers()[i].position.lat() + " data-lng=" + ev.getMarkers()[i].position.lng() + ">" + ev.getMarkers()[i].name + "</a><br>"
            }

            boxText.innerHTML = boxHTML
            infoBox.setOptions(setBoxOptions(boxText))
            infoBox.open(map, ev.getMarkers()[0])   // displaying the infoBox at the first marker of the cluster

            var markersInCluster = ev.getMarkers()  // helper to create for every marker in the cluster a click event

            // when the infoBox is ready create click events for each player item in the infoBox
            google.maps.event.addListener(infoBox, 'domready', function(ev) {

                $(".cluster-marker").unbind("click").bind("click", function() {

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