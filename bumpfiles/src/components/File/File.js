import React from "react";
import convertSize from "convert-size";

import "./File.css";

export default function File({ key, data }) {
	console.log(data);
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
				<div>sending... sent</div>
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
