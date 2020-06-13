import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { Pin } from "./components/Pin/Pin";
import { Transfer } from "./components/Transfer/Transfer";

export default function App() {
	return (
		<Router>
			<div>
				<nav>
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/pin">Pin</Link>
						</li>
						<li>
							<Link to="/transfer">transfer</Link>
						</li>
					</ul>
				</nav>

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
