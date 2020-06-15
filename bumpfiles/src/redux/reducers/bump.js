import * as actions from "../actionTypes";

const initialState = {
	bumped: 0,
	peer: null,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case actions.BUMP:
			return Object.assign({}, state, {
				bumped: action.time,
			});
		case actions.BUMPED:
			return Object.assign({}, state, {
				peer: action.peer,
			});
		default:
			return state;
	}
}
