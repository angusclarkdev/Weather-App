import React from 'react';

// local imports
import "../css/components/UserInput.css"

const UserInput = (props) => {
  return (
    <div className="userinput">
      <form onSubmit={props.onSubmit} >
          <input type="text" name="city" value={props.city} onChange={props.onChange} placeholder="Enter a city..."/>
          <input type="text" name="country" value={props.country} onChange={props.onChange} placeholder="Enter a country..."/>
        <input className="submit" type="submit" />
      </form>
    </div>
    );
  };
export default UserInput;
