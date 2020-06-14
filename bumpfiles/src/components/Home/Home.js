import React from "react";
import { connect } from "react-redux";

import { bump } from "../../redux/actions/bump";
import BumpButton from "../Bump/Bump";

const HomeView = ({ state, onBump }) => (
	<div>
		<BumpButton onClick={() => onBump()} />
		<i>bumped at: {JSON.stringify(state)}</i>
		<i>help</i>
	</div>
);

const mapStateToProps = (state) => {
	return { state };
};

const mapDispatchToProps = (dispatch) => {
	return {
		onBump: () => {
			dispatch(bump(Date.now()));
		},
	};
};

export const Home = connect(mapStateToProps, mapDispatchToProps)(HomeView);
