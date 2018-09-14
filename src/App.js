import React, { Component } from 'react'
//import Search from './components/Search.js'
import './App.css'

let map
let locations
let markers = []
//let query
let marker

export default class App extends Component {
  constructor(props) {
      super(props)
      window.initMap = this.initMap.bind(this)
      this.state = {
      locations: locations,
      map: {},
      //infoWindow: ''
    }
  }

  componentDidMount () {
    console.log('Component mounted and script loaded')
    //after moving initMap function into the component, had to bind this
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

    let infoWindow = new window.google.maps.InfoWindow({})

    // window.google.maps.event.addListener(infoWindow, 'click', function() {
    //   this.infowindow.close()
    // })

    console.log('Map initialized')

    this.setState({
      'map': map,
      //'locations': locations,
      'infoWindow': infoWindow
    })

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

  let locations = require('./utilities/locations.json')
  locations.forEach(location => {
    let title = location.title
    let position = location.location
    console.log('Location', title, 'loaded')

    let marker = new window.google.maps.Marker({
      position: position,
      title: title,
      draggable: false,
      animation: window.google.maps.Animation.DROP,
      id: title+position,
      icon: defaultIcon,
      map: map
    })

    markers.push(marker)
    //Create an onclick event to open an infowindow at each marker.
    marker.addListener('click', function() {
      populateInfoWindow(this, largeInfowindow)
    })
    marker.addListener('mouseover', function() {
      this.setIcon(highlightedIcon)
    })
    marker.addListener('mouseout', function() {
      this.setIcon(defaultIcon)
    })
    this.setState({
        'locations': locations,
        'markers': markers,
        'map': map,
        'marker': marker
      })

  })
  console.log('State updated to', this.state)

    // for (let i = 0; i < locations.length; i++) {
    //   // Get the position from the location array.
    //   let position = locations[i].location
    //   let title = locations[i].title
    //   // Create a marker per location, and put into markers array.
    //   let marker = new window.google.maps.Marker({
    //     position: position,
    //     title: title,
    //     draggable: false,
    //     animation: window.google.maps.Animation.DROP,
    //     id: i,
    //     icon: defaultIcon
    //   })
    //   markers.push(marker)
    //   marker.addListener('mouseover', function() {
    //     this.setIcon(highlightedIcon)
    //   })
    //   marker.addListener('mouseout', function() {
    //     this.setIcon(defaultIcon)
    //   })
    //   this.setState({
    //     'locations': locations,
    //     'markers': markers,
    //   })
    // }
    this.showListings()

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
        //https://developer.foursquare.com/docs/api/venues/search
        let clientID = 'REFU10YE0NIIQBQIMCOM21L5BYLT40CXHKS5AALXYPW3OPBQ'
        let clientSecret = 'RZCUWYLNDIXBG5SUFE5XSNWVVNZOHPEGZELRZP1ELYGLV1HC'
        fetch('https://api.foursquare.com/v2/venues/search?client_id='+ clientID + '&client_secret='+ clientSecret + '&v=20180323&limit=1&ll='+ marker.getPosition().lat() + ','+ marker.getPosition().lng())
        //.then(response => response.json(data))
        .then(response => {
          response.json().then(function(data) {
          //logs the name of the business when marker is selected
          //return data, then the response, then the venues array, limited to 1
          //then return the name
          console.log(data.response.venues[0].name, data.response.venues[0].stats.checkinsCount)

          infowindow.setContent('<div>' + data.response.venues[0].name + '<br />' + data.response.venues[0].location.formattedAddress[0] + '<br />' +  " Checkins " + data.response.venues[0].stats.checkinsCount + '<br />' +  '</div>')
          })
        }).catch(function() {
          console.log('Foursquare API loading error')
        })
        infowindow.open(map, marker)
      }
    }

  }

    // This function will loop through the markers array and display them all.
     showListings() {
      let bounds = new window.google.maps.LatLngBounds()
      // Extend the boundaries of the map for each marker and display the marker
      for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(map)
        bounds.extend(markers[i].position)
      }
      map.fitBounds(bounds)
    }
    // This function will loop through the listings and hide them all.
     hideMarkers(markers) {
      for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null)
      }
    }

  filterMarkers = (query) => {
    //this.props.infowindow.close()
    //const { value } = event.target.value
    let filteredMarkers = []
    const { locations, marker } = this.props
    locations.forEach(location => {
      if(location.title >= 0) {
        this.showListings(marker)
      } else {
        this.props.hideMarkers(marker)
      }
    })
    this.setState({
        query: query.trim(),
        filteredMarkers: filteredMarkers
      })
  }

  render() {
    //const {  markers, locations, marker, infoWindow } = this.state
    return (
    <div>
      <div id="map" />
    </div>
    )
  }

}
