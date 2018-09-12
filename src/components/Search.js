import React, { Component } from 'react'

export default class Search extends Component {
  constructor(props) {
    super(props)
      this.state = {
        filterLocations: ''
      }
  }

  render() {
    const { locations } = this.state
    const { marker, markers } = this.props
    function filterMarkers() {
      this.setState({filterLocations: locations})
      {console.log(this.props, this.state)}

    }
    return (
    <div>
      <input
        id="filterMarkers"
        type="text"
        placeholder="Filter"
        onChange={this.filterMarkers}
        markers={markers}
        marker={marker}
      />

      <div id="filterMenu">
        <ol>
          <li>
            <input
              id={locations}
              className="filter"
              type="button"
              value={locations}
            />
          </li>
        </ol>
      </div>
    </div>
    )
  }
}
