import * as actions from "../actionTypes";

export const send_file = (time, name, size, type, preview) => ({
	type: actions.TRANSFERRING,
	payload: { name, time, size, type, preview, download: false, done: false },
});
export const getting_file = (time, name, size, type) => ({
	type: actions.RECEIVING,
	payload: { name, time, size, type, download: true, done: false },
});

export const sent_file = (time) => ({
	type: actions.TRANSFERRED,
	payload: { time },
});

export const get_file = (time, data) => ({
	type: actions.RECIEVED,
	payload: { time, data },
});
