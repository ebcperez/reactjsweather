import React from 'react';
import axios from 'axios';



class DarkWeather extends React.Component {
    constructor() {
        super();

        this.state = {
            current: {},
            hour: {},
        }
    }

    getApi(apikey,lat,lon) {
        axios.get(`https://api.darksky.net/forecast/febb2871126cd24613f32a79c32d4158/42.3601,-71.0589`).then(response => {
            console.log(response.data.timezone);
            console.log(response.data.currently);
            this.setState({
                current: response.data.currently,
                hour: response.data.hourly,
            });
        }).catch(function (error) {
            console.log(error);
        });
    }

    componentWillMount() {
        this.getApi();
    }
    
    render () {
        return (
            <div>
                <h4>Current: {this.state.current.temperature}</h4>
                <h4>Hour: {this.state.hour.summary}</h4>
            </div>
        )
    }
}

export default DarkWeather;