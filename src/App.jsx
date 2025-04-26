import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import Current from './components/current';
import { getLatLon } from './redux/weatherSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import Daily from './components/daily';
import { images } from './assets/image';
import './assets/css/style.scss';
import { getTimePeriod } from './utils/getTimePeriod';

const App = () => {
  const dispatch = useDispatch();
  const [selectedDay, setSelectedDay] = useState(null);
  const weather = useSelector((state) => state.weather.weather);

  useEffect(() => {
    const updateBodyClass = () => {
      const dt = weather?.current?.dt || Math.floor(Date.now() / 1000);
      const timezone = weather?.current?.timezone || 0;
      const period = getTimePeriod(dt, timezone);

      document.body.className = period;
    };

    updateBodyClass();

    const intervalId = setInterval(updateBodyClass, 60000);

    return () => clearInterval(intervalId);
  }, [weather]);

  useEffect(() => {
    const fetchWeatherByLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            console.log('Geolocation coords:', { latitude, longitude });
            dispatch(getLatLon({ lat: latitude, lon: longitude }));
          },
          (err) => {
            console.error('Geolocation error:', err);
            dispatch(getLatLon('Ташкент'));
          }
        );
      } else {
        console.log('Geolocation not supported, falling back to Ташкент');
        dispatch(getLatLon('Ташкент'));
      }
    };

    setTimeout(fetchWeatherByLocation, 1000);
  }, [dispatch]);

  useEffect(() => {
    if (weather) {
      console.log('Weather data:', weather);
      console.log('City from API:', weather?.name);
    }
  }, [weather]);

  return weather ? (
    <div className="container">
      <Navbar />
      <Current selectedDay={selectedDay} />
      <Daily setSelectedDay={setSelectedDay} />
    </div>
  ) : (
    <div className="loading">
      <img src={images.logo} alt="" />
    </div>
  );
};

export default App;