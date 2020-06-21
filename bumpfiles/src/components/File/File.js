import React from "react";
import convertSize from "convert-size";
import FileSaver from "file-saver";

import "./File.css";

export default function File({ key, data }) {
	function getInfo() {
		return (
			<div className="fileInfo">
				<div>{data.name}</div>
				<div>{convertSize(data.size)}</div>
				<div>{data.type}</div>
			</div>
		);
	}

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

	function download() {
		FileSaver.saveAs(data.data, data.name);
	}

	if (!data.download) {
		return (
			<li className="file" key={key}>
				{preview(data.preview)}
				{getInfo()}
				<div className="progress">
					{/* <div className="progress-finished">
						<div className="progress-bar" />
					</div> */}
					<div className="progress-info">{data.done ? `Uploaded!` : `Uploading...`}</div>
				</div>
			</li>
		);
	} else {
		return (
			<li className="file" key={key}>
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
