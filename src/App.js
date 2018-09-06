import React, { Component } from 'react'
import './App.css'

let map;
let markers = [];
let polygon = null;

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
    zoom: 16,
    styles: styledMapType,
    mapTypeControlOptions: { mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map'] }
  })

  let locations = [
    {title: 'Lyons Classic Pinball', location: {lat: 40.224428, lng: -105.268916}},
    {title: 'Planet Bluegrass', location: {lat: 40.2269, lng: -105.2733}},
    {title: 'The Stone Cup', location: {lat: 40.2245, lng: -105.2706}},
    {title: 'The Quarry Self-Serve Watering Hole', location: {lat: 40.2227, lng: -105.2650}},
    {title: 'Oskar Blues Grill & Brew', location: {lat: 40.224421, lng: -105.268529}}
  ]

  // Initialize the drawing manager.
  var drawingManager = new window.google.maps.drawing.DrawingManager({
    drawingMode: window.google.maps.drawing.OverlayType.POLYGON,
    drawingControl: true,
    drawingControlOptions: {
      position: window.google.maps.ControlPosition.TOP_LEFT,
      drawingModes: [
        window.google.maps.drawing.OverlayType.POLYGON
      ]
    }
  })

  let largeInfowindow = new window.google.maps.InfoWindow();
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
    document.getElementById('hide-listings').addEventListener('click', hideListings)
    document.getElementById('show-listings').addEventListener('click', showListings)
    document.getElementById('toggle-drawing').addEventListener('click', function() {
      toggleDrawing(drawingManager)
    })
    document.getElementById('focus-on-area').addEventListener('click', function() {
      focusOnArea()
    })

    // Add an event listener so that the polygon is captured,  call the
    // searchWithinPolygon function. This will show the markers in the polygon,
    // and hide any outside of it.
    //let polygon = window.polygon;
    drawingManager.addListener('overlaycomplete', function(event) {
      // First, check if there is an existing polygon.
      // If there is, get rid of it and remove the markers
      if (polygon) {
        polygon.setMap(null)
        hideListings(markers)
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
      infowindow.setContent('');
      infowindow.marker = marker;
      infowindow.open(map, marker);
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick',function(){
        infowindow.setMarker = null
      })
    let streetViewService = new window.google.maps.StreetViewService();
    let radius = 50;
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
      streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
      // Open the infowindow on the correct marker.
      infowindow.open(map, marker);
    }
  }

// This function will loop through the markers array and display them all.
  function showListings() {
    let bounds = new window.google.maps.LatLngBounds();
    // Extend the boundaries of the map for each marker and display the marker
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(map)
      bounds.extend(markers[i].position)
    }
    map.fitBounds(bounds)
  }
  // This function will loop through the listings and hide them all.
  function hideListings() {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(null)
    }
  }

  // This shows and hides (respectively) the drawing options.
  function toggleDrawing(drawingManager) {
    if (drawingManager.map) {
      drawingManager.setMap(null);
      // In case the user drew anything, get rid of the polygon
      if (polygon !== null) {
        polygon.setMap(null);
      }
    } else {
      drawingManager.setMap(map);
    }
  }
  // This function hides all markers outside the polygon,
  // and shows only the ones within it. This is so that the
  // user can specify an exact area of search.
  //let polygon = window.polygon;
  function searchWithinPolygon() {
    for (var i = 0; i < markers.length; i++) {
      if (window.google.maps.geometry.poly.containsLocation(markers[i].position, polygon)) {
        markers[i].setMap(map);
      } else {
        markers[i].setMap(null);
      }
    }
  }
  function focusOnArea() {
    // Initialize the geocoder.
    var geocoder = new window.google.maps.Geocoder()
    // Get the address or place that the user entered.
    var address = window.document.getElementById('focus-on-area-text').value;
    // Make sure the address isn't blank.
    if (address == '') {
      window.alert('You must enter an area, or address.')
    } else {
      // Geocode the address/area entered to get the center. Then, center the map
      // on it and zoom in
      geocoder.geocode(
        { address: address,
          componentRestrictions: {locality: 'Lyons'}
        }, function(results, status) {
          if (status == window.google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location)
            map.setZoom(15);
          } else if
            (status == window.google.maps.GeocoderStatus.ZERO_RESULTS) {
              window.alert('Zero results, try another search')

            } else if
              (status == window.google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
                window.alert('You are over your search query limit, try again later')

              } else if
                (status == window.google.maps.GeocoderStatus.REQUEST_DENIED) {
                  window.alert('Request Denied, try another search')

                } else if
                  (status == window.google.maps.GeocoderStatus.INVALID_REQUEST) {
                    window.alert('Inalid Request, try another search or contact developer')

                  }  else if
                    (status == window.google.maps.GeocoderStatus.UNKNOWN_ERROR) {
                      window.alert('Unknown Error, possible issue with server try again later')

                    } else if
                      (status == window.google.maps.GeocoderStatus.ERROR) {
                        window.alert('Error, possible issue with server try again')

                      } else {
                        window.alert('We could not find that location - try entering a more' +
                            ' specific place.');
                      }
        })
    }
  }

export default class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
        map: {}
      }
  }

  componentDidMount () {
     const script = document.createElement('script')
     script.async = true
     script.defer = true
     script.src = "https://maps.googleapis.com/maps/api/js?libraries=drawing,geometry&key=AIzaSyAWiSZ2beXFrSFWzZVRgF122wCkVf4P67Y&v=3.32&callback=initMap"
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
              <hr />
            <input id="focus-on-area-text" type="text" placeholder="Enter search area" />
            <input id="focus-on-area" className="btn" type="button" value="Search" />
          </div>
        </div>
        </div>
      <div id="map" />
    </div>
    )
  }
}
