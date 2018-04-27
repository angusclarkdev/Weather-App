import React from 'react';

// local imports
import '../../css/weather-icons.css'
import "../../css/components/Forecast/Forecast.css"

const Forecast = (props) =>  {

const listItems = props.hours.map(hour => {

  return <div key={hour.hour}>
           <p title={"+3,+6,+9,+12 hours"}> {hour.text} </p>
           <i className={"wi wi-owm-" + hour.id}> </i>
           <li className="sml_temperature" title={"Forecast temperature"}> {hour.temp + ' ℃'} </li>
        </div>
})

  return (
    <section className="forecast">
      {listItems}
    </section>
  )
}

export default Forecast;
