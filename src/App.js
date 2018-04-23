import React, { Component } from 'react';
import axios from 'axios';

// local imports
import './css/App.css'


import UserInput from './components/UserInput';
import City from './components/City';
import Widget from './components/Widget';
import Temp from './components/Temperature';
import Time from './components/Time';
import Forecast from './components/Forecast';
import Footer from './components/Footer';

export default class App extends Component {
  constructor(props) {
      super(props);


        this.state = {name:  "loading...", city: "", country: "", days: []};

// Current weather API address + API key
        this.currentWeatherURL = 'http://api.openweathermap.org/data/2.5/weather?id=524901&APPID=eb0141d1caa1cb34b0f543fa58265964&units=metric';

        this.forecastURL = "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=eb0141d1caa1cb34b0f543fa58265964&units=metric";
this.location = 'London,Uk';
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
        // 5 day forecast
        days: [
           {day: 1, temp: list[6].main.temp},
           {day: 2, temp: list[14].main.temp},
           {day: 3, temp: list[22].main.temp},
           {day: 4, temp: list[30].main.temp},
           {day: 5, temp: list[38].main.temp}
         ],
         })


}))
    .catch(error => {
      const errorMsg = "There was an error during loading. Please refresh the page";
      alert(errorMsg);
      console.log(errorMsg);
  })
}

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.location = this.state.city.replace(/\s/g, '+') + ',' + this.state.country;



// Concatenates root URL with city and country given by the user
axios.all([this.getCurrentWeather(), this.getForecast()])
   .then(axios.spread((current, forecast) => {

         let list = forecast.data.list;

     this.setState({
       // Current weather
        name: current.data.name,
        currentTemperature: Math.round(current.data.main.temp), //rounded to display as 2 digits
        id: current.data.weather[0].id,
     // 5 day forecast
     days: [
       {day: 1, temp: list[6].main.temp},
       {day: 2, temp: list[14].main.temp},
       {day: 3, temp: list[22].main.temp},
       {day: 4, temp: list[30].main.temp},
       {day: 5, temp: list[38].main.temp}
      ],
      })
}))
}

  render() {

    return (

    <div className="container">
      <UserInput value={this.state.value} onChange={this.handleChange} onSubmit={this.handleSubmit} />
    <City name={this.state.name} />
    <Widget iconId={this.state.id} />
    <Temp currentTemperature={this.state.currentTemperature} />
    <Time text={this.state.text}/>
    <Forecast days={this.state.days} names={this.state.names} />
    <Footer />
    </div>
    );
  }
}
