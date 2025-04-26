// src/redux/weatherSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;
export const getLatLon = createAsyncThunk(
  'weather/getLatLon',
  async (location, { dispatch, rejectWithValue }) => {
    try {
      let lat, lon, localName, cities = [];

      if (typeof location === 'string') {
        const response = await axios.get(
          `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${API_KEY}`
        );
        cities = response.data;
        if (cities.length === 0) {
          throw new Error('Ошибка: Город не найден');
        }
        lat = cities[0].lat;
        lon = cities[0].lon;
        localName = cities[0].local_names?.ru || cities[0].name;
      } else {
        console.log('Using provided coordinates:', location);
        lat = location.lat;
        lon = location.lon;
        localName = location.localName || '';
      }

      await dispatch(fetchWeatherByCoords({ lat, lon, localName })).unwrap();
      return { lat, lon, cities };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Unknown error occurred';

      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchWeatherByCoords = createAsyncThunk(
  'weather/fetchWeatherByCoords',
  async ({ lat, lon, localName }, { rejectWithValue }) => {
    try {

      const currentWeatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      const currentWeatherData = currentWeatherResponse.data;
      currentWeatherData.name = localName || currentWeatherData.name;
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );

      const dailyForecast = forecastResponse.data.list
        .filter((item, index) => index % 8 === 0)
        .map(item => ({
          dt: item.dt,
          temp: { day: item.main.temp, night: item.main.temp },
          weather: item.weather,
        }));

      return {
        current: currentWeatherData,
        daily: dailyForecast,
      };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Unknown error occurred';
      console.error('Error fetching weather:', errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    weather: null,
    status: 'idle',
    error: null,
    cities: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLatLon.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getLatLon.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cities = action.payload.cities || [];
      })
      .addCase(getLatLon.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.cities = [];
      })
      .addCase(fetchWeatherByCoords.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchWeatherByCoords.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.weather = action.payload;
      })
      .addCase(fetchWeatherByCoords.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default weatherSlice.reducer;
