import React from 'react';

// local imports


const UserInput = (props) => {
  return (
    <div>
      <form onSubmit={props.onSubmit} >
          <input type="text" name="city" value={props.city} onChange={props.onChange} placeholder="Enter a city..."/>
          <input type="text" name="country" value={props.country} onChange={props.onChange} placeholder="Enter a country..."/>
        <input type="submit" city="Submit" />
      </form>
    </div>
    );
  };
export default UserInput;
