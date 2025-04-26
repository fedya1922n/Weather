import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const getLatLon = createAsyncThunk('weather/getLatLon', 
  async (city, reduxObj)=>{
    const {getState, dispatch} = reduxObj;
    const { key } = getState().weather
    // console.log(city);
    // console.log(key);
    const result = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${key}`)
    const cityInfo = result.data[0];
    dispatch(getWeather(cityInfo))
    // console.log(cityInfo);
  }
)

const getWeather = createAsyncThunk('weather/getWeather', 
  async (cityInfo, reduxObj)=>{
    const {getState} = reduxObj;
    const {lat, lon, local_names} = cityInfo;
    const {key} = getState().weather;
    const result = await axios.get(`https://api.openweathermap.org/data/2.8/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&appid=${key}&units=metric&lang=ru`)
    const response = {...result.data, name: local_names.ru, sys: {country: cityInfo.country}}
    return response;
})

const initialState = {
  key: import.meta.env.VITE_API_KEY,
  weather: null
}

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {  },
  extraReducers: (builder)=>{
    builder.addCase(getWeather.fulfilled, (state, action)=>{
      state.weather = action.payload
    })
  }
})

export const { } = weatherSlice.actions

export default weatherSlice.reducer