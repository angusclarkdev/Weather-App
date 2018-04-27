import React, { Component } from 'react';

// local imports
import '../css/components/Temperature.css'

class Temperature extends Component {

  render() {
    return (
    <div className="temperature">
        <h2 title={"Current temperature"}> {this.props.currentTemperature + ' ℃'} </h2>
    </div>
    );
  }
}

export default Temperature;
