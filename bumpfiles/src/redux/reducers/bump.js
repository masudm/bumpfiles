import * as actions from "../actionTypes";

const initialState = {
	bumped: 0,
	listening: false,
	peer: null,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case actions.BUMP:
			return Object.assign({}, state, {
				bumped: action.time,
				listening: true,
			});
		case actions.BUMPED:
			return Object.assign({}, state, {
				peer: action.peer,
			});
		case actions.NOT_FOUND:
			return Object.assign({}, state, {
				listening: false,
			});
		default:
			return state;
	}
}
