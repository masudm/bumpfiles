import * as actions from "../actionTypes";

const initialState = {
	bumped: 0,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case actions.BUMP:
			return Object.assign({}, state, {
				bumped: action.time,
			});
		default:
			return state;
	}
}
