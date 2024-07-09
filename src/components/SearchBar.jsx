import { useState } from "react";
import PropTypes from "prop-types";
SearchBar.propTypes = {
  calCoordinates: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default function SearchBar({ calCoordinates, children }) {
  const [inputLocation, setinputLocation] = useState("");

  /*  function handleEnterKeyDown(e) {
      if (e.key === "Enter") {
        // console.log(inputLocation);
        calCoordinates(inputLocation);
        setinputLocation("");
      }
    }
   */
  function handleSubmit(e) {
    e.preventDefault();
    calCoordinates(inputLocation);
    setinputLocation("");
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        className="search-box"
        /* id="" */
        type="text"
        placeholder={children}
        value={inputLocation}
        onChange={(e) => setinputLocation(e.target.value)}
        /*         onKeyDown={(e) => handleEnterKeyDown(e)} */
      />
      <button type="submit">Go</button>
    </form>
  );
}
