import React, { Component } from 'react'
import './App.css'

let map
let markers = []
let polygon = null
let placeMarkers = []

window.initMap = function() {
  //let styles =
let styledMapType = new window.google.maps.StyledMapType(
[
    {
        "featureType": "all",
        "elementType": "labels",
        "stylers": [{"visibility": "off"}]
    },
    {
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [{"visibility": "off"}]
    },
    {
        "featureType": "administrative",
        "elementType": "labels.text",
        "stylers": [{"visibility": "off"}]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {"visibility": "simplified"},
            {"hue": "#0066ff"},
            {"saturation": 74},
            {"lightness": 100}
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "labels.text",
        "stylers": [{"visibility": "off"}]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [{"visibility": "simplified"}]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [{"visibility": "off"}]
    },
    {
        "featureType": "poi.attraction",
        "elementType": "all",
        "stylers": [{"visibility": "off"}]
    },
    {
        "featureType": "poi.business",
        "elementType": "all",
        "stylers": [{"visibility": "simplified"}]
    },
    {
        "featureType": "poi.business",
        "elementType": "labels",
        "stylers": [{"visibility": "off"}]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [{"visibility": "off"}]
    },
    {
        "featureType": "road",
        "elementType": "labels.text",
        "stylers": [{"visibility": "off"}]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {"visibility": "simplified"},
            {"weight": 0.6},
            {"saturation": -85},
            {"lightness": 61}
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [{"visibility": "on"}]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels",
        "stylers": [{"visibility": "off"}]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text",
        "stylers": [{"visibility": "off"}]
    },
    {
        "featureType": "road.arterial",
        "elementType": "all",
        "stylers": [{"visibility": "off"}]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels",
        "stylers": [{"visibility": "off"}]
    },
    {
        "featureType": "road.local",
        "elementType": "all",
        "stylers": [{"visibility": "on"}]
    },
    {
        "featureType": "road.local",
        "elementType": "labels",
        "stylers": [{"visibility": "off"}]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [{"visibility": "simplified"}]
    },
    {
        "featureType": "transit",
        "elementType": "labels",
        "stylers": [{"visibility": "off"}]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {"visibility": "on"},
            {"color": "#5f94ff"},
            {"lightness": 26},
            {"gamma": 5.86}
        ]
    }
],
    {name: 'Styled Map'}
)
  map = new window.google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.2244, lng: -105.2689},
    zoom: 17,
    styles: styledMapType,
    mapTypeControlOptions: { mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map'] }
  })

  // This autocomplete is for use in the search within time entry box.
  let timeAutocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById('search-within-time-text'))
  // This autocomplete is for use in the geocoder entry box.
  let zoomAutocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById('focus-on-area-text'))
      //Bias the boundaries within the map for the zoom to area text.
      zoomAutocomplete.bindTo('bounds', map)

  // Create a searchbox in order to execute a places search
  let searchBox = new window.google.maps.places.SearchBox(
      document.getElementById('places-search'))
  // Bias the searchbox to within the bounds of the map.
  searchBox.setBounds(map.getBounds())


  let locations = [
    {title: 'Lyons Classic Pinball', location: {lat: 40.224428, lng: -105.268916}},
    {title: 'Planet Bluegrass', location: {lat: 40.2269, lng: -105.2733}},
    {title: 'The Stone Cup', location: {lat: 40.2245, lng: -105.2706}},
    {title: 'The Quarry Self-Serve Watering Hole', location: {lat: 40.2227, lng: -105.2650}},
    {title: 'Oskar Blues Grill & Brew', location: {lat: 40.224421, lng: -105.268529}}
  ]

  // Initialize the drawing manager.
  let drawingManager = new window.google.maps.drawing.DrawingManager({
    drawingMode: window.google.maps.drawing.OverlayType.POLYGON,
    drawingControl: true,
    drawingControlOptions: {
      position: window.google.maps.ControlPosition.TOP_LEFT,
      drawingModes: [
        window.google.maps.drawing.OverlayType.POLYGON
      ]
    }
  })

  let largeInfowindow = new window.google.maps.InfoWindow()
// Style the markers a bit. This will be our listing marker icon.
  let defaultIcon = {
    anchor: new window.google.maps.Point(172.268, 501.67),
    path: 'M 172.268,501.67 C 26.97,291.031 0,269.413 0,192 0,85.961 85.961,0 192,0 c 106.039,0 192,85.961 192,192 0,77.413 -26.97,99.031 -172.268,309.67 -9.535,13.774 -29.93,13.773 -39.464,0 z',
      fillColor: '#000000',
      fillOpacity: 1,
      strokeColor: '#000',
      strokeWeight: 2,
      scale: .06
  }
    // Create a "highlighted location" marker color for when the user
    // mouses over the marker.
    let highlightedIcon =  {
      anchor: new window.google.maps.Point(172.268,501.67),
      path: 'M 172.268,501.67 C 26.97,291.031 0,269.413 0,192 0,85.961 85.961,0 192,0 c 106.039,0 192,85.961 192,192 0,77.413 -26.97,99.031 -172.268,309.67 -9.535,13.774 -29.93,13.773 -39.464,0 z',
        fillColor: '#ffffff',
        fillOpacity: 1,
        strokeColor: '#000',
        strokeWeight: 2,
        scale: .06
    }
    // The following group uses the location array to create an array of markers on initialize.
    for (let i = 0; i < locations.length; i++) {
      // Get the position from the location array.
      let position = locations[i].location
      let title = locations[i].title
      // Create a marker per location, and put into markers array.
      let marker = new window.google.maps.Marker({
        position: position,
        title: title,
        draggable: false,
        animation: window.google.maps.Animation.DROP,
        id: i,
        icon: defaultIcon
      })
      map.mapTypes.set('styled_map', styledMapType)
      map.setMapTypeId('styled_map')
      // Push the marker to our array of markers.
      markers.push(marker)
      // Create an onclick event to open an infowindow at each marker.
      marker.addListener('click', function() {
        populateInfoWindow(this, largeInfowindow)
      })
      // Two event listeners - one for mouseover, one for mouseout,
      // to change the colors back and forth.
      marker.addListener('mouseover', function() {
        this.setIcon(highlightedIcon)
      })
      marker.addListener('mouseout', function() {
        this.setIcon(defaultIcon)
      })

    }
    showListings()
    document.getElementById('hide-listings').addEventListener('click', hideMarkers)
    document.getElementById('show-listings').addEventListener('click', showListings)
    document.getElementById('toggle-drawing').addEventListener('click', function() {
      toggleDrawing(drawingManager)
    })
    document.getElementById('toggle-search').addEventListener('click', function() {
      toggleSearch()
    })
    document.getElementById('toggle-distance').addEventListener('click', function() {
      toggleDistance()
    })
    document.getElementById('search-within-time').addEventListener('click', function() {
      searchWithinTime()
    })

    // Listen for the event fired when the user selects a prediction from the
    // picklist and retrieve more details for that place.
    searchBox.addListener('places_changed', function() {
      searchBoxPlaces(this)
    })
    // Listen for the event fired when the user selects a prediction and clicks
    // "go" more details for that place.
    document.getElementById('go-places').addEventListener('click', textSearchPlaces)

    // Add an event listener so that the polygon is captured,  call the
    // searchWithinPolygon function. This will show the markers in the polygon,
    // and hide any outside of it.
    //let polygon = window.polygon;
    drawingManager.addListener('overlaycomplete', function(event) {
      // First, check if there is an existing polygon.
      // If there is, get rid of it and remove the markers
      if (polygon) {
        polygon.setMap(null)
        hideMarkers(markers)
      }
      // Switching the drawing mode to the HAND (i.e., no longer drawing).
      drawingManager.setDrawingMode(null)
      // Creating a new editable polygon from the overlay.
      polygon = event.overlay
      polygon.setEditable(true)
      // Searching within the polygon.
      searchWithinPolygon()
      // Make sure the search is re-done if the poly is changed.
      polygon.getPath().addListener('set_at', searchWithinPolygon)
      polygon.getPath().addListener('insert_at', searchWithinPolygon)
      //polygon.getPath().computeArea(polyon)
      let calculatedArea = window.google.maps.geometry.spherical.computeArea(polygon.getPath())
      window.alert(parseInt(calculatedArea).toFixed(2) + ' square meters')
      })
  }

  // This function populates the infowindow when the marker is clicked. We'll only allow
  // one infowindow which will open at the marker that is clicked, and populate based
  // on that markers position.
  function populateInfoWindow(marker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker !== marker) {
      infowindow.setContent('')
      infowindow.marker = marker
      infowindow.open(map, marker)
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick',function(){
        infowindow.setMarker = null
      })
    let streetViewService = new window.google.maps.StreetViewService()
    let radius = 50
    // In case the status is OK, which means the pano was found, compute the
    // position of the streetview image, then calculate the heading, then get a
    // panorama from that and set the options
    function getStreetView(data, status) {
      if (status === window.google.maps.StreetViewStatus.OK) {
        let nearStreetViewLocation = data.location.latLng
        let heading = window.google.maps.geometry.spherical.computeHeading(
          nearStreetViewLocation, marker.position)
          infowindow.setContent('<div>' + marker.title + '</div><div id="panorama"></div>')
          let panoramaOptions = {
            position: nearStreetViewLocation,
            pov: {
              heading: heading,
              pitch: 30
            }
          }
        let panorama = new window.google.maps.StreetViewPanorama(
          document.getElementById('panorama'), panoramaOptions)
      } else if (status === window.google.maps.StreetViewStatus.UNKNOWN_ERROR) {
        window.alert('Streetview Unknown Error, try another search')
        }
      else {
        infowindow.setContent('<div>' + marker.title + '</div>' +
          '<div>No Street View Found</div>')
      }
      }
      // Use streetview service to get the closest streetview image within
      // 50 meters of the markers position
      streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView)
      // Open the infowindow on the correct marker.
      infowindow.open(map, marker)
    }
  }

// This function will loop through the markers array and display them all.
  function showListings() {
    let bounds = new window.google.maps.LatLngBounds()
    // Extend the boundaries of the map for each marker and display the marker
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(map)
      bounds.extend(markers[i].position)
    }
    map.fitBounds(bounds)
  }
  // This function will loop through the listings and hide them all.
  function hideMarkers(markers) {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(null)
    }
  }

  // This shows and hides (respectively) the drawing options.
  function toggleDrawing(drawingManager) {
    if (drawingManager.map) {
      drawingManager.setMap(null)
      // In case the user drew anything, get rid of the polygon
      if (polygon !== null) {
        polygon.setMap(null)
      }
    } else {
      drawingManager.setMap(map)
    }
  }

  //This shows and hides (respectively) the search options.
  function toggleSearch() {
    let searchbar = document.getElementById("focus-on-area-text")
        if (searchbar.style.display === "none") {
            searchbar.style.display = "inline"
        } else {
            searchbar.style.display = "none"
        }
    let findbutton = document.getElementById("focus-on-area")
        if (findbutton.style.display === "none") {
            findbutton.style.display = "inline"
            document.getElementById('focus-on-area').addEventListener('click', function() {
              focusOnArea()
            })
        } else {
            findbutton.style.display = "none"
        }
    let nearbyplaces = document.getElementById("places-search")
        if (nearbyplaces.style.display === "none") {
            nearbyplaces.style.display = "inline"
        } else {
            nearbyplaces.style.display = "none"
        }
    let nearbyplacessearch = document.getElementById("go-places")
        if (nearbyplacessearch.style.display === "none") {
            nearbyplacessearch.style.display = "inline"
        } else {
            nearbyplacessearch.style.display = "none"
        }
    let placesSearch = document.getElementById("places-search-title")
        if (placesSearch.style.display === "none") {
            placesSearch.style.display = "inline-block"
        } else {
            placesSearch.style.display = "none"
        }
    let areaSearch = document.getElementById("area-search-title")
        if (areaSearch.style.display === "none") {
            areaSearch.style.display = "inline-block"
        } else {
            areaSearch.style.display = "none"
        }
  }

  //This shows and hides (respectively) the search options.
  function toggleDistance() {
    let distanceSearch = document.getElementById("calulatedDistance")
        if (distanceSearch.style.display === "none") {
            distanceSearch.style.display = "inline-block"
        }  else {
            distanceSearch.style.display = "none"
        }
  }


  // This function hides all markers outside the polygon,
  // and shows only the ones within it. This is so that the
  // user can specify an exact area of search.
  //let polygon = window.polygon;
  function searchWithinPolygon() {
    for (let i = 0; i < markers.length; i++) {
      if (window.google.maps.geometry.poly.containsLocation(markers[i].position, polygon)) {
        markers[i].setMap(map)
      } else {
        markers[i].setMap(null)
      }
    }
  }
  function focusOnArea() {
    // Initialize the geocoder.
    let geocoder = new window.google.maps.Geocoder()
    // Get the address or place that the user entered.
    let address = window.document.getElementById('focus-on-area-text').value
    // Make sure the address isn't blank.
    if (address === '') {
      window.alert('You must enter an area, or address.')
    } else {
      // Geocode the address/area entered to get the center. Then, center the map
      // on it and zoom in
      geocoder.geocode(
        { address: address,
          componentRestrictions: {locality: 'Lyons'}
        }, function(results, status) {
          if (status === window.google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location)
            map.setZoom(15)
          } else if
            (status === window.google.maps.GeocoderStatus.ZERO_RESULTS) {
              window.alert('Zero results, try another search')

            } else if
              (status === window.google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
                window.alert('You are over your search query limit, try again later')

              } else if
                (status === window.google.maps.GeocoderStatus.REQUEST_DENIED) {
                  window.alert('Request Denied, try another search')

                } else if
                  (status === window.google.maps.GeocoderStatus.INVALID_REQUEST) {
                    window.alert('Inalid Request, try another search or contact developer')

                  }  else if
                    (status === window.google.maps.GeocoderStatus.UNKNOWN_ERROR) {
                      window.alert('Unknown Error, possible issue with server try again later')

                    } else if
                      (status === window.google.maps.GeocoderStatus.ERROR) {
                        window.alert('Error, possible issue with server try again')

                      } else {
                        window.alert('We could not find that location - try entering a more' +
                            ' specific place.')
                      }
        })
    }
  }

  // This function allows the user to input a desired travel time, in
  // minutes, and a travel mode, and a location - and only show the listings
  // that are within that travel time (via that travel mode) of the location
  function searchWithinTime() {
    // Initialize the distance matrix service.
    let distanceMatrixService = new window.google.maps.DistanceMatrixService()
    let address = document.getElementById('search-within-time-text').value
    // Check to make sure the place entered isn't blank.
    if (address === '') {
      window.alert('You must enter an address.')
    } else {
      hideMarkers()
      // Use the distance matrix service to calculate the duration of the
      // routes between all our markers, and the destination address entered
      // by the user. Then put all the origins into an origin matrix.
      let origins = []
      for (let i = 0; i < markers.length; i++) {
        origins[i] = markers[i].position
      }
      let destination = address
      let mode = document.getElementById('mode').value
      let highways
      if (document.getElementById("highwaysCheckboxId").checked) {
        highways === true
      } else {
        highways === false
      }
      let tolls
      if (document.getElementById("tollsCheckboxId").checked) {
        tolls === true
      } else {
        tolls === false
      }
      let ferries
      if (document.getElementById("ferriesCheckboxId").checked) {
        ferries === true
      } else {
        ferries === false
      }
      // Now that both the origins and destination are defined, get all the
      // info for the distances between them.
      distanceMatrixService.getDistanceMatrix({
        origins: origins,
        destinations: [destination],
        travelMode: window.google.maps.TravelMode[mode],
        unitSystem: window.google.maps.UnitSystem.IMPERIAL,
        avoidHighways: window.google.maps.TravelMode[highways],
        avoidTolls: window.google.maps.TravelMode[tolls],
        avoidFerries: window.google.maps.TravelMode[ferries]
      }, function(response, status) {
        if (status !== window.google.maps.DistanceMatrixStatus.OK) {
          window.alert('Error was: ' + status)
        } else {
          displayMarkersWithinTime(response)
        }
      })
    }
  }


    // This function is in response to the user selecting "show route" on one
    // of the markers within the calculated distance. This will display the route
    // on the map.
    function displayDirections(origin) {
      hideMarkers()
      let directionsService = new window.google.maps.DirectionsService()
      // Get the destination address from the user entered value.
      let destinationAddress =
          document.getElementById('search-within-time-text').value
      // Get mode again from the user entered value.
      let mode = document.getElementById('mode').value
      directionsService.route({
        // The origin is the passed in marker's position.
        origin: origin,
        // The destination is user entered address.
        destination: destinationAddress,
        travelMode: window.google.maps.TravelMode[mode]
      }, function(response, status) {
        if (status === window.google.maps.DirectionsStatus.OK) {
          let directionsDisplay = new window.google.maps.DirectionsRenderer({
            map: map,
            directions: response,
            draggable: true,
            polylineOptions: {
              strokeColor: 'green'
            }
          })
        } else if
          (status === window.google.maps.GeocoderStatus.ZERO_RESULTS) {
            window.alert('Zero results for directions, try another search')

          } else if
            (status === window.google.maps.GeocoderStatus.MAX_WAYPOINTS_EXCEEDED) {
              window.alert('Remove some waypoints and try again')

            } else if
              (status === window.google.maps.GeocoderStatus.MAX_ROUTE_LENGTH_EXCEEDED) {
                window.alert('Route length is too long, try something else')

              } else if
                (status === window.google.maps.GeocoderStatus.INVALID_REQUEST) {
                  window.alert('Inalid Request, try another search or contact developer')

                }  else if
                  (status === window.google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
                    window.alert('Over query limit for directions, try again later')

                  } else if
                    (status === window.google.maps.GeocoderStatus.REQUEST_DENIED) {
                      window.alert('Request Denied for directions, try again')

                    } else if
                    (status === window.google.maps.GeocoderStatus.UNKNOWN_ERROR) {
                      window.alert('Unknown Error, possible issue with server try again later')

                    } else {
                      window.alert('Directions request failed due to ' + status)
        }
      })
    }

// This function fires when the user selects a searchbox picklist item.
 // It will do a nearby search using the selected query string or place.
 function searchBoxPlaces(searchBox) {
   hideMarkers(placeMarkers);
   let places = searchBox.getPlaces();
   // For each place, get the icon, name and location.
   createMarkersForPlaces(places);
   if (places.length == 0) {
     window.alert('We did not find any places matching that search! Try a bigger area or a different city');
   }
 }
 // This function firest when the user select "go" on the places search.
 // It will do a nearby search using the entered query string or place.
 function textSearchPlaces() {
   let bounds = map.getBounds()
   hideMarkers(placeMarkers)
   let placesService = new window.google.maps.places.PlacesService(map)
   placesService.textSearch({
     query: document.getElementById('places-search').value,
     bounds: bounds
   }, function(results, status) {
     if (status === window.google.maps.places.PlacesServiceStatus.OK) {
       createMarkersForPlaces(results)
     }
   })
 }
 // This function creates markers for each place found in either places search.
 function createMarkersForPlaces(places) {
   let bounds = new window.google.maps.LatLngBounds()
   for (let i = 0; i < places.length; i++) {
     let place = places[i]
     let icon = {
       url: place.icon,
       size: new window.google.maps.Size(35, 35),
       origin: new window.google.maps.Point(0, 0),
       anchor: new window.google.maps.Point(15, 34),
       scaledSize: new window.google.maps.Size(25, 25)
     }
     // Create a marker for each place.
     let marker = new window.google.maps.Marker({
       map: map,
       icon: icon,
       title: place.name,
       position: place.geometry.location,
       id: place.place_id
     })
     // Create a single infowindow to be used with the place details information
     // so that only one is open at once.
     var placeInfoWindow = new window.google.maps.InfoWindow()
     // If a marker is clicked, do a place details search on it in the next function.
     marker.addListener('click', function() {
       if (placeInfoWindow.marker == this) {
         console.log("This infowindow already is on this marker!")
       } else {
         getPlacesDetails(this, placeInfoWindow)
       }
     })
     // // If a marker is clicked, do a place details search on it in the next function.
     // marker.addListener('click', function() {
     // getPlacesDetails(this, place)
     // })
     placeMarkers.push(marker)
     if (place.geometry.viewport) {
       // Only geocodes have viewport.
       bounds.union(place.geometry.viewport)
     } else {
       bounds.extend(place.geometry.location)
     }
   }
   map.fitBounds(bounds)
 }

// This is the PLACE DETAILS search - it's the most detailed so it's only
// executed when a marker is selected, indicating the user wants more
// details about that place.
function getPlacesDetails(marker, infowindow) {
 let service = new window.google.maps.places.PlacesService(map)
 service.getDetails({
   placeId: marker.id
 }, function(place, status) {
   if (status === window.google.maps.places.PlacesServiceStatus.OK) {
     // Set the marker property on this infowindow so it isn't created again.
     infowindow.marker = marker;
     let innerHTML = '<div>';
     if (place.name) {
       innerHTML += '<strong>' + place.name + '</strong>'
     }
     if (place.formatted_address) {
       innerHTML += '<br>' + place.formatted_address
     }
     if (place.formatted_phone_number) {
       innerHTML += '<br>' + place.formatted_phone_number
     }
     if (place.opening_hours) {
       innerHTML += '<br><br><strong>Hours:</strong><br>' +
           place.opening_hours.weekday_text[0] + '<br>' +
           place.opening_hours.weekday_text[1] + '<br>' +
           place.opening_hours.weekday_text[2] + '<br>' +
           place.opening_hours.weekday_text[3] + '<br>' +
           place.opening_hours.weekday_text[4] + '<br>' +
           place.opening_hours.weekday_text[5] + '<br>' +
           place.opening_hours.weekday_text[6];
     }
     if (place.photos) {
       innerHTML += '<br><br><img src="' + place.photos[0].getUrl(
           {maxHeight: 100, maxWidth: 200}) + '">'
     }
     innerHTML += '</div>'
     infowindow.setContent(innerHTML)
     infowindow.open(map, marker)
     // Make sure the marker property is cleared if the infowindow is closed.
     infowindow.addListener('closeclick', function() {
       infowindow.marker = null
     })
   }
 })
}

  // This function will go through each of the results, and,
  // if the distance is LESS than the value in the picker, show it on the map.
  function displayMarkersWithinTime(response) {
    let maxDuration = document.getElementById('max-duration').value
    let origins = response.originAddresses
    let destinations = response.destinationAddresses
    // Parse through the results, and get the distance and duration of each.
    // Because there might be  multiple origins and destinations we have a nested loop
    // Then, make sure at least 1 result was found.
    let atLeastOne = false
    for (let i = 0; i < origins.length; i++) {
      let results = response.rows[i].elements;
      for (let j = 0; j < results.length; j++) {
        let element = results[j]
        if (element.status === "OK") {
          // The distance is returned in feet, but the TEXT is in miles. If we wanted to switch
          // the function to show markers within a user-entered DISTANCE, we would need the
          // value for distance, but for now we only need the text.
          let distanceText = element.distance.text
          // Duration value is given in seconds so we make it MINUTES. We need both the value
          // and the text.
          let duration = element.duration.value / 60
          let durationText = element.duration.text
          if (duration <= maxDuration) {
            //the origin [i] should = the markers[i]
            markers[i].setMap(map)
            atLeastOne = true
            // Create a mini infowindow to open immediately and contain the
            // distance and duration
            let infowindow = new window.google.maps.InfoWindow({
              content: durationText + ' away, ' + distanceText +
              `<div><input id="route" type="button" value="View Route" onclick=${displayDirections(origins[i])}></input></div>`
            })
            infowindow.open(map, markers[i])
            // Put this in so that this small window closes if the user clicks
            // the marker, when the big infowindow opens
            markers[i].infowindow = infowindow
            window.google.maps.event.addListener(markers[i], 'click', function() {
              this.infowindow.close()
            })
          }
        }
      }
    }
    if (!atLeastOne) {
      window.alert('We could not find any locations within that distance!')
    }
  }

export default class App extends Component {
  constructor(props) {
      super(props)
      this.state = {
        map: {}
      }
  }

  componentDidMount () {
     const script = document.createElement('script')
     script.async = true
     script.defer = true
     script.src = "https://maps.googleapis.com/maps/api/js?libraries=places,drawing,geometry&key=AIzaSyAWiSZ2beXFrSFWzZVRgF122wCkVf4P67Y&v=3.32&callback=initMap"
     document.head.appendChild(script)
  }

  render() {
    return (
    <div>
       <div className="container">
        <div className="options-box">
          <div>
            <input id="show-listings" className="btn" type="button" value="Show Listings" />
            <input id="hide-listings" className="btn" type="button" value="Hide Listings" />
            <input id="toggle-drawing" className="btn" type="button" value="Drawing Tools" />
            <input id="toggle-search" className="btn" type="button" value="Search"/>
            <input id="toggle-distance" className="btn" type="button" value="Calculate"/>
            <hr />
            <span id="area-search-title" className="text">Search for an area or city </span>
            <input id="focus-on-area-text" type="text" placeholder="Enter search area"/>
            <input id="focus-on-area" className="btn" type="button" value="Find"/>

            <div id="space">
            <span id="places-search-title" className="text">Search for nearby places </span>
            <input id="places-search" type="text" placeholder="Ex: local brewery" />
            <input id="go-places" className="btn" type="button" value="Find" />
            </div>

            <div id="calulatedDistance">
            <span className="text"> Within </span>
            <select id="max-duration">
              <option value="10">10 min</option>
              <option value="15">15 min</option>
              <option value="30">30 min</option>
              <option value="60">1 hour</option>
            </select>
            <select id="mode">
              <option value="DRIVING">drive</option>
              <option value="WALKING">walk</option>
              <option value="BICYCLING">bike</option>
              <option value="TRANSIT">ride</option>
            </select>
            <span className="text"> Avoid </span>

            <label for="Highways"> Highways </label>
            <input id="highwaysCheckboxId" type="checkbox" value="HIGHWAYS" name="Highways"/>

            <label for="Tolls"> Tolls </label>
            <input id="tollsCheckboxId" type="checkbox" value="TOLLS" name="Tolls"/>

            <label for="Ferries"> Ferries </label>
            <input id="ferriesCheckboxId" type="checkbox" value="FERRIES" name="Ferries"/>

            <span className="text"> of </span>
            <input id="search-within-time-text" type="text" placeholder="Ex: Lyons Classic Pinball"/>
            <input id="search-within-time" className="btn" type="button" value="Find"/>
            </div>

          </div>
        </div>
        </div>
      <div id="map" />
    </div>
    )
  }
}
