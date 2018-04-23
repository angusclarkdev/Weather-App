import React from 'react';

// local imports


const Forecast = (props) =>  {
//console.log(props.days);
const listItems = props.days.map(day => {
  //return <li> {day} </li>
  return <li key={day.day}> {day.temp} </li>
})

return (
  <ul>

{listItems}

   </ul>
)

}

export default Forecast;
