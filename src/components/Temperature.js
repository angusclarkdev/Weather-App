import React from 'react';

// local imports
import '../css/components/Temperature.css'

const Temperature = (props) => {

    return (
    <div className="temperature">
        <h2 title={"Current temperature"}> {props.currentTemperature + ' ℃'} </h2>
    </div>
    );
  }

export default Temperature;
