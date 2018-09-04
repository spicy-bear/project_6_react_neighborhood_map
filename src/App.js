import React, { Component } from 'react'
import './App.css'

let map;

window.initMap = function() {
    map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.2244, lng: -105.2689},
      zoom: 16
    })
    let pinball = {lat: 40.224428, lng: -105.268916};
    let marker0 = new window.google.maps.Marker({
      position: pinball,
      map: map,
      title: 'Lyons Classic Pinball'
    })
    let bluegrass = {lat: 40.2269, lng: -105.2733};
    let marker1 = new window.google.maps.Marker({
      position: bluegrass,
      map: map,
      title: 'Planet Bluegrass'
    })
    let stonecup = {lat: 40.2245, lng: -105.2706};
    let marker3 = new window.google.maps.Marker({
      position: stonecup,
      map: map,
      title: 'The Stone Cup'
    })
    let wateringhole = {lat: 40.2227, lng: -105.2650};
    let marker4 = new window.google.maps.Marker({
      position: wateringhole,
      map: map,
      title: 'The Quarry Self-Serve Watering Hole '
    })
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
      <div id="map" />
    )
  }
}
