import React from 'react';
import './css/weather-icons.min.css'

//renders weather data
class WeatherData extends React.Component {
    //convert meteoroligical degrees to directions
    degToDir (deg) {
        var dval = (deg/22.5)+.5;
        var darr = ["North","North-NorthEast","NorthEast","East-NorthEast","East","East-SouthEast", "SouthEast", "South-SouthEast","South","South-SouthWest","SouthWest","West-SouthWest","West","West-NorthWest","NorthWest","North-NorthWest"];
        return darr[Math.floor(dval%16)]
    }
    //convert unix timestamp to 24 hour format
    unixToTime (ut) {
        var date = new Date(ut*1000);
        //hours
        var hours = date.getHours();
        //minutes
        var minutes = "0" + date.getMinutes();
        //seconds
        var seconds = "0" + date.getSeconds();
        //display time in 10:30:23 format
        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        //append PM if hours >= 12, AM otherwise
        var time = (hours >= 12 ? 'PM':'AM');
        return `${formattedTime} ${time}`
    }
    //sets weather image based on current weather
    weatherImgCur (weather) {
        var weather_img = 'images/weather/'
        switch(weather) {
            case 'rain':
                return weather_img.concat('rain.jpg');
                break;
            case 'snow':
                return weather_img.concat('snow.jpg');
                break;
            case 'fog':
                return weather_img.concat('mist.jpg');
                break;
            case 'clear-day':
                return weather_img.concat('sunny.jpg');
                break;
            case 'clear-night':
                return weather_img.concat('clear-night.jpg');
                break;
            case 'cloudy':
                return weather_img.concat('cloudy.jpg');
                break;
            case 'partly-cloudy-day':
                return weather_img.concat('cloudy.jpg');
                break;
            case 'partly-cloudy-night':
                return weather_img.concat('cloudy.jpg');
                break;
            default:
                return weather_img.concat('sunny.jpg');
        }
    }
    //sets weather image based on weather of the week
    weatherImgWkly (weather) {
        var weather_img = 'images/weather/main/'
        switch(weather) {
            case 'rain':
                return weather_img.concat('rainy.jpg');
                break;
            case 'snow':
                return weather_img.concat('snowy.jpg');
                break;
            case 'clear-day':
                return weather_img.concat('clearday.jpg');
                break;
            case 'clear-night':
                return weather_img.concat('clearnight.jpg');
                break;
            case 'thunderstorm':
                return weather_img.concat('lightning.jpg');
                break;
            default:
                return 'images/weather/mist.jpg';
        }
    }
    //sets weather icon based on current weather
    weatherIcnCur (weather) {
        switch(weather) {
            case 'rain':
                return 'wi wi-rain';
                break;
            case 'snow':
                return 'wi wi-snow';
                break;
            case 'fog':
                return 'wi wi-fog';
                break;
            case 'clear-day':
                return 'wi wi-day-sunny';
                break;
            case 'clear-night':
                return 'wi wi-night-clear';
                break;
            case 'cloudy':
                return 'wi wi-cloudy';
                break;
            case 'partly-cloudy-day':
                return 'wi wi-day-cloudy';
                break;
            case 'partly-cloudy-night':
                return 'wi wi-night-partly-cloudy';
                break;
            default:
                return 'wi wi-day-sunny';
        }
    }

    render () {
        return (
            <div className='container-fluid' >
                <div className='row'>
                    <div className="main col-sm-12 col-md-12 col-lg-12">
                        <div className="hovereffect hovereffect-main-image">
                            <img className="img-responsive" src={this.weatherImgWkly(this.props.currently.icon)} alt='city'/>
                            <div className="main-text overlay">
                                <h2>{this.props.city}</h2>
                                <h3>{this.props.hourly.summary}</h3>
                                <h2>{this.props.currently.temperature} <i className='wi wi-fahrenheit'></i> <i className={this.weatherIcnCur(this.props.currently.icon)}></i> </h2>
                            </div>   
                        </div>  
                    </div>
                </div>
                <div className='row'>
                    <div className='weather-info col-sm-6 col-md-6 col-lg-6'>
                        <div className='hovereffect hovereffect-weather'>
                            <img className='img-responsive' src={this.weatherImgCur(this.props.currently.icon)} alt="weather"/>
                            <div className='overlay'>
                                <h1>Weather</h1>
                                <h2><i className={this.weatherIcnCur(this.props.currently.icon)}></i> {this.props.currently.summary}</h2>
                                <p>Visibility: {this.props.currently.visibility} miles</p>
                            </div>
                        </div>
                    </div>
                    <div className='weather-info col-sm-6 col-md-6 col-lg-6'>
                        <div className='wind hovereffect'>
                            <img className='img-responsive' src="images/wind.jpg" alt="wind"/>
                            <div className='overlay'>
                                <h1>Wind</h1>
                                <h2> <i className='wi wi-windy'></i>{this.props.currently.windSpeed} meters/sec</h2>
                                <p>{this.degToDir(this.props.currently.windBearing)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
WeatherData.propTypes = {
    week: React.PropTypes.array,
}
export default WeatherData;