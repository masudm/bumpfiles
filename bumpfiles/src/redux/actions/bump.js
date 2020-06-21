import * as actions from "../actionTypes";

export const bump = (time) => ({ type: actions.BUMP, time });
export const bumped = (peer, myUsername, connectedUsername) => ({
	type: actions.BUMPED,
	peer,
	myUsername,
	connectedUsername,
});
export const not_found = () => ({ type: actions.NOT_FOUND });
