import React from "react";
import PropTypes from "prop-types";

const BumpButton = ({ onClick }) => {
	return <button onClick={() => onClick()}>BUMP</button>;
};

BumpButton.propTypes = {
	onClick: PropTypes.func.isRequired,
};

export default BumpButton;
