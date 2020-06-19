import * as actions from "../actionTypes";

export const send_file = (time, name, size, type, preview) => ({
	type: actions.TRANSFER,
	payload: { name, time, size, type, preview, download: false, done: false },
});
export const get_file = (time, name, size, type, data) => ({
	type: actions.RECIEVE,
	payload: { name, time, size, type, data, download: true, done: false },
});

export const sent_file = (time) => ({
	type: actions.SENT,
	payload: { time },
});
