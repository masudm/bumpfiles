import * as actions from "../actionTypes";

const initialState = {
	content: "",
	isHidden: true,
	agreeFunc: function () {},
	disagreeFunc: function () {},
	agree: "OK",
	disagree: "Ignore",
};

export default function (state = initialState, action) {
	switch (action.type) {
		case actions.SHOW_ALERT:
			return Object.assign({}, state, {
				...action.payload,
			});
		case actions.HIDE_ALERT:
			return Object.assign({}, state, {
				...action.payload,
			});
		default:
			return state;
	}
}
