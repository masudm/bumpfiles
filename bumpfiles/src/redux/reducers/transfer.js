import * as actions from "../actionTypes";

const initialState = {
	files: [],
};

export default function (state = initialState, action) {
	switch (action.type) {
		case actions.TRANSFER:
		case actions.RECIEVE:
			return {
				...state,
				files: [...state.files, action.payload],
			};
		default:
			return state;
	}
}
