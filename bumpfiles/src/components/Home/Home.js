import { bump, bumped } from "../../redux/actions/bump";
import BumpButton from "../Bump/Bump";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";
var SimplePeer = require("simple-peer");

export function Home() {
	const history = useHistory();
	const socket = io("http://localhost:3001");

	const state = useSelector((state) => state);
	const dispatch = useDispatch();

	useEffect(() => {
		console.log("listening");
		socket.on("bumped", (data) => {
			gotBumped(data);
		});
	});

	const b = () => {
		socket.emit("bump", { time: Date.now() });
		dispatch(bump(Date.now()));
	};

	const gotBumped = (data) => {
		const p = new SimplePeer({
			initiator: data.initiator,
			trickle: false,
		});

		p.on("error", (err) => console.log(err));

		p.on("signal", (offer) => {
			console.log("SIGNAL" + JSON.stringify(offer));
			socket.emit("p2p", { offer: JSON.stringify(offer), recipient: data.recipient });
		});

		socket.on("p2p", function (data) {
			p.signal(JSON.parse(data.offer));

			p.on("connect", () => {
				console.log("CONNECT");
				dispatch(bumped(p));

				history.push("/transfer");
			});
		});
	};

	return (
		<div>
			<BumpButton onClick={() => b()} />
			<i>bumped at: {JSON.stringify(state)}</i>
			<i>help</i>
		</div>
	);
}
