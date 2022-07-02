import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/fr';

const Meteo = () => {
    
    const [currentLocation, setCurrentLocation] = useState([]) 
    const [meteoData, setMeteoData] = useState([]);

    useEffect(() => {
        axios
            .get('https://geolocation-db.com/json/')
            .then((res) => setCurrentLocation(res.data))
            // .then((res) => console.log(res.data);
    }, [])

    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
    
    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${currentLocation.city}`)
            .then((res) => setMeteoData(res.data))
            // .then((res) => console.log(res.data))
    }, [])

    moment.locale('fr') 
    
    return (
        <div className='card'>
            <div className="main-content">
                <span className="date">{ moment().format("dddd Do MMMM YYYY") }</span>
                <h1><i className="fa-solid fa-location-dot"></i> {currentLocation.city}</h1>
                <span className="region">{currentLocation.country_name + ', ' + currentLocation.state}</span><br />
                {/* <span className="temperature">{meteoData.current.temperature}°C</span> */}
                <span className="temperature">25°C</span>
            </div>
            <div className="secondary-content">
                <p>
                    <i className="fa-solid fa-wind"></i>&nbsp;&nbsp;24 km/h<br />
                    <i className="fa-solid fa-droplet"></i>&nbsp;&nbsp;10 mm<br />
                    <i className="fa-solid fa-gauge"></i>&nbsp;&nbsp;10 % <br />
                </p>
                <img src="../sunny.png" alt="" />
            </div>
        </div>

    );
};

export default Meteo;