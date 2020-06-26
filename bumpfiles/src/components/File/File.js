import React from "react";
import convertSize from "convert-size";
import FileSaver from "file-saver";
import PropTypes from "prop-types";

import "./File.css";

export default function File({ index, data }) {
	//simple function to generate html about file info
	function getInfo() {
		return (
			<div className="fileInfo">
				<div>{data.name}</div>
				<div>{convertSize(data.size)}</div>
				<div>{data.type}</div>
			</div>
		);
	}

	//function to generate wrapper html for video/images
	function preview(datum) {
		if (!datum) {
			return;
		}
		if (data.type.substring(0, data.type.indexOf("/")) == "image") {
			return <img className="preview" src={datum} />;
		} else if (data.type.substring(0, data.type.indexOf("/")) == "video") {
			return (
				<video className="preview" controls>
					<source src={datum} type="video/mp4" />
				</video>
			);
		}
	}

	//on click, download
	function download() {
		FileSaver.saveAs(data.data, data.name);
	}

	//if we're the sender....
	if (!data.download) {
		return (
			<li className="file" key={index}>
				{preview(data.preview)}
				{getInfo()}
				<div className="progress">
					<div className="progress-info">{data.done ? `Uploaded!` : `Uploading...`}</div>
				</div>
			</li>
		);
	} else {
		//we're the reciever
		return (
			<li className="file" key={index}>
				{preview(data.data)}
				{getInfo()}
				<div className="progress">
					<div className="progress-info">
						{data.done ? (
							<div className="progress-info" onClick={() => download()}>
								<span className="download">Download</span>
							</div>
						) : (
							`Recieving file...`
						)}
					</div>
				</div>
			</li>
		);
	}
}

File.propTypes = {
	index: PropTypes.number,
	data: PropTypes.object,
};
