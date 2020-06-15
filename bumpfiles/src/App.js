import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import io from "socket.io-client";

import { Header } from "./components/Header/Header";
import { Home } from "./components/Home/Home";
import { Pin } from "./components/Pin/Pin";
import { Transfer } from "./components/Transfer/Transfer";

export default function App() {
	return (
		<Router>
			<Header />
			<div>
				{/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
				<Switch>
					<Route path="/transfer">
						<Transfer />
					</Route>
					<Route path="/pin">
						<Pin />
					</Route>
					<Route path="/">
						<Home />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export const socket = io("http://localhost:3001");
