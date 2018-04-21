import React, { Component } from 'react';
import axios from 'axios';

// local imports
import './css/App.css'
//import './css/weather-icons.css'

import UserInput from './components/UserInput';
import City from './components/City';
import Widget from './components/Widget';
import Temp from './components/Temperature';
import Time from './components/Time';
import Footer from './components/Footer';

export default class App extends Component {
  constructor(props) {
      super(props);

        this.state = {city: "", country: ""};

// API address + API key
        this.rootURL = 'http://api.openweathermap.org/data/2.5/weather?id=524901&APPID=eb0141d1caa1cb34b0f543fa58265964&units=metric';
  }

  componentDidMount(city) {
    // API call
   axios.get(this.rootURL + '&q=London,Uk')
    .then(response => {

        this.setState({
          name: response.data.name,
          temperature: Math.round(response.data.main.temp), //rounded to display as 2 digits
          id: response.data.weather[0].id
        });
      });

  };


  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let newValue = this.state.city.replace(/\s/g, '+') + ',' + this.state.country;

// Concatenates root URL with city and country given by the user
    axios.get(this.rootURL + '&q=' + newValue)
      .then(response => {
        this.setState({
          name: response.data.name,
          temperature: Math.round(response.data.main.temp),
          id: response.data.weather[0].id
        })
      })
}

  render() {
    return (
    <div className="container">
      <UserInput value={this.state.value} onChange={this.handleChange} onSubmit={this.handleSubmit} />
    <City name={this.state.name} />
    <Widget iconId={this.state.id} />
    <Temp temperature={this.state.temperature} />
    <Time text={this.state.text}/>
    <Footer />
    </div>
    );
  }
}
