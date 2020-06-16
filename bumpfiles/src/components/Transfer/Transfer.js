import React from "react";
import { useSelector } from "react-redux";

export function Transfer() {
	const state = useSelector((state) => state.bump.peer);
	return (
		<div>
			<input type="file" />
			<ul>
				<li>bumped at: {JSON.stringify(state)}</li>
				<li>test.jpg</li>
				<li>test2.jpg</li>
				<li>test3.jpg</li>
				<button onClick={() => state.send("hello")}>test</button>
			</ul>
		</div>
	);
}
