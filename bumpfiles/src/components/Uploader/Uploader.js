import React from "react";
import Files from "react-files";

import "./Uploader.css";

export default function Uploader({ onChange }) {
	function onFilesChange(files) {
		console.log(files);
	}

	function onFilesError(error, file) {
		console.log("error code " + error.code + ": " + error.message);
	}

	return (
		<div className="files">
			<Files
				className="uploader"
				dropActiveClassName="uploader-drag"
				onChange={onChange}
				onError={onFilesError}
				multiple={false}
				clickable>
				Drop your file here or <b>click to browse</b>
			</Files>
		</div>
	);
}
