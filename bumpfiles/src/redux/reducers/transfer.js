import * as actions from "../actionTypes";
import update from "immutability-helper";

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
		case actions.SENT:
			let fileIndex = state.files.findIndex((element) => element.time == action.payload.time);
			return update(state, {
				files: {
					[fileIndex]: {
						done: { $set: true },
					},
				},
			});
		default:
			return state;
	}
}
