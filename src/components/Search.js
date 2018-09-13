import React, { Component } from 'react'
import '../App.css'


export default class Search extends Component {
  constructor(props) {
    super(props)
      this.state = {
      //  markers: this.props.markers
      }
  }

  render() {
    const { markers, locations } = this.props

    return (
    <div>
      <input
        id="filterMarkersSearch"
        type="text"
        placeholder="Filter"
        onChange={this.filterMarkers}
      />

      <div id="filterList">
        <ol>

        { markers && markers.map(marker =>
          <li key={marker.id}>
            <input
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
