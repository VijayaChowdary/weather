import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
// import cloud from './assests/cloud.png'
// import rainy from './assests/rainy.png'
// import sunny from './assests/sunny.png'

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  console.log("datadatadata", data);
  // const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`
  const searchLocation = (event) => {
    const url = `http://api.weatherstack.com/current?access_key=3d580385327b4c11d9a801218a81d8cf&query=${location}`;
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  const wetherDetails = () => {
    const url = `http://api.weatherstack.com/current?access_key=3d580385327b4c11d9a801218a81d8cf&query=${"india"}`;
    axios.get(url).then((response) => {
      setData(response.data);
      console.log(response.data);
    });
  };
  useEffect(() => {
    wetherDetails();
  }, []);

  console.log(data);
  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      {Object.keys(data).length > 0 && (
        <div className="wether_content">
          <div className="wether_info">
            <div className="location">
              <p className="location_date">
                {moment(data.location.localtime).format("ddd.MM/DD/YYYY")}
              </p>
              <p className="location_time">
                {moment(data.location.localtime).format("hh:mm")}
              </p>
            </div>

            <div className="temp">
              <h1>
                {data.current.temperature}
                <sup style={{ fontSize: 20 }}>°C</sup>
              </h1>
              <div className="max_min_temp">
                Max : {Math.ceil(data?.location.lat)} °C - Min :{" "}
                {Math.ceil(data?.location.lon)} °C
              </div>
            </div>

            <div className="weather_img">
              <img
                alt={"alt"}
                src={data?.current?.weather_icons[0]}
                width={100}
              />
              <p>{data?.current?.weather_descriptions}</p>
            </div>
          </div>

          <div className="window_content">
            Wind : {data?.location?.name} &nbsp; &nbsp; &nbsp;{" "}
            {data?.current?.wind_speed} mi/h
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
