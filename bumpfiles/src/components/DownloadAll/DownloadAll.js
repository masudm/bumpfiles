import React from "react";
import PropTypes from "prop-types";
import FileSaver from "file-saver";

import "./DownloadAll.css";

var JSZip = require("jszip");

const DownloadAll = ({ files }) => {
	function downloadableFiles() {
		return files.filter((value, index) => {
			if (value.download === true) {
				return value;
			}
		});
	}

	let zipData = null;
	let zip = new JSZip();

	downloadableFiles().forEach((file, index) => {
		getBlob(file.data);
	});

	// zip.generateAsync({ type: "blob" }).then(function (content) {
	// 	zipData = content;
	// });

	function getBlob(url) {
		console.log(url);
		//todo
		//and then: zip.file(file.name, BLOB DATA);
	}

	return (
		<div
			style={{ display: downloadableFiles() < 2 ? `none` : "flex" }}
			onClick={() => FileSaver.saveAs(zipData, "bumpfiles-" + Date.now() + ".zip")}>
			download all
		</div>
	);
};

DownloadAll.propTypes = {
	files: PropTypes.array,
};

export default DownloadAll;
