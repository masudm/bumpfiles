import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export function Transfer() {
	const history = useHistory();

	const state = useSelector((state) => state.bump.peer);

	useEffect(() => {
		if (state == null) {
			history.push("/");
		}
	});

	return (
		<div>
			<input type="file" />
			<ul>
				<li>bumped at: {JSON.stringify(state)}</li>
				<li>test.jpg</li>
				<li>test2.jpg</li>
				<button onClick={() => state.send("hello")}>test</button>
			</ul>
		</div>
	);
}
