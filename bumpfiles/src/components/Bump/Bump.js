import React from "react";
import PropTypes from "prop-types";

import "./Bump.css";

const BumpButton = ({ onClick, isListening = false }) => {
	return (
		<div className="bump" onClick={() => onClick()}>
			{isListening ? "LISTENING..." : "BUMP"}
		</div>
	);
};

BumpButton.propTypes = {
	onClick: PropTypes.func.isRequired,
	isListening: PropTypes.bool,
};

export default BumpButton;
