import React, { Component } from 'react'
import '../App.css'

let query

export default class Search extends Component {
  constructor(props) {
    super(props)
      this.state = {
        query: ''
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
    // this.props.locations.forEach((marker) => {
    // console.log(marker)
    // if(query.length >= 0) {
    // this.hideMarkers()
    //   this.props.markers.push(marker)
    // } else {
    //   this.showListings()
    // }
    this.setState({
        query: query.trim(),
        filteredMarkers: filteredMarkers
      })
  }



  render() {
    const { markers, locations, marker } = this.props

    return (
    <div>
      <input
        id="filterMarkersSearch"
        type="text"
        placeholder="Filter"
        value={this.state.query}
        onChange={(event) => this.filterMarkers(event.target.value).bind(this)}
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
              //infowindow.open(map, markers[i])
            />
          </li>
          )}

        </ol>
      </div>
    </div>
    )
  }
}
