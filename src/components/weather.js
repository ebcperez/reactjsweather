import React from 'react';
import WeatherData from './weather_data';
import axios from 'axios';

var googlekey = 'AIzaSyBQcdM4PQWH6-14r1Ldg4LjkZyfswyNZvk';
class Weather extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            value: '', //user input
            lat: 0, //latitude
            lon: 0, //longitude
            timezone: '', //timezone of local area
            currently: {}, //current weather data
            hourly: {}, //hourly forecast
            daily: {}, //daily forecast for the next week
            time: 0, //timestamp of data -> to be used for unique id
        }
        this.getLocation = this.getLocation.bind(this);
    }
    //get json from darksky api and set it to the city_weather state
    getWeatherApi(lat,lon) {
        var url = `https://api.darksky.net/forecast/febb2871126cd24613f32a79c32d4158/${lat},${lon}`;
        console.log(url)
        axios.get(url).then(response => {
            console.log(response)
            this.setState({
                timezone: response.data.timezone,
                currently: response.data.currently,
                hourly: response.data.hourly,
                daily: response.data.daily,
                time: response.data.currently.time,
            });
        }).catch(function (error) {
            console.log(error);
        });
    }
    //gets user input then gets data from api based on location input
    getLocationApi(location) {
        var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${googlekey}`;
        console.log(url)
        axios.get(url).then(response => {
            this.setState({
                lat: response.data.results[0].geometry.location.lat,
                lon: response.data.results[0].geometry.location.lng,
            })
            console.log(this.state.lat)
            console.log(this.state.lon)
            this.getWeatherApi(this.state.lat,this.state.lon);
        }).catch(function (error) {
            console.log(error);
        });
    }
    //gets user input 
    getLocation (event) {
        this.setState({value: this.refs.location.value});
        this.getLocationApi(this.refs.location.value);
        event.preventDefault();
    }

    componentDidMount () {
        this.getLocationApi(this.state.value);
    }

    render () {
        return (
            <div className='text-center'>
                <nav className="navbar navbar-fixed-top">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle btn-default" data-toggle="collapse" data-target="#myNavbar">
                                <span className="glyphicon glyphicon-search"/>
                            </button>
                        </div>
                        <div className="collapse navbar-collapse" id="myNavbar">
                            <a className="navbar-brand" href="#">ReactWeather</a>
                            <form onSubmit={this.getLocation} className="navbar-form navbar-right">
                                <div className="form-group">
                                    <input type="text" 
                                    ref='location'
                                    className='form-control' 
                                    placeholder="Search location"/>&nbsp;
                                </div>
                                <button type="submit" className="btn btn-default">Search</button>
                            </form>
                        </div>
                    </div>
                </nav>          
                <WeatherData key={this.state.time} 
                city={this.state.value} 
                currently={this.state.currently} 
                hourly={this.state.hourly} 
                daily={this.state.daily}
                week={this.state.daily.data} />
            </div>
        );
    }
}
export default Weather;