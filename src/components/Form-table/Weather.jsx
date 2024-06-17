import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import clear from "../../assets/Assets/clear.png";
import cloud from "../../assets/Assets/cloud.png";
import drizzle from "../../assets/Assets/drizzle.png";
import humidity from "../../assets/Assets/humidity.png";
import rain from "../../assets/Assets/rain.png";
import search from "../../assets/Assets/search.png";
import snow from "../../assets/Assets/snow.png";
import wind from "../../assets/Assets/wind.png";

const Weather = () => {

  const weatherIcons = {    // convert api icon to our imported assets
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "03d": cloud,
    "03n": cloud,
    "04d": cloud,
    "04n": cloud,
    "09d": drizzle,
    "09n": drizzle,
    "10d": rain,
    "10n": rain,
    "11d": rain,
    "11n": rain,
    "13d": snow,
    "13n": snow,
    "50d": humidity,
    "50n": humidity,
  };



  const [weatherData, setWeatherData] = useState(false);
  const write = useRef();

  const weath = async (city) => {
    if ((city === "")) {
      alert("Enter City Name");
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_API_ID
      }`;

      const response = await fetch(url); //import data from api

      const data = await response.json(); // convert it to json

      if (!response.ok) {
        throw new Error (data.message || "Error in Fetching data")
      }

      console.log(data);
      setWeatherData({
        humidity: data.main.humidity,
        cityname: data.name,
        temperature: Math.floor( data.main.temp),
        windspeed: data.wind.speed,
        icon: data.weather[0].icon,
      });

    } catch (error) {
      console.error("Error :" , error.message);
      alert(error.message);
    
      setWeatherData(false);
    }
  };

  useEffect(() => {
    // weath function working after first render only
    weath("London");
  }, []);



 // when press enter call weath function
  const handleKeyDown =(event)=>{
    if(event.key==="Enter"){
      weath(write.current.value)
    }

  }




  return (
    <div className="weather">
      <div className="input-srch">
        <input type="text" ref={write} onKeyDown={handleKeyDown}/>
        <img src={search} alt="" onClick={() => weath(write.current.value)} />
      </div>

      {weatherData ? (
        <>
          <div className="sunimages">
            <img src={weatherIcons[weatherData.icon]} alt="" />
          </div>
          <div className="ceisuis-city">
            <p>{weatherData.temperature} °C</p>
            <p>{weatherData.cityname}</p>
          </div>
          <div className="hum-windspeed">
            <div className="col-humadity">
              <img src={humidity} alt="" />
              <p>{weatherData.humidity} %</p>
              <span>Humidity</span>
            </div>
            <div className="col-humadity">
              <img src={wind} alt="" />
              <p>{weatherData.windspeed} Km/h</p>
              <span>Wind Speed</span>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;
