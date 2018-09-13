import React, { Component } from 'react'
// import { Map, InfoWindow, Marker, GoogleApiWrapper, Map } from 'google-maps-react'
//import { withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import scriptLoader from 'react-async-script-loader'
import Search from './components/Search.js'
import './App.css'

let map
let markers = []
let query = ''
let filterValue = null
let locations = []
let marker

window.initMap = function() {
let styledMapType = new window.google.maps.StyledMapType(require('./utilities/map.json'),{name: 'Styled Map'})

  map = new window.google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.2244, lng: -105.2689},
    zoom: 17,
    styles: styledMapType,
    mapTypeControlOptions: { mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map'] }
  })

  let locations = require('./utilities/locations.json')

  let largeInfowindow = new window.google.maps.InfoWindow()
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
      // marker.addListener('click', function() {
      //   populateInfoWindow(this, largeInfowindow)
      // })
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

export class App extends Component {
  constructor(props) {
      super(props)
      this.state = {
        map: {},
        markers: markers
      }
  }

  // componentDidUpdate(prevProps, prevState) {
  //     if (prevProps.google !== this.props.google) {
  //       this.initMap()
  //     }
  // }
  componentDidMount () {
  //   try {
  //     const script = document.createElement('script')
  //     script.defer = true
  //     script.async = true
  //     script.src = "https://maps.googleapis.com/maps/api/js?libraries=places,drawing,geometry&key=AIzaSyAWiSZ2beXFrSFWzZVRgF122wCkVf4P67Y&v=3.32&callback=initMap"
  //     document.head.appendChild(script)
  //     this.setState({
  //       markers: markers,
  //       map: {}
  //     })
  //   }
  //   catch (error) {
  //   console.log(this.state)
  //   this.setState(() => {throw error})
  //   window.alert(error, 'Google maps not loaded, try again')
  //   }
  }

  render() {
    const {  markers, locations, marker } = this.state
    return (
    <div>

      <Search
        locations={ locations }
        markers={ markers }
        marker={ marker }
      />
    <div id="map" />
    </div>
    )
  }
}

export default scriptLoader(
  ['https://maps.googleapis.com/maps/api/js?libraries=places,drawing,geometry&key=AIzaSyAWiSZ2beXFrSFWzZVRgF122wCkVf4P67Y&v=3.32&callback=initMap']
)(App)
