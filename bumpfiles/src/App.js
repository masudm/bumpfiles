import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Header } from "./components/Header/Header";
import { Home } from "./components/Home/Home";
import { Transfer } from "./components/Transfer/Transfer";

import "./App.css";

export default function App() {
	return (
		<Router>
			{/* <Header /> */}
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
			</div>
		</Router>
	);
}
