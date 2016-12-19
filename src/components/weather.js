/*eslint-disable no-unused-vars*/
import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import WeatherData from './weather_data';

var googlekey = 'AIzaSyBQcdM4PQWH6-14r1Ldg4LjkZyfswyNZvk';
class Weather extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            value: '', //user input
            lat: 0, //latitude
            lon: 0, //longitude
            currently: {}, //current weather data
            hourly: {}, //hourly forecast
            daily: {}, //daily forecast for the next week
            time: 0, //timestamp of data -> to be used for unique id
        }
        this.getLocation = this.getLocation.bind(this);
        this.getWeatherApi = this.getWeatherApi.bind(this);
    }
    //get json from darksky api
    getWeatherApi(lat,lon) {
        var self = this;
        var url = `https://api.darksky.net/forecast/febb2871126cd24613f32a79c32d4158/${lat},${lon}`;
        //callback function for ajax call that sets state values to data from response
        function setData(response) {
            console.log(response)
            self.setState({
                currently: response.currently,
                hourly: response.hourly,
                daily: response.daily,
                time: response.currently.time,
            })
        }
        //jsonp ajax call to weather api
        //used jquery instead because axios doesnt support jsonp
        $.ajax({
            url: url,
            dataType: 'jsonp',
            jsonpCallback: 'setData',
            success: function(response) {
                setData(response)
            }
        });
    }
    //gets user input then gets data from api based on location input
    getLocationApi(location) {
        var mapurl = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${googlekey}`;
        console.log(mapurl)
        axios.get(mapurl).then(response => {
            this.setState({
                lat: response.data.results[0].geometry.location.lat,
                lon: response.data.results[0].geometry.location.lng,
            })
            console.log(response.data.results[0].formatted_address)
            this.getWeatherApi(this.state.lat,this.state.lon);
        }).catch(function (error) {
            console.log(error);
        });
    }
    //gets user input 
    getLocation (event) {
        this.setState({value: this.refs.location.value}); //user input
        this.getLocationApi(this.refs.location.value);
        event.preventDefault();
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