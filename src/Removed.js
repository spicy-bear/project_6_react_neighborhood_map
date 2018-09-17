<input
  id="filterbar"
  type="text"
  placeholder="Filter"
  value={this.query}
  onChange={(event) => this.filterMarkers(event.target.value)}
/>
//openInfoWindow={this.openInfoWindow}
//closeInfoWindow={this.closeInfoWindow}
//openInfoWindow={this.props.openInfoWindow.bind(this)}
//onKeyPress={this.populateInfoWindow(this, largeInfowindow)}

//https://stackoverflow.com/questions/31858156/creating-search-bar-to-filter-array-into-table
  filterMarkers = (data) => {
    //let locations = []
    console.log(marker)
    // this.setState({
    //     locations: []
    //   })
      //for (let i = 0; i < this.state.locations.length; i++) {
        //markers.setMap(null)
    //}
    //console.log('filtering', query)
    // this.state.locations.forEach(location => {
    //     location.setMap(null)
    //   // if(location.title.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
    //   //   this.showListings(location)
    //   // } else {
    //   //   this.hideMarkers(location)
    //   // }
    // })
    // this.setState({
    //     //query: query.trim(),
    //     locations: []
    //   })
  }

  setTimeout(
          document.getElementById('filterMarker').innerHTML=('key='this.index).addEventListener('click', function(){
            populateInfoWindow(this.children, largeInfowindow)
            console.log('button clicked', location.title)
          })
  , 1000)


  this.setState({
      'locations': locations,
      'markers': markers,
      //'marker': marker,
      'locationslist': locationslist
    })

    hideOtherMarkers(marker) {
      // for (let i = 0; i < markers.length; i++) {
      //
      let locations = []
      this.state.markers.forEach(marker => {
        if (this.marker != this.markers) {
          markers.setMap(null)
        } else {
          marker.setMap(map)
        }

      console.log(this.marker)
       })
      }





// Create a searchbox in order to execute a places search
let searchBox = new window.google.maps.places.SearchBox(
    document.getElementById('filterbar'))
// Bias the searchbox to within the bounds of the map.
searchBox.setBounds(map.getBounds())

//document.getElementById('filterbar').addEventListener('click', searchBoxPlaces)

searchBox.addListener('filterbar', function() {
  searchBoxPlaces(this.query.value)
})
// This function fires when the user selects a searchbox picklist item.
 // It will do a nearby search using the selected query string or place.
 function searchBoxPlaces(searchBox) {
   this.hideMarkers(markers)
   let places = this.state.locations
   // For each place, get the icon, name and location.
   createMarkersForPlaces(places)
   if (places.length === 0) {
     window.alert('We did not find any places matching that search! Try a bigger area or a different city')
   }
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
       if (placeInfoWindow.marker === this) {
         console.log("This infowindow already is on this marker!")
       }
     })
     markers.push(marker)
     if (place.geometry.viewport) {
       // Only geocodes have viewport.
       bounds.union(place.geometry.viewport)
     } else {
       bounds.extend(place.geometry.location)
     }
   }
   map.fitBounds(bounds)
 }



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
    // }<div>
















  <input
    id="filterMarkersSearch"
    type="text"
    placeholder="Filter"
    value={this.state.query}
    //onChange={(event) => this.filterMarkers(event.target.value).bind(this)}
  />
  {console.log(this.state.query)}

  <div id="filterList">
    <ol>
    {this.state.markers && this.state.markers.map(marker =>
      <li key={marker.id}>
        <input
          tabIndex="0"
          id="filterMarker"
          className="btn"
          type="button"
          value={marker.title}
        />
      </li>
      )}

    </ol>
  </div>
</div>














<Search
  onDisplayFilteredMarkers={this.displayFilteredMarkers}
  filteredMarkers={filteredMarkers}
  locations={ locations }
  markers={ markers }
  marker={ marker }
/>
<Search
  inforWindow={infoWindow}
  locations={ locations }
  markers={ markers }
  marker={ marker }
/>

  //   //let filter =  event
  //   let filteredMarkers = this.props.markers
  //   if ( filter.length >= 0 ) {
  //     {filter: filter.trim()}
  //   }
  //     // filteredMarkers.push(filter)
  //     // filter => (this.setState({filteredMarkers: filter}))
  //     // console.log(filteredMarkers)
  //   this.props.markers.forEach(function(location) {
  //     if (filteredMarkers.longname.indexOf(filter.toLowerCase()) >= 0) {
  //       filteredMarkers.marker.setVisible(true)
  //       filteredMarkers.push(filter)
  //     } else {
  //       filteredMarkers.marker.setVisible(false)
  //     }
  //   })
  //   this.setState({
  //     filteredMarkers: filteredMarkers,
  //     filter: filter
  //   })

  displayFilteredMarkers = (filteredMarker) => {
    const { marker } = this.props
    const filteredMarkers = this.state.markers
    filteredMarkers.push(filteredMarker)
    this.setState({markers: filteredMarkers})
  }


let map
let markers = []
let query = ''
let filterValue = null
let marker
let locations = require('./utilities/locations.json')

window.initMap = function() {
let styledMapType = new window.google.maps.StyledMapType(require('./utilities/map.json'),{name: 'Styled Map'})

  map = new window.google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.2244, lng: -105.2689},
    zoom: 17,
    styles: styledMapType,
    mapTypeControlOptions: { mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map'] }
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




































//removed show and hide markers

document.getElementById('hide-listings').addEventListener('click', hideMarkers)
document.getElementById('show-listings').addEventListener('click', showListings)


<input id="show-listings" className="btn" type="button" value="Show Listings" />
<input id="hide-listings" className="btn" type="button" value="Hide Listings" />



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



  // filterMarkers(event) {
  //   var locations = []
  //   this.location.forEach(function(location){
  //     if (location.length >= 0) {
  //       location.marker.setVisible(true)
  //       location.markers.push(location)
  //     }
  //     else {
  //       location.markers.setVisible(false)
  //     }
  //   })
  //
  //   this.setState({
  //     query: event.target.value,
  //     locations: locations
  //   })
  // }


  //   try {
  //   const response = await fetch(`https://maps.googleapis.com/maps/api/js?libraries=places,drawing,geometry&key=AIzaSyAWiSZ2beXFrSFWzZVRgF122wCkVf4P67Y&v=3.32&callback=initMap`)
  //   if (!response.OK) {
  //     throw Error(response.statusText);
  //   }
  //   const json = await response.json();
  //   this.setState({ locations, map, markers });
  // } catch (error) {
  //   console.log(error);
  // }

  //    try {
  //     const script = document.createElement('script')
  //     script.defer = true
  //     script.await = true
  //     script.src = "https://maps.googleapis.com/maps/api/js?libraries=places,drawing,geometry&key=AIzaSyAWiSZ2beXFrSFWzZVRgF122wCkVf4P67Y&v=3.32&callback=initMap"
  //     document.head.appendChild(script)
  //     this.setState({
  //       locations: locations,
  //       markers: markers,
  //       map: {}
  //     })
  // console.log(this.state.locations)
  //     }
  //     // if (this.state === undefined) {
  //     //   window.alert('undefined')
  //     // } else {
  //     //     console.log(this.state)
  //     // }
  //     catch (error) {
  //     console.log(this.state)
  //       window.alert(error, 'Google maps not loaded, try again')
  //     }


    // componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed }) {
    //     if (isScriptLoaded && !this.props.isScriptLoaded) {
    //       // load finished
    //       if (isScriptLoadSucceed) {
    //         window.initMap()
    //       }
    //       else {
    //         this.props.onError(),
    //         window.alert('Google maps not loaded, try again')
    //       }
    //     }
    //   }
    //
    // async componentDidMount () {
    //   const { isScriptLoaded, isScriptLoadSucceed } = this.props
    //   if (isScriptLoaded && isScriptLoadSucceed) {
    //     window.initMap()
    //   }
    // }
  // async componentWillMount() {
  //   try {
  //     const script = document.createElement('script')
  //     script.defer = true
  //     //script.await = true
  //     script.src = "https://maps.googleapis.com/maps/api/js?libraries=places,drawing,geometry&key=AIzaSyAWiSZ2beXFrSFWzZVRgF122wCkVf4P67&v=3.32&callback=initMap"
  //     //removed last key, Y
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
  //
  // }


let polygon = null
let placeMarkers = []







//removed drawing

document.getElementById('toggle-drawing').addEventListener('click', function() {
  toggleDrawing(drawingManager)
})

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

<input id="toggle-drawing" className="btn" type="button" value="Drawing Tools" />

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














//removed calculate distance

document.getElementById('toggle-distance').addEventListener('click', function() {
  toggleDistance()
})

<input id="toggle-distance" className="btn" type="button" value="Calculate"/>
<hr />


//removed search
<input id="toggle-search" className="btn" type="button" value="Search"/>



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



//This shows and hides (respectively) the search options.
function toggleDistance() {
  let distanceSearch = document.getElementById("calulatedDistance")
      if (distanceSearch.style.display === "none") {
          distanceSearch.style.display = "inline-block"
      }  else {
          distanceSearch.style.display = "none"
      }
}
















//removed autocomplete
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









////removed panorama





fetch(`https://api.yelp.com/v3/businesses/lyons-classic-pinball-lyons-2`, {
method: 'GET',
//mode: "no-cors",
headers: {
    Authorization: `Bearer <Qf4UClfZBE6IT3Q49bHr_e9qUZqrkdBRBl_9HsynPTUAIDRT-GzMKEvRTfaRJTjxxoIJ8R7weAilZavjhCwbUC5RJncdvlbkNtR-MzbeemwxGvUde5VxmCIDx-6aW3Yx>`
}
}).then(function(response) {
  debugger
}).catch(function(err) {
  console.log(err);
})



















//removed search button
document.getElementById('toggle-search').addEventListener('click', function() {
  toggleSearch()
})


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

//filter
let filterMarkersTitle = document.getElementById("filter-markers-title")
    if (filterMarkersTitle.style.display === "none") {
        filterMarkersTitle.style.display = "inline-block"
    } else {
        filterMarkersTitle.style.display = "none"
    }
let filterMarkersSearch = document.getElementById("filter-markers-search")
    if (filterMarkersSearch.style.display === "none") {
        filterMarkersSearch.style.display = "inline-block"
    } else {
        filterMarkersSearch.style.display = "none"
    }
let filterMarkersButton = document.getElementById("filtermarkers")
    if (filterMarkersButton.style.display === "none") {
        filterMarkersButton.style.display = "inline-block"
    } else {
        filterMarkersButton.style.display = "none"
    }


    <span id="area-search-title" className="text">Search for an area or city </span>
    <input id="focus-on-area-text" type="text" placeholder="Enter search area"/>
    <input id="focus-on-area" className="btn" type="button" value="Search"/>

    <div id="space">
    <span id="places-search-title" className="text">Search for nearby places </span>
    <input id="places-search" type="text" placeholder="Ex: local brewery" />
    <input id="go-places" className="btn" type="button" value="Find" />
    </div>

    <div id="filterMarkersdiv">
    <span id="filter-markers-title" className="text">Filter visible markers </span>
    <input id="filter-markers-search" type="text" placeholder="Lyons Classic Pinball" />
    <input id="filtermarkers" className="btn" type="button" value="Filter" />
    </div>


      //This shows and hides (respectively) the search options.
      function toggleSearch() {
        let filerMenu = document.getElementById("filterMenu")
          if (filerMenu.style.display === "none") {
              filerMenu.style.display = "inline"
          } else {
              filerMenu.style.display = "none"
          }
      }













      function filterObjects() {
      let filterValue = document.getElementById('filter-markers-search').value
      let filterButton = document.getElementById('filtermarkers').addEventListener(filterValue, function(event) {
        // First, check if there is an existing polygon.
        // If there is, get rid of it and remove the markers
        if (filterValue) {
          filterValue.setMap(null)
          hideMarkers(markers)
        }
        // Searching within the polygon.
        searchWithinFilter()
        // Make sure the search is re-done if the poly is changed.
        filterValue.getPath().addListener('set_at', searchWithinFilter)
        filterValue.getPath().addListener('insert_at', searchWithinFilter)
        //polygon.getPath().computeArea(polyon)
        })
        }
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
       // This function fires when the user select "find" on the places search.
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






















//removed bar up TOP_LEFT

<div className="container">
 <div className="options-box">
 </div>
</div>




















////


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








////

  function searchWithinFilter() {
    for (let i = 0; i < markers.length; i++) {
      if (window.google.maps.geometry.poly.containsLocation(markers[i].position, filterValue)) {
        markers[i].setMap(map)
      } else {
        markers[i].setMap(null)
      }
    }
  }













/////
<div id="filterMenu">
  <ol>
    <li>
    <input id="" className="filter" type="button" value="Lyons Classic Pinball"/>
    </li>
    <li>
    <input id="" className="filter" type="button" value="Planet Bluegrass"/>
    </li>
    <li>
    <input id="" className="filter" type="button" value="The Stone Cup"/>
    </li>
    <li>
    <input id="" className="filter" type="button" value="Oskar Blues Grill & Brew"/>
    </li>
    <li>
    <input id="" className="filter" type="button" value="The Quarry Self-Serve Watering Hole"/>
    </li>
  </ol>
</div>





























/////css
.container {
   height: 100%;
   position: relative;
}
#hide-listings, #show-listings {
  width: 48%;
}
.options-box {
   background: #fff;
   border: 1px solid #999;
   border-radius: 2px;
   height: 100%;
   line-height: 10px;
   padding: 10px 10px 10px 10px;
   text-align: left;
   width: 100%;
   position: relative;
}
#focus-on-area-text, #places-search, #filter-markers-search {
  position: relative;
  width: 30%;
  height: 22px;
  display:none;
  text-align: left;
}
#places-search-title, #area-search-title, #filter-markers-title {
  display:none;
  min-width: 160px;
  max-width: 160px;
}
#focus-on-area, #go-places {
  width: 24%;
  margin-left: 10px;
  display:none;
}
#space, #filterMarkersdiv {
  margin-top:8px;
}
#toggle-distance{
  width: 27%;
  position: relative;
  margin-left: 10px;
}
#calulatedDistance{
  padding-top:1%;
  display:none;
  min-width:100%;
  max-width:100%;
}
#search-within-time {
  width: 24%;
  margin-left: 10px;
}
#search-within-time-text {
  width: 30%;
  position: relative;
  height: 22px;
}

#highwaysCheckboxId, #tollsCheckboxId, #ferriesCheckboxId {
    height: 20px;
    width: 20px;
}
