import React from "react";
import PropTypes from "prop-types";

import "./ConnectedInfo.css";

const ConnectedInfo = ({ myUsername, connectedUsername }) => {
	return (
		<div className="connectedInfo">
			<div className="myUsername">Username: {myUsername}</div>
			<div className="connectedUsername">Connected to: {connectedUsername}</div>
		</div>
	);
};

ConnectedInfo.propTypes = {
	myUsername: PropTypes.string,
	connectedUsername: PropTypes.string,
};

export default ConnectedInfo;
