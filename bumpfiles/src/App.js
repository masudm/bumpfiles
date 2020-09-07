import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import { Home } from "./components/Home/Home";
import { Transfer } from "./components/Transfer/Transfer";

import "./App.css";
import Alert from "./components/Alert/Alert";

export default function App() {
	const state = useSelector((state) => state.alert);
	return (
		<Router>
			<div>
				{/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
				<Switch>
					<Route path="/transfer">
						<Transfer />
					</Route>
					<Route path="/">
						<Home />
					</Route>
				</Switch>
				<Alert {...state} />
			</div>
		</Router>
	);
}

export const IO_SERVER_URL = "https://bumpfiles.masudm.ml/";
