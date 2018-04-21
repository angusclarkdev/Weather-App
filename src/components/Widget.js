import React from 'react';

// local imports
import '../css/weather-icons.css'
import '../css/components/Widget.css'

const Widget = (props) => {

    return (
    <div>
      <i className={"wi wi-owm-" + props.iconId}> </i>
    </div>
    );
  }

export default Widget;
