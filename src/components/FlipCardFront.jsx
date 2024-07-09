import SearchBar from "./SearchBar";
import GetCurrentLocation from "./GetCurrentLocation";
import PropTypes from "prop-types";
FlipCardFront.propTypes = {
  setLatitude: PropTypes.func.isRequired,
  setLongitude: PropTypes.func.isRequired,
  calCoordinates: PropTypes.func.isRequired,
};

export default function FlipCardFront({
  setLatitude,
  setLongitude,
  calCoordinates,
}) {
  return (
    <div className="flip_card_front">
      <h2>Weather App</h2>
      <p>Choose a Location</p>
      <GetCurrentLocation
        setLatitude={setLatitude}
        setLongitude={setLongitude}
      />
      <p style={{}}>--------- OR ---------</p>

      <SearchBar calCoordinates={calCoordinates}>Enter Location...</SearchBar>
    </div>
  );
}
