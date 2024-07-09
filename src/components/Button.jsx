import PropTypes from "prop-types";
Button.propTypes = {
  handleOnClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default function Button({ handleOnClick, className, children }) {
  return (
    <button onClick={handleOnClick} className={className}>
      {" "}
      {children}{" "}
    </button>
  );
}
