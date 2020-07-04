import React from "react";
import PropTypes from "prop-types";

import "./Alert.css";

const Alert = ({ isHidden = true, content, agreeFunc, disagreeFunc }) => {
	return (
		<div className="alert" style={{ display: isHidden ? `none` : "flex" }}>
			<span>{content}</span>
			<div className="button ok" onClick={() => agreeFunc()}>
				OK
			</div>
			<div className="button notok" onClick={() => disagreeFunc()}>
				Ignore
			</div>
		</div>
	);
};

Alert.propTypes = {
	isHidden: PropTypes.bool,
	content: PropTypes.string,
	agreeFunc: PropTypes.func,
	disagreeFunc: PropTypes.func,
};

export default Alert;
