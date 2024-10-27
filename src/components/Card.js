import React, { useEffect, useState, Suspense } from "react";
import "../App.css";
import axios from "axios";
import searchIcon from "../searchIcon.svg";

const WeatherInfo = React.lazy(() => import("./WeatherInfo"));

export default function Card() {
  const apiKey = "e8c7123d2f6eb8bf4b3bbb5dfe8347a7";
  const [data, setData] = useState({});
  const [cityName, setInputCity] = useState("");
  const getweatherDetails = (cityName) => {
    if (!cityName || cityName === "") return;
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          cityName +
          "&appid=" +
          apiKey
      )
      .then((res) => {
        console.log("response", res.data);
        setData(res.data);
      })
      .catch((err) => {
        alert("City did not Found! Please write correct city name. ");
        console.log(err);
      });
  };
  const handleSearch = () => {
    getweatherDetails(cityName);
  };
  const handlechangeInput = (e) => {
    setInputCity(e.target.value);
  };
  useEffect(() => {
    getweatherDetails();
  }, []);

  const temperature = (data?.main?.temp - 273.15).toFixed(2);
  const weatherIconUrl = data.weather
    ? `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    : null;
  return (
    <div className="card">
      <header>
        <div className="header">
          <input
            type="text"
            name="searchbar"
            className="search-field"
            id="search"
            placeholder="Enter City name..."
            onChange={handlechangeInput}
            value={cityName}
            title="Search bar"
          />
          <button className="searchbtn" onClick={handleSearch}>
            <img
              src={searchIcon}
              alt="Search Icon"
              className="searchIcon"
              title="search"
            />
          </button>
        </div>
      </header>
      <main>
        <div className="card-data">
          {Object.keys(data).length === 0 ? (
            <div>
              <img src="logo.svg" alt="app logo" className="front-screen-img" />
              <h3>Welcome to Weather App</h3>
              <p className="message">Search City using Search Bar</p>
            </div>
          ) : (
            <Suspense
              fallback={
                <div>
                  <p>Loading...</p>
                </div>
              }
            >
              <WeatherInfo data={data} />
            </Suspense>
          )}
        </div>
      </main>
    </div>
  );
}
