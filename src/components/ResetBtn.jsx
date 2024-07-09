import { TiArrowBackOutline } from "react-icons/ti";
import Button from "./Button";
import PropTypes from "prop-types";
ResetBtn.propTypes = {
  setLatitude: PropTypes.func.isRequired,
  setLongitude: PropTypes.func.isRequired,
  setlocationName: PropTypes.func.isRequired,
  setWeatherdata: PropTypes.func.isRequired,
  setFlipIt: PropTypes.func.isRequired,
};

export default function ResetBtn({
  setLatitude,
  setLongitude,
  setlocationName,
  setWeatherdata,
  setFlipIt,
}) {
  function handleOnClick() {
    setLatitude("");
    setLongitude("");
    setlocationName("");
    setWeatherdata(null);
    setFlipIt(false);
  }

  return (
    <Button handleOnClick={handleOnClick} className="reset_btn">
      <TiArrowBackOutline style={{ fontSize: "1.5rem", color: "#fff" }} />
    </Button>
  );
}
