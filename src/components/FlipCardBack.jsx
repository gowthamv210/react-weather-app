import PropTypes from "prop-types";
import ResetBtn from "./ResetBtn";
import SearchBar from "./SearchBar";

export default function FlipCardBack({
  locationName,
  Weatherdata,
  calCoordinates,
  setLatitude,
  setLongitude,
  setlocationName,
  setWeatherdata,
  setFlipIt,
  TimeData,
}) {
  const { isMorning, date, timehrs, timeMins } = TimeData;

  return (
    <>
      <div className="back_container">
        <ResetBtn
          setLatitude={setLatitude}
          setLongitude={setLongitude}
          setWeatherdata={setWeatherdata}
          setlocationName={setlocationName}
          setFlipIt={setFlipIt}
        />
        <SearchBar calCoordinates={calCoordinates}>
          Enter Another Location...
        </SearchBar>
      </div>
      <div className="top_content">
        <span>
          <img src="/images/locationpin.png" alt="Pin Location" />
          <h3>{locationName}</h3>
        </span>
      </div>

      <div className="middle_content">
        <img
          className="weather_icon"
          src={`images/${isMorning ? "morning" : "night"}/${
            Weatherdata.weather[0].main
          }.png`}
          alt="Weather_Icon"
        />
        <h1>{`${Math.round(Weatherdata.main.temp - 273.15)} °C`}</h1>
        <h3>{Weatherdata.weather[0].main}</h3>
        <p>{`${date} · ${timehrs < 10 ? "0" + timehrs : timehrs}:${
          timeMins < 10 ? "0" + timeMins : timeMins
        } ${timehrs >= 12 ? "PM" : "AM"}`}</p>
      </div>

      <div className="base_content">
        <div>
          <span className="grid_data">
            <img src="images/windspeed.png" alt="windSpeed icon" />
            <p>{`${Math.round(Weatherdata.wind.speed)}m/s`}</p>
          </span>
          <p>Wind Speed</p>
        </div>
        <div>
          <span className="grid_data">
            <img src="images/humidity_icon.png" alt="humidity icon" />
            <p>{`${Weatherdata.main.humidity}%`}</p>
          </span>
          <p>Humidity</p>
        </div>
      </div>
    </>
  );
}

FlipCardBack.propTypes = {
  locationName: PropTypes.string.isRequired,
  Weatherdata: PropTypes.shape({
    weather: PropTypes.arrayOf(
      PropTypes.shape({
        main: PropTypes.string.isRequired,
      })
    ).isRequired,
    main: PropTypes.shape({
      temp: PropTypes.number.isRequired,
      humidity: PropTypes.number.isRequired,
    }).isRequired,
    wind: PropTypes.shape({
      speed: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  calCoordinates: PropTypes.func.isRequired,
  setLatitude: PropTypes.func.isRequired,
  setLongitude: PropTypes.func.isRequired,
  setlocationName: PropTypes.func.isRequired,
  setWeatherdata: PropTypes.func.isRequired,
  setFlipIt: PropTypes.func.isRequired,
  TimeData: PropTypes.shape({
    isMorning: PropTypes.bool.isRequired,
    date: PropTypes.string.isRequired,
    timehrs: PropTypes.number.isRequired,
    timeMins: PropTypes.number.isRequired,
  }).isRequired,
};
