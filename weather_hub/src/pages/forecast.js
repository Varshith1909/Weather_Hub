import React, { useState, useEffect } from 'react';
import './forecast.css';

function Forecast() {
  const [searchedCity, setSearchedCity] = useState('');
  const [city, setCity] = useState('');
  const [forecastData, setForecastData] = useState(null);

  const getForecastData = async (cityName) => {
    try {
      const backendApiUrl = `/api/forecast?city=${cityName}`;
      const response = await fetch(backendApiUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Error fetching forecast data');
    }
  };

  const handleSearchChange = (event) => {
    event.preventDefault();
    let searchedCityValue = event.target.value;
    setSearchedCity(searchedCityValue);
  };

  const handleSearchSubmit = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      console.log('SEARCHING FOR CITY: ', searchedCity);
      try {
        setCity(searchedCity);
        const forecastData = await getForecastData(searchedCity);
        setForecastData(forecastData);
      } catch (err) {
        console.log(err);
        window.alert('ERROR: ', err.message);
      }
      setSearchedCity('');
    }
  };

  useEffect(() => {
    const defaultCity = 'London';
    setCity(defaultCity);
    getForecastData(defaultCity).then((data) => setForecastData(data));
  }, []);

  return (
    <div className="forecast-container">
    <div>
      <input
        type="text"
        id="search"
        placeholder="Search for a city here"
        className="searchInput"
        value={searchedCity}
        onChange={handleSearchChange}
        onKeyDown={handleSearchSubmit}
        autoComplete="off"
      />
    </div>
    {forecastData && forecastData.list && (
      <div className="forecast-blocks-container">
        <p className="cityname">{forecastData.city.name}</p>
        <div className="forecast-blocks">
          {forecastData.list.slice(0, 8).map((forecastItem) => (
            <div key={forecastItem.dt} className="forecast-block">
              <p>{`${new Date(forecastItem.dt_txt).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`}</p>
              <p>{`${Math.floor(forecastItem.main.temp - 273.15)} °C`}</p>
              <p>{`${forecastItem.weather[0].description}`}</p>
              <hr />
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);
}

export default Forecast;