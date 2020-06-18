import React from "react";
import convertSize from "convert-size";

import "./File.css";

export default function File({ key, data, bits }) {
	console.log(bits);
	function getInfo() {
		return (
			<div className="fileInfo">
				<div>{data.name}</div>
				<div>{convertSize(data.size)}</div>
				<div>{data.type}</div>
			</div>
		);
	}

	if (!data.download) {
		return (
			<li className="file" key={key}>
				<img className="preview" src={data.preview} />
				{getInfo()}
				<div className="progress">
					<div className="progress-finished">
						<div className="progress-bar" />
					</div>
					<div className="progress-info"></div>
				</div>
			</li>
		);
	} else {
		return (
			<li className="file" key={key}>
				<img className="preview" src={data.data} />
				{getInfo()}
				<div>download</div>
			</li>
		);
	}
}
