import React, { useEffect, useRef, useState } from 'react';
import debounce from 'lodash/debounce';
import {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { Box } from '@material-ui/core';
const Weather = ({address}) => {
  const [weather, setWeather] = useState();
  const [loading, setLoading] = useState();
  const loadWeather = (address) => {
    geocodeByAddress(address)
    .then(res => getLatLng(res[0]))
    .then(({lat, lng}) => {
      return fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=fd796c09b8355868891c804f8da4fec5`)

    })
    .then((res) => res.json())
    .then(data => {
      setLoading(false)
      setWeather(data)
    })
    .catch((e) => console.log(e))
  }
  const throttled = useRef(debounce((address) => {
    loadWeather(address);
  }, 3000))

  useEffect(() => {
    if(!address) {return;}
    setLoading(true)
    loadWeather(address);
  }, []);

  useEffect(() => {
    if(!address) {return;}
    setLoading(true)
    throttled.current(address);
  },[address])
  return (!loading && weather 
    ? (
      <Box display="flex" alignItems="center">
        <div>
          <div>
            Weather: {weather.weather[0].main}
          </div>
          <span>
            Temperature: {(weather.main.temp - 273.15).toFixed(1)}
          </span>
        </div>
        <img alt={weather.main.main} src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}/>
      </Box>
    )
    : (address ? <span>Loading weather</span> : <div></div>))
}

export default Weather;