import React from 'react';

// local imports
import "../css/components/City.css"

const City = (props) =>  {


    return (

    <div className="city">
      <h1 title={"Name of City"}> {props.name} </h1>
    </div>
    );
  }

export default City;
