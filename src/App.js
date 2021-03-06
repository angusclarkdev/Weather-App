import React, { Component } from 'react';
import axios from 'axios';

// local imports
import './css/App.css'


import UserInput from './components/UserInput';
import City from './components/City';
import Widget from './components/Widget';
import Temp from './components/Temperature';
import Time from './components/Time';
import Forecast from './components/Forecast/Forecast';
import Footer from './components/Footer';


// background image colours
const colors = {
  grey: '#D8D8D8',
  blue: '#004C99',
  yellow: '#E6B100',
  orange: '#EE4700',
  red:  '#C62600'
};

export default class App extends Component {
  constructor(props) {
      super(props);


        this.state = {name:  "loading...", city: "", currentTemperature: "",  country: "", id: "200", hours: []};

        // Current weather API address + API key
        this.currentWeatherURL = 'http://api.openweathermap.org/data/2.5/weather?id=524901&APPID=eb0141d1caa1cb34b0f543fa58265964&units=metric';

        this.forecastURL = "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=eb0141d1caa1cb34b0f543fa58265964&units=metric";
        this.location = 'London,Uk';

        this.expression = this.state.currentTemperature;
  }

  componentDidMount(city) {
    // API call
    this.getCurrentWeather = () => axios.get(this.currentWeatherURL + '&q=' + this.location);
    this.getForecast = () => axios.get(this.forecastURL + '&q=' + this.location);


    axios.all([this.getCurrentWeather(), this.getForecast()])
      .then(axios.spread((current, forecast) => {

            let list = forecast.data.list;

        this.setState({
          // Current weather
           name: current.data.name,
           currentTemperature: Math.round(current.data.main.temp), //rounded to display as 2 digits
           id: current.data.weather[0].id,

          // 5 day forecast, temperature rounded 
          hours: [
            {hour: 3, temp: Math.round(list[1].main.temp), text: "+ 3 hours", id: list[1].weather[0].id},
            {hour: 6, temp: Math.round(list[2].main.temp), text: "+ 6 hours", id: list[2].weather[0].id},
            {hour: 9, temp: Math.round(list[3].main.temp), text: "+ 9 hours", id: list[3].weather[0].id},
            {hour: 12, temp: Math.round(list[4].main.temp),text: "+ 12 hours",id: list[4].weather[0].id},
          ]
       })
}))
    // Throw message in case of error
    .catch(error => {
      const errorMsg = "There was an error during loading. Please refresh the page";
      alert(errorMsg);
      console.log(errorMsg);
    })

}

  handleChange = (event) => {
    // Update state on each keystroke
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {

    event.preventDefault();
    this.location = this.state.city.replace(/\s/g, '+') + ',' + this.state.country;

// Concatenate root URL with city and country given by the user
axios.all([this.getCurrentWeather(), this.getForecast()])
   .then(axios.spread((current, forecast) => {

         let list = forecast.data.list;

     this.setState({
       // Current weather
        name: current.data.name,
        currentTemperature: Math.round(current.data.main.temp), //round to display as 2 digits
        id: current.data.weather[0].id,
     // 5 day forecast
     hours: [
        {hour: 3, temp: list[1].main.temp, text: "+ 3 hours", id: list[1].weather[0].id},
        {hour: 6, temp: list[2].main.temp, text: "+ 6 hours", id: list[2].weather[0].id},
        {hour: 9, temp: list[3].main.temp, text: "+ 9 hours", id: list[3].weather[0].id},
        {hour: 12, temp: list[4].main.temp,text: "+ 12 hours",id: list[4].weather[0].id},

      ],
    })
}))
.catch(error => {
  const errorMsg = "There was an error during loading. Please refresh the page";
  alert(errorMsg);
  console.log(errorMsg);
})

}
// change background colour depending on temperature
renderSwitch() {
  let expr = this.state.currentTemperature;

  switch (true) {

  case expr >= 36:

  return colors.red;

  case expr >= 30:


  return colors.orange;

  case expr >= 20:


  return colors.yellow;

  case expr >= 10:

  return colors.blue;

  default:

  return "grey";
  }
}

  render() {

    return (
    <section className="container" style={{backgroundColor: this.renderSwitch()}}>
      <UserInput value={this.state.value} onChange={this.handleChange} onSubmit={this.handleSubmit} />
    <City name={this.state.name} />
    <Widget iconId={this.state.id} />
    <Temp currentTemperature={this.state.currentTemperature} />
    <Time text={this.state.text}/>
    <Forecast hours={this.state.hours} text={this.state.text} />
    <Footer />
  </section>
    );
  }
}
