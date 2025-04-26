// src/assets/image.js
import logo from './img/logo.png';
import city from './img/city.svg';
import temp from './img/temp.svg';
import pressure from './img/pressure.svg';
import precipitation from './img/precipitation.svg';
import wind from './img/wind.svg';
import cloudyNight from './img/cloudy-night.png';
import sun from './img/sun.svg';
import cloudy from './img/cloudy.svg';
import smallRain from './img/small-rain.svg';
import mainlyCloudy from './img/mainly-cloudy.svg';
import rain from './img/rain.svg';
import smallRainSun from './img/small-rain-sun.svg';
import storm from './img/storm.svg';
import snow from './img/snow.svg';
import mist from './img/mist.svg';
import loading from './img/loading.gif';
import moon from './img/moon.png';
import MoonRainCloud from "./img/rainy-cloudy-moon.png"

export const images = {
  logo,
  city,
  temp,
  pressure,
  precipitation,
  wind,
  loading,
  moon,
};

export const icons = {
  '01d': sun,
  '02d': cloudy,
  '03d': smallRain,
  '04d': mainlyCloudy,
  '09d': rain,
  '10d': smallRainSun,
  '11d': storm,
  '13d': snow,
  '50d': mist,

  '01n': moon,
  '02n': cloudyNight,
  '03n': smallRain,
  '04n': mainlyCloudy,
  '09n': rain,
  '10n': MoonRainCloud,
  '11n': storm,
  '13n': snow,
  '50n': mist,
};