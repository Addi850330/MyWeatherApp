"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { citydata } from "./CityNameList.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faMagnifyingGlass,
  faDroplet,
  faWind,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./page.module.css";

export default function Home() {
  let [weather, setWeather] = useState("Clear");
  let [temperature, setTemperature] = useState("0");
  let [city, setCity] = useState("Location");
  let [description, setDescription] = useState("Clear");
  let [humidity, setHumidity] = useState("0");
  let [wind, setWind] = useState("0");
  let [weatherinfo, setWeatherinfo] = useState("close");
  let [loading, setLoading] = useState("close");

  // input set
  let [location, setLocation] = useState("");
  let changeText = function (e) {
    setLocation(e.target.value);
  };

  //fetch API set
  let locationenter = () => {
    setWeatherinfo("open");
    setLoading("close");
    const API = "b3e4f771e72df56bfdfda5ed0e4b1d33";
    // console.log(location);
    if (location == "") return;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API}`
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.cod == "404") {
          setLoading("close");
          // console.log("404 Error");
          setWeather("notfount");
          setTemperature("#");
          setCity("Error Location");
          setDescription("???");
          setHumidity("#");
          setWind("#");
          setLoading("open");
          setPredictinfo("close");
          return;
        } else {
          let weatherNow = json.weather[0].main;
          let temperatureNow = parseInt(json.main.temp);
          let descriptionNow = json.weather[0].description;
          let humidityNow = json.main.humidity;
          let windNow = parseInt(json.wind.speed);
          switch (weatherNow) {
            case "Clear":
              setWeather("clear");
              break;

            case "Rain":
              setWeather("rain");
              break;

            case "Clouds":
              setWeather("clouds");
              break;

            case "Mist":
              setWeather("mist");
              break;

            case "Haze":
              setWeather("mist");
              break;

            case "Snow":
              setWeather("snow");
              break;

            default:
              setWeather("clear");
          }
          setTemperature(temperatureNow);
          setCity(location);
          setDescription(descriptionNow);
          setHumidity(humidityNow);
          setWind(windNow);
          setLoading("open");
          setPredictinfo("open");
        }
      })
      .catch(() => {
        console.log("error location");
      });
  };

  // ------5 days weather location set------------
  let [lats, setLat] = useState("");
  let [lons, setLon] = useState("");
  const getlon = () => {
    const API = "b3e4f771e72df56bfdfda5ed0e4b1d33";
    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data[0].lat, data[0].lon);
        setLat(data[0].lat);
        setLon(data[0].lon);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // ----------5 days weather catch info-------------

  let [weatherPredict, setWeatherPredict] = useState([]);
  let [predictinfo, setPredictinfo] = useState("close");
  let [predictdate, setPredictdate] = useState("close");
  const getweather = () => {
    setPredictdate("colse");
    const API = "b3e4f771e72df56bfdfda5ed0e4b1d33";
    let latitude = lats;
    let longitude = lons;
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API}`
    )
      .then((res) => res.json())
      .then((data) => {
        let weatherArray = [];
        // console.log(data.list);
        let firstD = {
          weather: data.list[5].weather[0].main.toLowerCase(),
          description: data.list[5].weather[0].description,
          temperature: parseInt(data.list[5].main.temp - 273.15),
          date: data.list[5].dt_txt.substring(0, 10),
        };
        let secondD = {
          weather: data.list[13].weather[0].main,
          description: data.list[13].weather[0].description,
          temperature: parseInt(data.list[13].main.temp - 273.15),
          date: data.list[13].dt_txt.substring(0, 10),
        };
        let thirdD = {
          weather: data.list[21].weather[0].main,
          description: data.list[21].weather[0].description,
          temperature: parseInt(data.list[21].main.temp - 273.15),
          date: data.list[21].dt_txt.substring(0, 10),
        };
        let forthD = {
          weather: data.list[29].weather[0].main,
          description: data.list[29].weather[0].description,
          temperature: parseInt(data.list[29].main.temp - 273.15),
          date: data.list[29].dt_txt.substring(0, 10),
        };
        let fifthD = {
          weather: data.list[37].weather[0].main,
          description: data.list[37].weather[0].description,
          temperature: parseInt(data.list[37].main.temp - 273.15),
          date: data.list[37].dt_txt.substring(0, 10),
        };

        weatherArray.push(firstD, secondD, thirdD, forthD, fifthD);

        setWeatherPredict(weatherArray);
      })
      .catch(() => {
        console.log("");
      });
  };
  useEffect(() => {
    if (weatherPredict === null) {
      return;
    } else {
      // console.log(weatherPredict);
    }
  }, [weatherPredict]);

  useEffect(() => {
    if (lats == "") {
      return;
    } else if (lons == "") {
      return;
    } else {
      getweather();
      setPredictinfo("open");
    }
  }, [lons]);

  useEffect(() => {
    if (predictinfo == "close") {
      return;
    } else {
      setPredictdate("open");
    }
  }, [predictinfo]);

  // --------Enter key -------------

  const keyDownHandler = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      //--------logic-----------
      locationenter();
      getlon();
    }
  };

  //-------------button submit-----------
  const dataSubmit = function () {
    locationenter();
    getlon();
  };
  // -------------citylist set-----------
  const cityList = citydata[0].citys;

  return (
    <div className={styles.container}>
      <div
        className={
          weatherinfo === "close"
            ? `${styles.weatherinfo}`
            : `${styles.weatherinfo} ${styles.weatherinfoopen}`
        }
      >
        <div className={styles.reaserch}>
          <div className={styles.locationicon}>
            <FontAwesomeIcon
              icon={faLocationDot}
              className="fa-solid fa-location-dot"
            />
          </div>
          <input
            type="text"
            list="city-name-choice"
            id="city-name"
            value={location}
            placeholder="Enter your location..."
            onChange={changeText}
            onKeyDown={keyDownHandler}
          />
          <datalist className={styles.datalist} id="city-name-choice">
            <select multiple name="" id="">
              {cityList.map((data) => (
                <option
                  className={styles.option}
                  key={data.id}
                  value={data.cityName}
                >
                  {data.cityName}
                </option>
              ))}
            </select>
          </datalist>
          <button onClick={dataSubmit}>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="fa-solid fa-magnifying-glass"
            />
          </button>
        </div>
        <div
          className={
            loading === "close"
              ? `${styles.weather} ${styles.weathershow}`
              : `${styles.weather} `
          }
        >
          <div className={styles.weatherimg}>
            <Image
              width={300}
              height={300}
              src={`/img/weather/${weather}.png`}
              priority={true}
              alt="weather"
            />
          </div>
          <div className={styles.description}>{description}</div>
          <div className={styles.temperture}>
            {temperature}
            <span>°C</span>
          </div>

          <div className={styles.contryname}>{city}</div>
          <div className={styles.weatherdetail}>
            <div className={styles.humidity}>
              <FontAwesomeIcon
                icon={faDroplet}
                className="fa-solid fa-droplet"
              />
              <div className={styles.infohumidity}>
                <div className={styles.humiditytext}>
                  <p className={styles.humiditynumber}>{humidity}%</p>
                  <p className={styles.humiditytitle}>Humidity</p>
                </div>
              </div>
            </div>
            <div className={styles.wind}>
              <FontAwesomeIcon icon={faWind} className="fa-solid fa-wind" />
              <div className={styles.infowind}>
                <div className={styles.windtext}>
                  <p className={styles.windnumber}>{wind}Km/h</p>
                  <p className={styles.windtitle}>Wind Speed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={
          predictinfo === "close"
            ? `${styles.weatherPredict}`
            : `${styles.weatherPredict} ${styles.weatherPredictShow}`
        }
      >
        <div className={styles.infocenter}>
          {weatherPredict.map((info) => (
            <div
              key={info.date}
              className={
                predictinfo === "close"
                  ? `${styles.predictdate}`
                  : `${styles.predictdate} ${styles.predictdateShow}`
              }
            >
              <div className={styles.pdwImg}>
                <img src={`/img/weather/${info.weather}.png`} alt="" />
              </div>
              <div className={styles.pdwDesc}>{info.description}</div>
              <div className={styles.pdwTemp}>{info.temperature}°C</div>
              <div className={styles.pdwDate}>{info.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
