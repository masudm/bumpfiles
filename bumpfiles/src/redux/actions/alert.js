import * as actions from "../actionTypes";

export const show_alert = (content, agreeFunc, disagreeFunc, agree, disagree) => ({
	type: actions.SHOW_ALERT,
	payload: { content, agreeFunc, disagreeFunc, agree, disagree, isHidden: false },
});

export const hide_alert = () => ({ type: actions.HIDE_ALERT, payload: { isHidden: true } });
