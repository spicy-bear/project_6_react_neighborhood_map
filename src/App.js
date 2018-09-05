import React, { Component } from 'react'
import './App.css'

let map;
let markers = [];

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

    let largeInfowindow = new window.google.maps.InfoWindow();
    let icon = {
      anchor: new window.google.maps.Point(172.268, 501.67),
      // url: 'https://www.shareicon.net/data/128x128/2015/09/27/108149_map_512x512.png',
      // scaledSize: new window.google.maps.Size(30, 30)
      path: 'M 172.268,501.67 C 26.97,291.031 0,269.413 0,192 0,85.961 85.961,0 192,0 c 106.039,0 192,85.961 192,192 0,77.413 -26.97,99.031 -172.268,309.67 -9.535,13.774 -29.93,13.773 -39.464,0 z',
        fillColor: '#000000',
        fillOpacity: 1,
        strokeColor: '#000',
        strokeWeight: 2,
        scale: .06
}

    // Style the markers a bit. This will be our listing marker icon.
    let defaultIcon = icon;
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
      let position = locations[i].location;
      let title = locations[i].title;
      // Create a marker per location, and put into markers array.
      let marker = new window.google.maps.Marker({
        position: position,
        title: title,
        draggable: false,
        animation: window.google.maps.Animation.DROP,
        id: i,
        icon: icon
      })
      map.mapTypes.set('styled_map', styledMapType);
      map.setMapTypeId('styled_map');
      // Push the marker to our array of markers.
      markers.push(marker)
      // Create an onclick event to open an infowindow at each marker.
      marker.addListener('click', function() {
        populateInfoWindow(this, largeInfowindow);
      })
      // Two event listeners - one for mouseover, one for mouseout,
      // to change the colors back and forth.
      marker.addListener('mouseover', function() {
        this.setIcon(highlightedIcon);
      });
      marker.addListener('mouseout', function() {
        this.setIcon(defaultIcon);
      });
    }
    showListings()
    document.getElementById('hide-listings').addEventListener('click', hideListings);
    document.getElementById('show-listings').addEventListener('click', showListings);

  }

  // This function populates the infowindow when the marker is clicked. We'll only allow
  // one infowindow which will open at the marker that is clicked, and populate based
  // on that markers position.
  function populateInfoWindow(marker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker !== marker) {
      infowindow.marker = marker;
      infowindow.setContent('<div>' + marker.title + '</div>');
      infowindow.open(map, marker);
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick',function(){
        infowindow.setMarker = null;
      });
    }
  }

// This function will loop through the markers array and display them all.
  function showListings() {
    let bounds = new window.google.maps.LatLngBounds();
    // Extend the boundaries of the map for each marker and display the marker
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
      bounds.extend(markers[i].position);
    }
    map.fitBounds(bounds);
  }
  // This function will loop through the listings and hide them all.
  function hideListings() {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
  }

  // This function takes in a COLOR, and then creates a new marker
  // icon of that color. The icon will be 21 px wide by 34 high, have an origin
  // of 0, 0 and be anchored at 10, 34).
  function makeMarkerIcon(markerColor) {
    var markerImage = new window.google.maps.MarkerImage(
      'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
      '|40|_|%E2%80%A2',
      new window.google.maps.Size(21, 34),
      new window.google.maps.Point(0, 0),
      new window.google.maps.Point(10, 34),
      new window.google.maps.Size(21,34));
    return markerImage;
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
     script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAWiSZ2beXFrSFWzZVRgF122wCkVf4P67Y&v=3.32&callback=initMap"
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
          </div>
        </div>
        </div>
      <div id="map" />
    </div>
    )
  }
}
