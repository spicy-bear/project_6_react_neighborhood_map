
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
