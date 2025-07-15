import { useState, useEffect } from "react";
import React from "react";

export default function Weather() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(null);
  const [videoSrc, setVideoSrc] = useState("");
  const [weatherKey, setWeatherKey] = useState(0);

  const API_KEY = "74e3f1d9b40c0dcd0c06b8178e47ee75";

  const weatherVideos = {
    Clear: "https://videos.pexels.com/video-files/855781/855781-hd_1920_1080_24fps.mp4",
    Clouds: "https://cdn.pixabay.com/video/2022/08/10/127468-738466697_large.mp4",
    Rain: "https://videos.pexels.com/video-files/856186/856186-hd_1920_1080_30fps.mp4",
    Snow: "https://cdn.pixabay.com/video/2022/12/04/141607-777930544_tiny.mp4",
    Thunderstorm: "https://videos.pexels.com/video-files/6877513/6877513-hd_1920_1080_30fps.mp4",
    Haze: "https://cdn.pixabay.com/video/2023/03/06/153482-805374153_tiny.mp4",
    Mist: "https://cdn.pixabay.com/video/2023/03/06/153482-805374153_tiny.mp4",
    Default: " https://videos.pexels.com/video-files/857021/857021-hd_1920_1080_30fps.mp4",
  };

  const handleInput = (event) => {
    setSearch(event.target.value);
  };

  const myFun = async (event) => {
    event.preventDefault();

    if (search.trim() === "") {
      alert("Please enter the city name");
      return;
    }

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}`
    );
    const data2 = await response.json();

    if (data2.cod !== 200) {
      alert("Please enter a valid city name");
      return;
    }
console.log(data2)
    setData(data2);
  };
    useEffect(() => {
    if (data?.weather?.[0]?.main) {
      const weather = data.weather[0].main;
      const newVideo = weatherVideos[weather] || weatherVideos.Default;
      setVideoSrc(newVideo);
      setWeatherKey((prev) => prev + 1); 
    }
  }, [data]);

  return (
    <>
    
   {videoSrc && (
        <video
          key={weatherKey} 
          autoPlay
          muted
          loop
          className="background-video"
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}



      <div className="d1">
        <form className="form-inline my-2 my-lg-0">
          <input
            className="t1"
            type="search"
            placeholder="Search"
            onChange={handleInput}
            aria-label="Search"
          />
          <button
            onClick={myFun}
            className="btn btn-outline my-2 my-sm-0 b1"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>


      <div className="d2">
        {data && data.weather ? (
          <div className="d3">
            <div className="d4">
              <img
                src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                alt={data.weather[0].description}
              />
              <h2>{data.name}</h2>
              <p>{data.weather[0].description}</p>
              <p>Temperature: {(data.main.temp - 273.15).toFixed(2)}°C</p>
              <p>
                Temperature feels like:{" "}
                {(data.main.feels_like - 273.15).toFixed(2)}°C
              </p>
              <p>Humidity: {data.main.humidity}%</p>
              <p>Wind Speed: {data.wind.speed} m/s</p>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
