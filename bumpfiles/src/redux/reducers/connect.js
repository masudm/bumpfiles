import * as actions from "../actionTypes";

const initialState = {};

export default function (state = initialState, action) {
	switch (action.type) {
		case actions.BUMP: {
			const { time } = action.payload;
			return {
				time,
			};
		}
		default:
			return state;
	}
}
