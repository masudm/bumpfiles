import * as actions from "../actionTypes";

export const send_file = (time, name, size, type) => ({
	type: actions.TRANSFER,
	payload: { name, time, size, type, download: false },
});
export const get_file = (time, name, size, type, data) => ({
	type: actions.RECIEVE,
	payload: { name, time, size, type, data, download: true },
});
