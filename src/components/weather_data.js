import React from 'react';

//renders weather data
class WeatherData extends React.Component {
    //convert kelvin to fahrenheit
    kToF (kelvin) {
        var kTemp = kelvin-273.15;
        var cToFahr = kTemp * 9 / 5 + 32;
        return cToFahr.toPrecision(2);
    }
    //convert meteoroligical degrees to directions
    degToDir (deg) {
        var dval = (deg/22.5)+.5;
        var darr = ["North","North-NorthEast","NorthEast","East-NorthEast","East","East-SouthEast", "SouthEast", "South-SouthEast","South","South-SouthWest","SouthWest","West-SouthWest","West","West-NorthWest","NorthWest","North-NorthWest"];
        return darr[Math.floor(dval%16)]
    }
    //convert unix timestamp to time
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
    //sets background image based on city
    cityImg (city) {
        var citysrc = '/images/cities/';
        switch(city) {
            case 'San Francisco':
                return citysrc.concat('SanFrancisco.jpg');
                break;
            case 'Sacramento County':
                return citysrc.concat('Sacramento.jpg');
                break;
            case 'Fairfield County':
                return citysrc.concat('Fairfield.jpg');
                break;
            case 'Pittsburg':
                return citysrc.concat('Concord.jpg');
                break;
            case 'New York':
                return citysrc.concat('NewYork.jpg');
                break;
            default:
                return citysrc.concat('Sacramento.jpg');
        }
    }
    //sets weather image based on weather.main
    weatherImg (weather) {
        var weather_img = '/images/weather/'
        switch(weather) {
            case 'Rain':
                return weather_img.concat('rain.jpg');
                break;
            case 'Snow':
                return weather_img.concat('snow.jpg');
                break;
            case 'Haze':
                return weather_img.concat('haze.jpg');
                break;
            case 'Mist':
                return weather_img.concat('mist.jpg');
                break;
            case 'Clear':
                return weather_img.concat('sunny.jpg');
                break;
            case 'Clouds':
                return weather_img.concat('cloudy.jpg');
                break;
            case 'Drizzle':
                return weather_img.concat('rain.jpg');
                break;
            case 'Thunderstorm':
                return weather_img.concat('lightning.jpg');
                break;
            default:
                return weather_img.concat('sunny.jpg');
        }
    }

    render () {
        var main = [];
        var descriptions = [];
        //create string of multiple weather descriptions
        this.props.weatherList.map(desc => {
            descriptions.push(desc.description)
            main.push(desc.main)
        })
        var weathermain = main[0];
        var desc_arr = descriptions.join(', ');
        return (
            <div id={this.props.tabID} className={this.props.tabClass} >
                <div className='row'>
                    <div className="main col-sm-12 col-md-12 col-lg-12">
                        <div className="main-image">
                            <img className="img-responsive" src={this.cityImg(this.props.city)} alt='city'/>
                            <div className="main-text">
                                <h1>{this.props.city}</h1>
                                <h2>{this.kToF(this.props.temp)} &deg; F</h2>
                            </div>   
                        </div>  
                    </div>
                </div>
                <div className='row'>
                    <div className='weather-info col-sm-4 col-md-4 col-lg-4'>
                        <div className='hovereffect hovereffect-sun'>
                            <img className='img-responsive' src="/images/sun.jpg" alt="sun"/>
                            <div className='overlay'>
                                <h1>Sun </h1>
                                <h2>Sunrise: {this.unixToTime(this.props.sun.sunrise)} </h2>
                                <h2>Sunset: {this.unixToTime(this.props.sun.sunset)} </h2>
                            </div>
                        </div>
                    </div>
                    <div className='weather-info col-sm-4 col-md-4 col-lg-4'>
                        <div className='hovereffect hovereffect-weather'>
                            <img className='img-responsive' src={this.weatherImg(weathermain)} alt="weather-icon"/>
                            <div className='overlay'>
                                <h1>Weather </h1>
                                <h2>{desc_arr}</h2>
                            </div>
                        </div>
                    </div>
                    <div className='weather-info col-sm-4 col-md-4 col-lg-4'>
                        <div className='wind hovereffect'>
                            <img className='img-responsive' src="/images/wind.jpg" alt="compass"/>
                            <div className='overlay'>
                                <h1>Wind </h1>
                                <h2>{this.props.wind.speed} meters/sec</h2>
                                <h2>{this.degToDir(this.props.wind.deg)}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default WeatherData;