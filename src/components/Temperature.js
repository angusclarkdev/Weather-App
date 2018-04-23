import React, { Component } from 'react';

// local imports


class Temperature extends Component {

  render() {
    return (
    <div>
        <h2> {this.props.currentTemperature + ' ℃'} </h2>
    </div>
    );
  }
}

export default Temperature;
