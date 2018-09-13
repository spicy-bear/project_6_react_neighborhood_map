import React, { Component } from 'react'
import '../App.css'


export default class Search extends Component {
  constructor(props) {
    super(props)
      this.state = {
        filter: '',
        markers: this.props.markers,
        filteredMarkers: this.props.markers,
      }
  }

  filterMarkers = (filter) => {
    //let filter =  event
    let filteredMarkers = this.props.markers
    if ( filter.length >= 0 ) {
      {filter: filter.trim()}
    }
      // filteredMarkers.push(filter)
      // filter => (this.setState({filteredMarkers: filter}))
      // console.log(filteredMarkers)
    this.props.markers.forEach(function(location) {
      if (filteredMarkers.longname.indexOf(filter.toLowerCase()) >= 0) {
        filteredMarkers.marker.setVisible(true)
        filteredMarkers.push(filter)
      } else {
        filteredMarkers.marker.setVisible(false)
      }
    })
    this.setState({
      filteredMarkers: filteredMarkers,
      filter: filter
    })
  }

  render() {
    const { filteredMarkers } = this.state
    const { markers, locations } = this.props

    return (
    <div>
      <input
        id="filterMarkersSearch"
        type="text"
        placeholder="Filter"
        value={this.state.filter}
        onChange={(event) => this.filterMarkers(event.target.value)}
      />

      <div id="filterList">
        <ol>
        { this.filteredMarkers && this.filteredMarkers.map(filteredMarker =>
          <li key={filteredMarkers.id}>
            <input
              id="filterMarker"
              className="btn"
              type="button"
              value={filteredMarkers.title}
            />
          </li>
          )}

        </ol>
      </div>
    </div>
    )
  }
}
