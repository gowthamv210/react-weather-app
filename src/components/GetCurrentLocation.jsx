import Button from "./Button";
import PropTypes from "prop-types";

GetCurrentLocation.propTypes = {
  setLatitude: PropTypes.func.isRequired,
  setLongitude: PropTypes.func.isRequired,
};

export default function GetCurrentLocation({ setLatitude, setLongitude }) {
  function getcurrLocation() {
    function success(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      setLatitude(lat);
      setLongitude(lon);
    }

    function error() {
      alert("Sorry, no position available");
    }

    navigator.geolocation.getCurrentPosition(success, error);
  }

  return (
    <Button handleOnClick={getcurrLocation} className="btn">
      Get Your Location
    </Button>
  );
}
