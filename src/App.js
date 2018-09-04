import React, { Component } from 'react'
import './App.css'

let map;

window.initMap = function() {
   console.log('loaded')
    map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.2244, lng: -105.2689},
      zoom: 16
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
      <div>{this.map}
      <div style={{ width: 500, height: 500}} id="map" />
      </div>
    )
  }
}
