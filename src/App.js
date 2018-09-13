import React, { Component } from 'react'
// import { Map, InfoWindow, Marker, GoogleApiWrapper, Map } from 'google-maps-react'
//import { withGoogleMap, GoogleMap, Marker } from "react-google-maps"
// import scriptLoader from 'react-async-script-loader'
import Search from './components/Search.js'
import './App.css'

let map

export default class App extends Component {
  constructor(props) {
      super(props)
      this.state = {
        locations: require('./utilities/locations.json')
      }
  }

  componentDidMount () {
    window.initMap = this.initMap
    try {
      const script = document.createElement('script')
      script.defer = true
      script.async = true
      script.src = "https://maps.googleapis.com/maps/api/js?libraries=places,drawing,geometry&key=AIzaSyAWiSZ2beXFrSFWzZVRgF122wCkVf4P67Y&v=3.32&callback=initMap"
      document.head.appendChild(script)
      script.onerror = function() {
        window.alert("Google Maps can't load, try again")
      }
    }catch (error) {
      console.log(this.state)
      this.setState(() => {throw error})
      window.alert(error, 'Google maps not loaded, try again')
      }
  }

  initMap() {
    let styledMapType = new window.google.maps.StyledMapType(require('./utilities/map.json'),{name: 'Styled Map'})
    map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.2244, lng: -105.2689},
      zoom: 15,
      styles: styledMapType,
      mapTypeControlOptions: { mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map'] }
    })
    map.mapTypes.set('styled_map', styledMapType)
    map.setMapTypeId('styled_map')
    console.log('Map initialized')
  }

  render() {
    const {  markers, locations, marker, filteredMarkers } = this.state
    return (
    <div>
      <div id="map" />
    </div>
    )
  }
}

// export default scriptLoader(
//   ['https://maps.googleapis.com/maps/api/js?libraries=places,drawing,geometry&key=AIzaSyAWiSZ2beXFrSFWzZVRgF122wCkVf4P67Y&v=3.32&callback=initMap']
// )(App)
