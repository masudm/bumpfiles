import React from "react";
import PropTypes from "prop-types";

import "./Bump.css";
import Help from "../Help/Help";

const BumpButton = ({ onClick, isListening, time }) => {
	return (
		<div>
			<div className="bump" onClick={() => onClick()}>
				{isListening ? "BUMPED!" : "BUMP"}
			</div>
			<div className="info">
				{/* if the time is more than 0 then it has bumped at least once so we can show info. */}
				{/* within that check what type of info to display... */}
				{/* if within an if using ternary expressions */}
				{time > 0 ? (
					isListening ? (
						"Listening for peers... Bump another device!"
					) : (
						"No peers found. Try again!"
					)
				) : (
					<Help />
				)}
			</div>
		</div>
	);
};

BumpButton.propTypes = {
	onClick: PropTypes.func.isRequired,
	isListening: PropTypes.bool,
	time: PropTypes.number,
};

export default BumpButton;
