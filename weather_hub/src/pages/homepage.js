import React from 'react';
import './homepage.css';

function Home() {
    const cityName = 'Portland';
    const currentTime = 'Current Time';
    const temperature = 'Temperature';
  return (
    <div>
      <div>
        <h2>{cityName}</h2>
        <h2>{currentTime}</h2>
        <h2>{temperature}</h2>
      </div>
    <div className="center-blocks">
      <div className="block">
        <p className="centered-text">Sunrise</p>
      </div>
      <div className="block">
        <p className="centered-text">Sunset</p>
      </div>
      <div className="block">
        <p className="centered-text">Min-Temp</p>
      </div>
      <div className="block">
        <p className="centered-text">Max-Temp</p>
      </div>
      <div className="block">
        <p className="centered-text">Humidity</p>
      </div>
      <div className="block">
        <p className="centered-text">Wind-Speed</p>
      </div>
    </div>
    </div>
  );
}

export default Home;