import React, { Component } from 'react'
import './App.css'

let map
let locations = require('./utilities/locations.json')
let markers = []
let query = ''
let marker
let locationslist
let gm_authFailure

export default class App extends Component {
  state = {
    locations: locations,
    map: {},
    markers: markers,
    query: query
  }

  componentDidMount () {
    //console.log('Component mounted and script loaded')
    //after moving initMap function into the component, had to bind this
    try {
      const script = document.createElement('script')
      script.defer = true
      script.async = true
      script.mode = 'no-cors'
      script.header= {
        'accept': 'application/json, application/json',
        'accept-encoding': 'gzip, deflate, gzip, deflate',
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
      script.src = "https://maps.googleapis.com/maps/api/js?libraries=places,drawing,geometry&key=AIzaSyAWiSZ2beXFrSFWzZVRgF122wCkVf4P67Y&v=3.32&callback=initMap"
      document.head.appendChild(script)
      script.onerror = function() {
        window.alert("Google Maps can't load, try again")
      }
      this.setState({locations: locations})
      window.initMap = this.initMap.bind(this)

    }catch (error) {
      console.log(this.state)
      this.setState(() => {throw error})
      window.alert(error, 'Google maps not loaded, try again')
      }
  }

  gm_authFailure() {
      alert("Google Map authorization error. Please try refreshing the page.");
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

    this.setState({
      'map': map,
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

  locations.forEach(location => {
    let title = location.title
    let position = location.location

    let marker = new window.google.maps.Marker({
      position: position,
      title: title,
      draggable: false,
      animation: window.google.maps.Animation.DROP,
      id: title,
      icon: defaultIcon,
      map: map,
      visible: true
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
    // this.setState({
    //   'locations': locations,
    //   'locationslist': locationslist
    // })
  })


  //console.log('State updated to', this.state)
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
          //console.log(data.response.venues[0])
          infowindow.setContent('<div>' + data.response.venues[0].name + '<br />' + data.response.venues[0].location.formattedAddress[0] + '<br />' +  " Checkins " + data.response.venues[0].stats.checkinsCount + '</div>')
          })
        }).catch(function() {
          window.alert('Foursquare API loading error, try again later or contact your child for tech support')
        })
        infowindow.open(map, marker)
      }
    }
    this.setState({
      'locations': locations,
      'locationslist': locationslist
    })

  }

  // This function will loop through the markers array and display them all.
   showListings() {
    let bounds = new window.google.maps.LatLngBounds()
    // Extend the boundaries of the map for each marker and display the marker
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(map)
      bounds.extend(markers[i].position)
      this.setState({
        'locations': locations
      })
    }
    map.fitBounds(bounds)
  }

  handleQueryChange = e => {
    this.setState({ query: e.target.value })
  }
  hideMarkers(index){
    for (let i = 0; i < markers.length; i++) {
    markers[i].setVisible(false)
    markers[index].setVisible(true)
    if (markers[index].getAnimation() != null) {
        markers[index].setAnimation(window.google.maps.Animation.BOUNCE)

      } else {}
    }
//this.setState({ locations: markers[index] })
  }

  render() {
    console.log(this.state.query)
    return (
    <div>
      <div id="filtercontainer">
      <input
        id="filterbar"
        type="text"
        placeholder="Filter"
        onChange={this.handleQueryChange} value={this.state.query} />
        <ul>
        {
          this.state.locations
          .filter(location => location.title.toLowerCase().includes(this.state.query))
          .map(location => {
          return (
              <li
                key={location.id}
                type="button"
                className="btn"
                id="filterMarker"
                tabIndex="0"
                value={location.title}
                locations={location.location}
                //onClick={this.hideMarkers(location.id)}
                onClick={() => this.hideMarkers(location.id)}
                onChange={this.hideMarkers(location.id)}
                >
                {location.title}
              </li>
            )
            })
        }
        </ul>
      </div>
      <div id="map" />
    </div>
    )
  }

}
