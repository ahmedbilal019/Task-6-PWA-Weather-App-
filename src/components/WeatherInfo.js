// WeatherInfo.js
import React from "react";
import "../App.css";

const WeatherInfo = ({ data }) => {
  if (!data || !data.weather) {
    return <p>No weather data available</p>;
  }

  const temperature = (data?.main?.temp - 273.15).toFixed(2);
  const weatherIconUrl = data.weather
    ? `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    : null;

  return (
    <div>
      <h2 className="city">{data.name}</h2>
      <div className="temprature">
        <figure>
          <img src={weatherIconUrl} alt="icon" className="weather-logo" />
          <figcaption>{data.weather?.[0]?.description}</figcaption>
        </figure>
        <p className="temp">{temperature}&deg;C</p>
      </div>
      <div className="moreDetail">
        <div className="humidity">Humidity level: {data.main?.humidity}%</div>
        <div className="windspeed">Wind Speed: {data.wind?.speed}m/s</div>
        <div className="pressure">Pressure: {data.main?.pressure}hPa</div>
      </div>
    </div>
  );
};

export default WeatherInfo;
