import React from "react";
import Files from "react-files";
import PropTypes from "prop-types";

import "./Uploader.css";

export default function Uploader({ onChange }) {
	return (
		<div className="files">
			<Files
				className="uploader"
				dropActiveClassName="uploader-drag"
				onChange={onChange}
				multiple={true}
				clickable>
				Drop your file here or <b>click to browse</b>
			</Files>
		</div>
	);
}

Uploader.propTypes = {
	onChange: PropTypes.func,
};
