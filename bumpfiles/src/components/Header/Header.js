import React from "react";
import { Link } from "react-router-dom";

export const Header = ({}) => (
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
);
