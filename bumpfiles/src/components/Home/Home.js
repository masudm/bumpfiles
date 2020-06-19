import { bump, bumped, not_found } from "../../redux/actions/bump";
import BumpButton from "../Bump/Bump";
import "./Home.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";
var SimplePeer = require("simple-peer");

export function Home() {
	const history = useHistory();
	const socket = io("http://192.168.0.189:3001");

	const state = useSelector((state) => state.bump);
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

		window.setTimeout(() => {
			dispatch(not_found());
		}, 5000);
	};

	const gotBumped = (data) => {
		const p = new SimplePeer({
			initiator: data.initiator,
			trickle: true,
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
		<div className="home">
			<BumpButton onClick={() => b()} isListening={state.listening} time={state.bumped} />
		</div>
	);
}
