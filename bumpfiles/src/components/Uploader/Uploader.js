import React from "react";
import Files from "react-files";

import "./Uploader.css";

export default function Uploader({ onChange }) {
	return (
		<div className="files">
			<Files
				className="uploader"
				dropActiveClassName="uploader-drag"
				onChange={onChange}
				multiple={false}
				clickable>
				Drop your file here or <b>click to browse</b>
			</Files>
		</div>
	);
}
