import React, { Component } from 'react'
import Search from './Search.js'

export default class Filter extends Component {
  constructor(props) {
    super(props)
      this.state = {}
  }

  render() {
    const { locations } = this.state
    const { marker, markers } = this.props

    return (
      <Search
        locations={ locations }
        marker={ marker }
        markers={ markers }
      />
    )
  }

}
