import React from 'react';

// local imports
import '../../css/weather-icons.css'
import "../../css/components/Forecast/Forecast.css"

const Forecast = (props) =>  {
//console.log(props.days);
const listItems = props.hours.map(hour => {
  //return <li> {day} </li>
  return <div key={hour.hour}> <p> {hour.text} </p> <i className={"wi wi-owm-" + hour.id}> </i> <li> {hour.temp} </li> </div>
})

return (
  <section className="forecast">
{listItems}
 </section>
)

}

export default Forecast;
