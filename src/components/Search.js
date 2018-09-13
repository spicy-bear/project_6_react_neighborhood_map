import React, { Component } from 'react'
import '../App.css'


export default class Search extends Component {
  constructor(props) {
    super(props)
      this.state = {
        query: '',
        // markers: this.props.markers,
        // locations: this.props.locations
        // filteredMarkers: this.props.markers,
      }
  }

  // filterMarkers = (filter) => {
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
  // }

  render() {
    //const { filteredMarkers } = this.state
    const { markers, locations, marker } = this.props
    return (
    <div>
      <input
        id="filterMarkersSearch"
        type="text"
        placeholder="Filter"
        value={this.state.query}
        //onChange={(event) => this.filterMarkers(event.target.value)}
      />

      <div id="filterList">
        <ol>
        {this.props.markers && this.props.markers.map(marker =>
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
    )
  }
}
