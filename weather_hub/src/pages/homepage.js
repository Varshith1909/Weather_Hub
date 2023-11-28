import React, { useState, useEffect } from 'react';
import './homepage.css';

function Home() {
  const [searchedCity, setSearchedCity] = useState('');
  const [city, setCity] = useState('');
  const [cityData, setCityData] = useState(null);
  const [recentlySearch, setRecentlySearch] = useState([]);

  const getCityData = async (cityName) => {
    try {
      const backendApiUrl = `http://localhost:5000/weather?city=${cityName}`;
      const response = await fetch(backendApiUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Error fetching weather data');
    }
  };
	const getLocalTime = (offset,inputTime) => {
		try {
			const now = new Date(inputTime);
			const utcOffset = now.getTimezoneOffset() * 60;
			const cityOffset = offset;
			const localTime = now.getTime() + (utcOffset + cityOffset) * 1000;
			const cityTime = new Date(localTime);
			return cityTime;
		} catch (err) {
			console.log(err);
			alert(`Unable to get current time for ${city} city`);
			return null;
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
        const cityData = await getCityData(searchedCity);
        setCityData(cityData);
      } catch (err) {
        console.log(err);
        window.alert('ERROR: ', err.message);
      }

      if (!recentlySearch.includes(searchedCity)) {
        setRecentlySearch([searchedCity, ...recentlySearch]);
      }
      setSearchedCity('');
    }
  };

  useEffect(() => {
    const defaultCity = 'Portland';
    setCity(defaultCity);
    getCityData(defaultCity).then((data) => setCityData(data));
  }, []); 

  return (
    <div>
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
      {cityData && cityData.main &&(
        <div>
          <p className='cityname'>{cityData.name}</p>
          <p className='currenttemp'>{`${Math.floor(cityData.main.temp - 273.15)} °C`}</p>
        </div>
      )}
      <div className="center-blocks">
      <div className="block">
        <p className="centered-text">Sunrise <br /><br />{getLocalTime(cityData?.timezone,cityData?.sys?.sunrise*1000).toLocaleTimeString()}</p>
      </div>
      <div className="block">
        <p className="centered-text">Sunset <br /><br />{getLocalTime(cityData?.timezone,cityData?.sys?.sunset*1000).toLocaleTimeString()}</p>
      </div>
      <div className="block">
        <p className="centered-text">Min-Temp <br /><br />{`${Math.floor(cityData?.main?.temp_min - 273.15)} °C`}</p>
        
      </div>
      <div className="block">
        <p className="centered-text">Max-Temp <br /><br />{`${Math.floor(cityData?.main?.temp_max - 273.15)} °C`}</p>
      </div>
      <div className="block">
        <p className="centered-text">Humidity <br /><br />{cityData?.main?.humidity}%</p>
      </div>
      <div className="block">
        <p className="centered-text">Wind-Speed <br /><br />{cityData?.wind?.speed.toFixed()} mph</p>
      </div>
    </div>
    </div>
  );
}

export default Home;

