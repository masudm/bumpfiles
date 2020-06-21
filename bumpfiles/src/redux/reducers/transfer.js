import * as actions from "../actionTypes";
import update from "immutability-helper";

const initialState = {
	files: [],
};

let fileIndex;

export default function (state = initialState, action) {
	switch (action.type) {
		case actions.TRANSFERRING:
		case actions.RECEIVING:
			return {
				...state,
				files: [...state.files, action.payload],
			};
		case actions.TRANSFERRED:
			fileIndex = state.files.findIndex((element) => element.time == action.payload.time);
			return update(state, {
				files: {
					[fileIndex]: {
						done: { $set: true },
					},
				},
			});
		case actions.RECIEVED:
			fileIndex = state.files.findIndex((element) => element.time == action.payload.time);
			return update(state, {
				files: {
					[fileIndex]: {
						done: { $set: true },
						data: { $set: action.payload.data },
					},
				},
			});
		default:
			return state;
	}
}
