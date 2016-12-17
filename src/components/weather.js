import React from 'react';
import $ from 'jquery';
import WeatherData from './weather_data';

//list of city ids to be used for api call
var cityIds = {
    sacramento: 5389519,
    fairfield: 4834162,
    pittsburg: 5383465,
    san_francisco: 5391959,
    new_york: 5128638,
}

class Weather extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            city_weather: [], //weather data by city from json
        }
    }
    //get json from openweather api and set it to the city_weather state
    getApiData () { 
        //join all city ids by comma so url can use them
        var ids = [];
        for (let id of Object.values(cityIds)) {
            ids.push(id);
        }
        var str_id = ids.join(',');
        $.ajax({
            url: `https://api.openweathermap.org/data/2.5/group?id=${str_id}&appid=8d6e97ea247506b13321897753fe5b3f`,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({
                    city_weather: data.list //add list of cities to city_weather state
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.log(err);
            }
        });
    }

    componentWillMount () {
        this.getApiData();
        console.log('success')
    }

    render () {
        //iterate over list of cities from json and pass data as props to weather_data.js
        var weatherInfo = this.state.city_weather.map(data => {
            //make sacramento default active tab
            var tabClass = (data.id == 5389519 ? 'tab-pane fade in active':'tab-pane fade');
            return <WeatherData key={data.id} tabClass={tabClass} tabID={data.id} sun={data.sys} city={data.name} weatherList={data.weather} temp={data.main.temp} wind={data.wind} />
        })
        //create navbar tabs with city id as href links
        var nav = this.state.city_weather.map(data => {
            var liActive = (data.id == 5389519 ? 'active':''); //make sacramento tab option active
            var link = `#${data.id}`;
            return <li className={liActive} key={data.id} ><a data-toggle="tab" href={link}>{data.name}</a></li>
        })
        return (
            <div className='text-center'>
                <ul className='nav nav-tabs'>
                    {nav}
                </ul>
                <div className='tab-content' >
                    {weatherInfo}
                </div>
            </div>
        );
    }
}

export default Weather;