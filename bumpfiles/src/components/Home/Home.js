import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";

import { bump, bumped, not_found } from "../../redux/actions/bump";

import BumpButton from "../Bump/Bump";
import UsernameGen from "./UsernameGen";
import "./Home.css";
import { IO_SERVER_URL } from "../../App";

var SimplePeer = require("simple-peer");

export function Home() {
	const history = useHistory();
	const socket = io(IO_SERVER_URL);

	const state = useSelector((state) => state.bump);
	const dispatch = useDispatch();

	//the flow is: initiateBump -> sends signal to server -> when/if server finds match
	//-> socket.on("bumped") -> gotBumped

	useEffect(() => {
		//listen for a server response that we got bumped
		socket.on("bumped", (data) => {
			gotBumped(data);
		});
	});

	const initiateBump = () => {
		socket.emit("bump", { time: Date.now() });
		dispatch(bump(Date.now()));

		window.setTimeout(() => {
			dispatch(not_found());
		}, 5000);
	};

	const gotBumped = (data) => {
		//there are two parts initiator and reciever - the server decides who is who
		//initiator: create an offer -> send to reciever
		//reciever: from offer -> generate answer -> send to initiator
		//connect!

		const p = new SimplePeer({
			initiator: data.initiator,
			trickle: true,
		});

		p.on("error", (err) => console.log(err));

		p.on("signal", (offer) => {
			//console.log("SIGNAL" + JSON.stringify(offer));
			socket.emit("p2p", { offer: JSON.stringify(offer), recipient: data.recipient, username: UsernameGen });
		});

		socket.on("p2p", function (data) {
			p.signal(JSON.parse(data.offer));

			p.on("connect", () => {
				dispatch(bumped(p, UsernameGen, data.username));

				history.push("/transfer");
			});
		});
	};

	return (
		<div className="home">
			<BumpButton onClick={() => initiateBump()} isListening={state.listening} time={state.bumped} />
		</div>
	);
}
