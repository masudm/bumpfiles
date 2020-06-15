import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { bump } from "../../redux/actions/bump";
import BumpButton from "../Bump/Bump";

export const Home = () => {
	const state = useSelector((state) => state);
	const dispatch = useDispatch();
	return (
		<div>
			<BumpButton onClick={() => dispatch(bump(Date.now()))} />
			<i>bumped at: {JSON.stringify(state)}</i>
			<i>help</i>
		</div>
	);
};
