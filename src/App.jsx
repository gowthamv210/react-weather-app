import { useState, useEffect, useCallback } from "react";
import { ORD_API, CW_API, TIMEZONE_API } from "./constants/index";

import axios from "axios";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import FlipCardBack from "./components/FlipCardBack";
import FlipCardFront from "./components/FlipCardFront";
import FlipCard from "./components/FlipCard";

import PropTypes from "prop-types";

export default function App() {
  const [locationName, setlocationName] = useState("");
  const [Weatherdata, setWeatherdata] = useState(null);
  const [DateTimeString, setDateTimeString] = useState("");
  const [TimeData, setTimeData] = useState(function () {
    return {
      isMorning: true,
      date: "",
      timehrs: "",
      timeMins: "",
    };
  });

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [isLoadingWeather, setIsLoadingWeather] = useState(false);
  const [isLoadingTime, setIsLoadingTime] = useState(false);
  const [error, setError] = useState("");

  function convertToTitleCase(inputString) {
    return inputString.toLowerCase().replace(/(?:^|\s)\w/g, function (match) {
      return match.toUpperCase();
    });
  }

  const fetchTimeZone = async (lat, lon) => {
    try {
      setError("");
      setIsLoadingTime(true);
      const result = await axios.get(TIMEZONE_API, {
        params: {
          lat: lat.toString(),
          lng: lon.toString(),
          format: "json",
          by: "position",
          key: import.meta.env.VITE_APP_API_KEY_2,
        },
      });

      setDateTimeString(result.data.formatted);

      setError("");
      setIsLoadingTime(false);
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    }
  };

  const calCoordinates = async (location) => {
    try {
      setError("");
      const result = await axios.get(ORD_API, {
        params: {
          q: location,
          appid: import.meta.env.VITE_APP_API_KEY_1,
        },
      });

      if (!(result.status >= 200 && result.status < 300))
        throw new Error("Something went wrong with fetching location data");

      if (!result.data[0]) throw new Error("Location NOT FOUND");
      setLatitude(result.data[0].lat);
      setLongitude(result.data[0].lon);

      setlocationName(convertToTitleCase(location));
      setError("");
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
  };

  const fetchWeatherInfo = useCallback(async () => {
    try {
      setFlipIt(true);
      setIsLoadingWeather(true);
      setError("");
      const result = await axios.get(CW_API, {
        params: {
          lat: latitude.toString(),
          lon: longitude.toString(),
          appid: import.meta.env.VITE_APP_API_KEY_1,
        },
      });
      if (!(result.status >= 200 && result.status < 300))
        throw new Error("Something went wrong with fetching Weather data");

      if (!result.data) throw new Error("Weather data NOT FOUND");

      setWeatherdata(result.data);
      setIsLoadingWeather(false);

      if (locationName === "") setlocationName(result.data.name);
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
  }, [latitude, longitude]);

  useEffect(() => {
    if (latitude && longitude) {
      fetchTimeZone(latitude, longitude);
      fetchWeatherInfo();
    } else return;
  }, [latitude, longitude, locationName, fetchWeatherInfo]);

  useEffect(() => {
    if (!locationName) return;
    document.title = `${locationName} | Weather Report`;

    return function () {
      document.title = "Weather App";
    };
  }, [locationName]);

  useEffect(
    function () {
      if (DateTimeString === "") return;

      const parts = DateTimeString.split(" ");
      const currDate = new Date(parts[0]);
      const currTime = parts[1];
      const options = {
        month: "long",
        day: "numeric",
      };

      const date = currDate.toLocaleString(undefined, options);

      const timeParts = currTime.split(":");
      const timehrs = parseInt(timeParts[0], 10);
      const timeMins = parseInt(timeParts[1], 10);
      const isMorning = timehrs >= 6 && timehrs < 18;

      setTimeData({ isMorning, date, timehrs, timeMins });
    },
    [DateTimeString]
  );

  const [flipIt, setFlipIt] = useState(false);

  return (
    <Main>
      <FlipCard flipIt={flipIt}>
        {!flipIt ? (
          <FlipCardFront
            setLatitude={setLatitude}
            setLongitude={setLongitude}
            calCoordinates={calCoordinates}
          />
        ) : (
          <div className="flip_card_back">
            {(isLoadingWeather || isLoadingTime) && <Loader />}
            {!isLoadingWeather && !isLoadingTime && !error && (
              <FlipCardBack
                locationName={locationName}
                Weatherdata={Weatherdata}
                calCoordinates={calCoordinates}
                setLatitude={setLatitude}
                setLongitude={setLongitude}
                setlocationName={setlocationName}
                setWeatherdata={setWeatherdata}
                setFlipIt={setFlipIt}
                TimeData={TimeData}
              />
            )}
            {error && <ErrorMessage message={error} />}
          </div>
        )}
      </FlipCard>
    </Main>
  );
}

function Main({ children }) {
  return <main className="box">{children}</main>;
}

Main.propTypes = {
  children: PropTypes.node.isRequired,
};
