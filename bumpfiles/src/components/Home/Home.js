import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";

import { bump } from "../../redux/actions/bump";
import BumpButton from "../Bump/Bump";

export function Home() {
	const socket = io("http://localhost:3001");

	const state = useSelector((state) => state);
	const dispatch = useDispatch();

	useEffect(() => {
		console.log("listening");
		socket.on("bumped", (payload) => {
			// update messages
			//useDispatch({ type: UPDATE_CHAT_LOG }, payload);
			console.log(payload);
		});
	});

	const b = () => {
		socket.emit("bump", { time: Date.now() });
		dispatch(bump(Date.now()));
	};

	return (
		<div>
			<BumpButton onClick={() => b()} />
			<i>bumped at: {JSON.stringify(state)}</i>
			<i>help</i>
		</div>
	);
}
