import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'moment/min/locales.min';

const Meteo = () => {
    
    const [currentLocation, setCurrentLocation] = useState([]) 
    const [meteoData, setMeteoData] = useState([]);

    useEffect(() => {
        axios
            .get('https://geolocation-db.com/json/')
            // .get('https://geolocation-db.com/json/139.162.99.85')
            .then((res) => setCurrentLocation(res.data))
    }, [])

    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${currentLocation.city}`)
            .then((res) => setMeteoData(res.data))
            // .then((res) => console.log(res.data))
    }, [])

    let locale = `${currentLocation.country_code}`.toLowerCase();
    moment.locale(locale)
    
    return (
        <div>
            <h1 style={{ "margin-bottom" : "20px", "textAlign" : "center", color : "white" }}>Weather Card</h1>
            <div className='card'>
                <div className="marge"></div>
                <div className="main-content">
                    <span className="date">{ moment().format("dddd Do MMMM YYYY") }</span>
                    <h1><i className="fa-solid fa-location-dot"></i> {currentLocation.city}</h1>
                    <span className="coords">{currentLocation.latitude} &bull; {currentLocation.longitude}</span><br />
                    <span className="region">{currentLocation.country_name + ', ' + currentLocation.state}</span><br />
                    {/* <span className="temperature">{meteoData.current.temperature}°C</span> */}
                    <span className="temperature">25&#xb0;C</span>
                </div>
                <div className="secondary-content">
                    <div>
                        {/* <i className="fa-solid fa-wind"></i>&nbsp;&nbsp;{meteoData.current.wind_speed} km/h<br />
                        <i className="fa-solid fa-droplet"></i>&nbsp;&nbsp;{meteoData.current.precip} mm<br />
                        <i className="fa-solid fa-gauge"></i>&nbsp;&nbsp;{meteoData.current.humidity} &#x25;<br /> */}
                        <i className="fa-solid fa-wind"></i>&nbsp;&nbsp;24 km/h<br />
                        <i className="fa-solid fa-droplet"></i>&nbsp;&nbsp;10 mm<br />
                        <i className="fa-solid fa-gauge"></i>&nbsp;&nbsp;10 &#x25;<br />
                    </div>
                    <img src="../sunny.png" alt="" />
                </div>
            </div>
        </div>

    );
};

export default Meteo;